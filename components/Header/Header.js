import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import arrow from '../../assets/images/icons/arrowLeft.png'
export default function App({title,setHeaderHeight,...prop}) {
    const navigation = useNavigation()
    const styles = useSelector(state => state.Styles && state.Styles.Header ? state.Styles.Header : {})
    return ( 
        <>
        <View style={[styles.header]} onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}>
            <View style={[styles.arrow]}>
                <TouchableOpacity onPress={()=>navigation.goBack()}  >
                    <Image source={arrow} />
                </TouchableOpacity>
            </View>
            <View style={[styles.title]}>
                <Text style={styles.textTitle}>{title}</Text>
            </View>
        </View>
        </>
    )
    
}