import React from 'react'
import {Image, View, Dimensions} from 'react-native'
import { useSelector } from 'react-redux'
import loading from '../../assets/images/icons/loading.gif'
const {width ,height} = Dimensions.get('window')
export default function App() {
    const isLoading = useSelector(state => state.isLoading)
    return (
        <>  
        {isLoading && <View style={{
            position : 'absolute',
            top : 0,
            left : 0,
            width : width,
            height : height,
            backgroundColor : 'rgba(0,0,0,.3)',
            zIndex : 9,
            justifyContent : 'center',
            alignItems : 'center'
        }}>
            <Image 
            style={{
                resizeMode : 'contain',
                width : 75,
                height : 75
            }}
            source={loading}/>
        </View>}
        </>
    )
}