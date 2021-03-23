import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useState } from 'react/cjs/react.development'

export default function App ({}) {
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const {top} = useSafeAreaInsets()

    const toast = useSelector(state => state.toast ? state.toast : {})
    
    return (
        <View style={[common.toast && common.toast(toast.type , toast.visible), {top}]}>
            <Text style={[common.toastText]}> {toast.text}</Text>
        </View>
    )
}