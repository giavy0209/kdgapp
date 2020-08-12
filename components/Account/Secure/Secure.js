import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
export default function App(){
    const navigation = useNavigation()
    return (
        <>
            <Header2 title="Bảo mật"/>
            <View style={[mainStyles.container,]}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('ChangePass')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Thay đổi mật khẩu</Text>
                    <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('KYC')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Xác minh danh tính (KYC)</Text>
                    <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('Pin')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Cài đặt Unlock PIN</Text>
                    <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                </TouchableOpacity>
            </View>
        </>
    )
}