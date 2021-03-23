import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, ImageBackground, Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import background from '../assets/images/background.jpg'
import Tabs from './Tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from './Toast'
import Loading from './Loading'
import Header from './Header'
import DropdownSwap from './DropdownSwap'
import { useSelector } from 'react-redux'
const {height} = Dimensions.get('screen')

export default function Maincontainer({Screen, haveTabs , KeyboardHeight , header}) {
    
    const [BG , setBG] = useState(0)
    const [HeaderTitle , setHeaderTitle] = useState('')
    const [HeaderHeight , setHeaderHeight] = useState(0)
    const [TabHeight , setTabHeight] = useState(0)
    return (
        <ImageBackground onLayout={(e) => setBG(e.nativeEvent.layout.height)} style={{width : '100%' , height : '100%', position : 'relative'}} source={background}>
            {header && <Header setHeaderHeight={setHeaderHeight} title={HeaderTitle}/>}
            <Toast />
            <Loading />
            <DropdownSwap />
            <View style={{width : '100%' , height : BG - TabHeight - KeyboardHeight - HeaderHeight}}>
                <ScrollView >
                    <Screen setHeaderTitle={setHeaderTitle} />
                </ScrollView>
            </View>
            {haveTabs && <Tabs setTabHeight={setTabHeight}/>}
        </ImageBackground>
    )
}