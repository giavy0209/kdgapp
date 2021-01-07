import React, { useState } from 'react'
import { Text,  TextInput,  TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import LoginScreen from './LoginScreen'
import RegScreen from './RegScreen'
import ForgotScreen from './ForgotScreen'

export default function App () {
    const [Current , setCurrent] = useState('Login')
    const styles = useSelector(state => state.Styles && state.Styles.Login ? state.Styles.Login : {})
    const text = useSelector(state => state.Languages && state.Languages.Login ? state.Languages.Login : {})
    return (
        <>
            <View style={styles.container}>
                <View style={styles.rowButton}>
                    <TouchableOpacity onPress={()=> setCurrent('Login')} style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Text style={Current === 'Login' ? styles.buttonTextActive : styles.buttonText}>{text.login}</Text>
                            {Current === 'Login' && <View style={styles.underline}></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setCurrent('Reg')} style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Text style={Current === 'Reg' ? styles.buttonTextActive : styles.buttonText}>{text.reg}</Text>
                            {Current === 'Reg' && <View style={styles.underline}></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setCurrent('Forgot')} style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Text style={Current === 'Forgot' ? styles.buttonTextActive : styles.buttonText}>{text.forgot}</Text>
                            {Current === 'Forgot' && <View style={styles.underline}></View>}
                        </View>
                    </TouchableOpacity>
                </View>
                {Current === 'Login' && <LoginScreen />}
                {Current === 'Reg' && <RegScreen />}
                {Current === 'Forgot' && <ForgotScreen />}
            </View>
        </>
    )
}