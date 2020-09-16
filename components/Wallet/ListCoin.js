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
    coinPriceUSDT
    }){
    const navigation = useNavigation()
    const [CoinHeight, setCoinHeight] = useState(0)
    const [SwipeList, setSwipeList] = useState([])

    var x = {
        vnd: 'Chưa xác định', usd: 'Chưa xác định', exchange: {
            vnd: 'Chưa xác định', usd: 'Chưa xác định'
          }
    }
    const data = [
        {coinPrice: coinPriceKDG, key: 1, coinName: 'KDG', icon: kdgicon, balance: balanceKDG, address: addressTRX},
        {coinPrice: coinPriceETH, key: 2, coinName: 'ETH', icon: ethicon, balance: balanceETH, address: addressETH},
        {coinPrice: coinPriceTRX, key: 3, coinName: 'TRX', icon: trxicon, balance: balanceTRX, address: addressTRX},
        {coinPrice: coinPriceUSDT, key: 4, coinName: 'USDT', icon: usdticon, balance: balanceUSDT, address: addressETH},
        {coinPrice: x, key: 5, coinName: 'KNC', icon: kncicon, balance: balanceKNC, address: addressETH},
        {coinPrice: x, key: 6, coinName: 'MCH', icon: mchicon, balance: balanceMCH, address: addressETH},
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
                    <Text style={{color: '#fff', fontSize: 12}}>Nhận</Text>
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
                    <Text style={{color: '#fff', fontSize: 12}}>Gửi</Text>
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

                <Swipeable onSwipeableClose={()=>handleSwipeClose(1)} 
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
                            <Text style={walletStyles.coinPirce}>{VisibleBalance ? hiddenBalance : `$${item.coinPrice.exchange.usd}`}</Text>
                            </View>
                        </View>
                        <View style={walletStyles.coinRight}>
                            <Text style={walletStyles.quantity}>{VisibleBalance ? hiddenBalance : item.balance}</Text>
                            <Text style={walletStyles.coinPirce}>{VisibleBalance ? hiddenBalance : `~$${item.coinPrice.usd}`}</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeable>
                }
            />
            
        </View>
        </>
    )
}
