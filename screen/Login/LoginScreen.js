import React, { useState } from 'react'
import { Image, Text,  TextInput,  View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import eye from '../../assets/images/icons/eye.png'
import eyeClose from '../../assets/images/icons/eyeClose.png'
export default function App () {
    const styles = useSelector(state => state.Styles && state.Styles.Login ? state.Styles.Login : {})
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const text = useSelector(state => state.Languages && state.Languages.Login ? state.Languages.Login : {})
    
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)
    const [HiddenPassword, setHiddenPassword] = useState(true)
    return (
        <>
            <Text style={styles.loginDes}>
                {text.login_des}
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

                <View style={[styles.blockInput,{borderBottomWidth : 0}]}>
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
            </View>
        </>
    )
}