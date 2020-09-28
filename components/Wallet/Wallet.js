import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {View, Text, TouchableOpacity, Alert, Image, Dimensions,BackHandler,FlatList, Clipboard } from 'react-native';
import { Camera } from 'expo-camera';
import { mainStyles, walletStyles, scannerStyles, } from '../../styles/'
import { walletStylesLight } from '../../styles/light/'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faTimes,faEye,faEyeSlash, faSortAmountDown,faPlusCircle, faAngleRight, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

import openscaner from '../../assets/images/openscaner.png'
import openscanerLight from '../../assets/images/openscanerLight.png'

import GroupButton from './GroupButton'
import ListCoin from './ListCoin'
import { storage, checkLanguage } from '../../helper';
import { asyncGetBalance, asyncSetCoinNumbers, asyncGetBalanceDouble, asyncGetNews, asyncGetCoinPrice, asyncGetUserbyID, asyncSecureStatus, actChangeSecureStatus } from '../../store/actions'
import { useIsFocused } from '@react-navigation/native';


const hiddenBalance = "******"
export default function App({ navigation }) {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);



  const isFocused = useIsFocused();

  const typeCurrency = useSelector(state => state.currency)

  const coinDisplay = useSelector(state => state.coin)

  const language = useSelector(state => state.language)

  const display = useSelector(state => state.display)

  const [IsScannerOpen, setIsScannerOpen] = useState(false);
  const [VisibleBalance, setVisibleBalance] = useState(false);
  const [IsShortCoin, setIsShortCoin] = useState(false);
  const [IsTapShortCoin, setIsTapShortCoin] = useState(false);

  const [UserData, setUserData] = useState({});


  const [NewsData, setNewsData] = useState([]);

  const [Count, setCount] = useState(0);


  // ----------Balance Coin -----------
  const [KGDBalance, setKDGBalance] = useState(0);
  const [TRXBalance, setTRXBalance] = useState(0);
  const [ETHBalance, setETHBalance] = useState(0);
  const [USDTBalance, setUSDTBalance] = useState(0);
  const [KNCBalance, setKNCBalance] = useState(0);
  const [MCHBalance, setMCHBalance] = useState(0);
  const [TOMOBalance, setTOMOBalance] = useState(0);
  const [BTCBalance, setBTCBalance] = useState(0);
  // ----------------------------------

  // ----------Address Coin -----------
  const [TRXAddress, setTRXAddress] = useState('');
  const [ETHAddress, setETHAddress] = useState('');
  const [TOMOAddress, setTOMOAddress] = useState('');
  const [BTCAddress, setBTCAddress] = useState('');
  // ----------------------------------
  const [KDGLock, setKDGLock] = useState(0);


  const [CoinPriceKDGLock, setCoinPriceKDGLock] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0
  });
  
  const [CoinPriceKDG, setCoinPriceKDG] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceETH, setCoinPriceETH] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceTRX, setCoinPriceTRX] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceUSDT, setCoinPriceUSDT] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceKNC, setCoinPriceKNC] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceMCH, setCoinPriceMCH] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceTOMO, setCoinPriceTOMO] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceBTC, setCoinPriceBTC] = useState({
    btc: 0, vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });


  const TotalBalance = {
    btc: (parseFloat(CoinPriceKDG.btc)+ 
    parseFloat(CoinPriceETH.btc) + 
    parseFloat(CoinPriceUSDT.btc) + 
    parseFloat(CoinPriceTRX.btc) + 
    parseFloat(CoinPriceKNC.btc ) + 
    parseFloat(CoinPriceTOMO.btc ) + 
    parseFloat(CoinPriceBTC.btc ) + 
    parseFloat(CoinPriceMCH.btc)).toFixed(8),
    vnd: (parseFloat(CoinPriceKDG.vnd)+ 
    parseFloat(CoinPriceETH.vnd) + 
    parseFloat(CoinPriceUSDT.vnd) + 
    parseFloat(CoinPriceTRX.vnd) + 
    parseFloat(CoinPriceKNC.vnd ) + 
    parseFloat(CoinPriceTOMO.vnd ) + 
    parseFloat(CoinPriceBTC.vnd ) + 
    parseFloat(CoinPriceMCH.vnd)).toFixed(2),
    usd: (parseFloat(CoinPriceKDG.usd)+ 
    parseFloat(CoinPriceETH.usd) + 
    parseFloat(CoinPriceUSDT.usd) + 
    parseFloat(CoinPriceTRX.usd) + 
    parseFloat(CoinPriceKNC.usd ) + 
    parseFloat(CoinPriceTOMO.usd ) + 
    parseFloat(CoinPriceBTC.usd ) + 
    parseFloat(CoinPriceMCH.usd)).toFixed(4),
    cny: (parseFloat(CoinPriceKDG.cny)+ 
    parseFloat(CoinPriceETH.cny) + 
    parseFloat(CoinPriceUSDT.cny) + 
    parseFloat(CoinPriceTRX.cny) + 
    parseFloat(CoinPriceKNC.cny ) + 
    parseFloat(CoinPriceTOMO.cny ) + 
    parseFloat(CoinPriceBTC.cny ) + 
    parseFloat(CoinPriceMCH.cny)).toFixed(4),
    
  }

  const AvailableBalance = {
    btc: (parseFloat(CoinPriceKDG.btc)+ 
    parseFloat(CoinPriceETH.btc) + 
    parseFloat(CoinPriceUSDT.btc) + 
    parseFloat(CoinPriceTRX.btc) + 
    parseFloat(CoinPriceKNC.btc ) + 
    parseFloat(CoinPriceTOMO.btc ) + 
    parseFloat(CoinPriceBTC.btc ) + 
    parseFloat(CoinPriceMCH.btc) - parseFloat(CoinPriceKDGLock.btc)).toFixed(8),
    vnd: (parseFloat(CoinPriceKDG.vnd)+ 
    parseFloat(CoinPriceETH.vnd) + 
    parseFloat(CoinPriceUSDT.vnd) + 
    parseFloat(CoinPriceTRX.vnd) + 
    parseFloat(CoinPriceKNC.vnd ) + 
    parseFloat(CoinPriceTOMO.vnd ) + 
    parseFloat(CoinPriceBTC.btc ) + 
    parseFloat(CoinPriceMCH.vnd) - parseFloat(CoinPriceKDGLock.vnd)).toFixed(2),
    usd: (parseFloat(CoinPriceKDG.usd)+ 
    parseFloat(CoinPriceETH.usd) + 
    parseFloat(CoinPriceUSDT.usd) + 
    parseFloat(CoinPriceTRX.usd) + 
    parseFloat(CoinPriceKNC.usd ) + 
    parseFloat(CoinPriceTOMO.usd ) + 
    parseFloat(CoinPriceBTC.btc ) + 
    parseFloat(CoinPriceMCH.usd) - parseFloat(CoinPriceKDGLock.usd)).toFixed(4),
    cny: (parseFloat(CoinPriceKDG.cny)+ 
    parseFloat(CoinPriceETH.cny) + 
    parseFloat(CoinPriceUSDT.cny) + 
    parseFloat(CoinPriceTRX.cny) + 
    parseFloat(CoinPriceKNC.cny ) + 
    parseFloat(CoinPriceTOMO.cny ) + 
    parseFloat(CoinPriceBTC.btc ) + 
    parseFloat(CoinPriceMCH.cny) - parseFloat(CoinPriceKDGLock.cny)).toFixed(4),
    
  }


  const handleBarCodeScanned = useCallback(({ type, data }) => {
      Clipboard.setString(data)
      Alert.alert(
        checkLanguage({vi: 'Bạn đã sao chép địa chỉ ví', en: 'You have copied the wallet address to the clipboard'},language),
        `${data}`
      )
      setIsScannerOpen(false)
  }, []);

  const openScanner = useCallback(async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      setIsScannerOpen(true)
    } else {
      Alert.alert(
        checkLanguage({vi: 'Cấp quyền?', en: 'Allowing access?'},language),
        checkLanguage({vi: 'Bạn phải cấp quyền camera để sử dụng tính năng này' , en: 'You need to allow "King Wallet" to access your camera to use this feature'},language),
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

  

  useEffect(() => {
    async function getwalletBlance() {
      var userinfo = await storage('_id').getItem();
      dispatch(asyncGetUserbyID(userinfo._id))
      .then((res)=>{
        setTOMOAddress(res.data.tomo_address)
        setTRXAddress(res.data.trx_address);
        setETHAddress(res.data.erc_address);
        setBTCAddress(res.data.btc_address);
        if(res.data.kdg_lock !== undefined){
            setKDGLock(res.data.kdg_lock);
            setUserData(res.data)
            return
        }
      })
      dispatch(asyncGetBalanceDouble(userinfo.erc_address, userinfo.trx_address))
      .then(({resETH, resTRX})=>{
        setKDGBalance(resTRX.data.kdg_balance)
        setTRXBalance(resTRX.data.trx_balance)
        setETHBalance(resETH.data.eth_balance)
        setUSDTBalance(resETH.data.usdt_balance)
      })     

      dispatch(asyncGetBalance('knc',userinfo.erc_address))
      .then((res)=>{
        setKNCBalance(res.balance)
      })     

      dispatch(asyncGetBalance('mch',userinfo.erc_address))
      .then((res)=>{
        setMCHBalance(res.balance)
      })  

      dispatch(asyncGetBalance('tomo', TOMOAddress))
      .then((res)=>{
        setTOMOBalance(res.balance)
      })    
      
      dispatch(asyncGetBalance('btc', BTCAddress))
      .then((res)=>{
        setBTCBalance(res.balance)
      })       
    }

    getwalletBlance()


  }, [TOMOBalance, TOMOAddress, isFocused])


useEffect(() => {
  dispatch(actChangeSecureStatus({
    kdg_reward: UserData.kdg_reward,
    kyc: UserData.kyc,
    kyc_success: UserData.kyc_success,
    is2FA: UserData.is2FA,
    create_date: UserData.create_date
}))
},[UserData])


  useEffect(() => {
    var dem = 0
    dispatch(asyncGetNews(0,20))
    .then((res)=>{
      setNewsData(res.data)
      
      res.data.slice(0,4).map((item) =>{
        if(item.content_vi !== undefined && item.meta_vi !== undefined){
            if(
                (
                  (new Date(item.create_date)).getDate().toString()  + "/"   +
                  ((new Date(item.create_date)).getMonth() + 1).toString() + "/"   +
                  (new Date(item.create_date)).getFullYear().toString()
                )   ===    (
                  (new Date()).getDate().toString()  + "/"   +
                  ((new Date()).getMonth() + 1).toString() + "/"   +
                  (new Date()).getFullYear().toString()
                ) 
            ){
              dem += 1
            }
        }
    })
      setCount(dem)
    })
    .catch(console.log) 
}, [])

useEffect(() => {
  dispatch(asyncGetCoinPrice('KDG'))
  .then((res)=>{


      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceKDG({
        btc: (coin_to_btc*KGDBalance), vnd: (coin_to_vnd*KGDBalance).toFixed(2), usd: (coin_to_usd*KGDBalance).toFixed(4) , cny: (coin_to_usd*KGDBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
      setCoinPriceKDGLock({
        btc: (coin_to_btc*KDGLock), vnd: (coin_to_vnd*KDGLock).toFixed(2), usd: (coin_to_usd*KDGLock).toFixed(4) , cny: (coin_to_usd*KDGLock).toFixed(4)
      })
  })
  .catch(console.log) 

  dispatch(asyncGetCoinPrice('ETH'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceETH({
        btc: (coin_to_btc*ETHBalance), vnd: (coin_to_vnd*ETHBalance).toFixed(2), usd: (coin_to_usd*ETHBalance).toFixed(4) , cny: (coin_to_usd*ETHBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })
  .catch(console.log) 

  dispatch(asyncGetCoinPrice('TRON'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceTRX({
        btc: (coin_to_btc*TRXBalance), vnd: (coin_to_vnd*TRXBalance).toFixed(2), usd: (coin_to_usd*TRXBalance).toFixed(4) , cny: (coin_to_usd*TRXBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })

  
  dispatch(asyncGetCoinPrice('USDT'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceUSDT({
        btc: (coin_to_btc*USDTBalance), vnd: (coin_to_vnd*USDTBalance).toFixed(2), usd: (coin_to_usd*USDTBalance).toFixed(4) , cny: (coin_to_usd*USDTBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })
    
  dispatch(asyncGetCoinPrice('KNC'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceKNC({
        btc: (coin_to_btc*KNCBalance), vnd: (coin_to_vnd*KNCBalance).toFixed(2), usd: (coin_to_usd*KNCBalance).toFixed(4) , cny: (coin_to_usd*KNCBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })
      
  dispatch(asyncGetCoinPrice('MCH'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceMCH({
        btc: (coin_to_btc*MCHBalance), vnd: (coin_to_vnd*MCHBalance).toFixed(2), usd: (coin_to_usd*MCHBalance).toFixed(4) , cny: (coin_to_usd*MCHBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })

  dispatch(asyncGetCoinPrice('TOMO'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceTOMO({
        btc: (coin_to_btc*TOMOBalance), vnd: (coin_to_vnd*TOMOBalance).toFixed(2), usd: (coin_to_usd*TOMOBalance).toFixed(4) , cny: (coin_to_usd*TOMOBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })

  dispatch(asyncGetCoinPrice('BTC'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      var coin_to_btc = res.data2.current_price.btc
      setCoinPriceBTC({
        btc: (coin_to_btc*BTCBalance), vnd: (coin_to_vnd*BTCBalance).toFixed(2), usd: (coin_to_usd*BTCBalance).toFixed(4) , cny: (coin_to_usd*BTCBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })
  .catch(console.log) 

},[KGDBalance, ETHBalance, USDTBalance, TRXBalance, KNCBalance, MCHBalance, TOMOBalance, BTCBalance])

useEffect(() => {

  dispatch(asyncSetCoinNumbers({
    kdg: {
      balance: KGDBalance,
      exchange_rate: CoinPriceKDG,
      address: TRXAddress
    },
    eth: {
      balance: ETHBalance,
      exchange_rate: CoinPriceETH,
      address: ETHAddress
    },
    trx: {
      balance: TRXBalance,
      exchange_rate: CoinPriceTRX,
      address: TRXAddress
    },
    usdt: {
      balance: USDTBalance,
      exchange_rate: CoinPriceUSDT,
      address: ETHAddress,
    },
    knc: {
      balance: KNCBalance,
      exchange_rate: CoinPriceKNC,
      address: ETHAddress
    },
    mch: {
      balance: MCHBalance,
      exchange_rate: CoinPriceMCH,
      address: ETHAddress
    },
    tomo: {
      balance: TOMOBalance,
      exchange_rate: CoinPriceTOMO,
      address: TOMOAddress
    },
    btc: {
      balance: BTCBalance,
      exchange_rate: CoinPriceBTC,
      address: BTCAddress
    },


  }))

}, [KGDBalance, 
  USDTBalance, 
  TRXBalance, 
  KNCBalance, 
  MCHBalance,
  TOMOBalance, 
  BTCBalance,
  CoinPriceBTC,
  CoinPriceKDG,
  CoinPriceETH,
  CoinPriceTRX,
  CoinPriceUSDT,
  CoinPriceKNC,
  CoinPriceMCH,
  CoinPriceTOMO

])

const sortHandler = (isSort, isTapSort) => {
  setIsShortCoin(!isSort)
  setIsTapShortCoin(true)

}

// -------------------style------------------------------

var WalletStyle = display === 1 ? walletStylesLight : walletStyles

// ------------------------------------------------------

  return (
    <>
      {!IsScannerOpen && 
      
          <View style={[mainStyles.container,{paddingBottom: 20, paddingHorizontal: 15}]}>
            <View style={[WalletStyle.header]}>
              <View><Text style={WalletStyle.titleHeader}>King Wallet</Text></View>
              <View style={WalletStyle.groupIcon}>
                <TouchableOpacity
                  onPress={() => { openScanner() }}
                >
                  <Image style={WalletStyle.scanQRIcon} source={display === 1  ? openscanerLight : openscaner} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Notify', {
                  NewsData: NewsData
                })} style={WalletStyle.notifyIcon}>
                  <FontAwesomeIcon icon={faBell} style={{ color: display === 1 ? '#283349' : '#ffff' }} />
                  {Count !== 0 ?<Text style={WalletStyle.notifyCount}>{Count}</Text> : null}
                </TouchableOpacity>
              </View>
            </View>
            <View style={WalletStyle.balance}>
              <View style={WalletStyle.maskOpacity}></View>
              <View style={WalletStyle.totalBalanceAndVisible}>
                <Text style={WalletStyle.totalBalance}>{VisibleBalance ? hiddenBalance : isNaN(TotalBalance.usd) ? 'Loading...' : TotalBalance.btc + " BTC"}</Text>
                <TouchableOpacity onPress={()=>setVisibleBalance(!VisibleBalance)}>
                  <View style={{padding: 13}}>
                    <FontAwesomeIcon style={WalletStyle.visibleButton} icon={VisibleBalance ? faEyeSlash : faEye}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={WalletStyle.availableAndLock}>
                <View style={WalletStyle.availableAndLockBlock}>
                  <Text style={WalletStyle.textAvailableAndLock}>{checkLanguage({vi: 'Tài sản sẵn có', en: 'Available Asset'},language)}</Text>
                  <Text style={WalletStyle.quantityAvailableAndLock}>{VisibleBalance ? hiddenBalance :  isNaN(AvailableBalance.usd)  ? 'Loading...' :
                    typeCurrency === 1 ? 
                    AvailableBalance.vnd + ' ₫' : 
                    typeCurrency === 2 ?  
                    '¥' + AvailableBalance.cny : 
                    '$' + AvailableBalance.usd}</Text>
                </View>
                <View style={WalletStyle.availableAndLockBlock}>
                  <Text style={WalletStyle.textAvailableAndLock}>{checkLanguage({vi: 'Tài sản bị khoá', en: 'Locked Asset'},language)}</Text>
                  <Text style={WalletStyle.quantityAvailableAndLock}>{VisibleBalance ? hiddenBalance : typeCurrency === 1 ? 
                    CoinPriceKDGLock.vnd + ' ₫' : 
                    typeCurrency === 2 ?  
                    '¥' + CoinPriceKDGLock.cny : 
                    '$' + CoinPriceKDGLock.usd}</Text>
                </View>
              </View>
            </View>

            <GroupButton />
            
            <View style={WalletStyle.listCoinHead}>
              <Text style={WalletStyle.listCoinHeadColor}>{checkLanguage({vi: 'Tổng tài sản', en: 'Total Asset'},language)}</Text>
              <View style={[WalletStyle.listCoinHead, {justifyContent:'flex-end', marginTop: 0}]}>
                <TouchableOpacity onPress={() => sortHandler(IsShortCoin, IsTapShortCoin)}
                >
                  <FontAwesomeIcon style={WalletStyle.listCoinHeadColor} icon={IsShortCoin ? faSortAmountUp : faSortAmountDown}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SetCoins')}>
                  <FontAwesomeIcon style={[WalletStyle.listCoinHeadColor, {marginLeft:15}]} icon={faPlusCircle}/>
                </TouchableOpacity>
              </View>
            </View>

            <ListCoin 
              VisibleBalance={VisibleBalance}
              hiddenBalance={hiddenBalance}
              balanceKDG={KGDBalance}
              balanceTRX={TRXBalance}
              balanceETH={ETHBalance}
              balanceUSDT={USDTBalance}
              balanceKNC={KNCBalance}
              balanceMCH={MCHBalance}
              balanceTOMO={TOMOBalance}
              balanceBTC={BTCBalance}
              addressTRX={TRXAddress}
              addressETH={ETHAddress}
              addressTOMO={TOMOAddress}
              addressBTC={BTCAddress}
              coinPriceKDG={CoinPriceKDG}
              coinPriceETH={CoinPriceETH}
              coinPriceTRX={CoinPriceTRX}
              coinPriceUSDT={CoinPriceUSDT}
              coinPriceKNC={CoinPriceKNC}
              coinPriceMCH={CoinPriceMCH}
              coinPriceTOMO={CoinPriceTOMO}
              coinPriceBTC={CoinPriceBTC}
              coinDisplay={coinDisplay}
              isShortCoin={IsShortCoin}
              isTapSort={IsTapShortCoin}
         
            />

            <View style={WalletStyle.listPostHead}>
              <Text style={WalletStyle.listPostHeadText}>{checkLanguage({vi: 'Tin tức', en: 'News'},language)}</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('News')} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={WalletStyle.listPostHeadViewMore}>{checkLanguage({vi: 'Xem thêm', en: 'See more'},language)}</Text>
                <FontAwesomeIcon style={WalletStyle.listPostHeadViewMore} icon={faAngleRight}/>
              </TouchableOpacity>
            </View>


              <View style={WalletStyle.listPostScroll}>
                  {            
                          checkLanguage({
                            vi: (
                                <FlatList
                                horizontal={true}
                                data={NewsData}
                                renderItem={({item}) => {

                                    if(item.content_vi !== undefined){
                                      return <View style={WalletStyle.post}>
                                      <TouchableOpacity
                                        onPress={()=>navigation.navigate('News', {
                                          NewsID: item._id
                                        })}
                                      >
                                        <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}>
                                          <Image style={WalletStyle.postImage} source={{ uri: item.thumbURL_vi}}/></View>
                                        <Text style={WalletStyle.postTitle}>{item.title_vi}</Text>
                                      </TouchableOpacity>
                                    </View>  
                                      
                                    }
                                  }
                                
                      
                                }
                                />
                          ), 
                          en: (
                            <FlatList
                            horizontal={true}
                            data={NewsData}
                            renderItem={({item}) => {

                              if(item.content_en !== undefined){
                                return <View style={WalletStyle.post}>
                                <TouchableOpacity
                                  onPress={()=>navigation.navigate('News', {
                                    NewsID: item._id
                                  })}
                                >
                                  <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}>
                                    <Image style={WalletStyle.postImage} source={{ uri: item.thumbURL_en}}/></View>
                                  <Text style={WalletStyle.postTitle}>{item.title_en}</Text>
                                </TouchableOpacity>
                              </View>  
                                
                              }
                            }
                          
                
                          }
                        />
                          )},language)
                            
                  }
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
          style={[scannerStyles.closeButton]}
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
  );
}

