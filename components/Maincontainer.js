import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, ImageBackground, Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import background from '../assets/images/background.jpg'
import Tabs from './Tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from './Toast'
const {height} = Dimensions.get('screen')


export default function Maincontainer({Screen, haveTabs , KeyboardHeight}) {
    
    const [TabHeight , setTabHeight] = useState(0)
    const {top} = useSafeAreaInsets()

    return (
        <ImageBackground style={{width : '100%' , height : '100%', position : 'relative'}} source={background}>
            <Toast />
            <View 
            style={{width : '100%' , height : height - TabHeight - KeyboardHeight, paddingTop : top}}>
                <ScrollView >
                    <Screen />
                </ScrollView>
            </View>
            {haveTabs && <Tabs setTabHeight={setTabHeight}/>}
        </ImageBackground>
    )
}