import React, { useState, useCallback, useEffect} from 'react';
import {  View, Text, Image, Dimensions, Clipboard, FlatList,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {LineChart } from 'react-native-chart-kit'
import {mainStyles} from '../../../styles'
import {Header2} from '../../Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faChevronLeft, faChevronRight, faCopy, faFilter } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Select from './Select'
import HistoryButton from '../../Button/HistoryButton'
import Popup from '../../Popup/Popup'

import { storage } from '../../../helper'
import { asyncGetBlockchainTransaction} from '../../../store/actions'
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({setOutScrollView, setOutScrollViewTop}){

    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
      setTimeout(function(){ 
        setModalVisible(false);
       }, 1000);
    };

    
    const coinNumbers = useSelector(state => state.coinNumbers)

    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    const [SelectType, setSelectType] = useState(null)
    const [SelectedHistory, setSelectedHistory] = useState('Tất cả')
    const [SelectedTime, setSelectedTime] = useState('1 ngày')

    const coinName = route.params.id;
    const coinAddress = route.params.address;
    const coinBalance = route.params.balance;
    const coinPrice = route.params.coinPrice;


    const [Transaction, setTransaction] = useState([]);

    const [Skip, setSkip] = useState(1)
    useEffect(()=>{
        if(SelectType !== null){
            setOutScrollView(<Select 
                SelectType={SelectType}
                setSelectType={setSelectType}
                SelectValue={SelectType === 0 ? SelectedHistory : SelectedTime }
                setSelectValue={SelectType === 0 ? setSelectedHistory : setSelectedTime }
            />)
        }else{
            setOutScrollView(null)
        }
    },[SelectType])


    useEffect(() => {
          var type = coinName === 'TRX' ? 'tron' : coinName.toLowerCase() 
          dispatch(asyncGetBlockchainTransaction(type, coinAddress, 10,'2016-08-01'))
          .then((res)=>{
            if(type === 'usdt' || type === 'eth'|| type === 'knc' || type === 'mch'){
                setTransaction(res.data.result)
            }else{
                setTransaction(res.data.data)
            }
          
          })     
          .catch(console.log)
    
      }, [])


    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={coinName} />)
    },[])


    // const leftArrowHandler = (val) => { 
    //     if(val > 5){
    //         setSkip(val-5)
     
    //     }
    // }

    // const rightArrowHandler = (val) => {
    //     setSkip(val+5)
    // }

    // let JS = '<script src="https://widgets.coingecko.com/coingecko-coin-ticker-widget.js"></script>';

    // let source = JS + '<coingecko-coin-ticker-widget  coin-id="bitcoin" currency="usd" locale="en"></coingecko-coin-ticker-widget>';

    const copyHandler = (address) => {
        Clipboard.setString(address)
        toggleModal()

    }
    


    const percent24h = coinNumbers[coinName.toLowerCase()].exchange_rate.exchange.percent24h
    return (
        <>   
            <View style={[mainStyles.container]}>
                <Popup type='success' title='Đã copy' isModalVisible={isModalVisible}/>
                <View style={{flexDirection: 'row',justifyContent: 'center', paddingVertical: 20}}>
                   <View> 
                        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>{'$'+ coinNumbers[coinName.toLowerCase()].exchange_rate.usd}</Text>
                        <Text style={{color: percent24h < 0  ? 'red' : '#26a65b', fontSize: 12, textAlign: 'center'}}>{`$${coinNumbers[coinName.toLowerCase()].exchange_rate.exchange.usd} (${percent24h}%)`}</Text>
                   </View>
                   {/* <View style={{position: 'absolute', top: 25, right: 25}}>
                       <TouchableOpacity 
                            style={{flexDirection: 'row',  alignItems: 'center'}}
                            onPress={()=>setSelectType(1)}
                       >
                            <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: (windowWidth*windowHeight)/21000}}>7 ngày</Text>
                            <FontAwesomeIcon size={15} color="rgba(255,255,255,0.6)" icon={faAngleDown}/>
                        </TouchableOpacity>
                   </View> */}
                </View>
                {/* <LineChart
                data={{
                labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
                datasets: [
                    {
                    data: [
                        10,9,8,7,6,6,7,8,9,10,11,12,13,14,15,16
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={10} // optional, defaults to 1
                chartConfig={{
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 2,
                    fillShadowGradient: '#e8bf23',
                    fillShadowGradientOpacity: .37,
                    color: () => '#edd174',
                    labelColor: () => '#8a8c8e',
                    propsForBackgroundLines: {strokeWidth: 1 , stroke: '#000',strokeDasharray: '',strokeOpacity: .2},
                    barPercentage: 0
                }}
                withVerticalLines={false}
                // withDots={false}
                withOuterLines={false}
                fromZero={true}
                onDataPointClick={({value, dataset, getColor})=>{
                    console.log(getColor());
                }}
                />kingdom-game-4-0,ethereum,tron,tether,kyber-network,meconcash
                 */}
            <WebView
               originWhitelist={['*']}
               source={{ html: `<script src="https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js"></script>
               <coingecko-coin-compare-chart-widget  coin-ids="${coinName === 'KDG' ? 'kingdom-game-4-0' : coinName === 'ETH' ? 'ethereum' : coinName === 'TRX' ? 'tron' :  coinName === 'USDT' ? 'tether' : coinName === 'KNC' ? 'kyber-network' : coinName === 'MCH' ? 'meconcash' : 'tomochain'}" currency="usd" locale="en"></coingecko-coin-compare-chart-widget>` }}
               scalesPageToFit={true}
               bounces={false}
               javaScriptEnabled
               style={{ height: 180, width: '100%' }}
               automaticallyAdjustContentInsets={false}
            />
                <TouchableOpacity 
                    onPress={() => copyHandler(coinAddress)}
                    style={{padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(29,38,59,0.6)', borderRadius: 5}}>
                        <Text style={{color: 'rgba(255,255,255, 0.7)'}}>{coinAddress}</Text>
                        <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                    </View>
                </TouchableOpacity>

     
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: windowHeight/25, paddingHorizontal: 15}}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('DepositPage2', {
                            id: coinName,
                            address: coinAddress
                        })}
                        style={{width: windowWidth/2.3}}>
                        <LinearGradient 
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                                style={{alignItems: 'center', padding: windowWidth/38, width: '100%', borderRadius: 20}}>
                                <Text style={{color: '#111b2d', fontSize: 16}}>NẠP</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('WithdrawPage2', {
                            id: coinName,
                            address: coinAddress,
                            balance: coinBalance
                        })}
                        style={{width: windowWidth/2.3}}>
                        <View style={{alignItems: 'center', borderColor: '#fac800', borderWidth: 2, padding: windowWidth/38, width: '100%', borderRadius: 20}}>
                                <Text style={{color: '#fac800'}}>RÚT</Text>
                        </View>
                    </TouchableOpacity>
                </View>   

                <View style={{padding: 20}}>

                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10}}>
                        <View>
                            <Text style={{color: '#deb306', fontSize: 18}}>Lịch sử</Text>
                        </View>
                        {/* <View style={{position: 'absolute', top: 2, right: 2}}>
                             <TouchableOpacity 
                                style={{flexDirection: 'row',  alignItems: 'center'}}
                                onPress={()=>setSelectType(0)}
                            >
                                <Text style={{color: 'rgba(255,255,255,0.4)', fontSize: 14}}>Tất cả </Text>
                                <FontAwesomeIcon size={12} color="rgba(255,255,255,0.4)" icon={faFilter}/>
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    <FlatList
                    data={Transaction}
                    renderItem={({item}) => 
                    {
                        if(coinName === 'KNC' || coinName === 'ETH' || coinName === 'USDT' || coinName === 'MCH'){
                            return (
                                <HistoryButton 
                                    toPress={() => navigation.navigate('HistoryDetail', {
                                        coin_name: coinName,
                                        type: item.from === coinAddress ? 'withdraw' : 'deposit',
                                        status: 'success',
                                        fromAddress: item.from,
                                        toAddress: item.to,
                                        block: item.blockNumber,
                                        hash: item.hash,
                                        amount: coinName === 'MCH' ? (item.value)/Math.pow(10, 8) : (item.value)/Math.pow(10, 18),
                                        datetime:            
                                            (new Date((item.timeStamp)*1000)).getHours().toString()  + ":" +
                                            (new Date((item.timeStamp)*1000)).getMinutes().toString()  + ":" +
                                            (new Date((item.timeStamp)*1000)).getSeconds().toString()  + " - " +
                                            (new Date((item.timeStamp)*1000)).getDate().toString()  + "/"   +
                                            ((new Date((item.timeStamp)*1000)).getMonth() + 1).toString() + "/"   +
                                            (new Date((item.timeStamp)*1000)).getFullYear().toString()


                                    })}
                                    type={item.from === coinAddress ? 'withdraw' : 'deposit'}
                                    status = 'success'
                                    datetime={ 
                                                (new Date((item.timeStamp)*1000)).getHours().toString()  + ":" +
                                                (new Date((item.timeStamp)*1000)).getMinutes().toString()  + ":" +
                                                (new Date((item.timeStamp)*1000)).getSeconds().toString()  + " - " +
                                                (new Date((item.timeStamp)*1000)).getDate().toString()  + "/"   +
                                                ((new Date((item.timeStamp)*1000)).getMonth() + 1).toString() + "/"   +
                                                (new Date((item.timeStamp)*1000)).getFullYear().toString()
                                            }
                                    value=  {coinName === 'MCH' ? (item.value)/Math.pow(10, 8) : (item.value)/Math.pow(10, 18)}
                                    coin_name={coinName}
                
                                />
                            )
                        } else{
                            return (
                                <HistoryButton 
                                    toPress={() => navigation.navigate('HistoryDetail', {
                                        coin_name: coinName,
                                        type: item.transferFromAddress === coinAddress ? 'withdraw' : 'deposit',
                                        status: item.confirmed === true ? 'success' : 'failed',
                                        fromAddress: item.transferFromAddress,
                                        toAddress: item.transferToAddress,
                                        block: item.block,
                                        hash: item.transactionHash,
                                        amount: coinName === 'TRX' ? (item.amount)/Math.pow(10, 6) : (item.amount)/Math.pow(10, 18),
                                        datetime:            
                                            (new Date(item.timestamp)).getHours().toString()  + ":" +
                                            (new Date(item.timestamp)).getMinutes().toString()  + ":" +
                                            (new Date(item.timestamp)).getSeconds().toString()  + " - " +
                                            (new Date(item.timestamp)).getDate().toString()  + "/"   +
                                            ((new Date(item.timestamp)).getMonth() + 1).toString() + "/"   +
                                            (new Date(item.timestamp)).getFullYear().toString()


                                    })}
                                    type={item.transferFromAddress === coinAddress ? 'withdraw' : 'deposit'}
                                    status={item.confirmed === true ? 'success' : 'failed'}
                                    datetime={ 
                                                (new Date(item.timestamp)).getHours().toString()  + ":" +
                                                (new Date(item.timestamp)).getMinutes().toString()  + ":" +
                                                (new Date(item.timestamp)).getSeconds().toString()  + " - " +
                                                (new Date(item.timestamp)).getDate().toString()  + "/"   +
                                                ((new Date(item.timestamp)).getMonth() + 1).toString() + "/"   +
                                                (new Date(item.timestamp)).getFullYear().toString()
                                            }
                                    value= {coinName === 'TRX' ? (item.amount)/Math.pow(10, 6) : (item.amount)/Math.pow(10, 18)}
                                    coin_name={coinName}
                    
                                />
                            )
                        }
                        
                    }
                   
                    
                    }
                    />
                    
                </View>
            </View>     

        </>
    )
}