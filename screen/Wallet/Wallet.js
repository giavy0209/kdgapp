import React, { useMemo } from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigation} from '@react-navigation/native'

import Top from './Top'
import ListCoin from './ListCoin'

export default function App () {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})

    return (
    <>
        <Top />
        <ListCoin />
    </>)
}