import React, { useState } from 'react'
import { Image, Text, View,TouchableOpacity, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { baseURL } from '../../const'

export default function App ({data,setFullScreen}) {
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Swap ? state.Styles.Swap : {})

    return(<>  
        <View style={[common.fullSize, {backgroundColor : '#fff'}]}>
            
        </View>
    </>)
}