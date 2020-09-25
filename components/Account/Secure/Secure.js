import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch} from 'react-redux'
import { storage } from '../../../helper'
import { asyncGetUserbyID } from '../../../store/actions'


export default function App(){
    const navigation = useNavigation()

    const dispatch = useDispatch();


    const isFocused = useIsFocused();


    const [Is2FA, setIs2FA] = useState()
    
    const [KYCType, setKYCType] = useState()
    useEffect(() => {
        async function getUserInfo() {
          var userinfo = await storage('_id').getItem();
       
        dispatch(asyncGetUserbyID(userinfo._id))
        .then((res)=>{
            setIs2FA(res.data.is2FA)
            setKYCType(res.data.kyc)
        })      
        .catch(console.log)
        }
    
        getUserInfo()
    
    
      }, [isFocused])

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
                disabled={Is2FA === null ? true : false}
                onPress={()=>navigation.navigate('Setting2FA', {
                    status2FA: Is2FA,
})}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Cài đặt 2FA</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255,255,255,0.5)'}}>{Is2FA === true ? 'Đã kích hoạt' : Is2FA === false ?  'Chưa kích hoạt' : ''}</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity 
                disabled={KYCType == 2 || KYCType == 1 ? true : false}
                onPress={()=>navigation.navigate('KYC')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Xác minh danh tính (KYC)</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={KYCType == 0 ? {color: 'rgba(255,255,255,0.5)'} : 
                                     KYCType == 1 ? {color: 'green'} :  
                                     KYCType == 2 ? {color: 'rgba(255,255,255,0.5)'} : 
                                     KYCType == 3 ?  {color: 'red'} : {color: 'rgba(255,255,255,0.5)'}} >
                            {KYCType == 0 ? 'Chưa xác minh': 
                             KYCType == 1 ? 'Đã xác minh'  : 
                             KYCType == 2 ? 'Đang chờ duyệt' : 
                             KYCType == 3 ? 'Bị từ chối' : ''}
                        </Text>
                        <FontAwesomeIcon style={
                           KYCType == 0 ? {color: 'rgba(255,255,255,0.5)'} : 
                           KYCType == 1 ? {color: 'green'} :  
                           KYCType == 2 ? {color: 'rgba(255,255,255,0.5)'} : 
                           KYCType == 3 ?  {color: 'red'} : {color: 'rgba(255,255,255,0.5)'}} icon={faAngleRight}/>
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