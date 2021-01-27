import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View ,TextInput} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute} from '@react-navigation/native'
import TextNumber from '../../components/Number'
import callAPI from '../../axios'
import { baseURL } from '../../const'
import Button from '../../components/Button'
import { asyncHandleToast } from '../../store/initLocal'
export default function App ({setHeaderTitle}) {
    const dispatch = useDispatch()
    const {params} = useRoute()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Staking ? state.Styles.Staking : {})
    const text = useSelector(state => state.Languages && state.Languages.Staking ? state.Languages.Staking : {})
    const balances = useSelector(state =>state.balances)
    const [Packages, setPackages] = useState([]);
    const [Choose, setChoose] = useState('');
    const [CurrentBalances, setCurrentBalances] = useState(balances?.balances.find(o => o.coin._id === params.coin) );
    const [Value, setValue] = useState('');
    useEffect(() => {
        setHeaderTitle(text.join_stake)
    }, [text]);
    useEffect(() => {
        setCurrentBalances(balances?.balances.find(o => o.coin._id === params.coin))
    },[balances])

    const handleGetStakingPackage = useCallback(async (coin) => {
        const res = await callAPI.get(`/staking_package?coin=${coin}`)
        setPackages(res.data)
        setChoose(res.data[0])
    },[])
    
    useEffect(() => {
        handleGetStakingPackage(params.coin)
    },[params])

    const handleValue = useCallback(value => {
        const isNumber = Number(value)
        if(((isNumber || isNumber === 0) && isNumber >=0) || value === ''){
            if(CurrentBalances.balance >= isNumber){
                setValue((Math.floor(isNumber * 100) / 100).toString())
            }else {
                setValue((Math.floor(CurrentBalances.balance * 100) / 100).toString())
            }
        }
    },[CurrentBalances])

    const handleStaking = useCallback(async () => {
        const res = await callAPI.post('/staking' , {value : Value , coin : params.coin , package : Choose._id})
        if(res.status === 1) return dispatch(asyncHandleToast(text.success , 1))

    },[Value, params,Choose])
    return (
        <> 
        <View style={[common.container]}>
            <Text style={[common.textMain]}> {text.choose_package}</Text>
            <View style={[common.radius , common.pd , common.bgo(.4) , common.mt]}>
                <View style={[common.row_col(-7)]}>
                    {
                        Packages.map((o,index) => <TouchableOpacity onPress={()=>setChoose(o)} key={o._id} style={[common.column(2 , index, 7)]}>
                            <View style={[common.radius ,common.bgo(.4),   (Choose._id === o._id ? styles.packageActive : styles.package)]}>
                                <View style={[common.row,common.center,{justifyContent : 'space-between'}]}>
                                    <Text style={Choose._id === o._id ? [common.textTitle,common.font12] : [common.textSub , common.font12]}>{text.end_after}</Text>
                                    <Text style={Choose._id === o._id ? [common.textTitle] : [common.textHL]}>{o.end_after - o.start_after}</Text>
                                </View>
                                <Text style={Choose._id === o._id ? [common.textTitle] : [common.textHL]}>{o.profit_per_day.toFixed(2)}% / {text.day}</Text>
                            </View>
                        </TouchableOpacity>)
                    }
                </View>
            </View>
            <Text style={[common.textMain, common.mt]}>{text.so_tien}</Text>
            <View style={[common.mt, common.pd, common.bgo(.4), common.radius , {alignItems : 'flex-end'}]}>
                <Text style={[common.textMain , common.font12]}>{text.balance} <TextNumber showCurrency={false} value={CurrentBalances.balance} /></Text>
                <View style={[styles.inputContaienr , common.row, common.center]}>
                    <TextInput onChangeText={handleValue} value={Value} style={{width: '70%'}}/>
                    <View style={[common.row , common.center]}>
                        <Image style={{width : 28, height : 28}} source={{uri : baseURL + CurrentBalances?.coin.icon.path}}/>
                        <Text style={[common.pl]}>{CurrentBalances.coin.code}</Text>
                    </View>
                </View>
                <View style={[common.row , {justifyContent : 'space-between', width : '100%'}]}>
                    <Text style={[common.textSub , common.font12]}>{text.min} : {Choose.min}</Text>
                    <Text style={[common.textSub , common.font12]}>{text.max} : {Choose.max}</Text>
                </View>
            </View>
            <View style={[styles.tern]}>
                <Text style={[common.textMain]}>{text.tern}</Text>
            </View>
            <Button
            delay={300}
            disabled={
                Value < Choose.min || Value > Choose.max
            }
            onPress={handleStaking}
            style={{
                Touchable : common.mt,
                Linear : common.pd,
            }}
            text={text.staking}/>
        </View>
        </>
    )
}