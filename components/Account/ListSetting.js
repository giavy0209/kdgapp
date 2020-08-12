import React, { useCallback } from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faAngleRight } from '@fortawesome/free-solid-svg-icons';

import {accountStyle} from '../../styles'
import List from './settingList'
import { useNavigation } from '@react-navigation/native';

export default function App(){
    const navigation = useNavigation()
    const handlePress = useCallback(route=>{
        navigation.navigate(route)
    },[navigation])
    return (
        <>
        {
        List.map((el,index) => {
        return (

        <View key={index} style={accountStyle.blockSetting}>
            <Text style={accountStyle.settingTitle}>{el.name.toUpperCase()}</Text>

            {
            el.child.map((Child, index)=>{
            
            return(
            <>
            <Child.BlockComponent onPress={Child.navigate && (()=>handlePress(Child.navigate))} key={Child.index} style={[accountStyle.setting, index !== 0 && accountStyle.settingBorder]}>
                <View style={accountStyle.maskOpacity}></View>
                <View style={accountStyle.settingLeft}>
                    <View style={accountStyle.iconBlock}>
                        <Image source={Child.icon} style={accountStyle.icon}/>
                    </View>
                <Text style={accountStyle.settingTextLeft}>{Child.textLeft}</Text>
                </View>
                <View style={accountStyle.settingRight}>
                    <Text style={accountStyle.settingTextRight}>{Child.textRight} </Text>
                    {Child.arrow && <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight} />}
                </View>
            </Child.BlockComponent>
            {Child.extra && <Child.extra />}

            </>
            )
            })
            }
        </View>
        )
        })
        }
        </>
    )
}