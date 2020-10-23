import React, { useState, useEffect , useCallback} from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, Alert, BackHandler, ActivityIndicator} from 'react-native'
import { mainStyles, withdrawStyle, scannerStyles } from '../../../styles/'
import { withdrawStyleLight } from '../../../styles/light'
import {HeaderwithButton} from '../../Header'
import { useDispatch, useSelector } from 'react-redux'

import logo from '../../../assets/images/logo.png'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native';
import { storage, checkLanguage } from '../../../helper';
import { asyncGetCoinPrice, asyncWithdraw } from '../../../store/actions'
import { Camera } from 'expo-camera';
import ticker from '../../../assets/images/ticker.png'

// ------------------Icon---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'
import kncicon from '../../../assets/images/IconCoin/KNC.png'
import mchicon from '../../../assets/images/IconCoin/MCH.png'
import tomoicon from '../../../assets/images/IconCoin/TOMO.png'
import btcicon from '../../../assets/images/IconCoin/BTC.png'


// ------------------------------------------

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({setOutScrollView}){
    
    const typeCurrency = useSelector(state => state.currency)
    const coinNumbers = useSelector(state => state.coinNumbers)
    const language = useSelector(state => state.language)
    const [Width , setWidth] = useState(0);

    const [Loading, setLoading] = useState(false);
    const display = useSelector(state => state.display)

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [SelectedType, setSelectedType] = useState(0)
    const [IsScannerOpen, setIsScannerOpen] = useState(false);
    // --------Value Submit----------
    const [ToAddress, setToAddress] = useState('')
    const [ValueSend, setValueSend] = useState('')
    const [Token, setToken] = useState('');
    // -------------------------------

    const [CoinPriceExchange, setCoinPriceExchange] = useState({})

    // const {id} = route.params;
    const coinName = route.params.id;




    const inputNumberHandler = (value) => {
        setValueSend(value);
        var coin_name = coinName.toLowerCase();
        setCoinPriceExchange(coinNumbers[coin_name].exchange_rate.exchange)
    }


    const withdraw = useCallback(async (sel) => {
        setLoading(true)
        var userid = await storage('userId').getItem();
        var withdraw_type = coinName === 'TRX' ? 'tron' : 
                            coinName === 'USDT' && sel === 0 ? 'usdt' :  
                            coinName === 'USDT' && sel === 1 ? 'usdt-trc20' : coinName.toLowerCase();

        dispatch(asyncWithdraw({userId: userid, value: ValueSend, deposit_type: withdraw_type, toAddress: ToAddress, token: Token}))
        .then((res)=>{
            console.log(res)
            if(res.status === 1 ){
                setValueSend('')
                setToAddress('')
                setToken('')
                setLoading(false)
                Alert.alert(
                    checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                    `${checkLanguage({vi: 'Rút thành công', en: 'Withdraw successfully'},language)} ${ValueSend} ${coinName}`,
                )

          
                return
            }else if(res.status === 100){
                setLoading(false)
                Alert.alert(
                    checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                    checkLanguage({vi: 'Mã 2fa không chính xác', en: 'The 2fa code is failed'},language),
                )
            }else if(res.status === 101){
                setLoading(false)
                Alert.alert(
                    checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                    checkLanguage({vi: 'Bạn phải KYC trước khi rút', en: 'You must kyc before withdraw'},language),
                ) 
            }else{
                setLoading(false)
                Alert.alert(
                    checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                    checkLanguage({vi: 'Giao dịch thất bại', en: 'Transaction failed'},language),
                )
            }

        })
        .catch(console.log)
    }, [ToAddress, Token, ValueSend])


    const handleBarCodeScanned = useCallback(({ type, data }) => {
        // alert(`Scanned data = ${data}`);
        setToAddress(data);
        setIsScannerOpen(false)
      }, []);
    
      const openScanner = useCallback(async () => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {
          setIsScannerOpen(true)
        } else {
          Alert.alert(
            'Cấp quyền',
            'Bạn phải cấp quyền camera để sử dụng tính năng này'
          )
        }
      }, [])

      useEffect(()=>{
        BackHandler.addEventListener(
          "hardwareBackPress",
          ()=>{
            setIsScannerOpen(false)
            return true;
          }
        );
    
      },[])


      // -------------------style------------------------------

var WithdrawStyle = display === 1 ? withdrawStyleLight : withdrawStyle

// ------------------------------------------------------


    return (
        <>
{!IsScannerOpen && 
<View style={mainStyles.container}>
    <HeaderwithButton 
        toPress={() => openScanner()}
        title={checkLanguage({vi: 'Rút ', en: 'Withdraw '},language) +  coinName}/>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} > 

        <View style={WithdrawStyle.numberSendContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                        <Image source={coinName === 'KDG' ? kdgicon : coinName === 'TRX' ? trxicon : coinName === 'ETH' ? ethicon : coinName === 'USDT' ? usdticon : coinName === 'KNC' ? kncicon : coinName === 'TOMO' ? tomoicon : coinName === 'MCH' ? mchicon : btcicon} style={{width: windowWidth*windowHeight/9000, height: windowWidth*windowHeight/9000}} />
                        <View style={{paddingLeft: (windowWidth*windowHeight)/23040}}>
                            <Text style={WithdrawStyle.coinName}>{coinName}</Text>
                            <Text style={WithdrawStyle.balance}>{checkLanguage({vi: 'Số dư: ', en: 'Balance: '},language)  + coinNumbers[coinName.toLowerCase()].balance + " " + coinName} </Text>
                        </View>                                   
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Withdraw')} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: display === 1 ? '#283349'  :"rgba(255,255,255,0.5)", paddingRight: 5}}>{checkLanguage({vi: 'Chọn coin', en: 'Select coin'},language)}</Text>
                    <FontAwesomeIcon size={15} color={display === 1 ? '#283349'  :"rgba(255,255,255,0.5)"} icon={faChevronRight}/>
                </TouchableOpacity>
       
            </View>

            {
              coinName === 'USDT' ?
              <View style={{flexDirection: 'row' ,paddingHorizontal: 60, width: '100%', paddingTop: 30, justifyContent: 'space-between'}}>
                  <Text style={{color: 'rgba(255,255,255,0.5)'}}>{checkLanguage({vi: 'Chọn loại', en: 'Select type'},language)}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setSelectedType(0)} style={{backgroundColor: SelectedType === 0 ? '#fac800' : '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center',}}>
                        {SelectedType === 0 ? <Image source={ticker}/>  : null}
                    </TouchableOpacity>
                    <Text style={{color: display === 1 ? '#283349' : '#fff', paddingLeft: 10}}>ERC-20</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setSelectedType(1)} style={{backgroundColor: SelectedType === 1 ? '#fac800' : '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center',}}>
                        {SelectedType === 1 ? <Image source={ticker}/>  : null}
                    </TouchableOpacity>
                    <Text style={{color: display === 1 ? '#283349' : '#fff', paddingLeft: 10}}>TRC-20</Text>
                  </View>

              </View> : null
            
            }
            
        </View>

        <View style={WithdrawStyle.numberSendContainer}>
            <View style={{width: '100%'}}>
                <Text style={{color: display === 1 ? '#283349'  :'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>{checkLanguage({vi: 'Số tiền rút', en: 'Withdrawal amount'},language)}</Text>   
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={WithdrawStyle.inputNumContainer}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            keyboardType="number-pad"
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>inputNumberHandler(value)} 
                            value={ValueSend}
                            style={WithdrawStyle.inputNum} />
                        </View>
                        <View style={{backgroundColor: '#fac800', borderTopRightRadius: 10, flex: 2,  borderBottomRightRadius: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'white', alignItems: 'center', alignSelf: 'center', fontSize: 14}}>{coinName}</Text>
                        </View>
                    </View> 
                    <Text style={WithdrawStyle.nearSymbol}>≈</Text>
                    <View style={WithdrawStyle.inputNumContainer}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                                placeholderTextColor = "#8a8c8e"
                                onFocus={()=>{}} 
                                onBlur={()=>{}}                      
                                value={(ValueSend*CoinPriceExchange[typeCurrency === 1 ? 'vnd' : typeCurrency === 2 ? 'cny' : 'usd' ]).toString() === 'NaN' ? '0' : 
                                            (ValueSend*CoinPriceExchange[typeCurrency === 1 ? 'vnd' : typeCurrency === 2 ? 'cny' : 'usd' ]).toString()
                                      }
                                style={WithdrawStyle.inputNum} />
                        </View>
                        <View style={{backgroundColor: '#fac800', borderTopRightRadius: 10, flex: 2,  borderBottomRightRadius: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'white', alignItems: 'center', alignSelf: 'center', fontSize: 14}}>{typeCurrency === 1 ? 'VND' : typeCurrency === 2 ? 'CNY' : 'USD' }</Text>
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={WithdrawStyle.numberSendContainer}>
            <View>
                <Text style={{color: display === 1 ? '#283349'  :'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>{checkLanguage({vi: 'Rút về', en: 'Withdraw to'},language)}</Text>   
                <View style={{flexDirection: 'row'}}>
                    <View style={WithdrawStyle.inputNumContainer2}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            placeholder={checkLanguage({vi: 'Nhập địa chỉ nhận tiền', en: 'Enter receiving address'},language)}
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>setToAddress(value)} 
                            value={ToAddress}
                            style={WithdrawStyle.inputNum} />
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={WithdrawStyle.numberSendContainer}>
            <View>
                <Text style={{color: display === 1 ? '#283349'  :'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>{checkLanguage({vi: 'Mã xác thực 2FA', en: '2FA code'},language)}</Text>   
                <View style={{flexDirection: 'row'}}>
                    <View style={WithdrawStyle.inputNumContainer2}>
                        <View style={{padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            keyboardType='decimal-pad'
                            placeholder={checkLanguage({vi: 'Xác thực 2FA', en: '2FA Authentication'},language)}
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>setToken(value)} 
                            value={Token}
                            style={WithdrawStyle.inputNum} />
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <TouchableOpacity
                disabled={Loading ? true : false}
                onPress={() => withdraw(SelectedType)}
            >
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: windowHeight/25}}>
                    <LinearGradient 
                        colors={['#e5be50', '#ecda8b', '#a47b00']}
                        style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: '92%', height: windowHeight/14, opacity: Loading ? 0.4 : 1}}>
                        {  Loading === true ?  <ActivityIndicator size="small" color="#fff" />
                        :  <Text style={{color: '#111b2d', fontSize: 16}}>{checkLanguage({vi: 'Rút', en: 'Withdraw'},language)}</Text>}
                       
                    </LinearGradient>
                </View>
        </TouchableOpacity>
    </View>
</View> 
}
{IsScannerOpen && <View
        style={[scannerStyles.container,
        { width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }
        ]}
      >
        <TouchableOpacity
          onPress={() => setIsScannerOpen(false)}
          style={{paddingTop: 150, alignItems: 'flex-end', paddingRight: 20}}
        >
          <FontAwesomeIcon style={{color: '#fac800'}} size={30} icon={faTimes} />
        </TouchableOpacity>
        <Camera
          onBarCodeScanned={handleBarCodeScanned}
          ratio='1:1'
          style={[{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width , position: 'absolute', top: '50%',transform: [{translateY: - Dimensions.get('screen').width/2}]}]}
        />
      </View>}
        </>
    )
} 