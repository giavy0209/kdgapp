import React, { useState, useCallback , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import {ROUTERS} from '../../routers'
import {actChangeUserData,actChangeLoginStatus,asyncLogin, actChangeRouters} from '../../store/actions'
import { View, TextInput, Text,  TouchableOpacity ,Image, ActivityIndicator} from 'react-native';
import {mainStyles as styles} from '../../styles/'
import logo from '../../assets/images/logo.png'
import { useRoute } from '@react-navigation/native'
import {transition, storage, checkLanguage} from '../../helper'
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../store';
export default function App({navigation}) {
    const dispatch = useDispatch()
    const [Error, setError] = useState(<Text></Text>);
    const [Email, setEmail] = useState('')
    const [EmailValidate, setEmailValidate] = useState(<Text></Text>)
    const [EmailFocus, setEmailFocus] = useState(false)
    const [EmailTextPosition, setEmailTextPosition] = useState(11)
    const [EmailTextSize, setEmailTextSize] = useState(15)

    const language = useSelector(state => state.language)

    const [Password, setPassword] = useState('')
    const [PasswordValidate, setPasswordValidate] = useState(<Text></Text>)
    const [PasswordFocus, setPasswordFocus] = useState(false)
    const [PasswordTextPosition, setPasswordTextPosition] = useState(11)
    const [PasswordTextSize, setPasswordTextSize] = useState(15)

    const [IsShowPassword, setIsShowPassword] = useState(false)
    const [InputPasswordHeight, setInputPasswordHeight] = useState(0)
    const [InputPasswordEyeHeight, setInputPasswordEyeHeight] = useState(0)

    const [Loading, setLoading] = useState(false);
    
    const route = useRoute();
    const { email_params } = route.params ?? {};


    
    useEffect(() => {
        if(email_params ){
            setEmailFocus(true);
            setEmailValidate(null);
            setEmail(email_params)
        }
    },[])
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



// --------------------Validation------------------------
    const validateEmail = (val) => {
        setEmail(val);
        setError(null);
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(val.match(mailformat)){
            setEmailValidate(null)
        }else{
            setEmailValidate(
                <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>{checkLanguage({vi: 'Email không hợp lệ', en: 'Invalid email'},language)}</Text>
            )
        }
    }

    const validatePassword = (val) => {
        setPassword(val);
        setError(null);
        var passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&.,]{8,}$/;
        if(val.match(passwordFormat)){
            setPasswordValidate(null)
        }else{
            setPasswordValidate(
                <Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>{checkLanguage({vi: 'Ít nhất 8 ký tự, bao gồm chữ và số', en: `At least 8 digits, include word and number`},language)}</Text>
            )
        }
    }
// ------------------------------------------------------

    const login = useCallback(() => {
        setLoading(true)
        if(EmailValidate === null && PasswordValidate === null){
            dispatch(asyncLogin({email: Email, password: Password}))
            .then((res)=>{
                console.log(res)
                if(res.status === 103){
                    setLoading(false)
                    setError(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>{checkLanguage({vi: 'Email và mật khẩu không đúng', en: `Email or password incorrect`},language)}</Text>)
                    return;
                }
                if(res.status === 104){
                    setLoading(false)
                    setError(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>{checkLanguage({vi: 'Email và mật khẩu không đúng', en: `Email or password incorrect`},language)}</Text>)
                    return;
                }
                if(res.status === 1){
                    setLoading(false)
                    
                    navigation.replace('Main');

                    return
                }
                setLoading(false)
                setError(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>{checkLanguage({vi: 'Đã có lỗi xảy ra', en: `An error has occurred`},language)}</Text>)
            })
            

        }
       
    }, [Email, Password])

    const ToggleShowPassword = useCallback(() => {
        setIsShowPassword(!IsShowPassword)
    }, [IsShowPassword])

    console.log(store.getState())

    return (
        <View style={[styles.container, {paddingHorizontal: 30,paddingTop: 110}]}>
            <Image source={logo} style={styles.logo}></Image>
            <Text style={styles.title}>{checkLanguage({vi: 'Xin chào', en: `Hello`},language)}</Text>
            <Text style={styles.subTitle}>{checkLanguage({vi: 'Đăng nhập để tiếp tục', en: `Log in to continue`},language)}</Text>
            <View style={[styles.formBlock, {marginTop: 42}]}>
                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: EmailTextPosition , fontSize: EmailTextSize}, EmailFocus && {color: '#8a8c8e'}]}>Email</Text>
                    <TextInput 
                    autoCapitalize="none"
                    onFocus={()=>{Email !== '' || !EmailFocus && setEmailFocus(true)}} 
                    onBlur={()=>{Email ==='' && setEmailFocus(false)}} 
                    // onChangeText={value => setEmail(value)} 
                    onChangeText={value => validateEmail(value)}
                    value={Email} 
                    style={styles.input} />
                   
                </View>
                <View style={{padding: 5}}>
                   {EmailValidate ? EmailValidate : Error}
                </View>
                <View style={styles.inputBlock}>
                    <Text style={[styles.placeHolderText,{bottom: PasswordTextPosition , fontSize: PasswordTextSize}, PasswordFocus && {color: '#8a8c8e'}]}>{checkLanguage({vi: 'Mật khẩu', en: `Password`},language)}</Text>
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
                    style={[styles.showPasswordButton,{top: (InputPasswordHeight / 2) - (InputPasswordEyeHeight / 2), padding: 15}]}
                    >   
                        <FontAwesomeIcon style={styles.eyeStyle} icon={IsShowPassword ? faEye : faEyeSlash}/>
                    </TouchableOpacity>
                </View>
                <View style={{padding: 5}}>
                   {PasswordValidate}
                </View>
                <TouchableOpacity
                    disabled={(EmailValidate === null && PasswordValidate === null && Loading === false) ? false : true}
                    onPress={login}
                    style={{...styles.button, ...{opacity: (EmailValidate === null && PasswordValidate === null && Loading === false) ? 1 : 0.5}}}
                >
                   {  Loading === true ?  <ActivityIndicator size="small" color="#fff" />
                    : <Text style={styles.buttonText}>{checkLanguage({vi: 'Đăng nhập', en: `Login`},language)}</Text>}
                </TouchableOpacity>
            </View>
            <View style={[styles.groupText,{justifyContent: 'space-between', marginTop: 24}]}>
                <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}><Text style={[styles.linkText, {color: '#fac800'}]}>{checkLanguage({vi: 'Quên mật khẩu?', en: `Forgot password?`},language)}</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.replace('Reg')}><Text style={[styles.linkText], {color: '#fac800'}}>{checkLanguage({vi: 'Đăng ký', en: `Register`},language)}</Text></TouchableOpacity>
            </View>
        </View>
    );
}

