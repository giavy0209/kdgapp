import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {  View, Text, Image, StyleSheet,Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { walletStyles} from '../../styles/'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import coin from '../../assets/images/coin.png'
import depositwhite from '../../assets/images/depositwhite.png'
import withdrawwhite from '../../assets/images/withdrawwhite.png'
import { useNavigation } from '@react-navigation/native';
export default function App({VisibleBalance,hiddenBalance}){
    const navigation = useNavigation()
    const [CoinHeight, setCoinHeight] = useState(0)
    const [SwipeList, setSwipeList] = useState([])
    const renderLeftActions = useCallback((progress, dragX) => {
        return (
          <RectButton>
            <Animated.View>
                <TouchableOpacity style={[walletStyles.coinSwipeRight, {height: CoinHeight}]}>
                    <Image source={depositwhite}/>
                    <Text style={{color: '#fff', fontSize: 12}}>Nhận</Text>
                </TouchableOpacity>
            </Animated.View>
          </RectButton>
        );
    },[CoinHeight]);

    const renderRightActions = useCallback((id) => {
        return (
          <RectButton>
            <Animated.View>
                <TouchableOpacity style={[walletStyles.coinSwipeLeft, {height: CoinHeight}]}>
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
            <Swipeable onSwipeableClose={()=>handleSwipeClose(1)} 
            onSwipeableRightOpen={()=>handleSwipeOpen({id: 1, dir: 'right'})} 
            onSwipeableLeftOpen={()=>handleSwipeOpen({id: 1, dir: 'left'})} 
            renderRightActions={()=>renderRightActions(1)} 
            renderLeftActions={()=>renderLeftActions(1)}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('History')}
                onLayout={e=>setCoinHeight(e.nativeEvent.layout.height)} style={[walletStyles.coin,]}>
                    <View style={[walletStyles.maskOpacity,{opacity: .4}, 
                    CheckIncludes(1) === 'left' ? {backgroundColor : '#868d97', opacity: .5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0} :
                    CheckIncludes(1) === 'right' &&  {backgroundColor : '#868d97', opacity: .5, borderTopRightRadius: 0, borderBottomRightRadius: 0}
                    ]}></View>
                    <View style={walletStyles.coinLeft}>
                        <Image source={coin}/>
                        <View style={{marginLeft: 8}}>
                        <Text style={walletStyles.coinName}>KDG</Text>
                        <Text style={walletStyles.coinPirce}>{VisibleBalance ? hiddenBalance : '$0.020'}</Text>
                        </View>
                    </View>
                    <View style={walletStyles.coinRight}>
                        <Text style={walletStyles.quantity}>{VisibleBalance ? hiddenBalance : '0'}</Text>
                        <Text style={walletStyles.coinPirce}>{VisibleBalance ? hiddenBalance : '~$0'}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeable>

            <Swipeable onSwipeableClose={()=>handleSwipeClose(2)} 
            onSwipeableRightOpen={()=>handleSwipeOpen({id: 2, dir: 'right'})} 
            onSwipeableLeftOpen={()=>handleSwipeOpen({id: 2, dir: 'left'})} 
            renderRightActions={()=>renderRightActions(2)} 
            renderLeftActions={()=>renderLeftActions(2)}>
                <View onLayout={e=>setCoinHeight(e.nativeEvent.layout.height)} style={[walletStyles.coin,]}>
                    <View style={[walletStyles.maskOpacity,{opacity: .4}, 
                    CheckIncludes(2) === 'left' ? {backgroundColor : '#868d97', opacity: .5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0} :
                    CheckIncludes(2) === 'right' &&  {backgroundColor : '#868d97', opacity: .5, borderTopRightRadius: 0, borderBottomRightRadius: 0}
                ]}></View>

                    <View style={walletStyles.coinLeft}>
                        <Image source={coin}/>
                        <View style={{marginLeft: 8}}>
                        <Text style={walletStyles.coinName}>KDG</Text>
                        <Text style={walletStyles.coinPirce}>$0.020</Text>
                        </View>
                    </View>
                    <View style={walletStyles.coinRight}>
                        <Text style={walletStyles.quantity}>0</Text>
                        <Text style={walletStyles.coinPirce}>~$0</Text>
                    </View>

                </View>
            </Swipeable>
        </View>
        </>
    )
}
