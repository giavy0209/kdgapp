import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { ScrollView, Text, View,TouchableOpacity, Dimensions} from 'react-native'
import callAPI from '../../axios'
import TextNumber from '../../components/Number'
import {  renderDate } from '../../helper'
import { asyncHandleToast } from '../../store/initLocal'
import { atcChangeLoading } from '../../store/actions'
const {height} = Dimensions.get('screen')
const ITEM_PER_PAGE = 10

const RenderStatus = function ({id,status , text, common}) {
    const dispatch = useDispatch()
    const handleEndStaking = useCallback(async (type) => {
        dispatch(atcChangeLoading(true))
        await callAPI.post('/end_staking' , {type , trans_id : id})
        dispatch(atcChangeLoading(false))
        dispatch(asyncHandleToast(type === 1 ? text.renew_success : text.end_success))

    },[text,id])
    return (
        <>
        {
            status === 0 ? null :
            status === 1 ? <Text style={[common.textSub, {textAlign : 'center' , width : 120 , color : '#26A65B'}]}>{text.paying}</Text> :
            status === 3 ? <Text style={[common.textSub, {textAlign : 'center' , width : 120}]}>{text.end}</Text> :
            status === 2 ? <View>
                <TouchableOpacity onPress={()=>handleEndStaking(1)} style={[common.radius , {backgroundColor : '#26A65B'}]}><Text style={[common.textTitle, {textAlign : 'center' , width : 120}]}>{text.renew}</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleEndStaking(2)} style={[common.radius,common.mt , {backgroundColor : '#FF0000'}]}><Text style={[common.textTitle, {textAlign : 'center' , width : 120}]}>{text.end}</Text></TouchableOpacity>
            </View> : null
        }
        </>
    )
}

export default function App ({setHeaderTitle}) {
    const {params} = useRoute()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Staking ? state.Styles.Staking : {})
    const text = useSelector(state => state.Languages && state.Languages.Staking ? state.Languages.Staking : {})

    const [Page, setPage] = useState(1)
    const [Total, setTotal] = useState(0)
    const [History, setHistory] = useState([])


    useEffect(() => setHeaderTitle(text.history) , [])
    const handleGetStakingHistory = useCallback(async ( ) => {
        const res = await callAPI.get(`/transactions?type=4&coin=${params.coin}&skip=${(Page - 1) * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}`)
        setTotal(res.total)
        setHistory(res.data)
    },[params,Page])
    useEffect(() => {
        handleGetStakingHistory()
    },[handleGetStakingHistory, Page])

    return(
        <>
        <View style={[common.container]}>
            
            <ScrollView style={{ width : '100%'}} horizontal={true}>
                <View>
                    <View style={[common.row, common.center,common.pd , {backgroundColor : '#283349' , borderTopLeftRadius : 5, borderTopRightRadius : 5}]}>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 50}]}>{text.value}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 80}]}>{text.profit_per_day}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 80}]}>{text.profit}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 120}]}>{text.create_date}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 120}]}>{text.start_date}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 120}]}>{text.end_date}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 120}]}>{text.unlock_date}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 120}]}>{text.renew_date}</Text>
                        <Text style={[common.textTitle ,{textAlign: 'center',width : 120}]}>{text.status}</Text>
                    </View>
                    <ScrollView style={[common.bgo(.4),{height : height - 180}]}>
                        {
                            History.map(o => <View key={o._id} style={[common.row, common.pd , {alignItems : 'center'}]}>
                                <TextNumber style={[common.textMain ,{textAlign: 'center',width : 50}]} value={o.value} showCurrency={false} />
                                <TextNumber style={[common.textMain ,{textAlign: 'center',width : 80}]} value={o.staking.profit_per_day} showCurrency={false} />
                                <TextNumber style={[common.textMain ,{textAlign: 'center',width : 80}]} value={o.receive} showCurrency={false} />
                                <Text style={[common.textMain ,{textAlign: 'center',width : 120}]}>{renderDate(o.create_date , 'dd/momo/yyyy')}</Text>
                                <Text style={[common.textMain ,{textAlign: 'center',width : 120}]}>{renderDate(o.create_date, 'dd/momo/yyyy' , o.staking.start_after + 'd')}</Text>
                                <Text style={[common.textMain ,{textAlign: 'center',width : 120}]}>{renderDate(o.create_date, 'dd/momo/yyyy' , o.staking.end_after + 'd')}</Text>
                                <Text style={[common.textMain ,{textAlign: 'center',width : 120}]}>{renderDate(o.create_date, 'dd/momo/yyyy' , o.staking.unlock_after + 'd')}</Text>
                                <Text style={[common.textMain ,{textAlign: 'center',width : 120}]}>{renderDate(o.create_date, 'dd/momo/yyyy' , o.staking.renew_after + 'd')}</Text>
                                <RenderStatus id={o._id} text={text} status={o.status} common={common}/>
                            </View>)
                        }
                    </ScrollView>
                </View>
            </ScrollView>

            <View style={[common.container]}>
                {Math.ceil(Total / ITEM_PER_PAGE) > 1 && <View style={[common.row, common.center]}>
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
        </View>
        </>
    )
}