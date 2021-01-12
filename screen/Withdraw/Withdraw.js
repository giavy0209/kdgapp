import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
export default function App({setHeaderTitle,...prop}) {
    const {params} = useRoute()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})
    useMemo(() => {
        setHeaderTitle(`${text.withdraw} ${params.coin.code}`)
    },[setHeaderTitle,text ,params])
    return (
        <>
        <View style={[common.container]}>
            
        </View>
        </>
    )
}