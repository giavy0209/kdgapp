import AsyncStorage from '@react-native-community/async-storage'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function App () {
    return (
    <>
    <TouchableOpacity
    onPress={() => {
        AsyncStorage.removeItem('email')
    }}
    >
        <Text>Đăng xuất</Text>
    </TouchableOpacity>
    </>)
}