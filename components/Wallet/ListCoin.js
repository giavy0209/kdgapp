import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { walletStyles } from '../../styles/'
import { walletStylesLight } from '../../styles/light'
import { RectButton, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import depositwhite from '../../assets/images/depositwhite.png'
import withdrawwhite from '../../assets/images/withdrawwhite.png'
import { useNavigation } from '@react-navigation/native'
import { checkLanguage, storage } from '../../helper';
import { useDispatch, useSelector } from 'react-redux'
// ------------------Icon---------------------
import kdgicon from '../../assets/images/IconCoin/KDG.png'
import ethicon from '../../assets/images/IconCoin/ETH.png'
import trxicon from '../../assets/images/IconCoin/TRX.png'
import usdticon from '../../assets/images/IconCoin/USDT.png'
import kncicon from '../../assets/images/IconCoin/KNC.png'
import mchicon from '../../assets/images/IconCoin/MCH.png'
import tomoicon from '../../assets/images/IconCoin/TOMO.png'
import btcicon from '../../assets/images/IconCoin/BTC.png'
import calAPI from '../../axios';
// ------------------------------------------
const data = [
    { dataName: 'KDG', coinName: 'KDG', icon: kdgicon },
    { dataName: 'ETH', coinName: 'ETH', icon: ethicon },
    { dataName: 'TRX', coinName: 'TRX', icon: trxicon },
    { dataName: 'USDT', coinName: 'USDT-ERC20', icon: usdticon },
    { dataName: 'USDT', coinName: 'USDT-TRC20', icon: usdticon },
    { dataName: 'KNC', coinName: 'KNC', icon: kncicon },
    { dataName: 'MCH', coinName: 'MCH', icon: mchicon },
    { dataName: 'TOMO', coinName: 'TOMO', icon: tomoicon },
]

export default function App({
    VisibleBalance,
    hiddenBalance,
    isShortCoin,
    isTapSort,
    CoinData
}) {
    const navigation = useNavigation()
    const [CoinHeight, setCoinHeight] = useState(0)
    const [SwipeList, setSwipeList] = useState([])
    const typeCurrency = useSelector(state => state.currency)
    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)

    var WalletStyle = display === 1 ? walletStylesLight : walletStyles

    const renderLeftActions = useCallback((id, address) => {
        return (
            <RectButton>
                <Animated.View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DepositPage2', {
                                id: id,
                                address: address,
                            })
                        }}
                        style={[WalletStyle.coinSwipeRight,
                        { height: CoinHeight }]}>
                        <Image source={depositwhite} />
                        <Text style={{ color: '#fff', fontSize: 12 }}>{checkLanguage({ vi: 'Nạp', en: 'Deposit' }, language)}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </RectButton>
        );
    }, [CoinHeight, language]);

    const renderRightActions = useCallback((id, balance, price) => {
        return (
            <RectButton>
                <Animated.View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('WithdrawPage2', {
                                id: id,
                                balance: balance,
                                price
                            })
                        }}
                        style={[WalletStyle.coinSwipeLeft,
                        { height: CoinHeight }]}>
                        <Image source={withdrawwhite} />
                        <Text style={{ color: '#fff', fontSize: 12 }}>{checkLanguage({ vi: 'Rút', en: 'Withdraw' }, language)}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </RectButton>
        );
    }, [CoinHeight, language]);

    const handleSwipeClose = useCallback((id) => {
        var index = SwipeList.findIndex(o => o.id === id)
        if (index !== - 1) SwipeList.splice(index, 1)
        setSwipeList([...SwipeList])
    }, [SwipeList])

    const CheckIncludes = useCallback(id => {
        var index = SwipeList.findIndex(o => o.id === id);
        if (index !== -1) return SwipeList[index].dir
        else return false
    }, [SwipeList])

    return (
        <>
            <View style={WalletStyle.listCoin}>
                <View style={WalletStyle.maskOpacity}></View>
                
                {
                    CoinData.map((item, index) => 
                        {
                            if(item.display){
                                return <Swipeable 
                                onSwipeableClose={() => handleSwipeClose(1)}
                                key={index}
                                renderRightActions={() => renderRightActions(item.coinName, item.balance, item.coinPrice)}
                                renderLeftActions={() => renderLeftActions(item.coinName, item.balance, item.address)}
                                >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('History', {
                                            id: item.coinName,
                                            address: item.address,
                                            balance: item.balance,
                                            coinPrice: item.coinPrice
                                        })}
                                        onLayout={e => setCoinHeight(e.nativeEvent.layout.height)} style={[WalletStyle.coin,]}>
                                        <View style={[WalletStyle.maskOpacity2,
                                        CheckIncludes(1) === 'left' ? { backgroundColor: '#868d97', opacity: .5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } :
                                            CheckIncludes(1) === 'right' && { backgroundColor: '#868d97', opacity: .5, borderTopRightRadius: 0, borderBottomRightRadius: 0 }
                                        ]}></View>
                                        <View style={WalletStyle.coinLeft}>
                                            <Image style={{ width: 30, height: 30 }} source={item.icon} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={WalletStyle.coinName}>{item.coinName}</Text>
                                                <Text style={WalletStyle.coinPirce}>
                                                    {
                                                        VisibleBalance ? hiddenBalance : typeCurrency === 1 ? `${item.coinPrice} ₫` : `$${item.coinPrice}`
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={WalletStyle.coinRight}>
                                            <Text style={WalletStyle.quantity}>
                                                {
                                                    VisibleBalance ? hiddenBalance
                                                    :
                                                    Math.floor(item.balance * 10000) / 10000
                                                }
                                            </Text>
                                            <Text style={WalletStyle.coinPirce}>
                                                {
                                                    VisibleBalance ? hiddenBalance
                                                    :
                                                    `${typeCurrency === 0 ? '$' : ''}${Math.floor(item.balance * Number(item.coinPrice) * 10000) / 10000}${typeCurrency === 1 ? '₫' : ''}`
                                                }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Swipeable>    
                            }
                        }
                    )
                }

            </View>
        </>
    )
}
