import React, { useState, useCallback,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ScrollView, View, TextInput, Text, TouchableOpacity,Alert,ImageBackground, Image , Linking} from 'react-native';
import {mainStyles as styles} from '../../styles/'
import { useDispatch } from 'react-redux'
import {transition} from '../../helper'

import {Header1} from '../Header'
import { asyncForgotPassword, asynForgotPasswordCode } from '../../store/actions'
import Popup from '../Popup/Popup'
export default function App({ navigation }) {


    const [PopupStatus, setPopupStatus] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
      setTimeout(function(){ 
        setModalVisible(false);
       }, 1000);
    };
    const [ToggleCheckBox, setToggleCheckBox] = useState(false)
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [EmailValidate, setEmailValidate] = useState(<Text></Text>)
    const [EmailFocus, setEmailFocus] = useState(false)
    const [EmailTextPosition, setEmailTextPosition] = useState(11)
    const [EmailTextSize, setEmailTextSize] = useState(15)

    const [EmailCode, setEmailCode] = useState("")
    const [EmailCodeValidate, setEmailCodeValidate] = useState(<Text></Text>)
    const [EmailCodeFocus, setEmailCodeFocus] = useState(false)
    const [EmailCodeTextPosition, setEmailCodeTextPosition] = useState(11)
    const [EmailCodeTextSize, setEmailCodeTextSize] = useState(15)

    const [Password, setPassword] = useState("")
    const [PasswordValidate, setPasswordValidate] = useState(<Text></Text>)
    const [PasswordFocus, setPasswordFocus] = useState(false)
    const [PasswordTextPosition, setPasswordTextPosition] = useState(11)
    const [PasswordTextSize, setPasswordTextSize] = useState(15)

    const [RePassword, setRePassword] = useState("")
    const [RePasswordValidate, setRePasswordValidate] = useState(<Text></Text>)
    const [RePasswordFocus, setRePasswordFocus] = useState(false)
    const [RePasswordTextPosition, setRePasswordTextPosition] = useState(11)
    const [RePasswordTextSize, setRePasswordTextSize] = useState(15)

    const [IsShowPassword, setIsShowPassword] = useState(false)
    const [InputPasswordHeight, setInputPasswordHeight] = useState(0)
    const [InputPasswordEyeHeight, setInputPasswordEyeHeight] = useState(0)

    const [CheckValidate, setCheckValidate] = useState(false);
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

// -------------------Timmer--------------------------

    const [seconds, setSeconds] = useState(0)

  
    function updateTime() {
        if (seconds == 0) {
          console.log("xong")
        } else {
          setSeconds(seconds => seconds - 1);
        }
    }

// ------------------------------------------------

    useEffect(() => {

        const token = setTimeout(updateTime, 1000)

        return function cleanUp() {
        clearTimeout(token);
        }
    },[seconds])


    const resetPassword = useCallback(() => {
        // console.log(Email);
        dispatch(asyncForgotPassword({email: Email, forgot_password_code: EmailCode, new_password : Password}))
        .then((res)=>{
            console.log(res)
            // if(res.status === 0){
            //     setEmailCodeValidate(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mã xác minh không đúng</Text>)
            //     return
            // }
            // if(res.status === 1){
            //     navigation.replace('Login', {
            //         email_params: Email
            //     })
            // }
            if(res.status === 0 && res.msg === 'forgot passsword code is wrong'){
                Alert.alert(
                    "Reset mật khẩu",
                    "Mã xác nhận không đúng",
                )
                return
            }
            if(res.status === 0 && res.msg === 'email (forgot password code) is not exist'){
                Alert.alert(
                    "Reset mật khẩu",
                    "Email không tồn tại",
                )
                return
            }
            if(res.status === 1){
                navigation.replace('Login', {
                    email_params: Email
                })
            }
        })
        .catch(console.log)
        
       
    }, [ToggleCheckBox, Email, EmailCode, Password, RePassword])
  

    const reqMailCode = useCallback(()=>{
        dispatch(asynForgotPasswordCode({email: Email}))

        .then((res)=>{
            if(res.status === 0 && res.err === 'no find user'){
                setEmailValidate(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Email không tồn tại</Text>)
                return
            }
            console.log(res);
            if(res.status === 1){
                setSeconds(120);
                setPopupStatus(true)
                toggleModal()
                return
            }

            if(res.status === 100 && res.err === 'you wait 2 minute to resend code'){
                setPopupStatus(false)
                toggleModal()
                return
            }
            console.log(res);
        })
        .catch(console.log)

    },[Email])

// --------------------Validation------------------------
const validateEmail = (val) => {
    setSeconds(0)
    setEmail(val);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(val.match(mailformat)){
        setEmailValidate(null)
    }else{
        setEmailValidate(
            <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Email không hợp lệ</Text>
        )
    }
}
const validatePassword = (val) => {
    setPassword(val);
    var passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if(val.match(passwordFormat)){
        setPasswordValidate(null)
    }else{
        setPasswordValidate(
            <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mật khẩu phải ít nhất 8 ký tự cả chữ và số</Text>
        )
    }
}
const validateRePassword = (val) => {
    setRePassword(val);
    if(val === Password){
        setRePasswordValidate(null)
    }else{
        setRePasswordValidate(
            <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mật khẩu không khớp</Text>
        )
    }
}
const validateEmailCode = (val) => {
    setEmailCode(val)
    var EmailCodeFormat = /^\d{6}$/
    if(val.match(EmailCodeFormat)){
        setEmailCodeValidate(null)
    }else{
        setEmailCodeValidate(
            <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mã xác minh không hợp lệ</Text>
        )
    }
}
useEffect(()=>{
    if(EmailValidate === null && 
       EmailCodeValidate === null && 
       PasswordValidate === null && 
       RePasswordValidate === null){
           setCheckValidate(true)
       }else{
           setCheckValidate(false)
       }
},[EmailValidate, EmailCodeValidate, PasswordValidate, RePasswordValidate ])
// ------------------------------------------------------

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
                    onChangeText={(value) => validateEmail(value)} 
                    value={Email} 
                    autoCapitalize = 'none'
                    style={styles.input} />
                </View>
                <View style={{padding: 2}}>
                   {EmailValidate}
                </View>
                <Popup type={PopupStatus === true ? 'success' : 'failed'} title={PopupStatus === true ? 'Lấy mã thành công' : 'Vui lòng chờ 2 phút để gửi lại'} isModalVisible={isModalVisible}/>
                <View style={[styles.inputBlock]}>
                    <Text style={[styles.placeHolderText,{bottom: EmailCodeTextPosition , fontSize: EmailCodeTextSize}, EmailCodeFocus && {color: '#8a8c8e'}]}>Mã xác minh Email</Text>
                    <TextInput 
                    onFocus={()=>{EmailCode !== '' || !EmailCodeFocus && setEmailCodeFocus(true)}} 
                    onBlur={()=>{EmailCode ==='' && setEmailCodeFocus(false)}} 
                    onChangeText={value => validateEmailCode(value)} 
                    value={EmailCode} 
                    style={[styles.input,{width: '84%'}]} />
                    <TouchableOpacity style={{width: 70}} disabled={EmailValidate === null && seconds === 0 ? false : true} onPress={reqMailCode}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', opacity: EmailValidate === null  && seconds === 0 ? 1 : 0.5, backgroundColor: '#fac800', borderRadius: 10, alignItems: 'center', padding: 3}}>
                            <Text style={{color: 'rgba(255,255,255,0.8)', paddingLeft: 5}}>Lấy mã</Text>
                            <Text style={{color: 'rgba(255,255,255,0.8)', paddingHorizontal: 5}}>{seconds === 0 ? null : seconds}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{padding: 2}}>
                   {EmailCodeValidate}
                </View>
                <View style={[styles.inputBlock,{flexDirection: 'column'}]}>
                    <View style={[styles.inputBlock, {marginTop: 0}]}>
                        <Text style={[styles.placeHolderText,{bottom: PasswordTextPosition , fontSize: PasswordTextSize}, PasswordFocus && {color: '#8a8c8e'}]}>Mật khẩu mới</Text>
                        <TextInput 
                        onFocus={()=>{Password !== '' || !PasswordFocus && setPasswordFocus(true)}} 
                        onBlur={()=>{Password === '' && setPasswordFocus(false)}}
                        onLayout={e => setInputPasswordHeight(e.nativeEvent.layout.height)} 
                        onChangeText={value => validatePassword(value)} 
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
                    <View style={{padding: 2, alignSelf: 'flex-start'}}>
                        {PasswordValidate}
                    </View>
                    <Text style={{fontSize: 13, fontFamily: 'Roboto_300Light_Italic', fontStyle: 'italic', color: '#8a8c8e', paddingLeft:8}}>Từ 8 - 20 ký tự, phải bao gồm chữ, số, ký tự và ít nhất một chữ viết hoa</Text>
                </View>

                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: RePasswordTextPosition , fontSize: RePasswordTextSize}, RePasswordFocus && {color: '#8a8c8e'}]}>Xác nhận mật khẩu</Text>
                    <TextInput 
                    onFocus={()=>{RePassword !== '' || !RePasswordFocus && setRePasswordFocus(true)}} 
                    onBlur={()=>{RePassword ==='' && setRePasswordFocus(false)}} 
                    onChangeText={value => validateRePassword(value)} 
                    value={RePassword} 
                    style={styles.input}
                    secureTextEntry={!IsShowPassword}  />
                    <TouchableOpacity
                    onLayout={e => setInputPasswordEyeHeight(e.nativeEvent.layout.height)}
                    onPress={ToggleShowPassword}
                    style={[styles.showPasswordButton,{top: (InputPasswordHeight / 2) - (InputPasswordEyeHeight / 2),}]}
                    >
                        <FontAwesomeIcon style={styles.eyeStyle} icon={IsShowPassword ? faEye : faEyeSlash}/>
                    </TouchableOpacity>
                </View>
                <View style={{padding: 2}}>
                    {RePasswordValidate}
                </View>
                <TouchableOpacity disabled={CheckValidate ? false : true} style={[styles.button, {opacity: CheckValidate ? 1 : 0.5}]}  onPress={resetPassword}>
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

