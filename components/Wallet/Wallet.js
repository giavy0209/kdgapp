import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux'
import {View, Text, TouchableOpacity, Alert, Image, Dimensions,BackHandler,ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import { mainStyles, walletStyles, scannerStyles } from '../../styles/'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faTimes,faEye,faEyeSlash, faSortAmountDown,faPlusCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import openscaner from '../../assets/images/openscaner.png'
import postImage from '../../assets/images/post-image.jpg'

import GroupButton from './GroupButton'
import ListCoin from './ListCoin'

const hiddenBalance = "******"
export default function App({ navigation }) {
  const isLogin = useSelector(state => state.isLogin)
  const [IsScannerOpen, setIsScannerOpen] = useState(false);
  const [VisibleBalance, setVisibleBalance] = useState(true);

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

  useEffect(()=>{
    BackHandler.addEventListener(
      "hardwareBackPress",
      ()=>{
        setIsScannerOpen(false)
        return true;
      }
    );
  },[])
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
              <Text style={walletStyles.totalKDG}>{VisibleBalance ? hiddenBalance : '300 KDG'}</Text>
              <View style={walletStyles.availableAndLock}>
                <View style={walletStyles.availableAndLockBlock}>
                  <Text style={walletStyles.textAvailableAndLock}>Available balance</Text>
                  <Text style={walletStyles.quantityAvailableAndLock}>{VisibleBalance ? hiddenBalance : '300 KDG'}</Text>
                </View>
                <View style={walletStyles.availableAndLockBlock}>
                  <Text style={walletStyles.textAvailableAndLock}>Locked balance</Text>
                  <Text style={walletStyles.quantityAvailableAndLock}>{VisibleBalance ? hiddenBalance : '300 KDG'}</Text>
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

            <ListCoin VisibleBalance={VisibleBalance} hiddenBalance={hiddenBalance}/>

            <View style={walletStyles.listPostHead}>
              <Text style={walletStyles.listPostHeadText}>News</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('News')} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={walletStyles.listPostHeadViewMore}>Xem thêm </Text>
                <FontAwesomeIcon style={walletStyles.listPostHeadViewMore} icon={faAngleRight}/>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal={true} style={walletStyles.listPost}>
              <View style={walletStyles.listPostScroll}>
                <View style={walletStyles.post}>
                  <View>
                    <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}><Image style={walletStyles.postImage} source={postImage}/></View>
                    <Text style={walletStyles.postTitle}>Tháng 8 bùng nổ với chính sách Hoàn đậm 50%</Text>
                  </View>
                </View>
                <View style={walletStyles.post}>
                  <View>
                    <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}><Image style={walletStyles.postImage} source={postImage}/></View>
                    <Text style={walletStyles.postTitle}>Tháng 8 bùng nổ với chính sách Hoàn đậm 50%</Text>
                  </View>
                </View>
                <View style={walletStyles.post}>
                  <View>
                    <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}><Image style={walletStyles.postImage} source={postImage}/></View>
                    <Text style={walletStyles.postTitle}>Tháng 8 bùng nổ với chính sách Hoàn đậm 50%</Text>
                  </View>
                </View>
                <View style={walletStyles.post}>
                  <View>
                    <View style={{width: '100%',borderRadius: 5,overflow: 'hidden',}}><Image style={walletStyles.postImage} source={postImage}/></View>
                    <Text style={walletStyles.postTitle}>Tháng 8 bùng nổ với chính sách Hoàn đậm 50%</Text>
                  </View>
                </View>
              </View>
              
              
            </ScrollView>

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

