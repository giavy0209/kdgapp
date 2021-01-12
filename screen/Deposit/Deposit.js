import React from 'react'
import { Text } from 'react-native'
import {useRoute} from '@react-navigation/native'
export default function App({...prop}) {
    const params = useRoute()
    return (
        <>
        <Text>Withdraw</Text>
        </>
    )
}