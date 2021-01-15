import React, { useEffect, useMemo, useState } from 'react'
import { Text,TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import LoginScreen from './LoginScreen'
import RegScreen from './RegScreen'
import ForgotScreen from './ForgotScreen'
import {useRoute,useNavigation } from '@react-navigation/native'

export default function App () {
    const router = useRoute()
    const screen = router?.params?.screen
    const navigation = useNavigation()

    const styles = useSelector(state => state.Styles && state.Styles.Login ? state.Styles.Login : {})
    const text = useSelector(state => state.Languages && state.Languages.Login ? state.Languages.Login : {})
    const jwt = useSelector(state => state.jwt)

    useEffect(()=> {
        jwt && navigation.push('Wallet')
    },[jwt])
    return (
        <>
            <View style={styles.container}>
                <View style={styles.rowButton}>
                    <TouchableOpacity onPress={()=> navigation.push('Login', {screen : 'Login'})} style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Text style={(!screen || screen === 'Login') ? styles.buttonTextActive : styles.buttonText}>{text.login}</Text>
                            {(!screen || screen === 'Login') && <View style={styles.underline}></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.push('Login',{screen : 'Reg'})} style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Text style={screen === 'Reg' ? styles.buttonTextActive : styles.buttonText}>{text.reg}</Text>
                            {screen === 'Reg' && <View style={styles.underline}></View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.push('Login',{screen : 'Forgot'})} style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Text style={screen === 'Forgot' ? styles.buttonTextActive : styles.buttonText}>{text.forgot}</Text>
                            {screen === 'Forgot' && <View style={styles.underline}></View>}
                        </View>
                    </TouchableOpacity>
                </View>
                {(!screen || screen === 'Login') && <LoginScreen />}
                {screen === 'Reg' && <RegScreen />}
                {screen === 'Forgot' && <ForgotScreen />}
            </View>
        </>
    )
}