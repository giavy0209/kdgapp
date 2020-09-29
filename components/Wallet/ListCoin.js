import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {  View, Text, Image, StyleSheet,Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { walletStyles} from '../../styles/'
import { walletStylesLight} from '../../styles/light'
import { RectButton, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import depositwhite from '../../assets/images/depositwhite.png'
import withdrawwhite from '../../assets/images/withdrawwhite.png'
import { useNavigation } from '@react-navigation/native'
import { checkLanguage } from '../../helper';
import { useSelector } from 'react-redux'
// ------------------Icon---------------------
import kdgicon from '../../assets/images/IconCoin/KDG.png'
import ethicon from '../../assets/images/IconCoin/ETH.png'
import trxicon from '../../assets/images/IconCoin/TRX.png'
import usdticon from '../../assets/images/IconCoin/USDT.png'
import kncicon from '../../assets/images/IconCoin/KNC.png'
import mchicon from '../../assets/images/IconCoin/MCH.png'
import tomoicon from '../../assets/images/IconCoin/TOMO.png'
import btcicon from '../../assets/images/IconCoin/BTC.png'
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
    balanceTOMO,
    balanceBTC,
    addressTRX,
    addressETH,
    addressTOMO,
    addressBTC,
    coinPriceKDG,
    coinPriceETH,
    coinPriceTRX,
    coinPriceUSDT,
    coinPriceKNC,
    coinPriceMCH,
    coinPriceTOMO,
    coinPriceBTC,
    coinDisplay,
    isShortCoin,
    isTapSort
    }){
    const navigation = useNavigation()
    const [CoinHeight, setCoinHeight] = useState(0)
    const [SwipeList, setSwipeList] = useState([])
    const typeCurrency = useSelector(state => state.currency)
 
    const language = useSelector(state => state.language)
    // if (typeof isDisplay) {
    //     console.log(coinDisplay)
    // }
    const data = [
        {coinPrice: coinPriceKDG, isDisplay: coinDisplay ? coinDisplay.kdg : true, key: 1, coinName: 'KDG', icon: kdgicon, balance: balanceKDG, address: addressTRX},
        {coinPrice: coinPriceBTC, isDisplay: coinDisplay ? coinDisplay.btc : true, key: 2, coinName: 'BTC', icon: btcicon, balance: balanceBTC, address: addressBTC},
        {coinPrice: coinPriceETH, isDisplay: coinDisplay ? coinDisplay.eth : true, key: 3, coinName: 'ETH', icon: ethicon, balance: balanceETH, address: addressETH},
        {coinPrice: coinPriceTRX, isDisplay: coinDisplay ? coinDisplay.trx : true, key: 4, coinName: 'TRX', icon: trxicon, balance: balanceTRX, address: addressTRX},
        {coinPrice: coinPriceUSDT, isDisplay: coinDisplay ? coinDisplay.usdt : true, key: 5, coinName: 'USDT', icon: usdticon, balance: balanceUSDT, address: addressETH, addressTRC: addressTRX},
        {coinPrice: coinPriceKNC, isDisplay: coinDisplay ? coinDisplay.knc : true, key: 6, coinName: 'KNC', icon: kncicon, balance: balanceKNC, address: addressETH},
        {coinPrice: coinPriceMCH, isDisplay: coinDisplay ? coinDisplay.mch : true, key: 7, coinName: 'MCH', icon: mchicon, balance: balanceMCH, address: addressETH},
        {coinPrice: coinPriceTOMO, isDisplay: coinDisplay ? coinDisplay.tomo : true, key: 8, coinName: 'TOMO', icon: tomoicon, balance: balanceTOMO, address: addressTOMO},
    ]


    const display = useSelector(state => state.display)

    // -------------------style------------------------------

var WalletStyle = display === 1 ? walletStylesLight : walletStyles

// ------------------------------------------------------
    const renderLeftActions = useCallback((id, balance, address, addressTRC) => {
        return (
          <RectButton>
            <Animated.View>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('DepositPage2', {
                        id: id,
                        address: address,
                        addressTRC: addressTRC
                                                
                    })}}
                    style={[WalletStyle.coinSwipeRight, 
                    {height: CoinHeight}]}>
                    <Image source={depositwhite}/>
                    <Text style={{color: '#fff', fontSize: 12}}>{checkLanguage({vi: 'Nạp', en: 'Deposit'},language)}</Text>
                </TouchableOpacity>
            </Animated.View>
          </RectButton>
        );
    },[CoinHeight, language]);

    const renderRightActions = useCallback((id, balance) => {
        return (
          <RectButton>
            <Animated.View>
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('WithdrawPage2', {
                        id: id,
                        balance: balance
                    })}}
                    style={[WalletStyle.coinSwipeLeft, 
                    {height: CoinHeight}]}>
                    <Image source={withdrawwhite}/>
                    <Text style={{color: '#fff', fontSize: 12}}>{checkLanguage({vi: 'Rút', en: 'Withdraw'},language)}</Text>
                </TouchableOpacity>
            </Animated.View>
          </RectButton>
        );
    },[CoinHeight,language]);

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
    
    let rowRefs = new Map();
    return (
        <>
        <View style={WalletStyle.listCoin}>
            <View style={WalletStyle.maskOpacity}></View>
            <FlatList
                data={isTapSort === false ? data : isShortCoin === true ? 
                    data.sort(function(a, b){
                        return parseFloat(a.coinPrice.usd)  < parseFloat(b.coinPrice.usd);
                    })
                    :       data.sort(function(a, b){
                        return parseFloat(a.coinPrice.usd) > parseFloat(b.coinPrice.usd);
                    })
                }

                renderItem={({item, index}) =>
                {if(item.isDisplay === true)
                return <Swipeable onSwipeableClose={()=>handleSwipeClose(1)} 
                    // onSwipeableRightOpen={()=>handleSwipeOpen({id: item.coinName, dir: 'right'})} 
                    // onSwipeableLeftOpen={()=>handleSwipeOpen({id: item.coinName, dir: 'left'})} 
                    key={index}
                    ref={ref => {
                    if (ref && !rowRefs.get(index)) {
                        rowRefs.set(index, ref);
                    }
                    }}
                    onSwipeableWillOpen={()=>{
                        [...rowRefs.entries()].forEach(([key, ref]) => {
                        if (key !== index && ref) ref.close();
                        });
                    }}
                    renderRightActions={()=>renderRightActions(item.coinName, item.balance)} 
                    renderLeftActions={()=>renderLeftActions(item.coinName, item.balance, item.address, item.addressTRC ? item.addressTRC : '',)}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('History', {
                        id: item.coinName,
                        address: item.address,
                        addressTRC: item.addressTRC ? item.addressTRC : '',
                        balance: item.balance,
                        coinPrice: item.coinPrice
                    })}
                    onLayout={e=>setCoinHeight(e.nativeEvent.layout.height)} style={[WalletStyle.coin,]}>
                        <View style={[WalletStyle.maskOpacity2, 
                        CheckIncludes(1) === 'left' ? {backgroundColor : '#868d97', opacity: .5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0} :
                        CheckIncludes(1) === 'right' &&  {backgroundColor : '#868d97', opacity: .5, borderTopRightRadius: 0, borderBottomRightRadius: 0}
                        ]}></View>
                        <View style={WalletStyle.coinLeft}>
                            <Image style={{width: 30, height: 30}} source={item.icon}/>
                            <View style={{marginLeft: 8}}>
                                <Text style={WalletStyle.coinName}>{item.coinName}</Text>
                            <Text style={WalletStyle.coinPirce}>{VisibleBalance ? hiddenBalance : typeCurrency === 1 ? `${item.coinPrice.exchange.vnd} ₫` : typeCurrency === 2 ? `¥${item.coinPrice.exchange.cny}` : `$${item.coinPrice.exchange.usd}`}</Text>
                            </View>
                        </View>
                        <View style={WalletStyle.coinRight}>
                            <Text style={WalletStyle.quantity}>{VisibleBalance ? hiddenBalance : item.balance !== undefined && !isNaN(item.balance) ?  item.balance :'Loading...'}</Text>
                            <Text style={WalletStyle.coinPirce}>{VisibleBalance ? hiddenBalance : item.coinPrice.usd !== undefined && !isNaN(item.coinPrice.usd) ? typeCurrency === 1 ? `~${item.coinPrice.vnd} ₫` :  typeCurrency === 2 ? `~¥${item.coinPrice.cny}` : `~$${item.coinPrice.usd}` : 'Loading...'} </Text>
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
