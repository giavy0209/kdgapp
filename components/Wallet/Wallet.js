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
import { asyncGetBalance, asyncGetBalanceNews, asyncGetBalanceDouble, asyncGetNews, asyncGetCoinPrice } from '../../store/actions';

const hiddenBalance = "******"
export default function App({ navigation }) {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);


  const [IsScannerOpen, setIsScannerOpen] = useState(false);
  const [VisibleBalance, setVisibleBalance] = useState(true);
  const [UserData, setUserData] = useState({});


  const [NewsData, setNewsData] = useState([]);


  // ----------Balance Coin -----------
  const [KGDBalance, setKDGBalance] = useState(0);
  const [TRXBalance, setTRXBalance] = useState(0);
  const [ETHBalance, setETHBalance] = useState(0);
  const [USDTBalance, setUSDTBalance] = useState(0);
  // ----------------------------------

  // ----------Address Coin -----------
  const [TRXAddress, setTRXAddress] = useState('');
  const [ETHAddress, setETHAddress] = useState('');
  // ----------------------------------


  
  const [CoinPriceKDG, setCoinPriceKDG] = useState({
    vnd: 0, usd: 0
  });
  const [CoinPriceETH, setCoinPriceETH] = useState({
    vnd: 0, usd: 0
  });
  const [CoinPriceTRX, setCoinPriceTRX] = useState({
    vnd: 0, usd: 0
  });
  const [CoinPriceUSDT, setCoinPriceUSDT] = useState({
    vnd: 0, usd: 0
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
    }

    getwalletBlance()
  }, [])


  useEffect(() => {
    dispatch(asyncGetNews(5,12))
    .then((res)=>{
      setNewsData(res.data)
    })
    .catch(console.log) 
}, [])

  // useEffect(() => {
  //   dispatch(asyncGetCoinPrice(`KDGVND`))
  //   .then(({resVND, resUSDVND})=>{
  //       var exchange_rate_USD_VND = resUSDVND.data
  //       var exchange_rate = resVND.data
  //       var coin_price_VND = exchange_rate*KGDBalance
  //       var coin_price_USD = coin_price_VND/exchange_rate_USD_VND
  //       setCoinPriceKDG({
  //         vnd: coin_price_VND.toFixed(2), usd: coin_price_USD.toFixed(4)
  //       })
  //       console.log(resVND);
  //   })
  //   .catch(console.log) 

  //   dispatch(asyncGetCoinPrice(`ETHVND`))
  //   .then(({resVND, resUSDVND})=>{
  //       var exchange_rate_USD_VND = resUSDVND.data
  //       var exchange_rate = resVND.data
  //       var coin_price_VND = exchange_rate*ETHBalance
  //       var coin_price_USD = coin_price_VND/exchange_rate_USD_VND
  //       setCoinPriceETH({
  //         vnd: coin_price_VND.toFixed(2), usd: coin_price_USD.toFixed(4)
  //       })
  //   })
  //   .catch(console.log) 
    
  //   dispatch(asyncGetCoinPrice(`TRXVND`))
  //   .then(({resVND, resUSDVND})=>{
  //       var exchange_rate_USD_VND = resUSDVND.data
  //       var exchange_rate = resVND.data
  //       var coin_price_VND = exchange_rate*TRXBalance
  //       var coin_price_USD = coin_price_VND/exchange_rate_USD_VND
  //       setCoinPriceTRX({
  //         vnd: coin_price_VND.toFixed(2), usd: coin_price_USD.toFixed(4)
  //       })
  //   })
  //   .catch(console.log) 
    
  //   dispatch(asyncGetCoinPrice(`USDTVND`))
  //   .then(({resVND, resUSDVND})=>{
  //       var exchange_rate_USD_VND = resUSDVND.data
  //       var exchange_rate = resVND.data
  //       var coin_price_VND = exchange_rate*USDTBalance
  //       var coin_price_USD = coin_price_VND/exchange_rate_USD_VND
  //       setCoinPriceUSDT({
  //         vnd: coin_price_VND.toFixed(2), usd: coin_price_USD.toFixed(4)
  //       })
  //   })
  //   .catch(console.log) 

  // },[])



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
                <Text style={walletStyles.totalBalance}>{VisibleBalance ? hiddenBalance : '$1200'}</Text>
                <TouchableOpacity onPress={()=>setVisibleBalance(!VisibleBalance)}>
                  <FontAwesomeIcon style={walletStyles.visibleButton} icon={VisibleBalance ? faEyeSlash : faEye}/>
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

            <GroupButton/>
            
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
              addressTRX={TRXAddress}
              addressETH={ETHAddress}
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
                renderItem={({item}) =>
                <View style={walletStyles.post}>
                  <View>
                    <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}><Image style={walletStyles.postImage} source={{ uri: item.thumbURL_vi}}/></View>
                    <Text style={walletStyles.postTitle}>{item.title_vi}</Text>
                {/* {console.log()} */}
                  </View>
               </View>  }
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

