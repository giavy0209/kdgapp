import React, { useCallback, useState ,useEffect} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {useRoute} from '@react-navigation/native'

import TextNumber from '../../components/Number'
import { baseURL } from '../../const'

import { asyncChangeDropdown, atcChangeShowDropdown } from '../../store/dropdown'

import arrow from '../../assets/images/icons/arrowswap.png'
import Button from '../../components/Button'
import { asyncHandleToast } from '../../store/initLocal'
import callAPI from '../../axios'
export default function App () {
    const {params} = useRoute()
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Swap ? state.Styles.Swap : {})
    const text = useSelector(state => state.Languages && state.Languages.Swap ? state.Languages.Swap : {})
    const dropdown = useSelector(state => state.dropdown ? state.dropdown : {})

    const [Value, setValue] = useState('0')

    const handleOpenSelectSwapFrom = useCallback(() => {
        dispatch(atcChangeShowDropdown(true, false))
    },[])

    const handleOpenSelectSwapTo = useCallback(() => {
        dispatch(atcChangeShowDropdown(false, true))
    },[])

    useEffect(() => {
        if(params?._id) {
            console.log(params);
            dispatch(asyncChangeDropdown(params))
        }
    },[params])

    const handleChangeValue = useCallback((value) => {
        value = Number(value)
        if(value || value === 0){
            if(value <= dropdown.swapFrom?.balance) {
                setValue(value.toString())
            }else{
                value = Math.floor(dropdown.swapFrom?.balance * 100) / 100
                setValue(value.toString())
            }
        }
    },[dropdown])

    const handleSwap = useCallback(async () => {
        const swapFrom = dropdown.swapFrom?.coin._id
        const swapTo = dropdown.swapTo?.coin._id
        const value = Number(Value)

        const res = await callAPI.post('/swap' , {swapFrom, swapTo , value})

        if(res.status === 101) return dispatch(asyncHandleToast(text.min_error , 0))
        if(res.status === 102) return dispatch(asyncHandleToast(text.max_error , 0))
        if(res.status === 103) return dispatch(asyncHandleToast(text.limit_error , 0))
        if(res.status === 1) return dispatch(asyncHandleToast(text.swap_success , 1))

    },[dropdown, Value])
    return (
    <>
    <View style={[common.container, common.center]}>
        <Text style={[common.textTitle, common.font24,{fontWeight : 'bold' , paddingVertical : 20}]}>{text.swap}</Text>
    </View>
    <Text style={[common.textMain,styles.swap_des]}>{text.swap_des}</Text>
    <View style={[common.container]}>

        <View style={[styles.swapContainer]}>
            <View style={[common.row, {justifyContent : 'space-between'}]}>
                <Text style={[common.textMain , common.font12]}>{text.min} : {dropdown.swapFrom?.coin.min_swap}</Text>
                <Text style={[common.textMain , common.font12]}>{text.max} : {dropdown.swapFrom?.coin.max_swap}</Text>
                <Text style={[common.tr,common.textMain, common.font12]}>
                    {text.balances} : <TextNumber showCurrency={false} showBalance={true} value={dropdown?.swapFrom?.balance}/> 
                </Text>
            </View>

            <View style={[styles.containerInput, common.pd]}>
                <View style={common.row_col()}>
                    <TextInput onChangeText={handleChangeValue} value={Value} style={[common.column(2)]}/>
                    <TouchableOpacity onPress={handleOpenSelectSwapFrom} style={[common.center, common.row,common.column(2)]}>
                        <Image style={{width : 35, height :35}} source={{uri : baseURL + dropdown?.swapFrom?.coin?.icon.path}}/>
                        <Text style={common.pl}>{dropdown?.swapFrom?.coin?.code}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Image style={{marginVertical : 15}} source={arrow}/>

            <Text style={[common.tr,common.textMain, common.font12]}>
                {text.balances} : <TextNumber showCurrency={false} showBalance={true} value={dropdown?.swapTo?.balance}/>
            </Text>

            <View style={[styles.containerInput, common.pd]}>
                <View style={common.row_col()}>
                    <TextInput value={
                        (Math.floor(
                            Number(Value) * dropdown.swapFrom?.coin.price / dropdown.swapTo.coin.price * 100
                        ) / 100).toString()
                    } editable={false} style={[common.column(2)]}/>
                    <TouchableOpacity onPress={handleOpenSelectSwapTo} style={[common.center, common.row,common.column(2)]}>
                        <Image style={{width : 35, height :35}} source={{uri : baseURL + dropdown?.swapTo?.coin?.icon.path}}/>
                        <Text style={common.pl}>{dropdown?.swapTo?.coin?.code}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    
    <View style={common.container}>
        <Button
        onPress={handleSwap}
        text={text.swap} style={{Linear : common.pd }}/>
    </View>
    
    </>)
}