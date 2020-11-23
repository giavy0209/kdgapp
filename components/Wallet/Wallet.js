import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Alert, Image, Dimensions, BackHandler, FlatList, Clipboard } from 'react-native';
import { Camera } from 'expo-camera';
import { mainStyles, walletStyles, scannerStyles, } from '../../styles/'
import { walletStylesLight } from '../../styles/light/'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faTimes, faEye, faEyeSlash, faSortAmountDown, faPlusCircle, faAngleRight, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

import openscaner from '../../assets/images/openscaner.png'
import openscanerLight from '../../assets/images/openscanerLight.png'

import GroupButton from './GroupButton'
import ListCoin from './ListCoin'
import { storage, checkLanguage } from '../../helper';
import { asyncSetCoinNumbers, asyncGetNews, asyncGetCoinPrice, actChangeSecureStatus, actChangeIsGetReward, asyncLogin } from '../../store/actions'
import { useIsFocused } from '@react-navigation/native';
import { PopupCongras } from '../Popup';
import kdgicon from '../../assets/images/IconCoin/KDG.png'
import ethicon from '../../assets/images/IconCoin/ETH.png'
import trxicon from '../../assets/images/IconCoin/TRX.png'
import usdticon from '../../assets/images/IconCoin/USDT.png'
import kncicon from '../../assets/images/IconCoin/KNC.png'
import mchicon from '../../assets/images/IconCoin/MCH.png'
import tomoicon from '../../assets/images/IconCoin/TOMO.png'
import calAPI from '../../axios';

const hiddenBalance = "******"

const coin_data = [
    { dataName: 'KDG', coinName: 'KDG', icon: kdgicon },
    { dataName: 'ETH', coinName: 'ETH', icon: ethicon },
    { dataName: 'TRX', coinName: 'TRX', icon: trxicon },
    { dataName: 'USDT', coinName: 'USDT-ERC20', icon: usdticon },
    { dataName: 'USDT', coinName: 'USDT-TRC20', icon: usdticon },
    { dataName: 'KNC', coinName: 'KNC', icon: kncicon },
    { dataName: 'MCH', coinName: 'MCH', icon: mchicon },
    { dataName: 'TOMO', coinName: 'TOMO', icon: tomoicon },
]
export default function App({ navigation }) {
    const dispatch = useDispatch();

    const typeCurrency = useSelector(state => state.currency)
    const language = useSelector(state => state.language)

    const display = useSelector(state => state.display)
    const isgetreward = useSelector(state => state.isgetreward)

    const [IsScannerOpen, setIsScannerOpen] = useState(false);
    const [VisibleBalance, setVisibleBalance] = useState(false);
    const [IsShortCoin, setIsShortCoin] = useState(false);
    const [IsTapShortCoin, setIsTapShortCoin] = useState(false);

    const [UserData, setUserData] = useState({});
    const [isModalVisible, setisModalVisible] = useState(false);


    const [NewsData, setNewsData] = useState([]);

    const [Count, setCount] = useState(0);
    
    const [KDGPrice, setKDGPrice] = useState(0);
    const [BTCPrice, setBTCPrice] = useState(0);
    const [BalanceRealMoney, setBalanceRealMoney] = useState(0);
    const [KDGLock, setKDGLock] = useState(0);
    const [CoinData, setCoinData] = useState([])

    const handleGetCoinPrice = useCallback(async () => {
        var balanceRealMoney = 0
        var userData = (await storage('userData').getItem())
        if (!userData) return
        var balance = userData.balances
        if (!balance) return
        for (let index = 0; index < coin_data.length; index++) {
            const _data = coin_data[index];
            const res = (await (await calAPI()).get(`/api/markets/coin_price?coin_type=${_data.dataName}`)).data
            _data.coinPrice = typeCurrency === 0 ? Number(res.data.price.toFixed(4)) : Number((res.data.price * 23000).toFixed(4))

            balanceRealMoney += _data.coinPrice

            var findThisData = balance.find(o => o.coin.code === _data.coinName)
            _data.balance = findThisData.balance
            _data.address = findThisData.wallet.address

            if(_data.coinName === 'KDG') setKDGPrice(_data.coinPrice)
        }

        setBalanceRealMoney(balanceRealMoney)
        setCoinData([...coin_data])

        var getBTCPrice = (await (await calAPI()).get(`/api/markets/coin_price?coin_type=BTC`)).data
        var btcPrice = typeCurrency === 0 ? Number(getBTCPrice.data.price.toFixed(4)) : Number((getBTCPrice.data.price * 23000).toFixed(4))
        setBTCPrice(btcPrice)
    }, [typeCurrency])

    useEffect(()=>{
        handleGetCoinPrice()
    },[typeCurrency])

    useEffect(() => {
        async function getwalletBlance() {
            var loginInfo = await storage('loginInfo').getItem()
            await dispatch(asyncLogin(loginInfo))

            var userData = await storage('userData').getItem()
            setKDGLock(userData.kdg_lock ? userData.kdg_lock : 0)
        }
        getwalletBlance()
    }, [])

    const handleBarCodeScanned = useCallback(({ type, data }) => {
        Clipboard.setString(data)
        Alert.alert(
            checkLanguage({ vi: 'Bạn đã sao chép địa chỉ ví', en: 'You have copied the wallet address to the clipboard' }, language),
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
                checkLanguage({ vi: 'Cấp quyền?', en: 'Allowing access?' }, language),
                checkLanguage({ vi: 'Bạn phải cấp quyền camera để sử dụng tính năng này', en: 'You need to allow "King Wallet" to access your camera to use this feature' }, language),
            )
        }
    }, [])

    useEffect(() => {
        BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                setIsScannerOpen(false)
                return true;
            }
        );

    }, [])

    useEffect(() => {
        if (isgetreward) {
            setisModalVisible(true)
            dispatch(actChangeIsGetReward(false))
        }
    }, [isgetreward])

    useEffect(() => {
        dispatch(actChangeSecureStatus({
            kdg_reward: UserData.kdg_reward,
            kyc: UserData.kyc,
            kyc_success: UserData.kyc_success,
            is2FA: UserData.is2FA,
            create_date: UserData.create_date
        }))
    }, [UserData])


    useEffect(() => {
        var dem = 0
        dispatch(asyncGetNews(0, 20))
            .then((res) => {
                setNewsData(res.data)

                res.data.slice(0, 4).forEach((item) => {
                    if (item.content_vi !== undefined && item.meta_vi !== undefined) {
                        if (
                            (
                                (new Date(item.create_date)).getDate().toString() + "/" +
                                ((new Date(item.create_date)).getMonth() + 1).toString() + "/" +
                                (new Date(item.create_date)).getFullYear().toString()
                            ) === (
                                (new Date()).getDate().toString() + "/" +
                                ((new Date()).getMonth() + 1).toString() + "/" +
                                (new Date()).getFullYear().toString()
                            )
                        ) {
                            dem += 1
                        }
                    }
                })
                setCount(dem)
            })
            .catch(console.log)
    }, [])


    const sortHandler = (isSort, isTapSort) => {
        setIsShortCoin(!isSort)
        setIsTapShortCoin(true)
    }

    var WalletStyle = display === 1 ? walletStylesLight : walletStyles
    

    return (
        <>
            <PopupCongras isModalVisible={isModalVisible} toPress={() => setisModalVisible(false)} title={checkLanguage({ vi: 'Chúc mừng bạn', en: 'Congrats' }, language)} content={checkLanguage({ vi: 'Bạn nhận được 2KDG Reward cho lần đầu đăng nhập app', en: 'You got 2 KDG Reward for the first time login' }, language)} />
            {!IsScannerOpen &&

                <View style={[mainStyles.container, { paddingBottom: 20, paddingHorizontal: 15 }]}>
                    <View style={[WalletStyle.header]}>
                        <View><Text style={WalletStyle.titleHeader}>King Wallet</Text></View>
                        <View style={WalletStyle.groupIcon}>
                            <TouchableOpacity
                                onPress={() => { openScanner() }}
                            >
                                <Image style={WalletStyle.scanQRIcon} source={display === 1 ? openscanerLight : openscaner} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Notify', {
                                NewsData: NewsData
                            })} style={WalletStyle.notifyIcon}>
                                <FontAwesomeIcon icon={faBell} style={{ color: display === 1 ? '#283349' : '#ffff' }} />
                                {Count !== 0 ? <Text style={WalletStyle.notifyCount}>{Count}</Text> : null}
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={WalletStyle.balance}>
                        <View style={WalletStyle.maskOpacity}></View>
                        <View style={WalletStyle.totalBalanceAndVisible}>
                            <Text style={WalletStyle.totalBalance}>{VisibleBalance ? hiddenBalance : `${((BalanceRealMoney + KDGLock * KDGPrice) / BTCPrice).toFixed(7)} BTC`}</Text>
                            <TouchableOpacity onPress={() => setVisibleBalance(!VisibleBalance)}>
                                <View style={{ padding: 13 }}>
                                    <FontAwesomeIcon style={WalletStyle.visibleButton} icon={VisibleBalance ? faEyeSlash : faEye} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={WalletStyle.availableAndLock}>
                            <View style={WalletStyle.availableAndLockBlock}>
                                <Text style={WalletStyle.textAvailableAndLock}>{checkLanguage({ vi: 'Tài sản sẵn có', en: 'Available Asset' }, language)}</Text>
                                <Text style={WalletStyle.quantityAvailableAndLock}>
                                    {typeCurrency === 0 && '$'}{BalanceRealMoney}{typeCurrency === 1 && '₫'}
                                </Text>
                            </View>
                            <View style={WalletStyle.availableAndLockBlock}>
                                <Text style={WalletStyle.textAvailableAndLock}>{checkLanguage({ vi: 'Tài sản bị khoá', en: 'Locked Asset' }, language)}</Text>
                                <Text style={WalletStyle.quantityAvailableAndLock}>
                                    {typeCurrency === 0 && '$'}{KDGLock * KDGPrice}{typeCurrency === 1 && '₫'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <GroupButton />

                    <View style={WalletStyle.listCoinHead}>
                        <Text style={WalletStyle.listCoinHeadColor}>{checkLanguage({ vi: 'Tổng tài sản', en: 'Total Asset' }, language)}</Text>
                        <View style={[WalletStyle.listCoinHead, { justifyContent: 'flex-end', marginTop: 0 }]}>
                            <TouchableOpacity onPress={() => sortHandler(IsShortCoin, IsTapShortCoin)}
                            >
                                <FontAwesomeIcon style={WalletStyle.listCoinHeadColor} icon={IsShortCoin ? faSortAmountUp : faSortAmountDown} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SetCoins')}>
                                <FontAwesomeIcon style={[WalletStyle.listCoinHeadColor, { marginLeft: 15 }]} icon={faPlusCircle} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ListCoin
                        VisibleBalance={VisibleBalance}
                        hiddenBalance={hiddenBalance}
                        isShortCoin={IsShortCoin}
                        isTapSort={IsTapShortCoin}
                        CoinData={CoinData}
                    />

                    <View style={WalletStyle.listPostHead}>
                        <Text style={WalletStyle.listPostHeadText}>{checkLanguage({ vi: 'Tin tức', en: 'News' }, language)}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('News')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={WalletStyle.listPostHeadViewMore}>{checkLanguage({ vi: 'Xem thêm', en: 'See more' }, language)}</Text>
                            <FontAwesomeIcon style={WalletStyle.listPostHeadViewMore} icon={faAngleRight} />
                        </TouchableOpacity>
                    </View>


                    <View style={WalletStyle.listPostScroll}>
                        {
                            checkLanguage({
                                vi: (
                                    <FlatList
                                        horizontal={true}
                                        data={NewsData}
                                        keyExtractor={(item, index) => index + '123'}
                                        renderItem={({ item, index }) => {

                                            if (item.content_vi !== undefined && item.thumbURL_vi !== undefined) {
                                                return <View key={index + 'aaaa'} style={WalletStyle.post}>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('News', {
                                                            NewsID: item._id
                                                        })}
                                                    >
                                                        <View style={{ width: '100%', borderRadius: 5, overflow: 'hidden', }}>
                                                            <Image style={WalletStyle.postImage} source={{ uri: item.thumbURL_vi }} /></View>
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
                                        keyExtractor={(item, index) => index + '123'}
                                        renderItem={({ item, index }) => {
                                            if (item.content_en !== undefined && item.thumbURL_en !== undefined) {
                                                return <View key={index + 'aaaaa'} style={WalletStyle.post}>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('News', {
                                                            NewsID: item._id
                                                        })}
                                                    >
                                                        <View style={{ width: '100%', borderRadius: 5, overflow: 'hidden', }}>
                                                            <Image style={WalletStyle.postImage} source={{ uri: item.thumbURL_en }} /></View>
                                                        <Text style={WalletStyle.postTitle}>{item.title_en}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            }
                                        }


                                        }
                                    />
                                )
                            }, language)

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
                    <FontAwesomeIcon style={{ color: '#fac800' }} size={30} icon={faTimes} />
                </TouchableOpacity>
                <Camera
                    onBarCodeScanned={handleBarCodeScanned}
                    ratio='1:1'
                    style={[{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width, position: 'absolute', top: '50%', transform: [{ translateY: - Dimensions.get('screen').width / 2 }] }]}
                />
            </View>}
        </>
    );
}

