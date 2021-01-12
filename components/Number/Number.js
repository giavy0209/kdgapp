import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

export default function App({value, showCurrency = true ,showBalance = false , ...prop}) {
    const isShowBalance = useSelector(state => state.isShowBalance)

    return  (
        <>  
            <Text {...prop}>{showCurrency && isShowBalance && '$'}{isShowBalance || showBalance ? Math.floor(value * 10000) / 10000 : '******'}</Text>
        </>
    )
}