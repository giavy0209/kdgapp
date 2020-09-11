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
            <Header2 title="Về King Wallet"/>
            <View style={[mainStyles.container,]}>
                <TouchableOpacity 
                // onPress={()=>navigation.navigate('ChangePass')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Image

                            source={require('../../../assets/images/logo.png')}
                        />
                        <View style={{paddingVertical: 10}}>
                            <Text style={{color: 'rgba(255,255,255,0.8)'}}>Phiên bản KDG 1.0</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{paddingTop: 10}}>
                    <TouchableOpacity 
                    // onPress={()=>navigation.navigate('KYC')}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                        <View style={accountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: '#ddd9d8'}}>Thỏa thuận người dùng</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    // onPress={()=>navigation.navigate('Pin')}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                        <View style={accountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: '#ddd9d8'}}>Chính sách bảo mật</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}