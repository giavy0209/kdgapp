import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, TextInput, Clipboard } from 'react-native'

import {Header2} from '../../../Header'
import { mainStyles } from '../../../../styles'

import logo from '../../../../assets/images/google-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native'
import QRCode from '../../../QRGenerate/QRCode'
import { LinearGradient } from 'expo-linear-gradient'
import { asyncVerify2FA , asyncDisable2FA} from '../../../../store/actions'

export default function App(){
    const screenHeight = useSelector(state=>state.height)
    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const route = useRoute();
    const navigation = useNavigation();
    const [Value, setValue] = useState('');
    const dispatch = useDispatch();
    const { userId, gaSecret, email, status } = route.params;

    const valueQR = `otpauth://totp/Kingdomgame:${email}?secret=${gaSecret}&issuer=Kingdomgame`;
    
    const getValue = (val) => {
        setValue(val);
    }

  
    const verify2FA = useCallback(() => {
        dispatch(asyncVerify2FA({userId: userId, token: Value}))
        .then((res)=>{
            navigation.navigate('Me')
        })
        .catch(console.log)
    }, [userId, Value])

    const disable2FA = useCallback(() => {
        dispatch(asyncDisable2FA({userId: userId, token: Value}))
        .then((res)=>{
            navigation.navigate('Me')
        })
        .catch(console.log)
    }, [userId, Value])


    return (
        <>
            <Header2 setHeight={setHeight} title="Cài đặt 2FA"/>
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 8}]}>
                <View style={{paddingTop: 15, alignItems: 'center'}}>
                    <View>
                        <Text style={{color: 'rgba(255,255,255,0.7)'}}>Scan tại đây để xác thực</Text>
                    </View>
                    <View>
                    <QRCode
                        value={valueQR}
                        // logo={coinName === 'KDG' ? kdgicon : coinName === 'TRX' ? trxicon : coinName === 'ETH' ? ethicon : usdticon}
                    />
                    </View>
                    <View>
                        <Text style={{color: 'rgba(255,255,255,0.7)'}}>Hoạt sao chép mã tại đây</Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            onPress={() => Clipboard.setString(gaSecret)}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
                                <Text style={{color: 'rgba(84,86,89, 0.9)', paddingRight: 5}}>{gaSecret}</Text>
                                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: 20, backgroundColor: '#fff', padding: 10, width: '90%', borderRadius: 10}}>
                        <TextInput
                            keyboardType='decimal-pad'
                            onChangeText={(value) => getValue(value)}
                            placeholder='Nhập mã 2FA trong app của bạn'
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={status === true ? disable2FA : verify2FA}
                        style={{width: '100%'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <LinearGradient 
                                colors={['#e5be50', '#ecda8b', '#a47b00']}
                                style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: '92%', height: 40}}>
                                <Text style={{color: '#111b2d', fontSize: 16}}>{status === true ? 'Hủy cài đặt 2FA' : 'Xác nhận 2FA'}</Text>
                            </LinearGradient>
                        </View>
                </TouchableOpacity>
                </View>
            </View>
        </>
    )
}