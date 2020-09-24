import React, { useState, useEffect , useCallback} from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, Alert, BackHandler} from 'react-native'
import { mainStyles, withdrawStyle, scannerStyles } from '../../../styles/'
import {HeaderwithButton} from '../../Header'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../assets/images/logo.png'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native';
import { storage } from '../../../helper';
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


// ------------------------------------------

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({setOutScrollView}){
    
    const typeCurrency = useSelector(state => state.currency)
    const coinNumbers = useSelector(state => state.coinNumbers)
    
    const [Width , setWidth] = useState(0);

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
    const { addressScan } = route.params ?? {}



    const inputNumberHandler = (value) => {
        setValueSend(value);
        var coin_name = coinName.toLowerCase();
        setCoinPriceExchange(coinNumbers[coin_name].exchange_rate.exchange)
    }


    const withdraw = useCallback(async (sel) => {
        var userinfo = await storage('_id').getItem();
        var withdraw_type = coinName === 'TRX' ? 'tron' : 
                            coinName === 'USDT' && sel === 0 ? 'usdt' :  
                            coinName === 'USDT' && sel === 1 ? 'usdt-trc20' : coinName.toLowerCase();

        dispatch(asyncWithdraw({userId: userinfo._id, value: ValueSend, deposit_type: withdraw_type, toAddress: ToAddress, token: Token}))
        .then((res)=>{
            if(res.status === 1 ){
                Alert.alert(
                    "Thông báo",
                    `Đã chuyển thành công ${ValueSend} ${coinName}`,
                )

                setValueSend('')
                setToAddress('')
                setToken('')
                return
            }else if(res.status === 100){
                Alert.alert(
                    "Thông báo",
                    `Mã 2FA không đúng`,
                )
              
            }else{
                Alert.alert(
                    "Thông báo",
                    `Giao dịch thất bại`,
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

      useEffect(()=>{
        if(addressScan !== undefined){
            setToAddress(addressScan)
        }
      },[])

    return (
        <>
{!IsScannerOpen && 
<View style={mainStyles.container}>
    <HeaderwithButton 
        toPress={() => openScanner()}
        title={"Gửi " +  coinName}/>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} > 

        <View style={withdrawStyle.numberSendContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                        <Image source={coinName === 'KDG' ? kdgicon : coinName === 'TRX' ? trxicon : coinName === 'ETH' ? ethicon : coinName === 'USDT' ? usdticon : coinName === 'KNC' ? kncicon : coinName === 'TOMO' ? tomoicon : mchicon} style={{width: windowWidth*windowHeight/9000, height: windowWidth*windowHeight/9000}} />
                        <View style={{paddingLeft: (windowWidth*windowHeight)/23040}}>
                            <Text style={withdrawStyle.coinName}>{coinName}</Text>
                            <Text style={withdrawStyle.balance}>Số dư: {coinNumbers[coinName.toLowerCase()].balance + " " + coinName} </Text>
                        </View>                                   
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Withdraw')} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'rgba(255,255,255,0.5)', paddingRight: 5}}>Chọn coin</Text>
                    <FontAwesomeIcon size={15} color="rgba(255,255,255,0.5)" icon={faChevronRight}/>
                </TouchableOpacity>
       
            </View>

            {
              coinName === 'USDT' ?
              <View style={{flexDirection: 'row' ,paddingHorizontal: 60, width: '100%', paddingTop: 30, justifyContent: 'space-between'}}>
                  <Text style={{color: 'rgba(255,255,255,0.5)'}}>Chọn loại</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setSelectedType(0)} style={{backgroundColor: SelectedType === 0 ? '#fac800' : '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center',}}>
                        {SelectedType === 0 ? <Image source={ticker}/>  : null}
                    </TouchableOpacity>
                    <Text style={{color: '#fff', paddingLeft: 10}}>ERC-20</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setSelectedType(1)} style={{backgroundColor: SelectedType === 1 ? '#fac800' : '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center',}}>
                        {SelectedType === 1 ? <Image source={ticker}/>  : null}
                    </TouchableOpacity>
                    <Text style={{color: '#fff', paddingLeft: 10}}>TRC-20</Text>
                  </View>

              </View> : null
            
            }
            
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View style={{width: '100%'}}>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>Số tiền rút</Text>   
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
                                value={(ValueSend*CoinPriceExchange[typeCurrency === 1 ? 'vnd' : typeCurrency === 2 ? 'cny' : 'usd' ]).toString() === 'NaN' ? '0' : 
                                            (ValueSend*CoinPriceExchange[typeCurrency === 1 ? 'vnd' : typeCurrency === 2 ? 'cny' : 'usd' ]).toString()
                                      }
                                style={withdrawStyle.inputNum} />
                        </View>
                        <View style={{backgroundColor: '#fac800', borderTopRightRadius: 10, flex: 2,  borderBottomRightRadius: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'white', alignItems: 'center', alignSelf: 'center', fontSize: 14}}>{typeCurrency === 1 ? 'VND' : typeCurrency === 2 ? 'CNY' : 'USD' }</Text>
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
                            value={ToAddress}
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

        <TouchableOpacity
                onPress={() => withdraw(SelectedType)}
            >
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: windowHeight/25}}>
                    <LinearGradient 
                        colors={['#e5be50', '#ecda8b', '#a47b00']}
                        style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: '92%', height: windowHeight/14}}>
                        <Text style={{color: '#111b2d', fontSize: 16}}>Gửi</Text>
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