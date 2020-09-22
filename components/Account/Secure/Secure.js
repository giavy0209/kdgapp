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
export default function App(){
    const navigation = useNavigation()
    const [Status2FA, setStatus2FA] = useState(false)
    const [StatusKYC, setStatusKYC] = useState(false)
    const [StatusTypeKYC, setStatusTypeKYC] = useState(0)
    const dispatch = useDispatch();
    useEffect(() => {
        async function getStatus() {
          var userinfo = await storage('_id').getItem();
          dispatch(asyncGetUserbyID(userinfo._id))
          .then((res)=>{
            if(res.data.is2FA){
                setStatus2FA(true);
            }
            if(res.data.kyc == 0){
                setStatusKYC(false)
                setStatusTypeKYC(0)
            }
            if(res.data.kyc == 1){
                setStatusKYC(true)
                setStatusTypeKYC(1)
            }
            if(res.data.kyc == 2){
                setStatusKYC(false)
                setStatusTypeKYC(2)
            }
            if(res.data.kyc == 3){
                setStatusKYC(false);
                setStatusTypeKYC(3)
            }
          })
          .catch(console.log)
        }
    
        getStatus()
      }, [])
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
                    status2FA: Status2FA,
                   
                })}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Cài đặt 2FA</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255,255,255,0.5)'}}>{Status2FA === true ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity 
                disabled={StatusTypeKYC === 0 || StatusTypeKYC === 3 ? false : true}
                onPress={()=>navigation.navigate('KYC')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <View style={accountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: '#ddd9d8'}}>Xác minh danh tính (KYC)</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={StatusTypeKYC === 0 ? {color: 'rgba(255,255,255,0.5)'} : 
                                     StatusTypeKYC === 1 ? {color: 'green'} :  
                                     StatusTypeKYC === 2 ? {color: 'rgba(255,255,255,0.5)'} :  {color: 'red'}} >
                            {StatusTypeKYC === 0 ? 'Chưa xác minh': 
                             StatusTypeKYC === 1 ? 'Đã xác minh'  : 
                             StatusTypeKYC === 2 ? 'Đang chờ duyệt' : 'Bị từ chối'}
                        </Text>
                        <FontAwesomeIcon style={StatusTypeKYC === 0 ? {color: 'rgba(255,255,255,0.5)'} : 
                                     StatusTypeKYC === 1 ? {color: 'green'} :  
                                     StatusTypeKYC === 2 ? {color: 'rgba(255,255,255,0.5)'} :  {color: 'red'}} icon={faAngleRight}/>
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