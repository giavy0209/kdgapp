import React, { useCallback } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../../const'
import { asyncChangeDropdown, atcChangeShowDropdown } from '../../store/dropdown'
const {height} = Dimensions.get('window')
export default function App () {
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Swap ? state.Styles.Swap : {})

    const dropdown = useSelector(state => state.dropdown)
    const isShowDropdown = useSelector(state => state.isShowDropdown)
    const handleCloseSwapFrom = useCallback(() => {
        dispatch(atcChangeShowDropdown(false, false))
    },[])

    const handleCloseSwapTo = useCallback(() => {
        dispatch(atcChangeShowDropdown(false, false))
    },[])

    const handleChangeSwapFrom = useCallback(swapfrom => {
        dispatch(asyncChangeDropdown(swapfrom))
        handleCloseSwapFrom()
    },[])

    const handleChangeSwapTo = useCallback(swapto => {
        dispatch(asyncChangeDropdown(null , swapto))
        handleCloseSwapFrom()
    },[])

    
    return (
        <>
            {isShowDropdown?.isSelectSwapFrom && <View style={[common.fullSize , styles.dropdown]}>
                <TouchableOpacity onPress={handleCloseSwapFrom} style={[common.fullSize, styles.dropdownMask]}></TouchableOpacity>
                <ScrollView style={[styles.dropdownList, {maxHeight :height /2}]}>
                    {
                        dropdown?.listCoinCanSwap?.map( o => 
                        <TouchableOpacity 
                        key={o._id} 
                        onPress={()=>handleChangeSwapFrom(o)} 
                        style={[common.row,styles.dropdownItem]}>
                            <Image style={{width : 28, height : 28}} source={{uri : baseURL + o.coin.icon.path}}/>
                            <Text style={[common.font16]}> {o.coin.code} </Text>
                        </TouchableOpacity>
                        )
                    }
                </ScrollView>

            </View>}

            {isShowDropdown?.isSelectSwapTo && <View style={[common.fullSize , styles.dropdown]}>
                <TouchableOpacity onPress={handleCloseSwapTo} style={[common.fullSize, styles.dropdownMask]}></TouchableOpacity>
                <ScrollView style={[styles.dropdownList, {maxHeight :height /2}]}>
                    {
                        dropdown?.listCoinSwapTo?.map( o => 
                        <TouchableOpacity 
                        key={o._id} 
                        onPress={()=>handleChangeSwapTo(o)} 
                        style={[common.row,styles.dropdownItem]}>
                            <Image style={{width : 28, height : 28}} source={{uri : baseURL + o.coin.icon.path}}/>
                            <Text style={[common.font16]}> {o.coin.code} </Text>
                        </TouchableOpacity>
                        )
                    }
                </ScrollView>

            </View>}
        </>
    )
}