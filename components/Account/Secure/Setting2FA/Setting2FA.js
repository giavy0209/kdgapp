import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, TextInput,Image } from 'react-native'

import {Header2} from '../../../Header'
import { mainStyles } from '../../../../styles'

import logo from '../../../../assets/images/google-logo.png'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { storage, checkLanguage } from '../../../../helper';
import { async2FA } from '../../../../store/actions'

export default function App(){
    const dispatch = useDispatch();
    const route = useRoute();
    const screenHeight = useSelector(state=>state.height)
    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const navigation = useNavigation()

    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)

    const { status2FA } = route.params;
 

    const generate2FACode = useCallback(async () => {
        var userData = await storage('userData').getItem();
        dispatch(async2FA({userId: userData._id}))
        .then((res)=>{
           navigation.navigate('Generate2FACode', {
                userId: userData._id,
                gaSecret: res.gaSecret,
                email: userData.email,
                status2FA: status2FA
           })
        })
        .catch(console.log)
    }, [])
    return (
        <>
            <Header2 setHeight={setHeight} title={checkLanguage({vi: 'Cài đặt 2FA', en: '2FA Authentication'},language)}/>
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 8}]}>
                <View>
                    <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 16}}></Text>
                </View>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={{color: display === 1 ? '#283349'  :'rgba(255,255,255,0.5)'}}>{status2FA === true ? checkLanguage({vi: 'Bạn đã cài đặt 2FA, muốn huỷ vui lòng xác nhận dưới đây', en: 'You have 2FA settings. If you want to cancel, please confirm below'},language) : 
                    checkLanguage({vi: 'Bạn chưa cài đặt 2FA, vui lòng nhấn nút dưới đây để kích hoạt', en: 'You do not have 2FA settings, please press the button below to activate'},language)}</Text>
                </View>
                <TouchableOpacity
                    onPress={generate2FACode}
                >
                    <View style={{alignItems: 'center', paddingTop: 20}}>
                        <View style={{flexDirection: 'row', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 10}}>
                            <Image source={logo} style={{width: 35, height: 35}} />
                            <Text style={{paddingLeft: 10}}>{status2FA === true ? checkLanguage({vi: 'Hủy cài đặt 2FA', en: 'Disable 2FA'},language) :  checkLanguage({vi: 'Cài đặt 2FA', en: 'Enable 2FA'},language)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </>
    )
}