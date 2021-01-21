import React, { useMemo } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import lock from '../../assets/images/icons/lock.png'
import user from '../../assets/images/icons/user.png'
import setting from '../../assets/images/icons/setting.png'
import reward from '../../assets/images/icons/reward.png'
import logout from '../../assets/images/icons/logout.png'
import storage from '../../helper/storage'
import AsyncStorage from '@react-native-community/async-storage'
import { actChangeJWT } from '../../store/initBE'
import socket from '../../socket'


export default function App () {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const text = useSelector(state => state.Languages && state.Languages.Me ? state.Languages.Me : {})

    const list = useMemo(() => {
        return [
            {
                icon : user,
                text : text.profile,
                navigate : 'Profile_Picker'
            },
            {
                icon : setting,
                text : text.setting,
                navigate : 'Setting_Picker'
            },
            {
                icon : lock,
                text : text.secure,
                navigate : 'Secure_Picker'
            },
            {
                icon : reward,
                text : text.reward,
                navigate : 'Reward'
            },
        ]
    },[text])
    return (
    <>
    <View style={[common.container]}>
        <View style={[common.row_col(-7) ,common.mt]}>
        {
            list.map( (o, index) => 
                <TouchableOpacity onPress={() => navigation.push(o.navigate)} key={o.text} style={[common.column(2,index, 7)]}>
                    <View style={[common.pd, common.center,common.background, common.radius]}>
                        <Image source={o.icon}/>
                        <Text style={[common.mt , common.textTitle, common.font14]}>{o.text}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        </View>
        <TouchableOpacity 
        onPress={async () => {
            await AsyncStorage.removeItem('email')
            socket.disconnect()
            dispatch(actChangeJWT(''))
            navigation.navigate('Login')
        }}
        style={[common.row, common.pd , common.center, common.mt, {backgroundColor : 'rgba(46,57,79 , .4)',borderRadius: 25}]}>
            <Image source={logout}/>
            <Text style={[common.textHL , common.font14 , common.pl]}>{text.logout}</Text>
        </TouchableOpacity>
    </View>
    </>)
}