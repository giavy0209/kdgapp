import React, { useCallback, useEffect ,useState} from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import {  useSelector } from 'react-redux'
import {useNavigation} from '@react-navigation/native'

import Top from './Top'
import { baseURL } from '../../const'
import TextNumber from '../../components/Number'
import callAPI from '../../axios'
export default function App () {
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Staking ? state.Styles.Staking : {})
    const text = useSelector(state => state.Languages && state.Languages.Staking ? state.Languages.Staking : {})
    const balances = useSelector(state =>state.balances)

    const [Stake, setStake] = useState(0);
    const [Profit, setProfit] = useState(0);

    const handleGetSum = useCallback(async () => {
        const res = await callAPI.get('/staking_dashboard')
        setStake(res.stake)
        setProfit(res.profit)
    },[])
    useEffect(() => {
        handleGetSum()
    }, []);
    return (
    <>
    <Top Stake={Stake} Profit={Profit}/>
    <View style={[common.container]}>
        <View style={[common.row, common.mt, {justifyContent : 'space-between'}]}>
            <Text style={[common.textMain, common.font18]}>{text.staking}</Text>
        </View>
        {
            balances?.balances.map(o => {
                if(o.coin.actions.includes(4)){
                    return <View key={o._id} style={[common.row, common.radius,common.center , common.pd , common.mt , common.bgo(.4)]}>
                        <View >
                            <Image style={{width : 38, height : 38}} source={{uri : baseURL + o.coin.icon.path}}/>
                        </View>
                        <View style={[common.pl]}>
                            <Text style={[common.textTitle]}>{o.coin.code}</Text>
                            <Text style={[common.textSub]}>{text.balance} : <TextNumber value={o.balance} showCurrency={false}/></Text> 
                        </View>
                        <View style={{flex : 1}}></View>
                        <View style={[common.center,common.pl]}>
                            <TouchableOpacity onPress={() => navigation.navigate('JoinStake', {coin : o.coin._id})} style={styles.joinButton}>
                                <Text style={[common.textTitle, common.font12]}>{text.join}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('HistoryStake', {coin : o.coin._id})} style={[common.mt,styles.joinButton]}>
                                <Text style={[common.textTitle, common.font12]}>{text.history}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }else return null
            })
        }
    </View>
    </>)
}