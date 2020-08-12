import React, { useState, useCallback,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ScrollView, View, TextInput, Text, TouchableOpacity,Alert,ImageBackground, Image , Linking} from 'react-native';
import {mainStyles as styles} from '../../styles/'
import calAPI from '../../axios'
import bg from '../../assets/images/bg.jpg'
import {transition} from '../../helper'

import {Header1} from '../Header'
export default function App({ navigation }) {

    const [ToggleCheckBox, setToggleCheckBox] = useState(false)

    const [Email, setEmail] = useState("")
    const [EmailFocus, setEmailFocus] = useState(false)
    const [EmailTextPosition, setEmailTextPosition] = useState(11)
    const [EmailTextSize, setEmailTextSize] = useState(15)

    const [EmailCode, setEmailCode] = useState("")
    const [EmailCodeFocus, setEmailCodeFocus] = useState(false)
    const [EmailCodeTextPosition, setEmailCodeTextPosition] = useState(11)
    const [EmailCodeTextSize, setEmailCodeTextSize] = useState(15)

    const [Password, setPassword] = useState("")
    const [PasswordFocus, setPasswordFocus] = useState(false)
    const [PasswordTextPosition, setPasswordTextPosition] = useState(11)
    const [PasswordTextSize, setPasswordTextSize] = useState(15)

    const [RePassword, setRePassword] = useState("")
    const [RePasswordFocus, setRePasswordFocus] = useState(false)
    const [RePasswordTextPosition, setRePasswordTextPosition] = useState(11)
    const [RePasswordTextSize, setRePasswordTextSize] = useState(15)

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
        if(EmailCodeFocus){
            transition(300, 11,36,setEmailCodeTextPosition)
            transition(300, 15,12,setEmailCodeTextSize)
        }else{
            transition(300, 36,11,setEmailCodeTextPosition)
            transition(300, 12,15,setEmailCodeTextSize)
        }
    },[EmailCodeFocus])

    useEffect(()=>{
        if(PasswordFocus){
            transition(300, 11,36,setPasswordTextPosition)
            transition(300, 15,12,setPasswordTextSize)
        }else{
            transition(300, 36,11,setPasswordTextPosition)
            transition(300, 12,15,setPasswordTextSize)
        }
    },[PasswordFocus])

    useEffect(()=>{
        if(RePasswordFocus){
            transition(300, 11,36,setRePasswordTextPosition)
            transition(300, 15,12,setRePasswordTextSize)
        }else{
            transition(300, 36,11,setRePasswordTextPosition)
            transition(300, 12,15,setRePasswordTextSize)
        }
    },[RePasswordFocus])

    const getPassword = useCallback(async () => {
        if(Password !== RePassword){
            Alert.alert(
                "Đăng ký",
                "Nhập lại mật khẩu không khớp với mật khẩu đã nhập",
            )
            return;
        }
        if(!ToggleCheckBox){
            Alert.alert(
                "Đăng ký",
                "Đồng ý với điều khoản ....",
            )
            return;
        }
        try {
            const res = await calAPI.post('/api/user',{email: Email, password: Password})
            console.log(res.data);
        } catch (error) {
            if(error.response.status === 401){
                Alert.alert(
                    "Đăng ký",
                    "Email không hợp lệ",
                )
            }
        }
        
    }, [ToggleCheckBox, Email, EmailCode, Password, RePassword])

    const reqMailCode = useCallback(async ()=>{

    },[Email])

    const ToggleShowPassword = useCallback(() => {
        setIsShowPassword(!IsShowPassword)
    }, [IsShowPassword])

    return (
        <View style={[styles.container]}>
            <Header1 title="Quên mật khẩu"/>
            <View style={[styles.formBlock,{paddingHorizontal: 30, paddingTop: 60}]}>
                <View style={[styles.inputBlock, {marginTop: 0}]}>
                    <Text style={[styles.placeHolderText,{bottom: EmailTextPosition , fontSize: EmailTextSize}, EmailFocus && {color: '#8a8c8e'}]}>Email</Text>
                    <TextInput 
                    onFocus={()=>{Email !== '' || !EmailFocus && setEmailFocus(true)}} 
                    onBlur={()=>{Email ==='' && setEmailFocus(false)}} 
                    onChangeText={value => setEmail(value)} 
                    value={Email} 
                    style={styles.input} />
                </View>

                <View style={[styles.inputBlock]}>
                    <Text style={[styles.placeHolderText,{bottom: EmailCodeTextPosition , fontSize: EmailCodeTextSize}, EmailCodeFocus && {color: '#8a8c8e'}]}>Mã xác minh Email</Text>
                    <TextInput 
                    onFocus={()=>{EmailCode !== '' || !EmailCodeFocus && setEmailCodeFocus(true)}} 
                    onBlur={()=>{EmailCode ==='' && setEmailCodeFocus(false)}} 
                    onChangeText={value => setEmailCode(value)} 
                    value={EmailCode} 
                    style={[styles.input,{width: '84%'}]} />
                    <TouchableOpacity style={{width: 50}} onPress={reqMailCode}><Text style={[{color: '#fac800', opacity: 0.4},Email !=='' && {opacity: 1}]}>Lấy mã</Text></TouchableOpacity>
                </View>

                <View style={[styles.inputBlock,{flexDirection: 'column'}]}>
                    <View style={[styles.inputBlock, {marginTop: 0}]}>
                        <Text style={[styles.placeHolderText,{bottom: PasswordTextPosition , fontSize: PasswordTextSize}, PasswordFocus && {color: '#8a8c8e'}]}>Mật khẩu mới</Text>
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
                    <Text style={{fontSize: 13, fontFamily: 'Roboto_300Light_Italic', fontStyle: 'italic', color: '#8a8c8e', paddingLeft:8}}>Từ 8 - 20 ký tự, phải bao gồm chữ, số, ký tự và ít nhất một chữ viết hoa</Text>
                </View>

                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: RePasswordTextPosition , fontSize: RePasswordTextSize}, RePasswordFocus && {color: '#8a8c8e'}]}>Xác nhận mật khẩu</Text>
                    <TextInput 
                    onFocus={()=>{RePassword !== '' || !RePasswordFocus && setRePasswordFocus(true)}} 
                    onBlur={()=>{RePassword ==='' && setRePasswordFocus(false)}} 
                    onChangeText={value => setRePassword(value)} 
                    value={RePassword} 
                    style={styles.input} />
                </View>

                <TouchableOpacity onPress={getPassword} style={styles.button} >
                    <Text style={styles.buttonText}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.groupText,{justifyContent: 'center', marginTop: 24}]}>
                <Text style={{color: '#8a8c8e'}}>Đã nhớ mật khẩu?</Text>
                <TouchableOpacity onPress={()=>navigation.replace('Login')}><Text style={[styles.linkText], {color: '#fac800'}}>  Đăng nhập</Text></TouchableOpacity>
            </View>
        </View>
    );
}

