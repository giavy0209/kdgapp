import React, { useCallback, useState } from 'react'
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-swipeable';
import { useDispatch, useSelector } from 'react-redux'
import Number from '../../components/Number'
import {useNavigation} from '@react-navigation/native'

import sortUp from '../../assets/images/icons/sortUp.png'
import sortDown from '../../assets/images/icons/sortDown.png'
import plus from '../../assets/images/icons/plus.png'
import { asyncSortUpDown } from '../../store/initLocal'
import { baseURL } from '../../const'

import deposit from '../../assets/images/icons/deposit.png'
import withdraw from '../../assets/images/icons/withdraw.png'

export default function App () {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})

    const isSortDown = useSelector(state => state.isSortDown)
    const balances = useSelector(state => state.balances)

    const [ContainerCoinHeight , setContainerCoinHeight] = useState(0)
    const [TextLeft , setTextLeft] = useState(text.pull_to_deposit)
    const [TextRight , setTextRight] = useState(text.pull_to_withdraw)
    const handleSort = useCallback(()=>{
        dispatch(asyncSortUpDown(!isSortDown))
    },[isSortDown])

    const handleNavigation = useCallback((id)=> {
        navigation.navigate('CoinInfo' , {id})
    },[])

    const RenderLeft = () => {
        return (
            <>
            <View style={[common.center,common.row,{width : '100%' , backgroundColor : '#26A65B' , height : ContainerCoinHeight , alignSelf : 'flex-end', justifyContent : 'flex-end'}]}>
                <Text style={{color : '#fff'}}>{TextLeft}</Text><Image source={deposit} style={{marginHorizontal : 10}}/>
            </View>
            </>
        )
    }

    const RenderRight = () => {
        return (
            <>
            <View style={[common.center,common.row,{width : '100%' , backgroundColor : '#FF0000' , height : ContainerCoinHeight , alignSelf : 'flex-end', justifyContent : 'flex-start'}]}>
            <Image source={withdraw} style={{marginHorizontal : 10}}/><Text style={{color : '#fff'}}>{TextRight}</Text>
            </View>
            </>
        )
    }
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
                    {balances?.balances && balances.balances.map((o, index) => o.coin.show && 
                    <View key={o._id}>
                        <Swipeable 
                        style={[styles.coinContainer, (index !== 0 && {marginTop : 7})]}
                        leftContent={<RenderLeft />} 
                        rightContent={<RenderRight />} 
                        leftActionActivationDistance={200}
                        rightActionActivationDistance={200}
                        onLeftActionComplete={()=> navigation.navigate('Deposit' , {...o})}
                        onLeftActionActivate={() => setTextLeft(text.release_to_deposit)}
                        onLeftActionRelease={()=>setTextLeft(text.pull_to_deposit)}
                        onRightActionComplete={()=> navigation.navigate('Withdraw' , {...o})}
                        onRightActionActivate={() => setTextRight(text.release_to_withdraw)}
                        onRightActionRelease={()=>setTextRight(text.pull_to_withdraw)}
                        >
                            <TouchableOpacity onLayout={(e => setContainerCoinHeight(e.nativeEvent.layout.height))} onPress={()=>handleNavigation(o._id)} key={o._id} >
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
                                        <Number style={[common.textHL]} value={o.balance} showCurrency={false}/>
                                        <Number style={[common.textSub, common.font14]} value={o.locked} showCurrency={false} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Swipeable>
                    </View>
                    )}
                </View>
            </View>
        </View>
    </>)
}