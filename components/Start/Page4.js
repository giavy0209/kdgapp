import React, { useState, useCallback } from 'react';
import { View, Image, Text } from 'react-native';
import {startScreenStyle as styles} from '../../styles/'

import easytext from '../../assets/images/easytext.png'
import mainImage4 from '../../assets/images/main-image-4.png'
export default function Page4({ScreenHeight, ScreenWidth}){
    return(
        <>
        <View style={[
            styles.page,
            {width: ScreenWidth, height: ScreenHeight}
        ]}>
            <Image source={mainImage4} style={[styles.image,{width: ScreenHeight * 0.4497,marginTop: ScreenHeight * 0.1079}]}></Image>
            <Image source={easytext} style={[styles.image,{width : ScreenWidth * 0.46933, marginTop: ScreenHeight * 0.0374812}]}></Image>
            <Text style={[styles.text,{marginTop: ScreenHeight * 0.02248}]}>Thao tác đơn giản, giao diện thân thiện với</Text>
            <Text style={styles.text}>người dùng</Text>
        </View>
        </>
    )
}