import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView, Alert} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles/'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Dimensions } from 'react-native';
import { asyncGetBalance, asyncGetBalanceDouble, asyncGetCoinPrice } from '../../../store/actions'
import { storage } from '../../../helper'
import { useDispatch, useSelector } from 'react-redux'
// ------------------Icon---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'
import kncicon from '../../../assets/images/IconCoin/KNC.png'
import mchicon from '../../../assets/images/IconCoin/MCH.png'
import tomoicon from '../../../assets/images/IconCoin/TOMO.png'


// ------------------------------------------

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({setOutScrollViewTop}){
    const [Width , setWidth] = useState(0);
    const dispatch = useDispatch();
    const coinNumbers = useSelector(state => state.coinNumbers)
    const route = useRoute();
    

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    const { addressScan } = route.params ?? {}



    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Chọn Coins"/>)
    },[])




      const list = [
        {address: coinNumbers.kdg.address , exchange_rate: coinNumbers.kdg.exchange_rate, balance: coinNumbers.kdg.balance, text: 'KDG', icon: kdgicon, description: 'Kingdom Game 4.0', key: '1'},
        {address: coinNumbers.eth.address , exchange_rate: coinNumbers.eth.exchange_rate, balance: coinNumbers.eth.balance, text: 'ETH', icon: ethicon, description: 'Ethereum', key: '2'},
        {address: coinNumbers.trx.address , exchange_rate: coinNumbers.trx.exchange_rate, balance: coinNumbers.trx.balance, text: 'TRX',icon: trxicon, description: 'Tron', key: '3'},
        {address: coinNumbers.usdt.address , exchange_rate: coinNumbers.usdt.exchange_rate, balance: coinNumbers.usdt.balance, text: 'USDT', icon: usdticon, description: 'Tether', key: '4'},
        {address: coinNumbers.knc.address , exchange_rate: coinNumbers.knc.exchange_rate, balance: coinNumbers.knc.balance, text: 'KNC', icon: kncicon, description: 'Kyber Network', key: '5'},
        {address: coinNumbers.mch.address , exchange_rate: coinNumbers.mch.exchange_rate, balance: coinNumbers.mch.balance, text: 'MCH', icon: mchicon, description: 'Meconcash ', key: '6'},
        {address: coinNumbers.tomo.address , exchange_rate: coinNumbers.tomo.exchange_rate, balance: coinNumbers.tomo.balance, text: 'TOMO', icon: tomoicon, description: 'TomoChain ', key: '7'},
    
      ];


      useEffect(()=>{
        if(addressScan !== undefined){
            Alert.alert(
                'Địa chỉ ví',
                 addressScan
              )
        }
      },[])

    return (
        
        <>

<View style={mainStyles.container}>

    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={withdrawStyle.searchBoxContainer}>
                <View style={{justifyContent: 'center', paddingRight: 10}}>
                    <FontAwesomeIcon color="#8a8c8e" icon={faSearch}/>
                </View>
                <TextInput
                placeholder="Tìm kiếm" 
                placeholderTextColor = "#8a8c8e"
                onFocus={()=>{}} 
                onBlur={()=>{}} 
                onChangeText={value=>setSearchVal(value)} 
                value={searchVal} 
                style={[withdrawStyle.searchBox]} />
            </View>
            
            {
            searchVal ? (
            <View>
                <Text style={{color: 'rgba(241,243,244, 0.5)', fontSize: 12, padding: 10}}>Kết quả</Text>
                <FlatList
                data={list}
                renderItem={({item}) => 
                {
                    if(((item.text).toLowerCase()).startsWith(searchVal.toLowerCase()) || ((item.description).toLowerCase()).startsWith(searchVal.toLowerCase())){
                        return (
                            <View style={withdrawStyle.listContainer}>
                                <TouchableOpacity 
                               onPress={() => 
                                navigation.navigate('WithdrawPage2', {
                                    id: item.text,
                                    balance: item.balance, 
                                    addressScan: addressScan
                                })}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={item.icon} style={{width: 35, height: 35}} />
                                        <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251}}>
                                            <View>
                                                <Text style={withdrawStyle.textList}>{item.text}</Text>
                                                <Text style={withdrawStyle.description}>{item.description}</Text>
                                            </View>
                                            <View style={{paddingRight: (windowWidth*windowHeight)/29376, alignItems: 'flex-end'}}>
                                                <Text style={withdrawStyle.exchangeRate}>{item.balance}</Text>
                                                <Text style={withdrawStyle.nearExchangeRate}>≈ ${item.exchange_rate.usd}</Text>
                                            </View>
                                        </View>
                                    </View>   
                                </TouchableOpacity>
                            </View>
                        )         
                    }
                }
              }
                />
                
            </View>
            
            ) : (
                    <FlatList
                    data={list}
                    renderItem={({item}) => (
                        <View style={withdrawStyle.listContainer}>
                            <TouchableOpacity 
                            onPress={() => 
                                navigation.navigate('WithdrawPage2', {
                                    id: item.text,
                                    balance: item.balance,
                                    addressScan: addressScan
                                })} >
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={item.icon} style={{width: 35, height: 35}} />
                                    <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251}}>
                                        <View>
                                            <Text style={withdrawStyle.textList}>{item.text}</Text>
                                            <Text style={withdrawStyle.description}>{item.description}</Text>
                                        </View>
                                        <View style={{paddingRight: (windowWidth*windowHeight)/29376, alignItems: 'flex-end'}}>
                                            <Text style={withdrawStyle.exchangeRate}>{item.balance}</Text>
                                            <Text style={withdrawStyle.nearExchangeRate}>≈ ${item.exchange_rate.usd}</Text>
                                        </View>
                                    </View>
                                </View>   
                            </TouchableOpacity>
                        </View>
                        )}
                    />

                )
            }

        </View>
    </View>
</View>
        </>
    )
}