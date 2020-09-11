import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
export default function App(){
    const navigation = useNavigation()
    return (
        <>
            <Header2 title="Quản lý ví"/>
            <View style={[mainStyles.container,]}>

                <View>
                    <TouchableOpacity 
                    // onPress={()=>navigation.navigate('KYC')}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                        <View style={accountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: '#ddd9d8'}}>Tên ví</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('SelectCoin')}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                        <View style={accountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: '#ddd9d8'}}>Xuất Private key</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}