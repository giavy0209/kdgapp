import React from 'react';
import {View, Image, Text } from 'react-native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({title, subTitle}){
    return(
        <>
        <View>
            <Image
                source={require('../../assets/images/headerStaking1.png')}
                style={{
                    width: '100%',
                    height: windowHeight/6
                }}
            />
            <View style={{position: 'absolute', top: windowHeight/24, left: windowWidth/20}}>
            <Text style={{color: 'rgba(250,200,0,1)', fontSize: (windowWidth*windowHeight)/14060}}>{title}</Text>
            <Text style={{color: 'rgba(255,255,255, 0.8)', fontSize: (windowWidth*windowHeight)/19866}}>{subTitle}</Text>
            </View>
        </View>
        </>
    )
}