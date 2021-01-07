import React, { useState } from 'react'
import { Image, Text,  TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import eye from '../../assets/images/icons/eye.png'
import eyeClose from '../../assets/images/icons/eyeClose.png'
export default function App () {
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Login ? state.Styles.Login : {})
    const text = useSelector(state => state.Languages && state.Languages.Login ? state.Languages.Login : {})
    
    const [Email, setEmail] = useState(null)
    const [EmailCode, setEmailCode] = useState(null)
    const [Password, setPassword] = useState(null)
    const [HiddenPassword, setHiddenPassword] = useState(true)
    const [RePassword, setRePassword] = useState(null)
    const [RefCode, setRefCode] = useState(null)
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
                    keyboardType="email-address"
                    onBlur={()=>EmailCode === '' && setEmailCode(null)} 
                    onFocus={()=>!EmailCode && setEmailCode('')} 
                    onChangeText={setEmailCode} value={EmailCode} style={styles.input} placeholder={EmailCode !== null ? EmailCode : text.email_code}/>
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
        </>
    )
}