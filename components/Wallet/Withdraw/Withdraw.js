import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView, Alert} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles/'
import { withdrawStyleLight } from '../../../styles/light'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Dimensions } from 'react-native';
import { asyncGetBalance, asyncGetBalanceDouble, asyncGetCoinPrice } from '../../../store/actions'
import { storage, checkLanguage} from '../../../helper'
import { useDispatch, useSelector } from 'react-redux'

// ------------------Icon---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'
import kncicon from '../../../assets/images/IconCoin/KNC.png'
import mchicon from '../../../assets/images/IconCoin/MCH.png'
import tomoicon from '../../../assets/images/IconCoin/TOMO.png'
import btcicon from '../../../assets/images/IconCoin/BTC.png'
import calAPI from '../../../axios'


// ------------------------------------------

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const list = [
    {dataName: 'KDG' , coinName: 'KDG', icon: kdgicon, description: 'Kingdom Game 4.0', key: '1'},
    {dataName: 'ETH' , coinName: 'ETH', icon: ethicon, description: 'Ethereum', key: '2'},
    {dataName: 'TRX' , coinName: 'TRX', icon: trxicon, description: 'Tron', key: '3'},
    {dataName: 'USDT' , coinName: 'USDT-ERC20', icon: usdticon, description: 'Tether', key: '4'},
    {dataName: 'USDT' , coinName: 'USDT-TRC20', icon: usdticon, description: 'Tether', key: '8'},
    {dataName: 'KNC' , coinName: 'KNC', icon: kncicon, description: 'Kyber Network', key: '5'},
    {dataName: 'MCH' , coinName: 'MCH', icon: mchicon, description: 'Meconcash ', key: '6'},
    {dataName: 'TOMO' , coinName: 'TOMO', icon: tomoicon, description: 'TomoChain ', key: '7'},
];


export default function App({setOutScrollViewTop}){
    const [Width , setWidth] = useState(0);
    const language = useSelector(state => state.language)

    const display = useSelector(state => state.display)

    const [searchVal, setSearchVal] = useState();
    const [CoinData, setCoinData] = useState([]);
    const navigation = useNavigation()

    const handleGetCoinPrice = useCallback(async ()=>{
        var userData = (await storage('userData').getItem())
        if(!userData) return
        var balance = userData.balances
        if(!balance) return
        for (let index = 0; index < list.length; index++) {
            const _data = list[index];
            const res = (await (await calAPI()).get(`/api/markets/coin_price?coin_type=${_data.dataName}`)).data
            _data.exchange_rate = Number(res.data.price.toFixed(4))
            console.log(_data.coinName);
            var findThisData = balance.find(o => o.coin.code === _data.coinName)
            _data.balance = findThisData.balance
            _data.address = findThisData.wallet.address
        }
        setCoinData([...list])
    },[])

    useEffect(()=> {
        handleGetCoinPrice()
    },[handleGetCoinPrice])


    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={checkLanguage({vi: 'Chọn coin', en: 'Select coin'},language)}/>)
    },[])

var WithdrawStyle = display === 1 ? withdrawStyleLight : withdrawStyle

// ------------------------------------------------------

    return (
        
        <>

<View style={mainStyles.container}>

    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={WithdrawStyle.searchBoxContainer}>
                <View style={{justifyContent: 'center', paddingRight: 10}}>
                    <FontAwesomeIcon color="#8a8c8e" icon={faSearch}/>
                </View>
                <TextInput
                placeholder={checkLanguage({vi: 'Tìm kiếm', en: 'Search'},language)}
                placeholderTextColor = "#8a8c8e"
                onFocus={()=>{}} 
                onBlur={()=>{}} 
                onChangeText={value=>setSearchVal(value)} 
                value={searchVal} 
                style={[WithdrawStyle.searchBox]} />
            </View>
            
            {
            searchVal ? (
            <View>
                <Text style={{color: 'rgba(241,243,244, 0.5)', fontSize: 12, padding: 10}}>{checkLanguage({vi: 'Kết quả', en: `Result`},language)}</Text>
                <FlatList
                data={CoinData}
                renderItem={({item}) => 
                {
                    console.log(item);
                    if(((item.text).toLowerCase()).startsWith(searchVal.toLowerCase()) || ((item.description).toLowerCase()).startsWith(searchVal.toLowerCase())){
                        return (
                            <View style={WithdrawStyle.listContainer}>
                                <TouchableOpacity 
                               onPress={() => 
                                navigation.navigate('WithdrawPage2', {
                                    id: item.coinName,
                                    balance: item.balance, 
                                    price : item.exchange_rate
                                })}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={item.icon} style={{width: 35, height: 35}} />
                                        <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251}}>
                                            <View>
                                                <Text style={WithdrawStyle.textList}>{item.coinName}</Text>
                                                <Text style={WithdrawStyle.description}>{item.description}</Text>
                                            </View>
                                            <View style={{paddingRight: (windowWidth*windowHeight)/29376, alignItems: 'flex-end'}}>
                                                <Text style={WithdrawStyle.exchangeRate}>{item.balance}</Text>
                                                <Text style={WithdrawStyle.nearExchangeRate}>≈ ${item.exchange_rate}</Text>
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
                    data={CoinData}
                    renderItem={({item}) => (
                        <View style={WithdrawStyle.listContainer}>
                            <TouchableOpacity 
                            onPress={() => 
                                navigation.navigate('WithdrawPage2', {
                                    id: item.coinName,
                                    balance: item.balance,
                                    price : item.exchange_rate
                                })} >
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={item.icon} style={{width: 35, height: 35}} />
                                    <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251}}>
                                        <View>
                                            <Text style={WithdrawStyle.textList}>{item.coinName}</Text>
                                            <Text style={WithdrawStyle.description}>{item.description}</Text>
                                        </View>
                                        <View style={{paddingRight: (windowWidth*windowHeight)/29376, alignItems: 'flex-end'}}>
                                            <Text style={WithdrawStyle.exchangeRate}>{item.balance}</Text>
                                            <Text style={WithdrawStyle.nearExchangeRate}>≈ ${item.exchange_rate}</Text>
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