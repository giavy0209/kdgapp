import React, { useState ,useCallback} from 'react'
import { Image, Text,  TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import eye from '../../assets/images/icons/eye.png'
import eyeClose from '../../assets/images/icons/eyeClose.png'
import callAPI from '../../axios'
import Button from '../../components/Button'
import { asyncHandleToast } from '../../store/initLocal'
import {useNavigation} from '@react-navigation/native'
export default function App () {
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

    const handleReset = useCallback (async () => {
        try {
            if(Password !== RePassword) return dispatch(asyncHandleToast(text.not_match , 0))
            if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email)) return dispatch(asyncHandleToast(text.incorrect_email , 0))
            var res = await callAPI.post('/forgot_password' , {
                email : Email,
                forgot_password_code : EmailCode,
                new_password : Password,
            })
            if(res.status === 101) return dispatch(asyncHandleToast(text.email_exist , 0))
            if(res.status === 102) return dispatch(asyncHandleToast(text.incorrect_email_code , 0))
            if(res.status === 1) {
                dispatch(asyncHandleToast(text.reset_success))
                setTimeout(() => {
                    navigation.push('Login' , {
                        screen : 'Login',
                        email : Email
                    })
                }, 1000);
            }
        } catch (error) {
            console.log(error);            
        }

    },[Email , EmailCode , Password, RePassword , text])

    const handleGetCode = useCallback(async()=> {
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email)) return dispatch(asyncHandleToast(text.incorrect_email , 0))

        var res = await callAPI.post('/create_code?type=2' , {email : Email})
        if(res.status === 101) return dispatch(asyncHandleToast(text.email_exist, 0))
        if(res.status === 102) return dispatch(asyncHandleToast(text.get_code_2_min, 0))

        if(res.status === 1) return dispatch(asyncHandleToast(text.get_code_success))

    },[Email])

    return (
        <>
        <Text style={[styles.loginDes]}>
            {text.forgot_des}
        </Text>
        <View style={[styles.inputContainer]}>
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

            <View style={[styles.blockInput,{borderBottomWidth : 0}]}>
                {RePassword !== null && <Text style={styles.placeholder}>{text.re_password}</Text>}
                <TextInput 
                secureTextEntry={true}
                onBlur={()=>RePassword === '' && setRePassword(null)} 
                onFocus={()=>!RePassword && setRePassword('')} 
                onChangeText={setRePassword} value={RePassword} style={styles.input} placeholder={RePassword !== null ? RePassword : text.re_password}/>
            </View>
        </View>
        <Button 
        onPress={handleReset}
        text={text.forgot_des}
        disabled={!Email || !EmailCode || !Password || !RePassword}
        style={{
            Touchable : styles.mainButton,
            Linear : styles.mainButtonContainer
        }} />
        </>
    )
}