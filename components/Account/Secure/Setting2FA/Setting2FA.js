import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, TextInput,Image } from 'react-native'

import {Header2} from '../../../Header'
import { mainStyles } from '../../../../styles'

import logo from '../../../../assets/images/google-logo.png'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { storage } from '../../../../helper';
import { async2FA } from '../../../../store/actions'

export default function App(){
    const dispatch = useDispatch();
    const route = useRoute();
    const screenHeight = useSelector(state=>state.height)
    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const navigation = useNavigation()

    
    const { status } = route.params;
 

    const generate2FACode = useCallback(async () => {
        var userinfo = await storage('_id').getItem();
        dispatch(async2FA({userId: userinfo._id}))
        .then((res)=>{
           navigation.navigate('Generate2FACode', {
                userId: userinfo._id,
                gaSecret: res.gaSecret,
                email: userinfo.email,
                status: status
           })
        })
        .catch(console.log)
    }, [])
    return (
        <>
            <Header2 setHeight={setHeight} title="Cài đặt 2FA"/>
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 8}]}>
                <View>
                    <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 16}}></Text>
                </View>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                    <Text style={{color: 'rgba(255,255,255,0.5)'}}>{status === true ? 'Bạn đã cài đặt 2FA, muốn hủy vui lòng xác nhận dưới đây' : 'Để cài đặt bảo vệ tài khoản, bạn nên cài đặt 2FA'}</Text>
                </View>
                <TouchableOpacity
                    onPress={generate2FACode}
                >
                    <View style={{alignItems: 'center', paddingTop: 20}}>
                        <View style={{flexDirection: 'row', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 10}}>
                            <Image source={logo} style={{width: 35, height: 35}} />
                            <Text style={{paddingLeft: 10}}>{status === true ? 'Hủy cài đặt 2FA' : 'Cài đặt 2FA'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </>
    )
}