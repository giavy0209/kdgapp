import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {View, Text, TouchableOpacity, Alert, Image, Dimensions,BackHandler,FlatList } from 'react-native';
import { Camera } from 'expo-camera';
import { mainStyles, walletStyles, scannerStyles } from '../../styles/'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faTimes,faEye,faEyeSlash, faSortAmountDown,faPlusCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import openscaner from '../../assets/images/openscaner.png'
import postImage from '../../assets/images/post-image.jpg'

import GroupButton from './GroupButton'
import ListCoin from './ListCoin'
import AsyncStorage from '@react-native-community/async-storage';
import calAPI from '../../axios';
import { storage } from '../../helper';
import { asyncGetBalance, asyncSetCoinNumbers, asyncGetBalanceDouble, asyncGetNews, asyncGetCoinPrice } from '../../store/actions';

const hiddenBalance = "******"
export default function App({ navigation }) {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);

  const typeCurrency = useSelector(state => state.currency)

  const coinDisplay = useSelector(state => state.coin)



  const [IsScannerOpen, setIsScannerOpen] = useState(false);
  const [VisibleBalance, setVisibleBalance] = useState(true);
  const [UserData, setUserData] = useState({});


  const [NewsData, setNewsData] = useState([]);


  // ----------Balance Coin -----------
  const [KGDBalance, setKDGBalance] = useState(0);
  const [TRXBalance, setTRXBalance] = useState(0);
  const [ETHBalance, setETHBalance] = useState(0);
  const [USDTBalance, setUSDTBalance] = useState(0);
  const [KNCBalance, setKNCBalance] = useState(0);
  const [MCHBalance, setMCHBalance] = useState(0);
  // ----------------------------------

  // ----------Address Coin -----------
  const [TRXAddress, setTRXAddress] = useState('');
  const [ETHAddress, setETHAddress] = useState('');
  // ----------------------------------


  
  const [CoinPriceKDG, setCoinPriceKDG] = useState({
    vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceETH, setCoinPriceETH] = useState({
    vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceTRX, setCoinPriceTRX] = useState({
    vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceUSDT, setCoinPriceUSDT] = useState({
    vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceKNC, setCoinPriceKNC] = useState({
    vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  const [CoinPriceMCH, setCoinPriceMCH] = useState({
    vnd: 0, usd: 0, cny: 0, exchange: {
      vnd: 0, usd: 0, cny: 0, percent24h: 0
    } 
  });
  
  const handleBarCodeScanned = useCallback(({ type, data }) => {
    alert(`Scanned data = ${data}`);
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

//   const test = useCallback(async () => {
//     var userinfo = await storage('_id').getItem();
//     dispatch(asyncGetBalance('kdg', userinfo.trx_address))
//     .then((res)=>{
//       setKDGBalance(res);
//     })
//     .catch(console.log)
// }, [])

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

      dispatch(asyncGetBalance('knc',userinfo.erc_address))
      .then((res)=>{
        setKNCBalance(res.balance)
      })     
      .catch(console.log)

      dispatch(asyncGetBalance('mch',userinfo.erc_address))
      .then((res)=>{
        setMCHBalance(res.balance)
      })     
      .catch(console.log)
    }

    getwalletBlance()

  }, [])


  useEffect(() => {
    dispatch(asyncGetNews(0,20))
    .then((res)=>{
      setNewsData(res.data)
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
      setCoinPriceKDG({
        vnd: (coin_to_vnd*KGDBalance).toFixed(2), usd: (coin_to_usd*KGDBalance).toFixed(4) , cny: (coin_to_usd*KGDBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })
  .catch(console.log) 

  dispatch(asyncGetCoinPrice('ETH'))
  .then((res)=>{
      var coin_to_usd = res.data2.current_price.usd
      var coin_to_cny = res.data2.current_price.cny
      var coin_to_vnd = res.data2.current_price.vnd
      var coin_percent24h = res.data2.price_change_percentage_24h
      setCoinPriceETH({
        vnd: (coin_to_vnd*ETHBalance).toFixed(2), usd: (coin_to_usd*ETHBalance).toFixed(4) , cny: (coin_to_usd*ETHBalance).toFixed(4), exchange: {
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
      setCoinPriceTRX({
        vnd: (coin_to_vnd*TRXBalance).toFixed(2), usd: (coin_to_usd*TRXBalance).toFixed(4) , cny: (coin_to_usd*TRXBalance).toFixed(4), exchange: {
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
      setCoinPriceUSDT({
        vnd: (coin_to_vnd*USDTBalance).toFixed(2), usd: (coin_to_usd*USDTBalance).toFixed(4) , cny: (coin_to_usd*USDTBalance).toFixed(4), exchange: {
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
      setCoinPriceKNC({
        vnd: (coin_to_vnd*KNCBalance).toFixed(2), usd: (coin_to_usd*KNCBalance).toFixed(4) , cny: (coin_to_usd*KNCBalance).toFixed(4), exchange: {
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
      setCoinPriceMCH({
        vnd: (coin_to_vnd*MCHBalance).toFixed(2), usd: (coin_to_usd*MCHBalance).toFixed(4) , cny: (coin_to_usd*MCHBalance).toFixed(4), exchange: {
          vnd: coin_to_vnd.toFixed(2), usd: coin_to_usd.toFixed(4), cny: coin_to_cny.toFixed(4), percent24h: coin_percent24h
        } 
      })
  })
  .catch(console.log) 
},[KGDBalance, ETHAddress, USDTBalance, TRXBalance, KNCBalance, MCHBalance])

useEffect(() => {

  dispatch(asyncSetCoinNumbers({
    kdg: {
      balance: KGDBalance,
      exchange_rate: CoinPriceKDG
    },
    eth: {
      balance: ETHBalance,
      exchange_rate: CoinPriceETH
    },
    trx: {
      balance: TRXBalance,
      exchange_rate: CoinPriceTRX
    },
    usdt: {
      balance: USDTBalance,
      exchange_rate: CoinPriceUSDT
    },
    knc: {
      balance: KNCBalance,
      exchange_rate: CoinPriceKNC
    },
    mch: {
      balance: MCHBalance,
      exchange_rate: CoinPriceMCH
    },

  }))

}, [KGDBalance, 
  ETHAddress, 
  USDTBalance, 
  TRXBalance, 
  KNCBalance, 
  MCHBalance, 
  CoinPriceKDG,
  CoinPriceETH,
  CoinPriceTRX,
  CoinPriceUSDT,
  CoinPriceKNC,
  CoinPriceMCH

])

  return (
    <>
      {!IsScannerOpen && 
      
          <View style={[mainStyles.container,{paddingBottom: 20, paddingHorizontal: 15}]}>
            <View style={[walletStyles.header]}>
              <View><Text style={walletStyles.titleHeader}>King Wallet</Text></View>
              <View style={walletStyles.groupIcon}>
                <TouchableOpacity
                  onPress={() => { openScanner() }}
                >
                  <Image style={walletStyles.scanQRIcon} source={openscaner} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Notify')} style={walletStyles.notifyIcon}>
                  <FontAwesomeIcon icon={faBell} style={{ color: '#fff' }} />
                  <Text style={walletStyles.notifyCount}>15</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={walletStyles.balance}>
              <View style={walletStyles.maskOpacity}></View>
              <View style={walletStyles.totalBalanceAndVisible}>
                <Text style={walletStyles.totalBalance}>{VisibleBalance ? hiddenBalance : typeCurrency === 1 ? CoinPriceKDG.vnd + ' ₫' : typeCurrency === 2 ?  '¥' + CoinPriceKDG.cny : '$' + CoinPriceKDG.usd}</Text>
                <TouchableOpacity onPress={()=>setVisibleBalance(!VisibleBalance)}>
                  <View style={{padding: 13}}>
                    <FontAwesomeIcon style={walletStyles.visibleButton} icon={VisibleBalance ? faEyeSlash : faEye}/>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={walletStyles.totalKDG}>{VisibleBalance ? hiddenBalance : KGDBalance + ' KDG'}</Text>
              <View style={walletStyles.availableAndLock}>
                <View style={walletStyles.availableAndLockBlock}>
                  <Text style={walletStyles.textAvailableAndLock}>Available balance</Text>
                  <Text style={walletStyles.quantityAvailableAndLock}>{VisibleBalance ? hiddenBalance : KGDBalance + ' KDG'}</Text>
                </View>
                <View style={walletStyles.availableAndLockBlock}>
                  <Text style={walletStyles.textAvailableAndLock}>Locked balance</Text>
                  <Text style={walletStyles.quantityAvailableAndLock}>{VisibleBalance ? hiddenBalance : 0}</Text>
                </View>
              </View>
            </View>

            <GroupButton />
            
            <View style={walletStyles.listCoinHead}>
              <Text style={walletStyles.listCoinHeadColor}>Total Assets</Text>
              <View style={[walletStyles.listCoinHead, {justifyContent:'flex-end', marginTop: 0}]}>
                <TouchableOpacity>
                  <FontAwesomeIcon style={walletStyles.listCoinHeadColor} icon={faSortAmountDown}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SetCoins')}>
                  <FontAwesomeIcon style={[walletStyles.listCoinHeadColor, {marginLeft:15}]} icon={faPlusCircle}/>
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
              addressTRX={TRXAddress}
              addressETH={ETHAddress}
              coinPriceKDG={CoinPriceKDG}
              coinPriceETH={CoinPriceETH}
              coinPriceTRX={CoinPriceTRX}
              coinPriceUSDT={CoinPriceUSDT}
              coinPriceKNC={CoinPriceKNC}
              coinPriceMCH={CoinPriceMCH}
              coinDisplay={coinDisplay}
            />

            <View style={walletStyles.listPostHead}>
              <Text style={walletStyles.listPostHeadText}>Tin tức</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('News')} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={walletStyles.listPostHeadViewMore}>Xem thêm </Text>
                <FontAwesomeIcon style={walletStyles.listPostHeadViewMore} icon={faAngleRight}/>
              </TouchableOpacity>
            </View>


              <View style={walletStyles.listPostScroll}>
              <FlatList
                horizontal={true}
                data={NewsData}
                renderItem={({item}) => {

                  if(item.content_en !== undefined){
                    return <View style={walletStyles.post}>
                    <TouchableOpacity
                      onPress={()=>navigation.navigate('News', {
                        NewsID: item._id
                      })}
                    >
                      <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}>
                        <Image style={walletStyles.postImage} source={{ uri: item.thumbURL_en}}/></View>
                      <Text style={walletStyles.postTitle}>{item.title_en}</Text>
                    </TouchableOpacity>
                  </View>  
                    
                  }
                }
              
    
               }
            />
   
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
          <FontAwesomeIcon style={{color: '#fff',fontSize: 40}} icon={faTimes} />
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

