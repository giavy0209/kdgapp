import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput,Image, Alert } from 'react-native'

import {Header2} from '../../../Header'
import { mainStyles } from '../../../../styles'
import LockIcon from '../../../../assets/images/lock-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import { storage } from '../../../../helper'
import { asyncChangePassword } from '../../../../store/actions'
import { useDispatch } from 'react-redux'

export default function App(){
    const screenHeight = useSelector(state=>state.height)
    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const [ButtonHeight, setButtonHeight] = useState(0)
    const dispatch = useDispatch()
    const [OldPass, setOldPass] = useState('')
    const [OldPassValidate, setOldPassValidate] = useState(<Text></Text>);
    const [OldPassVisible, setOldPassVisible] = useState(false)
    const [NewPass, setNewPass] = useState('')
    const [NewPassValidate, setNewPassValidate] = useState(<Text></Text>);
    const [NewPassVisible, setNewPassVisible] = useState(false)
    const [ReNewPass, setReNewPass] = useState('')
    const [ReNewPassValidate, setReNewPassValidate] = useState(<Text></Text>)
    const [ReNewPassVisible, setReNewPassVisible] = useState(false)

    
    const [CheckValidate, setCheckValidate] = useState(false);

    const handleChangePass = useCallback(async ()=>{
        var userinfo = await storage('_id').getItem();

        dispatch(asyncChangePassword({id: userinfo._id, old_password: OldPass, new_password: NewPass}))
        .then((res)=>{
            // if(res.status === 100 && res.msg === 'email is registed'){
            //     setEmailValidate(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Email đã được đăng ký</Text>)
            //     return
            // }
            if(res.status === 100 && res.msg === 'wrong old password'){
                setOldPassValidate(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mật khẩu cũ không đúng</Text>)
                return
            }
            if(res.status === 1 && res.msg === 'change password success'){
                Alert.alert(
                    "Đăng ký",
                    "Đồng ý với điều khoản ....",
                )
                return
            }
            console.log(res);
        })
        .catch(console.log)
    },[OldPass, NewPass, ReNewPass])


    // --------------------Validation------------------------

    const validateOldPassword = (val) => {
        setOldPass(val);
        var passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        if(val.match(passwordFormat)){
            setOldPassValidate(null)
        }else{
            setOldPassValidate(
                <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mật khẩu phải ít nhất 8 ký tự cả chữ và số</Text>
            )
        }
    }
    const validateNewPassword = (val) => {
        setNewPass(val);
        var passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        if(val.match(passwordFormat)){
            setNewPassValidate(null)
        }else{
            setNewPassValidate(
                <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mật khẩu phải ít nhất 8 ký tự cả chữ và số</Text>
            )
        }
    }
    const validateReNewPassword = (val) => {
        setReNewPass(val);
        if(val === NewPass){
            setReNewPassValidate(null)
        }else{
            setReNewPassValidate(
                <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mật khẩu không khớp</Text>
            )
        }
    }
    useEffect(()=>{
        if(
           NewPassValidate === null && 
           ReNewPassValidate === null){
               setCheckValidate(true)
           }else{
               setCheckValidate(false)
           }
    },[NewPassValidate, ReNewPassValidate ])
// ------------------------------------------------------
    
    return (
        <>
            <Header2 setHeight={setHeight} title="Thay đổi mật khẩu"/>
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 8}]}>
                <Text style={{color: '#ddd9d8', fontSize: 14}}> Để cập nhật mật khẩu, đầu tiên nhập mật khẩu hiện tại của bạn và sau đó nhập mật khẩu mới 2 lần</Text>
                <Text style={{marginTop: 28, color: '#8a8c8e' ,fontSize: 13}}>Mật khẩu hiện tại</Text>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'flex-start', alignContent: 'center',marginTop: 8,position: 'relative'}}>
                    <View style={{width:46,backgroundColor: '#333f57',height: '100%', alignItems:'center', alignContent: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                        <Image source={LockIcon} />
                    </View>
                    <TextInput 
                    secureTextEntry={!OldPassVisible} 
                    value={OldPass} 
                    onChangeText={value => validateOldPassword(value)} 
                    placeholder='Mật khẩu hiện tại'
                    style={{paddingVertical: 5, borderTopRightRadius:5,borderBottomRightRadius: 5,flex: 1,width: '100%', paddingHorizontal: 13,paddingLeft: 9, paddingRight: 40, color: '#ddd9d8', fontSize: 14 ,backgroundColor: '#2e394f',}}/>
                    <TouchableOpacity onPress={()=>setOldPassVisible(!OldPassVisible)} style={{position: 'absolute', right: 16, top: '50%', transform: [{translateY: -8}]}}><FontAwesomeIcon color='#8a8c8e' icon={OldPassVisible ? faEye : faEyeSlash} /></TouchableOpacity>
   
                </View>
                <View style={{padding: 2}}>
                        {OldPassValidate}
                </View>
                <Text style={{marginTop: 22, color: '#8a8c8e' ,fontSize: 13}}>Mật khẩu mới</Text>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'flex-start', alignContent: 'center',marginTop: 8,position: 'relative'}}>
                    <View style={{width:46,backgroundColor: '#333f57',height: '100%', alignItems:'center', alignContent: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                        <Image source={LockIcon} />
                    </View>
                    <TextInput 
                    secureTextEntry={!NewPassVisible} 
                    value={NewPass} 
                    onChangeText={value => validateNewPassword(value)} 
                    placeholder='Mật khẩu mới'
                    style={{paddingVertical: 5, borderTopRightRadius:5,borderBottomRightRadius: 5,flex: 1,width: '100%', paddingHorizontal: 13,paddingLeft: 9, paddingRight: 40, color: '#ddd9d8', fontSize: 14 ,backgroundColor: '#2e394f',}}/>
                    <TouchableOpacity onPress={()=>setNewPassVisible(!NewPassVisible)} style={{position: 'absolute', right: 16, top: '50%', transform: [{translateY: -8}]}}><FontAwesomeIcon color='#8a8c8e' icon={NewPassVisible ? faEye : faEyeSlash} /></TouchableOpacity>
                </View>
                <View style={{padding: 2}}>
                        {NewPassValidate}
                </View>
                <Text style={{marginTop: 22, color: '#8a8c8e' ,fontSize: 13}}>Xác nhận mật khẩu</Text>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'flex-start', alignContent: 'center',marginTop: 8,position: 'relative'}}>
                    <View style={{width:46,backgroundColor: '#333f57',height: '100%', alignItems:'center', alignContent: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                        <Image source={LockIcon} />
                    </View>
                    <TextInput 
                    secureTextEntry={!ReNewPassVisible} 
                    value={ReNewPass} 
                    onChangeText={value => validateReNewPassword(value)} 
                    placeholder='Xác nhận mật khẩu'
                    style={{paddingVertical: 5, borderTopRightRadius:5,borderBottomRightRadius: 5,flex: 1,width: '100%', paddingHorizontal: 13,paddingLeft: 9, paddingRight: 40, color: '#ddd9d8', fontSize: 14 ,backgroundColor: '#2e394f',}}/>
                    <TouchableOpacity onPress={()=>setReNewPassVisible(!ReNewPassVisible)} style={{position: 'absolute', right: 16, top: '50%', transform: [{translateY: -8}]}}><FontAwesomeIcon color='#8a8c8e' icon={ReNewPassVisible ? faEye : faEyeSlash} /></TouchableOpacity>
                </View>
                <View style={{padding: 2}}>
                        {ReNewPassValidate}
                </View>
            </View>
            <TouchableOpacity
            onLayout={e => setButtonHeight(e.nativeEvent.layout.height)}
            onPress={handleChangePass}
            disabled={CheckValidate ? false : true}
            style={{
                marginTop: screenHeight - Height - ContentHeight - ButtonHeight - 23,
                marginHorizontal:11,
                borderRadius: 5,
                overflow:'hidden',
                opacity: CheckValidate ? 1 : 0.5
            }}
            >
                <LinearGradient
                start={[0,1]}
                end={[1,0]}
                colors={['#e5be50', '#ecda8b', '#a47b00']}
                style={{paddingVertical: 15}}
                >
                    <Text style={{textAlign: 'center', color: '#111b2d'}}>THAY ĐỔI MẬT KHẨU</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}