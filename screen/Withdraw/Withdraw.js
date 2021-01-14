import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../../const'
import same from '../../assets/images/icons/same.png'
import TextNumber from '../../components/Number'
import Button from '../../components/Button'
import callAPI from '../../axios'
import { asyncHandleToast } from '../../store/initLocal'
export default function App({setHeaderTitle,...prop}) {
    const {params} = useRoute()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})

    const [Value, setValue] = useState('0')
    const [Address, setAddress] = useState('')
    const [_2Fa, set_2Fa] = useState('')
    useEffect(() => {
        setHeaderTitle(`${text.withdraw} ${params.coin.code}`)
    },[setHeaderTitle,text ,params])

    const handleWithdraw = useCallback(async () => {
        if(!Value || !Address || !_2Fa) return dispatch(asyncHandleToast(text.missing_field , 0))
        const value = Number(Value)

        if(!value || value < params.coin.min_withdraw) return dispatch(asyncHandleToast(text.min , 0))
        if(value +params.coin.withdraw_fee > params.balance) return dispatch(asyncHandleToast(text.not_enough_balance , 0))
        const res = await callAPI.post('/deposit' , {
            deposit_type : params.coin.code,
            toAddress : Address,
            value : value,
            token : _2Fa
        })

        if(res.status === 100) return dispatch(asyncHandleToast(text.not_2fa , 0))
        if(res.status === 101) return dispatch(asyncHandleToast(text.incorrect_2fa , 0))
        if(res.status === 102) return dispatch(asyncHandleToast(text.not_kyc , 0))
        if(res.status === 103) return dispatch(asyncHandleToast(text.min , 0))
        if(res.status === 104) return dispatch(asyncHandleToast(text.not_enough_balance , 0))
        if(res.status === 1) {
            setValue(0)
            setAddress('')
            set_2Fa('')
            return dispatch(asyncHandleToast(text.withdraw_success , 0))
        }
    },[params,Value,text,Address, _2Fa])
    return (
        <>
        <View style={[common.container,styles.withdraw]}>
            <View style={styles.withdrawCoinInfo}>
                <View style={[common.fullSizeAbsolute , common.background,{opacity : .4}]}></View>
                <View style={[common.row,common.center , {padding : 15 , justifyContent : 'space-between'}]}>
                    <View style={[common.row, common.center,styles.withdrawCoinInfoLeft]}>
                        <Image style={{width : 35, height : 35, resizeMode : 'contain'}} source={{uri : `${baseURL}${params.coin.icon.path}`}}/>
                        <View>
                            <Text style={common.textTitle}> {params.coin.name} </Text>
                            <Text style={[common.text , common.font14]}> {text.balance}: {params.balance} </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.withdrawProgress,common.center]}>
                <Text style={common.text}>{text.amount_withdraw}</Text>
                <View style={[common.row,common.mt,common.center, {justifyContent : 'space-between'}]}>
                    <View style={[styles.inputContainer]}> 
                        <View style={[styles.input,common.center]}>
                            <TextInput value={Value} onChangeText={setValue} keyboardType="number-pad" style={[common.font26, common.center,{padding : 0}]}/>
                        </View>
                        <Text style={[common.textHL, common.font14]}>{params.coin.code}</Text>
                    </View>
                    <Image source={same} style={{marginHorizontal : 10 , marginTop : -14}}/>
                    <View style={[styles.inputContainer]}> 
                        <View style={[styles.input,common.center]}>
                            <TextNumber value={Number(Value) * params.coin.price} showCurrency={false} showBalance={true} style={[common.font26, common.center,{padding : 0}]}/>
                        </View>
                        <Text style={[common.textHL, common.font14]}>USD</Text>
                    </View>
                </View>

                <Text style={[common.text, common.mt]}>{text.withdraw_to}</Text>
                <TextInput onChangeText={setAddress} value={Address} style={[common.mt,styles.inputText]} placeholder={text.enter_withdraw_to}/>

                <Text style={[common.text, common.mt]}>{text._2fa}</Text>
                <TextInput onChangeText={set_2Fa} value={_2Fa} style={[common.mt,styles.inputText]} placeholder={text.enter_2fa}/>

                <Text style={[common.text, common.mt]}>{text.fee}</Text>
                <Text style={[common.mt,styles.inputFake]} placeholder={text.enter_2fa}> {params.coin.withdraw_fee} {params.coin.code} </Text>

                <Text style={[common.text, common.mt]}>{text.min}</Text>
                <Text style={[common.mt,styles.inputFake]} placeholder={text.enter_2fa}> {params.coin.min_withdraw} {params.coin.code} </Text>
            </View>
            <Button style={{
                Touchable : [common.textTitle, common.mt],
                Linear : {padding : 10}
            }} 
            onPress={handleWithdraw}
            text={text.withdraw} />
        </View>
        </>
    )
}