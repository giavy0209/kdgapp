import React, { useState } from 'react'
import { Text,  TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function App () {
    const styles = useSelector(state => state.Styles && state.Styles.Login ? state.Styles.Login : {})
    const text = useSelector(state => state.Languages && state.Languages.Login ? state.Languages.Login : {})
    
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)
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
                    secureTextEntry={true}
                    onBlur={()=>Password === '' && setPassword(null)} 
                    onFocus={()=>!Password && setPassword('')} 
                    onChangeText={setPassword} value={Password} style={styles.input} placeholder={Password !== null ? Password : text.password}/>
                </View>
            </View>
        </>
    )
}