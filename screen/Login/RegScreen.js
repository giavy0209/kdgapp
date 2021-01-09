import React, { useState } from 'react'
import { Image, Text,  TextInput, View} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react/cjs/react.development'
import eye from '../../assets/images/icons/eye.png'
import eyeClose from '../../assets/images/icons/eyeClose.png'
import callAPI from '../../axios'
import Button from '../../components/Button'
import { asyncHandleToast } from '../../store/actions'
import {useNavigation} from '@react-navigation/native'
export default function App ({setCurrent}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Login ? state.Styles.Login : {})
    const text = useSelector(state => state.Languages && state.Languages.Login ? state.Languages.Login : {})
    
    const [Email, setEmail] = useState(null)
    const [EmailCode, setEmailCode] = useState(null)
    const [Password, setPassword] = useState(null)
    const [HiddenPassword, setHiddenPassword] = useState(true)
    const [RePassword, setRePassword] = useState(null)
    const [RefCode, setRefCode] = useState(null)
    const [IsChecked, setIsChecked] = useState(false)

    const handleReg = useCallback (async () => {
        if(Password !== RePassword) return dispatch(asyncHandleToast(text.not_match , 0))
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email)) return dispatch(asyncHandleToast(text.incorrect_email , 0))
        var res = await callAPI.post('/user' , {
            email : Email,
            email_code : EmailCode,
            password : Password,
            ref_code : RefCode
        })
        if(res.status === 101) return dispatch(asyncHandleToast(text.email_exist , 0))
        if(res.status === 102) return dispatch(asyncHandleToast(text.incorrect_email_code , 0))
        if(res.status === 1) {
            dispatch(asyncHandleToast(text.reg_success))
            setTimeout(() => {
                navigation.push('Login' , {
                    screen : 'Login',
                    email : Email
                })
            }, 1000);
        }
    },[Email , EmailCode , Password, RePassword , RefCode,text,setCurrent])

    const handleGetCode = useCallback(async()=> {
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email)) return dispatch(asyncHandleToast(text.incorrect_email , 0))

        var res = await callAPI.post('/create_code?type=1' , {email : Email})
        if(res.status === 101) return dispatch(asyncHandleToast(text.email_exist, 0))
        if(res.status === 102) return dispatch(asyncHandleToast(text.get_code_2_min, 0))

        if(res.status === 1) return dispatch(asyncHandleToast(text.get_code_success))

    },[Email])

    return (
        <>
            <Text style={styles.loginDes}>
                {text.reg_des}
            </Text>
            <View style={styles.inputContainer}>
                <View style={styles.blockInput}>
                    {Email !== null && <Text style={styles.placeholder}>{text.email}</Text>}
                    <TextInput 
                    keyboardType="email-address"
                    onBlur={()=>Email === '' && setEmail(null)} 
                    onFocus={()=>!Email && setEmail('')} 
                    onChangeText={setEmail} value={Email} style={styles.input} placeholder={Email !== null ? Email : text.email}/>
                </View>
                
                <View style={styles.blockInput}>
                    {EmailCode !== null && <Text style={styles.placeholder}>{text.email_code}</Text>}
                    <TextInput 
                    onBlur={()=>EmailCode === '' && setEmailCode(null)} 
                    onFocus={()=>!EmailCode && setEmailCode('')} 
                    onChangeText={setEmailCode} value={EmailCode} style={styles.input} placeholder={EmailCode !== null ? EmailCode : text.email_code}/>
                    <Button 
                    onPress={handleGetCode}
                    text={text.get_code}
                    style={{
                        Touchable :styles.getcode,
                        Linear : styles.getcodeContainer
                    }}/>
                </View>

                <View style={[styles.blockInput]}>
                    {Password !== null && <Text style={styles.placeholder}>{text.password}</Text>}
                    <TextInput 
                    secureTextEntry={HiddenPassword}
                    onBlur={()=>Password === '' && setPassword(null)} 
                    onFocus={()=>!Password && setPassword('')} 
                    onChangeText={setPassword} value={Password} style={styles.input} placeholder={Password !== null ? Password : text.password}/>
                    <View style={styles.eye}>
                        <TouchableOpacity 
                        onPress={() => setHiddenPassword(!HiddenPassword)}
                        style={[common.fullSize, common.center]}>
                            <Image source={HiddenPassword ? eyeClose : eye} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.blockInput]}>
                    {RePassword !== null && <Text style={styles.placeholder}>{text.re_password}</Text>}
                    <TextInput 
                    secureTextEntry={true}
                    onBlur={()=>RePassword === '' && setRePassword(null)} 
                    onFocus={()=>!RePassword && setRePassword('')} 
                    onChangeText={setRePassword} value={RePassword} style={styles.input} placeholder={RePassword !== null ? RePassword : text.re_password}/>
                </View>

                <View style={[styles.blockInput,{borderBottomWidth : 0}]}>
                    {RefCode !== null && <Text style={styles.placeholder}>{text.ref_code}</Text>}
                    <TextInput 
                    onBlur={()=>RefCode === '' && setRefCode(null)} 
                    onFocus={()=>!RefCode && setRefCode('')} 
                    onChangeText={setRefCode} value={RefCode} style={styles.input} placeholder={RefCode !== null ? RefCode : text.ref_code}/>
                </View>
            </View>
            <TouchableOpacity onPress={()=>setIsChecked(!IsChecked)} style={[common.row , common.center, styles.rule]}>
                <CheckBox
                value={IsChecked}
                onValueChange={setIsChecked}
                style={styles.checkbox}
                tintColors={{true : '#fac800' , false : '#C8C8C8'}}
                onCheckColor="#fff"
                onFillColor="#fac800"
                tintColor="#C8C8C8"
                />
                <Text style={styles.ruleText}>
                    Tôi đồng ý với <Text style={common.linkweb}>Thỏa thuận người dùng |</Text> <Text style={common.linkweb}>Chính sách bảo mật</Text>
                </Text>
            </TouchableOpacity>
            <Button 
            onPress={handleReg}
            text={text.reg}
            disabled={!Email || !EmailCode || !Password || !RePassword || !IsChecked}
            style={{
                Touchable : styles.mainButton,
                Linear : styles.mainButtonContainer
            }} />
        </>
    )
}