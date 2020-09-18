import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {  View, Text, Image, StyleSheet,Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { walletStyles} from '../../styles/'
import { RectButton, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import depositwhite from '../../assets/images/depositwhite.png'
import withdrawwhite from '../../assets/images/withdrawwhite.png'
import { useNavigation } from '@react-navigation/native'

// ------------------Icon---------------------
import kdgicon from '../../assets/images/IconCoin/KDG.png'
import ethicon from '../../assets/images/IconCoin/ETH.png'
import trxicon from '../../assets/images/IconCoin/TRX.png'
import usdticon from '../../assets/images/IconCoin/USDT.png'
import kncicon from '../../assets/images/IconCoin/KNC.png'
import mchicon from '../../assets/images/IconCoin/MCH.png'
import { useSelector } from 'react-redux';
// ------------------------------------------

export default function App({
    VisibleBalance,
    hiddenBalance, 
    balanceKDG, 
    balanceTRX, 
    balanceETH, 
    balanceUSDT,
    balanceKNC,
    balanceMCH,
    addressTRX,
    addressETH,
    coinPriceKDG,
    coinPriceETH,
    coinPriceTRX,
    coinPriceUSDT,
    coinPriceKNC,
    coinPriceMCH,
    coinDisplay
    }){
    const navigation = useNavigation()
    const [CoinHeight, setCoinHeight] = useState(0)
    const [SwipeList, setSwipeList] = useState([])
    const typeCurrency = useSelector(state => state.currency)
    const data = [
        {isDisplay: coinDisplay.kdg, coinPrice: coinPriceKDG, key: 1, coinName: 'KDG', icon: kdgicon, balance: balanceKDG, address: addressTRX},
        {isDisplay: coinDisplay.eth, coinPrice: coinPriceETH, key: 2, coinName: 'ETH', icon: ethicon, balance: balanceETH, address: addressETH},
        {isDisplay: coinDisplay.trx, coinPrice: coinPriceTRX, key: 3, coinName: 'TRX', icon: trxicon, balance: balanceTRX, address: addressTRX},
        {isDisplay: coinDisplay.usdt, coinPrice: coinPriceUSDT, key: 4, coinName: 'USDT', icon: usdticon, balance: balanceUSDT, address: addressETH},
        {isDisplay: coinDisplay.knc, coinPrice: coinPriceKNC, key: 5, coinName: 'KNC', icon: kncicon, balance: balanceKNC, address: addressETH},
        {isDisplay: coinDisplay.mch, coinPrice: coinPriceMCH, key: 6, coinName: 'MCH', icon: mchicon, balance: balanceMCH, address: addressETH},
    ]

    const renderLeftActions = useCallback((id, balance, address) => {
        return (
          <RectButton>
            <Animated.View>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('DepositPage2', {
                        id: id,
                        address: address
                    })}}
                    style={[walletStyles.coinSwipeRight, 
                    {height: CoinHeight}]}>
                    <Image source={depositwhite}/>
                    <Text style={{color: '#fff', fontSize: 12}}>Nạp</Text>
                </TouchableOpacity>
            </Animated.View>
          </RectButton>
        );
    },[CoinHeight]);

    const renderRightActions = useCallback((id, balance) => {
        return (
          <RectButton>
            <Animated.View>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('WithdrawPage2', {
                        id: id,
                        balance: balance
                    })}}
                    style={[walletStyles.coinSwipeLeft, 
                    {height: CoinHeight}]}>
                    <Image source={withdrawwhite}/>
                    <Text style={{color: '#fff', fontSize: 12}}>Rút</Text>
                </TouchableOpacity>
            </Animated.View>
          </RectButton>
        );
    },[CoinHeight]);

    const handleSwipeOpen = useCallback((obj)=>{
        var index = SwipeList.findIndex(o => o.id === obj.id)
        if(index === -1) SwipeList.push(obj)
        setSwipeList([...SwipeList])
    },[SwipeList])

    const handleSwipeClose = useCallback((id)=>{
        var index = SwipeList.findIndex(o => o.id === id)
        if(index !== - 1) SwipeList.splice(index , 1)
        setSwipeList([...SwipeList])
    },[SwipeList])

    const CheckIncludes = useCallback(id=>{
        var index = SwipeList.findIndex(o => o.id === id);
        if(index !== -1) return SwipeList[index].dir
        else return false
    },[SwipeList])

    return (
        <>
        <View style={walletStyles.listCoin}>
            <View style={walletStyles.maskOpacity}></View>
            <FlatList
                data={data}
                renderItem={({item}) =>
                {if(item.isDisplay === true)
                return <Swipeable onSwipeableClose={()=>handleSwipeClose(1)} 
                    onSwipeableRightOpen={()=>handleSwipeOpen({id: item.coinName, dir: 'right'})} 
                    onSwipeableLeftOpen={()=>handleSwipeOpen({id: item.coinName, dir: 'left'})} 
                    renderRightActions={()=>renderRightActions(item.coinName, item.balance)} 
                    renderLeftActions={()=>renderLeftActions(item.coinName, item.balance, item.address)}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('History', {
                        id: item.coinName,
                        address: item.address,
                        balance: item.balance,
                        coinPrice: item.coinPrice
                    })}
                    onLayout={e=>setCoinHeight(e.nativeEvent.layout.height)} style={[walletStyles.coin,]}>
                        <View style={[walletStyles.maskOpacity,{opacity: .4}, 
                        CheckIncludes(1) === 'left' ? {backgroundColor : '#868d97', opacity: .5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0} :
                        CheckIncludes(1) === 'right' &&  {backgroundColor : '#868d97', opacity: .5, borderTopRightRadius: 0, borderBottomRightRadius: 0}
                        ]}></View>
                        <View style={walletStyles.coinLeft}>
                            <Image style={{width: 30, height: 30}} source={item.icon}/>
                            <View style={{marginLeft: 8}}>
                                <Text style={walletStyles.coinName}>{item.coinName}</Text>
                            <Text style={walletStyles.coinPirce}>{VisibleBalance ? hiddenBalance : typeCurrency === 1 ? `${item.coinPrice.exchange.vnd} ₫` : typeCurrency === 2 ? `¥${item.coinPrice.exchange.cny}` : `$${item.coinPrice.exchange.usd}`}</Text>
                            </View>
                        </View>
                        <View style={walletStyles.coinRight}>
                            <Text style={walletStyles.quantity}>{VisibleBalance ? hiddenBalance : item.balance}</Text>
                            <Text style={walletStyles.coinPirce}>{VisibleBalance ? hiddenBalance : typeCurrency === 1 ? `~$${item.coinPrice.vnd} ₫` :  typeCurrency === 2 ? `~¥${item.coinPrice.cny}` : `~$${item.coinPrice.usd}` }</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeable>
                }
            }
            />
            
        </View>
        </>
    )
}
