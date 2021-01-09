import React, { useMemo } from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigation} from '@react-navigation/native'

import bg from '../../assets/images/background/bg.jpg'
import scan from '../../assets/images/icons/scan.png'
import noti from '../../assets/images/icons/noti.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Top from './Top'
import callAPI from '../../axios'

export default function App () {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})

    useMemo(async () => {
        var res = await callAPI.get('/balances')
        console.log(res);
    },[])
    return (
    <>
        <Top />
    </>)
}