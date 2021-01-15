import React, { useCallback, useState } from 'react'
import { Image, Text,  TextInput,  View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import eye from '../../assets/images/icons/eye.png'
import eyeClose from '../../assets/images/icons/eyeClose.png'
import Button from '../../components/Button'
import { asyncHandleToast } from '../../store/initLocal'
import {useNavigation,useRoute } from '@react-navigation/native'
import { asyncLogin } from '../../store/initBE'
export default function App () {
    const router = useRoute()
    const email = router.params?.email
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const styles = useSelector(state => state.Styles && state.Styles.Login ? state.Styles.Login : {})
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const text = useSelector(state => state.Languages && state.Languages.Login ? state.Languages.Login : {})
    const [Email, setEmail] = useState(email ? email : null)
    const [Password, setPassword] = useState(null)
    const [HiddenPassword, setHiddenPassword] = useState(true)

    const handleLogin = useCallback(async () => {
        var res = await dispatch(asyncLogin(Email , Password))
        if(res.status === 101) return dispatch(asyncHandleToast(text.email_exist , 0))
        if(res.status === 102) return dispatch(asyncHandleToast(text.wrong_login , 0))
        if(res.status === 1) navigation.push('Wallet')
    },[Email , Password,text])


    return (
        <>
            <Text style={styles.loginDes}>
                {text.login_des}
            </Text>
            <View style={styles.inputContainer}>
                <View style={styles.blockInput}>
                    {Email !== null && <Text style={styles.placeholder}>{text.email}</Text>}
                    <TextInput 
                    autoCompleteType="off"
                    keyboardType="email-address"
                    onBlur={()=>Email === '' && setEmail(null)} 
                    onFocus={()=>!Email && setEmail('')} 
                    onChangeText={setEmail} value={Email} style={styles.input} placeholder={Email !== null ? Email : text.email}/>
                </View>

                <View style={[styles.blockInput,{borderBottomWidth : 0}]}>
                    {Password !== null && <Text style={styles.placeholder}>{text.password}</Text>}
                    <TextInput 
                    autoCompleteType="off"
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
            </View>
            <Button 
            onPress={handleLogin}
            text={text.login}
            disabled={!Email || !Password}
            style={{
                Touchable : styles.mainButton,
                Linear : styles.mainButtonContainer
            }}
            />
        </>
    )
}