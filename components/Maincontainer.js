import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import background from '../assets/images/background.jpg'
import Tabs from './Tabs'
import { asyncInitAll } from '../store/actions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const {height} = Dimensions.get('screen')

export default function Maincontainer({Screen, haveTabs}) {
    const dispatch = useDispatch()
    const [TabHeight , setTabHeight] = useState(0)
    const {top} = useSafeAreaInsets()
    useEffect(()=> {
        dispatch(asyncInitAll())
    },[])

    return (
        <ImageBackground style={{width : '100%' , height : '100%', position : 'relative'}} source={background}>
            <View style={{width : '100%' , height : height - TabHeight}}>
                <ScrollView style={{paddingTop : top}}>
                    <Screen />
                </ScrollView>
            </View>
            {haveTabs && <Tabs setTabHeight={setTabHeight}/>}
        </ImageBackground>
    )
}