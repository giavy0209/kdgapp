import React, { useCallback } from 'react'
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Number from '../../components/Number'
import {useNavigation} from '@react-navigation/native'

import sortUp from '../../assets/images/icons/sortUp.png'
import sortDown from '../../assets/images/icons/sortDown.png'
import plus from '../../assets/images/icons/plus.png'
import { asyncSortUpDown } from '../../store/initLocal'
import { baseURL } from '../../const'

export default function App () {
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})

    const isSortDown = useSelector(state => state.isSortDown)
    const balances = useSelector(state => state.balances)
    const handleSort = useCallback(()=>{
        dispatch(asyncSortUpDown(!isSortDown))
    },[isSortDown])
    return (
    <>
        <View style={[common.container,common.flexSize]}>
            <View style={[common.row, common.center, styles.listCoinHeader]}>
                <Text style={[common.text, common.font18]}>{text.sum_balance}</Text>
                <View style={[common.row , common.center]}>
                    <TouchableOpacity onPress={handleSort} style={[common.iconPadding]}>
                        <Image source={isSortDown ? sortDown : sortUp}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSort} style={[common.iconPadding]}>
                        <Image source={plus}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.listCoinContainer]}>
                <View style={[common.fullSizeAbsolute, common.background , styles.listCoinBg]}></View>
                <View style={[styles.listCoin]}>
                    {balances && balances.map((o, index) => o.coin.show && <TouchableOpacity key={o._id} style={[styles.coinContainer, (index !== 0 && {marginTop : 7})]}>
                        <View style={[common.fullSizeAbsolute, common.background , styles.listCoinBg]}></View>
                        <View style={[common.row, common.center,styles.coin]}>
                            <View style={[common.row, common.center,styles.coinLeft]}>
                                <Image style={[styles.coinIcon]} source={{uri : baseURL + o.coin.icon.path}}/>
                                <View style={[common.ml]}>
                                    <Text style={[common.textTitle]}>{o.coin.code}</Text>
                                    <Number style={[common.textSub, common.font14]} value={o.coin.price}/>
                                </View>
                            </View>
                            <View style={[common.right]}>
                                <Number style={[common.textHL]} value={o.balance} />
                                <Number style={[common.textSub, common.font14]} value={o.balance * o.coin.price} />
                            </View>
                        </View>
                    </TouchableOpacity>)}
                </View>
            </View>
        </View>
    </>)
}