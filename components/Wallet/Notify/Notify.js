import React, { useState, useEffect } from 'react'
import {View, Text, Image} from 'react-native'
import { mainStyles,notifyStyles } from '../../../styles/'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'
export default function App(){
    const [Width , setWidth] = useState(0)

    return (
        <>
        <View style={mainStyles.container}>
            <Header2 title="Thông báo"/>
            <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} style={notifyStyles.listNotify}>
                <View style={notifyStyles.notify}>
                    <Image source={logo} style={{width: 25,padding: 0, height: 18 ,alignSelf: 'flex-start',resizeMode: 'contain'}} />
                    <View style={{marginLeft: 8, width: Width - 25 - 8 ,borderBottomWidth:1,borderBottomColor: '#29303d', paddingBottom:12}}>
                        <Text style={{includeFontPadding: false, color: '#fff', fontSize: 14}}>Chúc mừng bạn đã tham gia King Wallet</Text>
                        <Text style={{color: '#8a8c8e', fontSize: 13}}>Bạn đã đăng ký thành công Bạn đã đăng ký thành công. Nếu đủ điểm bạn sẽ được thưởng nhiều quà tăng. Giữ vững phong độ nhé!</Text>
                        <Text style={{color: '#fac800', fontSize: 11, marginTop:7}}>11:57 - 31/07/2020</Text>
                    </View>
                </View>
            </View>
        </View>
        </>
    )
}