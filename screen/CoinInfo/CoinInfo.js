import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { useSelector } from 'react-redux';
import Button from '../../components/Button'
import callAPI from '../../axios';
import deposit from '../../assets/images/icons/deposit.png'
import withdraw from '../../assets/images/icons/withdraw.png'
import { renderDate } from '../../helper';

import empty from '../../assets/images/icons/empty.png'

const ITEM_PER_PAGE = 10

export default function  App({setHeaderTitle,...prop}) {
    const {params} = useRoute()
    const navigation = useNavigation()
    const balances = useSelector(state => state.balances?.balances)
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})
    const info = useSelector(state => state.info)
    const [ThisCoin, setThisCoin] = useState({})
    const [Page, setPage] = useState(1)
    const [Total, setTotal] = useState(0)
    const [History, setHistory] = useState([])
    
    const handleGetHistory = useCallback(async (page, coin) => {
        console.log(`/transactions?skip=${(page - 1) * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}&coin=${coin}&type=1,2,3,4,5,6`);
        const res = await callAPI.get(`/transactions?skip=${(page - 1) * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}&coin=${coin}&type=1,2,3,4,5,6`)
        console.log(res.data.length);
        setHistory(res.data)
        setTotal(res.total)
    },[])

    useEffect(() => {
        var thisCoin = balances?.find(o => o._id === params.id)
        setThisCoin(thisCoin)
    } , [balances,params])
    useEffect(() => {
        ThisCoin?.coin && setHeaderTitle(ThisCoin.coin.code)
    },[ThisCoin])

    useEffect(() => {
        ThisCoin?.coin && handleGetHistory(Page ,ThisCoin.coin._id)
    },[ThisCoin,Page])

    const handlePress = useCallback(action => {
        action === 1 ? navigation.navigate('Deposit',{...ThisCoin}): 
        action === 2 ? navigation.navigate('Withdraw' , {...ThisCoin}): 
        action === 3 ? navigation.navigate('Swap' , {...ThisCoin}) : 
        action === 4 ? navigation.navigate('Staking' , {...ThisCoin}): null
    },[ThisCoin])

    return (
        <>
        <View style={[common.container, common.row_col(), common.center]}>
            {
                ThisCoin?.coin?.actions?.map((o,index) =>  <View style={[common.column(2,index)]} key={o + 'actions'}>
                        <Button 
                        onPress={() => handlePress(o)}
                        style={{Linear : {padding: 5}}}
                        text={o === 1 ? text.deposit : o === 2 ? text.withdraw : o === 3 ? text.swap : o === 4 ? text.stake : ''} />
                    </View>
                )
            }
        </View>
        <View style={[common.container]}>
            <Text style={[common.textTitle, common.font22,{textAlign : 'center'}]}>{text.history}</Text>
            {
                History.length > 0 ? History.map( o => <View key={o._id} style={[common.row,common.center, styles.history]}>
                    <View style={[common.row, common.center]}>
                        <View style={[(o.from?._id === info._id ? styles.redCircle : styles.greenCircle), common.center]}>
                            <Image source={o.from?._id === info._id ? withdraw : deposit}/>
                        </View>
                        <View style={[common.ml]}>
                            <Text style={[common.font16 , common.textTitle]}>
                            {
                                o.type === 1 ? text.deposit :
                                o.type === 2 ? text.withdraw :
                                o.type === 3 ? text.swap :
                                o.type === 4 ? text.stake :
                                o.type === 5 ? text.receive_stake :
                                o.type === 6 ? text.receive_profit :
                                null
                            }
                            </Text>
                            <Text style={[ common.textTitle,common.font12]}>{renderDate(o.create_date)}</Text>
                        </View>
                    </View>
                    <Text style={[ common.textTitle,common.font12]}>{o.value} {o.coin.code}</Text>
                </View>)
                :
                <View style={[common.center, {padding : 25}]}>
                    <Image source={empty}/>
                    <Text style={[common.textSub]}>{text.no_data}</Text>
                </View>
            }
            {Math.ceil(Total / 10) > 1 && <View style={[common.row, common.center]}>
                <TouchableOpacity 
                disabled={Page <= 1}
                onPress={() => Page > 1 && setPage(Page - 1)}
                style={common.iconPadding}>
                    <Text style={[common.textHL, common.font22]}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={[common.textHL, common.font22]}>{Page}</Text>
                <TouchableOpacity 
                disabled={Page >= Math.ceil(Total / ITEM_PER_PAGE)}
                onPress={() => Page < Math.ceil(Total / ITEM_PER_PAGE) && setPage(Page + 1)}
                style={common.iconPadding}>
                    <Text style={[common.textHL, common.font22]}>{'>'}</Text>
                </TouchableOpacity>
            </View>}
        </View>
        </>
    )
}