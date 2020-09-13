import React, { useState, useEffect , useCallback} from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, Alert} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles/'
import {Header2} from '../../Header'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../assets/images/logo.png'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native';
import { storage } from '../../../helper';
import { asyncGetCoinPrice, asyncWithdraw } from '../../../store/actions'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App(){
    
    const typeCurrency = useSelector(state => state.currency)
    
    const [Width , setWidth] = useState(0);

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();


    // --------Value Submit----------
    const [ToAddress, setToAddress] = useState('')
    const [ValueSend, setValueSend] = useState('')
    const [Token, setToken] = useState('');
    // -------------------------------


    const [CoinPriceVND, setCoinPriceVND] = useState(0);
    const [CoinPriceUSD, setCoinPriceUSD] = useState(0);

    // const {id} = route.params;
    const coinName = route.params.id;
    const coinBalance = route.params.balance;
    const inputNumberHandler = (value) => {

        // dispatch(asyncGetCoinPrice(`${coinName}VND`))
        // .then((res)=>{
        //     var exchange_rate = res.data
        //     var coin_price = exchange_rate*value
        //     setCoinPriceVND(coin_price)
        // })
        // .catch(console.log) 

        // dispatch(asyncGetCoinPrice('USDVND'))
        // .then((res)=>{
        //     // var exchange_rate = res.data
        //     // var coin_price = exchange_rate*value
        //     // setCoinPriceVND(coin_price)
        //     console.log(res);
        // })
        // .catch(console.log) 

        
        dispatch(asyncGetCoinPrice(`${coinName}VND`))
        .then(({resVND, resUSDVND})=>{
            var exchange_rate_USD_VND = resUSDVND.data
            var exchange_rate = resVND.data
            var coin_price_VND = exchange_rate*value
            var coin_price_USD = coin_price_VND/exchange_rate_USD_VND
            setCoinPriceVND(coin_price_VND.toFixed(2))
            setCoinPriceUSD(coin_price_USD.toFixed(4));
        })
        .catch(console.log) 
    }


    const withdraw = useCallback(async () => {
        var userinfo = await storage('_id').getItem();
        var withdraw_type = coinName.toLowerCase();
        dispatch(asyncWithdraw({userId: userinfo._id, value: ValueSend, deposit_type: withdraw_type, toAddress: ToAddress, token: Token}))
        .then((res)=>{
            console.log(res);
            if(res.status === 1 ){
                Alert.alert(
                    "Thông báo",
                    `Đã chuyển thành công ${ValueSend} KDG`,
                )
                return;
            }
        })
        .catch(console.log)
    }, [ToAddress, Token])
    return (
        <>
<View style={mainStyles.container}>
    <Header2 title={"Gửi " +  coinName}/>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} > 
        <View style={withdrawStyle.balanceContainer}>
            <View style={{flexDirection: 'row'}}>
                <Image source={coin} style={{width: windowWidth*windowHeight/11750, height: windowWidth*windowHeight/11750}} />
                <View style={{paddingLeft: (windowWidth*windowHeight)/23040}}>
                    <Text style={withdrawStyle.coinName}>{coinName}</Text>
                    <Text style={withdrawStyle.balance}>Số dư: {coinBalance + " " + coinName} </Text>
                </View>                                   
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View style={{width: '100%'}}>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>Số tiền gửi</Text>   
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={withdrawStyle.inputNumContainer}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            keyboardType="number-pad"
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>inputNumberHandler(value)} 
                            style={withdrawStyle.inputNum} />
                        </View>
                        <View style={{backgroundColor: '#fac800', borderTopRightRadius: 10, flex: 2,  borderBottomRightRadius: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'white', alignItems: 'center', alignSelf: 'center', fontSize: 14}}>{coinName}</Text>
                        </View>
                    </View> 
                    <Text style={withdrawStyle.nearSymbol}>≈</Text>
                    <View style={withdrawStyle.inputNumContainer}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                                placeholderTextColor = "#8a8c8e"
                                onFocus={()=>{}} 
                                onBlur={()=>{}}                      
                                value={typeCurrency === 0 ? CoinPriceUSD.toString() : CoinPriceVND.toString() }
                                style={withdrawStyle.inputNum} />
                        </View>
                        <View style={{backgroundColor: '#fac800', borderTopRightRadius: 10, flex: 2,  borderBottomRightRadius: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'white', alignItems: 'center', alignSelf: 'center', fontSize: 14}}>{typeCurrency === 0 ? 'USD' : 'VND'}</Text>
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>Gửi đến</Text>   
                <View style={{flexDirection: 'row'}}>
                    <View style={withdrawStyle.inputNumContainer2}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            placeholder="Nhập địa chỉ cần nhận tiền"
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>setToAddress(value)} 
                            style={withdrawStyle.inputNum} />
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>Mã xác thực 2FA</Text>   
                <View style={{flexDirection: 'row'}}>
                    <View style={withdrawStyle.inputNumContainer2}>
                        <View style={{padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            keyboardType='decimal-pad'
                            placeholder="Xác thực 2FA"
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>setToken(value)} 
                            style={withdrawStyle.inputNum} />
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: 12}}>Phí giao dịch</Text>   
                <Text style={{color: '#fac800',  fontSize: 12, paddingLeft: (windowWidth*windowHeight)/23040, fontWeight: 'bold'}}>0.000032 {coinName}</Text>
            </View>
        </View>

        <TouchableOpacity
            onPress={withdraw}
        >
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <LinearGradient 
                    colors={['#e5be50', '#ecda8b', '#a47b00']}
                    style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: '92%', height: windowHeight/14}}>
                    <Text style={{color: '#111b2d', fontSize: 16}}>Gửi</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
        
    </View>
</View> 
        </>
    )
} 