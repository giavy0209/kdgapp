import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles'
import {Header2} from '../../Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { storage } from '../../../helper'
import { asyncGetBalanceDouble } from '../../../store/actions'
import { useDispatch } from 'react-redux'
// ------------------Icon---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'


// ------------------------------------------

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({setOutScrollViewTop}){
    const [Width , setWidth] = useState(0);
    const dispatch = useDispatch();
    // ----------Balance Coin -----------
    const [KGDBalance, setKDGBalance] = useState(0);
    const [TRXBalance, setTRXBalance] = useState(0);
    const [ETHBalance, setETHBalance] = useState(0);
    const [USDTBalance, setUSDTBalance] = useState(0);
    // ----------------------------------
    const list = [
        {balance: KGDBalance, text: 'KDG', icon: kdgicon, description: 'Kingdom Game 4.0', key: '1'},
        {balance: TRXBalance, text: 'ETH', icon: ethicon, description: 'Ethereum', key: '2'},
        {balance: ETHBalance, text: 'TRX',icon: trxicon, description: 'Tron', key: '3'},
        {balance: USDTBalance, text: 'USDT', icon: usdticon, description: 'Tether', key: '4'},
      ];
  // ----------Address Coin -----------
   const [TRXAddress, setTRXAddress] = useState('');
   const [ETHAddress, setETHAddress] = useState('');
  // ----------------------------------

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Chọn Coins"/>)
    },[])

    useEffect(() => {
        async function getwalletBlance() {
          var userinfo = await storage('_id').getItem();
          setTRXAddress(userinfo.trx_address);
          setETHAddress(userinfo.erc_address);
          dispatch(asyncGetBalanceDouble(userinfo.erc_address, userinfo.trx_address))
          .then(({resETH, resTRX})=>{
            setKDGBalance(resTRX.data.kdg_balance)
            setTRXBalance(resTRX.data.trx_balance)
            setETHBalance(resETH.data.eth_balance)
            setUSDTBalance(resETH.data.usdt_balance)
          })
          
          .catch(console.log)
        }
       getwalletBlance()
      }, [])    



    return (
        
        <>

<View style={mainStyles.container}>

    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={withdrawStyle.searchBoxContainer}>
                <View style={withdrawStyle.iconSearch}>
                    <FontAwesomeIcon color="#8a8c8e" icon={faSearch}/>
                </View>
                <TextInput
                placeholder="Tìm kiếm" 
                placeholderTextColor = "#8a8c8e"
                onFocus={()=>{}} 
                onBlur={()=>{}} 
                onChangeText={value=>setSearchVal(value)} 
                value={searchVal} 
                style={withdrawStyle.searchBox} />
            </View>
            

            {
            searchVal ? (
            <View>
                <Text style={{color: 'rgba(241,243,244, 0.5)', fontSize: 12, padding: 10}}>Kết quả</Text>
            </View>
            ) : null
            }

            <ScrollView>
                <FlatList
                data={list}
                renderItem={({item}) => (
                    <View style={withdrawStyle.listContainer}>
                        <TouchableOpacity 
                        onPress={() => 
                        navigation.navigate('DepositPage2', {
                            id: item.text, 
                            address: item.text === 'KDG' || item.text === 'TRX' ? TRXAddress : ETHAddress,
                            icon: item.icon
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
                                        <Text style={withdrawStyle.nearExchangeRate}>≈ $1</Text>
                                    </View>
                                </View>
                            </View>   
                        </TouchableOpacity>
                    </View>
                )}
                />
                <View>
                    <Text>{searchVal}</Text>
                </View>
            </ScrollView>  

        </View>
    </View>
</View>
        </>
    )
}