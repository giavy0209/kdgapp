import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { View, Text, TouchableOpacity,Switch } from 'react-native'

import {Header2} from '../../../Header'
import { mainStyles } from '../../../../styles'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
export default function App(){
    const navigation = useNavigation()

    const PIN = useSelector(state => state.pin)

    const [ActivePin, setActivePin] = useState(PIN ? true : false)
    const [ThumbSwitchColor, setThumbSwitchColor] = useState('')
    useEffect(()=>{
        if(ActivePin) setThumbSwitchColor('#ebd889')
        else setThumbSwitchColor('#ddd9d8')
    },[ActivePin])

    useEffect(()=>{
        setTimeout(() => {
            if(PIN && !ActivePin){
                setActivePin(true)
            }else if(!PIN && ActivePin){
                setActivePin(false)
            }
        }, 300);
    },[PIN,ActivePin])

    useEffect(()=>{
        if(ActivePin && !PIN){
            navigation.navigate('SetPin')
        }
        if(!ActivePin && PIN){
            navigation.navigate('RemovePin')
        }
    },[ActivePin,PIN])
    return (
        <>
            <Header2 title="Cài đặt Unlock PIN"/>
            <View style={[mainStyles.container,{padding: 14}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingVertical: 10}}>
                    <Text style={{color: '#ddd9d8', fontSize: 14}}>Cài đặt Unlock PIN</Text>
                    <Switch 
                    value={ActivePin}
                    onValueChange={value=>setActivePin(value)}
                    thumbColor={ThumbSwitchColor}
                    trackColor={{true: '#fff8da', false: '#8a8c8e'}}
                    />
                </View>
                <View style={{marginTop: 17, borderTopColor: '#2a2e3a', borderTopWidth: 1,paddingTop: 15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChangePin')} disabled={!ActivePin}><Text style={{color: ActivePin ? '#ddd9d8' : '#4c4d54'}}>Đổi mã PIN</Text></TouchableOpacity>
                    <Text style={{color: '#8a8c8e', marginTop:22}}>Trong trường hợp quên mã PIN ứng dụng bạn phải gỡ bỏ và cài đặt lại ứng dụng để xóa mã PIN cũ.</Text>
                </View>
            </View>
        </>
    )
}