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
import { asyncVerify2FA , asyncDisable2FA, asyncSecureStatus} from '../../../../store/actions'
import Popup from '../../../Popup/Popup'

export default function App(){

    const [PopupStatus, setPopupStatus] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
      setTimeout(function(){ 
        setModalVisible(false);
       }, 1000);
    };

    const screenHeight = useSelector(state=>state.height)

    const secureStatus = useSelector(state => state.secstatus)

    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const route = useRoute();
    const navigation = useNavigation();
    const [Value, setValue] = useState('');
    const [Password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { userId, gaSecret, email, status2FA } = route.params;

    const valueQR = `otpauth://totp/Kingdomgame:${email}?secret=${gaSecret}&issuer=Kingdomgame`;


  
    const verify2FA = useCallback(() => {
        dispatch(asyncVerify2FA({userId: userId, token: Value}))
        .then((res)=>{
            if(res.status === 100){
                setPopupStatus(false)
                toggleModal()
                return
            }
            if(res.status === 1){
                dispatch(asyncSecureStatus({
                    ...secureStatus,
                    is2FA: !secureStatus.is2FA

                }))
                setPopupStatus(true)
                toggleModal()
                navigation.navigate('Secure')
                return
            }
        })
    }, [userId, Value])

    const disable2FA = useCallback((val, pass) => {
        dispatch(asyncDisable2FA({userId: userId, token: val, password: pass}))
        .then((res)=>{
            // navigation.navigate('Me')
            if(res.status === 100){
                setPopupStatus(false)
                toggleModal()
                return
            }
            if(res.status === 1){
                dispatch(asyncSecureStatus({
                    ...secureStatus,
                    is2FA: !secureStatus.is2FA

                }))
                setPopupStatus(true)
                toggleModal()
                navigation.navigate('Secure')
                return
            }
            if(res.status === 104){
                setPopupStatus(false)
                toggleModal()
            }
        })
    }, [userId, Value])



    return (
        <>
            <Header2 setHeight={setHeight} title="Cài đặt 2FA"/>
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 12}]}>
                <Popup type={PopupStatus === true ? 'success' : 'failed'} title={PopupStatus === true ? 'Thành công' : 'Xác thực thất bại'} isModalVisible={isModalVisible}/>
                <View style={{paddingTop: 15, alignItems: 'center'}}>
                {status2FA === false ?
                (<View style={{alignItems: 'center'}}>
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
                    
                </View>) : null
                }
                    
           
                    <View style={{marginTop: 20, backgroundColor: '#fff', padding: 10, width: '90%', borderRadius: 10}}>
                        <TextInput
                            keyboardType='decimal-pad'
                            onChangeText={(value) => setValue(value)}
                            placeholder='Nhập mã 2FA trong app của bạn'
                        />
                    </View>
                    {status2FA === true ?
                    <View style={{marginTop: 20, backgroundColor: '#fff', padding: 10, width: '90%', borderRadius: 10}}>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(value) => setPassword(value)}
                            placeholder='Nhập mật khẩu'
                        />
                    </View>
                    : null
                    }
                    <TouchableOpacity 
                        onPress={status2FA === true ? () => disable2FA(Value, Password) : verify2FA}
                        style={{width: '100%'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <LinearGradient 
                                colors={['#e5be50', '#ecda8b', '#a47b00']}
                                style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 20, width: '92%', height: 40}}>
                                <Text style={{color: '#111b2d', fontSize: 16,}}>{status2FA === true ? 'Hủy cài đặt 2FA' : 'Xác nhận 2FA'}</Text>
                            </LinearGradient>
                        </View>
                </TouchableOpacity>
                </View>
            </View>
        </>
    )
}