import React, { useState, useCallback } from 'react';
import { View, Image, ImageBackground, Text,TouchableOpacity } from 'react-native';
import {startScreenStyle as styles} from '../../styles/'

import multitext from '../../assets/images/multitext.png'
import mainImage3 from '../../assets/images/main-image-3.png'
export default function Page3({ScreenHeight, ScreenWidth}){
    return(
        <>
        <View style={[
            styles.page,
            {width: ScreenWidth, height: ScreenHeight}
        ]}>
            <Image source={mainImage3} style={[styles.image,{width: ScreenHeight * 0.4497 ,marginTop: ScreenHeight * 0.1079}]}></Image>
            <Image source={multitext} style={[styles.image,{width : ScreenWidth * 0.46933, marginTop: ScreenHeight * 0.0374812}]}></Image>
            <Text style={[styles.text,{marginTop: ScreenHeight * 0.02248}]}>Người dùng có thể quản lý nhiều tài khoản </Text>
            <Text style={styles.text}>trên King Wallet</Text>
        </View>
        </>
    )
}