import React from 'react'
import { Dimensions } from 'react-native'
import WebView from 'react-native-webview'

const {width} = Dimensions.get('screen')
export default function App () {
    return (
        <>
            <WebView />
        </>
    ) 
}