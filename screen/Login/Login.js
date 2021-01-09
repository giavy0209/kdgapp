import React, { useEffect, useMemo, useState } from 'react'
import { Text,TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import LoginScreen from './LoginScreen'
import RegScreen from './RegScreen'
import ForgotScreen from './ForgotScreen'
import {useRoute,useNavigation } from '@react-navigation/native'

export default function App () {
    const router = useRoute()
    const screen = router.params?.screen

    const navigation = useNavigation()

    const [Current , setCurrent] = useState(screen ? screen : 'Login')
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
                {Current === 'Login' && <LoginScreen setCurrent={setCurrent}/>}
                {Current === 'Reg' && <RegScreen setCurrent={setCurrent}/>}
                {Current === 'Forgot' && <ForgotScreen setCurrent={setCurrent}/>}
            </View>
        </>
    )
}