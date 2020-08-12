import React, { useState, useCallback } from 'react';
import { View, Image, ImageBackground, Text,TouchableOpacity } from 'react-native';
import {startScreenStyle as styles} from '../../styles/'
import securetext from '../../assets/images/securetext.png'
import mainImage2 from '../../assets/images/main-image-2.png'
export default function Page2({ScreenHeight, ScreenWidth,setDotsPosition}){
    return(
        <>
        <View 
        style={[
            styles.page,
            {width: ScreenWidth, height: ScreenHeight}
        ]}>
            <Image source={mainImage2} style={[styles.image,{width: ScreenHeight * 0.4497,marginTop: ScreenHeight * 0.1079}]}></Image>
            <Image source={securetext} style={[styles.image,{width : ScreenWidth * 0.46933, marginTop: ScreenHeight * 0.0374812}]}></Image>
            <Text style={[styles.text,{marginTop: ScreenHeight * 0.02248}]}>Cơ chế bảo mật nhiều tầng đảm bảo tài sản</Text>
            <Text onLayout={e=>setDotsPosition(e.nativeEvent.layout.y)} style={styles.text}>và giao dịch an toàn và ổn định</Text>
        </View>
        </>
    )
}