import React, { useState, useCallback } from 'react';
import { View, Image, ImageBackground, Text,TouchableOpacity } from 'react-native';
import {mainStyles as styles} from '../../styles/'

export default function Dots({ScreenHeight,ActivePage,ScreenWidth,DotsPosition}){
    return(
        <>
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', width:  ScreenWidth,position: 'absolute',flexDirection: 'row', top: DotsPosition + 35 }}>
            <View style={ [styles.pagiSlide, ActivePage === 0 && styles.pagiSlideActive]}/>
            <View style={ [styles.pagiSlide, ActivePage === 1 && styles.pagiSlideActive]}/>
            <View style={ [styles.pagiSlide, ActivePage === 2 && styles.pagiSlideActive]}/>
            <View style={ [styles.pagiSlide, ActivePage === 3 && styles.pagiSlideActive]}/>
        </View>
        </>
    )
}