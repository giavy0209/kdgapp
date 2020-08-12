import React, { useState, useCallback , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux'
import {actChangeUserData,actChangeLoginStatus,asyncLogin} from '../../store/actions'
import { View, TextInput, Text,  TouchableOpacity,Alert,Image} from 'react-native';
import {mainStyles as styles} from '../../styles/'
import logo from '../../assets/images/logo.png'

import {transition} from '../../helper'
export default function App({navigation}) {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [EmailFocus, setEmailFocus] = useState(false)
    const [EmailTextPosition, setEmailTextPosition] = useState(11)
    const [EmailTextSize, setEmailTextSize] = useState(15)

    const [Password, setPassword] = useState("")
    const [PasswordFocus, setPasswordFocus] = useState(false)
    const [PasswordTextPosition, setPasswordTextPosition] = useState(11)
    const [PasswordTextSize, setPasswordTextSize] = useState(15)

    const [IsShowPassword, setIsShowPassword] = useState(false)
    const [InputPasswordHeight, setInputPasswordHeight] = useState(0)
    const [InputPasswordEyeHeight, setInputPasswordEyeHeight] = useState(0)

    useEffect(()=>{
        if(EmailFocus){
            transition(300, 11,36,setEmailTextPosition)
            transition(300, 15,12,setEmailTextSize)
        }else{
            transition(300, 36,11,setEmailTextPosition)
            transition(300, 12,15,setEmailTextSize)
        }
    },[EmailFocus])

    useEffect(()=>{
        if(PasswordFocus){
            transition(300, 11,36,setPasswordTextPosition)
            transition(300, 15,12,setPasswordTextSize)
        }else{
            transition(300, 36,11,setPasswordTextPosition)
            transition(300, 12,15,setPasswordTextSize)
        }
    },[PasswordFocus])

    const login = useCallback(() => {
        dispatch(asyncLogin({email: Email, password: Password}))
        .then(()=>{
            
        })
        .catch(console.log)
    }, [Email, Password])

    const ToggleShowPassword = useCallback(() => {
        setIsShowPassword(!IsShowPassword)
    }, [IsShowPassword])

    return (
        <View style={[styles.container, {paddingHorizontal: 30,paddingTop: 110}]}>
            <Image source={logo} style={styles.logo}></Image>
            <Text style={styles.title}>Xin Chào</Text>
            <Text style={styles.subTitle}>Đăng nhập để tiếp tục</Text>
            <View style={[styles.formBlock, {marginTop: 42}]}>
                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: EmailTextPosition , fontSize: EmailTextSize}, EmailFocus && {color: '#8a8c8e'}]}>Email</Text>
                    <TextInput 
                    onFocus={()=>{Email !== '' || !EmailFocus && setEmailFocus(true)}} 
                    onBlur={()=>{Email ==='' && setEmailFocus(false)}} 
                    onChangeText={value => setEmail(value)} 
                    value={Email} 
                    style={styles.input} />
                </View>
                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: PasswordTextPosition , fontSize: PasswordTextSize}, PasswordFocus && {color: '#8a8c8e'}]}>Nhập mật khẩu</Text>
                    <TextInput 
                    onFocus={()=>{Password !== '' || !PasswordFocus && setPasswordFocus(true)}} 
                    onBlur={()=>{Password === '' && setPasswordFocus(false)}}
                    onLayout={e => setInputPasswordHeight(e.nativeEvent.layout.height)} 
                    onChangeText={value => setPassword(value)} 
                    value={Password} 
                    style={styles.input} 
                    secureTextEntry={!IsShowPassword} 
                    />
                    <TouchableOpacity
                    onLayout={e => setInputPasswordEyeHeight(e.nativeEvent.layout.height)}
                    onPress={ToggleShowPassword}
                    style={[styles.showPasswordButton,{top: (InputPasswordHeight / 2) - (InputPasswordEyeHeight / 2),}]}
                    >
                        <FontAwesomeIcon style={styles.eyeStyle} icon={IsShowPassword ? faEye : faEyeSlash}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={login}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.groupText,{justifyContent: 'space-between', marginTop: 24}]}>
                <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}><Text style={[styles.linkText, {color: '#fff'}]}>Quên mật khẩu?</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.replace('Reg')}><Text style={[styles.linkText], {color: '#fac800'}}>Đăng ký</Text></TouchableOpacity>
            </View>
        </View>
    );
}

