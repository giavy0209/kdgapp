import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'

import {accountStyle} from '../../styles'

import twitter from '../../assets/images/twitter.png'
import instagram from '../../assets/images/instagram.png'
import facebook from '../../assets/images/facebook.png'
import medium from '../../assets/images/medium.png'
import youtube from '../../assets/images/youtube.png'
import zalo from '../../assets/images/zalo.png'

const ListFollow = [twitter, instagram, facebook, medium, youtube, zalo]

export default function App(){

    return(
        <>
        <View style={accountStyle.listFollow}>
            <View style={accountStyle.maskOpacity}/>
            {
            ListFollow.map((el,index)=>
                <TouchableOpacity key={index} style={accountStyle.followBlock}>
                    <Image style={accountStyle.followIcon} source={el}/>    
                </TouchableOpacity>
            )
            }
        </View>
        </>
    )

}