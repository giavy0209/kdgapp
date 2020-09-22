import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView, Alert} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles/'
import {Header2} from '../../Header'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { asyncExportPrivateKey } from '../../../store/actions'
import { useDispatch } from 'react-redux'
import Popup from '../../Popup/Popup'
import PopupInputPassword from '../../Popup/PopupInputPassword'
// ------------------Icon---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'
import kncicon from '../../../assets/images/IconCoin/KNC.png'
import mchicon from '../../../assets/images/IconCoin/MCH.png'
import { storage } from '../../../helper'


// ------------------------------------------
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({setOutScrollViewTop}){
    const dispatch = useDispatch();
    const [Width , setWidth] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleInput, setModalVisibleInput] = useState(false);
    const [Error, setError] = useState()
      
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
      };
    
  
    const [PasswordPrivate, setPasswordPrivate] = useState('');
    const [CoinSelected, setCoinSelected] = useState();


    const [list, setList] = useState([
        {short_name: 'KDG', text: 'KDG private key', icon: kdgicon, description: 'Kingdom Game 4.0', key: '1'},
        {short_name: 'ETH', text: 'ETH private key',icon: ethicon, description: 'Ethereum', key: '2'},
        {short_name: 'TRX', text: 'TRX private key', icon: trxicon, description: 'KTron', key: '3'},
        {short_name: 'USDT', text: 'USDT private key', icon: usdticon, description: 'Tether', key: '4'},
        {short_name: 'KNC', text: 'KNC private key', icon: kncicon, description: 'Kyber Network', key: '5'},
        {short_name: 'MCH', text: 'MCH private key', icon: mchicon, description: 'Meconcash', key: '6'},
    
      ]);

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Chọn Coins"/>)
    },[])

    // const submitPasswordHandler = (password, CoinSelected) => {
    //     console.log("Password is: " + password)
    //     console.log("Coin is: " + coin_name)
    // }


    const submitPasswordHandler = useCallback(async (pass_private, coin_name) => {
        setModalVisibleInput(false)
        var userinfo = await storage('_id').getItem();
        if(coin_name === 'USDT' || coin_name === 'ETH' || coin_name === 'KNC'|| coin_name === 'MCH'){
            var coinType = 'erc'
            var coinAdress = userinfo.erc_address
        }else{
            var coinType = 'trx'
            var coinAdress = userinfo.trx_address
        }

        dispatch(asyncExportPrivateKey({id: userinfo._id, password: pass_private, coin_type: coinType}))
        .then((res)=>{

            if(res.status === 1 && res.msg === 'wrong password'){
                setError('Mật khẩu không chính xác')
                toggleModal()
                setPasswordPrivate('')
                return
            }
            if(res.status === 0){
                setError('Đã có lỗi xảy ra')
                toggleModal()
                setPasswordPrivate('')
                return
            }
            if(res.status === 1){
                navigation.navigate('PrivateKey', {
                    coinAdress: coinAdress,
                    coinPrivate: res.privateKey,
                    coinName: coin_name
                })
            
                setPasswordPrivate('')
                return
            }

        })
        .catch(console.log)
        

    }, [PasswordPrivate])



    const selectCoinHandler = (value) => {
        setModalVisibleInput(true)
        setCoinSelected(value)
    }


    return (
        
        <>

<View style={mainStyles.container}>
        
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
     <Popup type='failed' title={Error} isModalVisible={isModalVisible}/>
     
     <PopupInputPassword 
        toCancel={() => setModalVisibleInput(false)} 
        toSubmit={() => submitPasswordHandler(PasswordPrivate, CoinSelected)}
        toChangeText={(value) => setPasswordPrivate(value)} 
        isModalVisible={isModalVisibleInput}/>
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={[withdrawStyle.searchBoxContainer, {alignItems: 'center'}]}>
                <FontAwesomeIcon color="#8a8c8e" icon={faSearch}/>
                <TextInput
                placeholder="Tìm kiếm" 
                placeholderTextColor = "#8a8c8e"
                onFocus={()=>{}} 
                onBlur={()=>{}} 
                onChangeText={value=>setSearchVal(value)} 
                value={searchVal} 
                style={[withdrawStyle.searchBox, {paddingLeft: 5}]} />
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
                            return <View style={withdrawStyle.listContainer}>
                                <TouchableOpacity 
                                // onPress={() => 
                                // navigation.navigate('PrivateKey', {
                                // coinID: item.key,
                                // coinName: item.text
                                // })} 
                                onPress={() => selectCoinHandler(item.short_name)}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={item.icon} style={{width: 35, height: 35}} />
                                        <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251, alignItems: 'center'}}>
                                            <View>
                                                <Text style={{color: '#fff'}}>{item.text}</Text>
                                            </View>
                                            <View style={{paddingRight: (windowWidth*windowHeight)/29376}}>
                                                <FontAwesomeIcon color="rgba(0,0,0,0)" size={12} icon={faChevronDown}/>
                                            </View>
                                        </View>
                                    </View>   
                                </TouchableOpacity>
                            </View>
                        }
                
                    }
                }
                />
            </View>
            ) :  <FlatList
            data={list}
            renderItem={({item}) => (
                <View style={withdrawStyle.listContainer}>
                    <TouchableOpacity 
                      // onPress={() => 
                                // navigation.navigate('PrivateKey', {
                                // coinID: item.key,
                                // coinName: item.text
                                // })} 
                                onPress={() => selectCoinHandler(item.short_name)}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Image source={item.icon} style={{width: 35, height: 35}} />
                            <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251, alignItems: 'center'}}>
                                <View>
                                    <Text style={{color: '#fff'}}>{item.text}</Text>
                                </View>
                                <View style={{paddingRight: (windowWidth*windowHeight)/29376}}>
                                    <FontAwesomeIcon color="rgba(0,0,0,0)" size={12} icon={faChevronDown}/>
                                </View>
                            </View>
                        </View>   
                    </TouchableOpacity>
                </View>
            )}
            />
            }
               
        </View>
    </View>
</View>
        </>
    )
}