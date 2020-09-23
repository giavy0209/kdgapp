import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch} from 'react-redux'
import { storage } from '../../../helper'
import { asyncGetUserbyID } from '../../../store/actions'
import store from '../../../store'
export default function App(){
    const navigation = useNavigation()

    const dispatch = useDispatch();

    const secureStatus = useSelector(state => state.secstatus)

    console.log(store.getState())

   
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
                onPress={()=>navigation.navigate('Setting2FA', {
                    status2FA: secureStatus.is2FA,
})}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Cài đặt 2FA</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255,255,255,0.5)'}}>{secureStatus.is2FA === true ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity 
                disabled={secureStatus.kyc === '2' || secureStatus.kyc === '1' ? true : false}
                onPress={()=>navigation.navigate('KYC')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Xác minh danh tính (KYC)</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={secureStatus.kyc == '0' ? {color: 'rgba(255,255,255,0.5)'} : 
                                     secureStatus.kyc == '1' ? {color: 'green'} :  
                                     secureStatus.kyc === '2' ? {color: 'rgba(255,255,255,0.5)'} :  {color: 'red'}} >
                            {secureStatus.kyc == '0' ? 'Chưa xác minh': 
                             secureStatus.kyc == '1' ? 'Đã xác minh'  : 
                             secureStatus.kyc == '2' ? 'Đang chờ duyệt' : 'Bị từ chối'}
                        </Text>
                        <FontAwesomeIcon style={secureStatus.kyc === '0' ? {color: 'rgba(255,255,255,0.5)'} : 
                                     secureStatus.kyc === '1' ? {color: 'green'} :  
                                     secureStatus.kyc === '2' ? {color: 'rgba(255,255,255,0.5)'} :  {color: 'red'}} icon={faAngleRight}/>
                    </View>
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