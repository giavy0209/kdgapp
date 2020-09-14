import React, { useState, useCallback,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { View, TextInput, Text, TouchableOpacity,Alert, Image , Linking} from 'react-native';
import {mainStyles as styles} from '../../styles/'
import { useDispatch } from 'react-redux'
import calAPI from '../../axios'
import ticker from '../../assets/images/ticker.png'
import {transition} from '../../helper'
import {asyncReg, asyncRegisterCode} from '../../store/actions'


export default function App({ navigation }) {

    const dispatch = useDispatch()
    const [ToggleCheckBox, setToggleCheckBox] = useState(false)

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

    const [RefCode, setRefCode] = useState("")
    const [RefCodeFocus, setRefCodeFocus] = useState(false)
    const [RefCodeTextPosition, setRefCodeTextPosition] = useState(11)
    const [RefCodeTextSize, setRefCodeTextSize] = useState(15)
    
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

    useEffect(()=>{
        if(RefCodeFocus){
            transition(300, 11,36,setRefCodeTextPosition)
            transition(300, 15,12,setRefCodeTextSize)
        }else{
            transition(300, 36,11,setRefCodeTextPosition)
            transition(300, 12,15,setRefCodeTextSize)
        }
    },[RefCodeFocus])

// --------------------Validation------------------------
    const validateEmail = (val) => {
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
    const reg = useCallback(() => {
        console.log(Email);
        if(!ToggleCheckBox){
            Alert.alert(
                "Đăng ký",
                "Đồng ý với điều khoản ....",
            )
            return;
        }
        dispatch(asyncReg({email: Email, password: Password, parent_ref_code: RefCode, register_code : EmailCode}))
        .then((res)=>{
            console.log(res)
            if(res.status === 0){
                setEmailCodeValidate(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Mã xác minh không đúng</Text>)
                return
            }
            if(res.status === 1){
                navigation.replace('Login', {
                    email_params: Email
                })
            }
        })
        .catch(console.log)
        
       
    }, [ToggleCheckBox, Email, EmailCode, Password, RePassword, RefCode])
 
    const reqMailCode = useCallback(()=>{
            dispatch(asyncRegisterCode({email: Email}))

            .then((res)=>{
                if(res.status === 100 && res.msg === 'email is registed'){
                    setEmailValidate( <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>Email đã được đăng ký</Text>)
                    return
                }
            })
            .catch(console.log)

    },[Email])

    const ToggleShowPassword = useCallback(() => {
        setIsShowPassword(!IsShowPassword)
    }, [IsShowPassword])

    return (
        <View style={[styles.container, {paddingTop: 50,paddingHorizontal: 30, paddingBottom:20}]}>
            <Text style={styles.title}>Đăng ký</Text>
            <Text style={styles.subTitle}>Tạo tài khoản mới</Text>
            <View style={styles.formBlock}>
                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: EmailTextPosition , fontSize: EmailTextSize}, EmailFocus && {color: '#8a8c8e'}]}>Email</Text>
                    <TextInput 
                    onFocus={()=>{Email !== '' || !EmailFocus && setEmailFocus(true)}} 
                    onBlur={()=>{Email ==='' && setEmailFocus(false)}} 
                    onChangeText={(value) => validateEmail(value)} 
                    value={Email} 
                    style={styles.input} />
                </View>
                <View style={{padding: 2}}>
                   {EmailValidate}
                </View>
                <View style={[styles.inputBlock]}>
                    <Text style={[styles.placeHolderText,{bottom: EmailCodeTextPosition , fontSize: EmailCodeTextSize}, EmailCodeFocus && {color: '#8a8c8e'}]}>Mã xác minh Email</Text>
                    <TextInput 
                    onFocus={()=>{EmailCode !== '' || !EmailCodeFocus && setEmailCodeFocus(true)}} 
                    onBlur={()=>{EmailCode ==='' && setEmailCodeFocus(false)}} 
                    onChangeText={value => validateEmailCode(value)}
                    value={EmailCode} 
                    style={[styles.input,{width: '84%'}]} />
                    <TouchableOpacity style={{width: 70}} disabled={EmailValidate === null ? false : true} onPress={reqMailCode}>
                        <View style={{ opacity: EmailValidate === null ? 1 : 0.5, backgroundColor: '#fac800', borderRadius: 10, alignItems: 'center', padding: 3}}>
                            <Text style={{color: 'rgba(255,255,255,0.8)'}}>Lấy mã</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{padding: 2}}>
                   {EmailCodeValidate}
                </View>
                <View style={[styles.inputBlock,{flexDirection: 'column'}]}>
                    <View style={[styles.inputBlock, {marginTop: 0}]}>
                        <Text style={[styles.placeHolderText,{bottom: PasswordTextPosition , fontSize: PasswordTextSize}, PasswordFocus && {color: '#8a8c8e'}]}>Mật khẩu</Text>
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
                    <Text style={{fontSize: 13, fontFamily: 'Roboto_300Light_Italic', fontStyle: 'italic', color: '#8a8c8e', paddingLeft:8}}>Từ 8 - 20 ký tự, phải bao gồm chữ, số, ký tự và ít nhất một chữ viết hoa</Text>
                </View>
                <View style={{padding: 2}}>
                   {PasswordValidate}
                </View>
                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: RePasswordTextPosition , fontSize: RePasswordTextSize}, RePasswordFocus && {color: '#8a8c8e'}]}>Xác nhận mật khẩu</Text>
                    <TextInput 
                    onFocus={()=>{RePassword !== '' || !RePasswordFocus && setRePasswordFocus(true)}} 
                    onBlur={()=>{RePassword ==='' && setRePasswordFocus(false)}} 
                    onChangeText={value => validateRePassword(value)} 
                    value={RePassword} 
                    style={styles.input} 
                    secureTextEntry={!IsShowPassword} />
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
                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: RefCodeTextPosition , fontSize: RefCodeTextSize}, RefCodeFocus && {color: '#8a8c8e'}]}>Mã mời (tùy chọn)</Text>
                    <TextInput 
                    onFocus={()=>{RefCode !== '' || !RefCodeFocus && setRefCodeFocus(true)}} 
                    onBlur={()=>{RefCode ==='' && setRefCodeFocus(false)}} 
                    onChangeText={value => setRefCode(value)} 
                    value={RefCode} 
                    style={styles.input} />
                </View>

                <View style={[styles.inputBlock,]}>
                    <TouchableOpacity style={{marginTop: -10}} onPress={()=> setToggleCheckBox(!ToggleCheckBox)}>
                        <View style={[styles.checkBox,ToggleCheckBox && {backgroundColor: '#fac800'}]}><Image style={[styles.checkBoxTick,!ToggleCheckBox && {opacity: 0}]} source={ticker}/></View>
                    </TouchableOpacity>
                    <Text style={{fontSize: 14, color: '#8a8c8e', marginLeft: 6}}>Tôi đồng ý với 
                        <Text 
                        onPress={()=> Linking.openURL('https://google.com')}
                        style={{color: '#005cfc'}}
                        > Chính sách riêng tư | Điều khoản & điều kiện
                        </Text>
                    </Text>
                </View>
                <TouchableOpacity disabled={CheckValidate ? false : true} onPress={reg} style={[styles.button, {opacity: CheckValidate ? 1 : 0.5}]} >
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.groupText,{justifyContent: 'center', marginTop: 24}]}>
                <Text style={{color: '#8a8c8e'}}>Đã có tài khoản?</Text>
                <TouchableOpacity onPress={()=>navigation.replace('Login')}><Text style={[styles.linkText], {color: '#fac800'}}>  Đăng nhập</Text></TouchableOpacity>
            </View>
        </View>
    );
}

