import React, { useState, useCallback, useEffect} from 'react';
import {  View, Text, Image, Dimensions, Clipboard, FlatList,TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {LineChart } from 'react-native-chart-kit'
import {mainStyles} from '../../../styles'
import {Header2} from '../../Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleLeft, faAngleRight, faChevronLeft, faChevronRight, faCopy, faFilter } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Select from './Select'
import HistoryButton from '../../Button/HistoryButton'
import Popup from '../../Popup/Popup'

import emptyicon from '../../../assets/images/emptyicon.png'
import { storage, checkLanguage } from '../../../helper'
import { asyncGetBlockchainTransaction} from '../../../store/actions'
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const paginate = function (array, index, size) {
    // transform values
    index = Math.abs(parseInt(index));
    size = parseInt(size);
    size = size < 1 ? 1 : size;

    // filter
    return [...(array.filter((value, n) => {
        return (n >= (index * size)) && (n < ((index+1) * size))
    }))]
}

export default function App({setOutScrollView, setOutScrollViewTop}){

    const [isModalVisible, setModalVisible] = useState(false);

    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)
  
  
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

    
    const [Loading, setLoading] = useState(false);

    const [Skip, setSkip] = useState(0)

    const [SelectType, setSelectType] = useState(null)
    const [SelectedHistory, setSelectedHistory] = useState('Tất cả')
    const [SelectedTime, setSelectedTime] = useState('1 ngày')

    const coinName = route.params.id;
    const coinAddress = route.params.address ?? {};
    const coinAddressTRC = route.params.addressTRC ?? {};
    const coinBalance = route.params.balance;
    const coinPrice = route.params.coinPrice;


    const [Transaction, setTransaction] = useState([]);

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
          setLoading(true)
          var type = coinName === 'TRX' ? 'tron' : coinName.toLowerCase() 
          dispatch(asyncGetBlockchainTransaction(type, coinAddress,  coinName === 'TOMO' ? 100 : 10000,'2016-08-01'))
          //Loi backend khong xu ly skip, take. TOMO: Limit is less than 101 items per page
          .then((res)=>{
      
            if(type === 'usdt' || type === 'eth'|| type === 'knc' || type === 'mch'){
                setLoading(false)
                setTransaction(res.data.result)
            }else if(coinName === 'TOMO'){
                setLoading(false)
                setTransaction(res.data.items)
            }else if(coinName === 'BTC'){
                setLoading(false)
                setTransaction(res.data.txs)
            }else{
                setLoading(false)
                setTransaction(res.data.data)
            }
          })     
          .catch(console.log)
    
      }, [])


    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={coinName} />)
    },[])


    
  const rightArrowHandler = useCallback(() => {
      var tranLength = Transaction ? Transaction.length ? Transaction.length : -1 : -1
      
      if(tranLength !== -1){
        if(Skip < tranLength/5-1){
            setSkip(Skip+1)
        }
    }
}, [Skip,Transaction]);


const leftArrowHandler = useCallback((skip) => {
    if(skip > 0){
        setSkip(skip-1)
    }
}, [Skip]);


    // var d = new Date('2020-09-21 08:16:05 UTC')
    
    // var s = d.replace()
    // var d = new Date('2020-09-21T08:16:05.000+00:00')
    // console.log(d.toString())


    const percent24h = coinNumbers[coinName.toLowerCase()].exchange_rate.exchange.percent24h
    return (
        <>   
            <View style={[mainStyles.container]}>
                <Popup type='success' title='Đã copy' isModalVisible={isModalVisible}/>
                <View style={{flexDirection: 'row',justifyContent: 'center', paddingVertical: 20}}>
                   <View> 
                        <Text style={{color: percent24h < 0  ? 'red' : '#26a65b', fontSize: 16, textAlign: 'center'}}>{`$${coinNumbers[coinName.toLowerCase()].exchange_rate.exchange.usd} (${percent24h}%)`}</Text>
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
               <coingecko-coin-compare-chart-widget  coin-ids="${coinName === 'KDG' ? 'kingdom-game-4-0' : coinName === 'ETH' ? 'ethereum' : coinName === 'TRX' ? 'tron' :  coinName === 'USDT' ? 'tether' : coinName === 'KNC' ? 'kyber-network' : coinName === 'MCH' ? 'meconcash' : coinName === 'TOMO' ? 'tomochain' : 'bitcoin'}" currency="usd" locale="en"></coingecko-coin-compare-chart-widget>` }}
               scalesPageToFit={true}
               bounces={false}
               javaScriptEnabled
               style={{ height: 180, width: '100%' }}
               automaticallyAdjustContentInsets={false}
            />
                {/* <TouchableOpacity 
                    onPress={() => copyHandler(coinAddress)}
                    style={{padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: display === 1 ? '#ffff' : 'rgba(29,38,59,0.6)', borderRadius: 5}}>
                        <Text style={{color: display === 1 ? '#283349'  : 'rgba(255,255,255, 0.7)'}}>{coinAddress}</Text>
                        <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                    </View>
                </TouchableOpacity> */}

     
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: windowHeight/25, paddingHorizontal: 15, paddingTop: 10}}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('DepositPage2', {
                            id: coinName,
                            address: coinAddress,
                            addressTRC: coinAddressTRC ?  coinAddressTRC : ''
                        })}
                        style={{width: windowWidth/2.3}}>
                        <LinearGradient 
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                                style={{alignItems: 'center', padding: windowWidth/38, width: '100%', borderRadius: 20}}>
                                <Text style={{color: '#111b2d', fontSize: 16}}>{checkLanguage({vi: 'NẠP', en: `DEPOSIT`},language)}</Text>
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
                                <Text style={{color: '#fac800'}}>{checkLanguage({vi: 'RÚT', en: `WITHDRAW`},language)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>   

                <View style={{padding: 20}}>

                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10}}>
                        <View>
                            <Text style={{color: '#deb306', fontSize: 18}}>{checkLanguage({vi: 'Lịch sử', en: `Transaction`},language)}</Text>
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
                    {  Loading === true ?  <ActivityIndicator size="small" color="#fac800" />
                    : Transaction ? Transaction.length > 0 ?
                    <FlatList
                    data={paginate(Transaction, Skip, 5)}
                    renderItem={({item}) => 
                    {
                        if(coinName === 'KNC' || coinName === 'ETH' || coinName === 'USDT' || coinName === 'MCH'){
                            return (
                                <HistoryButton 
                                    toPress={() => navigation.navigate('HistoryDetail', {
                                        coin_name: coinName,
                                        type: item.from.toLowerCase() === coinAddress.toLowerCase() ? 'withdraw' : 'deposit',
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
                                    type={item.from.toLowerCase() === coinAddress.toLowerCase() ? 'withdraw' : 'deposit'}
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
                        } else if(coinName === 'TOMO') {
                            var timestamp = item.timestamp.replace(' ', 'T').replace(' ','').replace('UTC', '+00:00')
                            var date = new Date(timestamp)
                            var h = date.getHours()
                            var m = date.getMinutes()
                            var s = date.getSeconds()
                            var d = date.getDate()
                            var mm = date.getMonth()+1
                            var y = date.getFullYear()
                            return (
                                <HistoryButton 
                                    toPress={() => navigation.navigate('HistoryDetail', {
                                        coin_name: coinName,
                                        type: item.from.toLowerCase() === coinAddress.toLowerCase() ? 'withdraw' : 'deposit',
                                        status: item.status === true ? 'success' : 'failed',
                                        fromAddress: item.from,
                                        toAddress: item.to,
                                        block: item.blockNumber,
                                        hash: item.hash,
                                        amount: (item.value)/Math.pow(10, 18),
                                        datetime: h + ':' + m + ':' + s + " - " + d + "/" + mm + "/" + y
                                      


                                    })}
                                    type={item.from.toLowerCase() === coinAddress.toLowerCase() ? 'withdraw' : 'deposit'}
                                    status={item.status === true ? 'success' : 'failed'}
                                    datetime= {h + ':' + m + ':' + s + " - " + d + "/" + mm + "/" + y}
                                    value= {(item.value)/Math.pow(10, 18)}
                                    coin_name={coinName}
                    
                                />
                            )

                        } else if(coinName === 'BTC') {

                            return (
                                <HistoryButton 
                                    toPress={() => navigation.navigate('HistoryDetail', {
                                        coin_name: coinName,
                                        type: item.spent === false ? 'withdraw' : 'deposit',
                                        status: 'success',
                                        fromAddress: item.addr,
                                        toAddress:  '',
                                        block: '',
                                        hash: item.script,
                                        amount: (item.value)/1e8,
                                        datetime: ''         
                                   

                                    })}
                                    type={item.spent === false ? 'withdraw' : 'deposit'}
                                    status='success'
                                    datetime=''
                                    value= {(item.value)/1e8}
                                    coin_name={coinName}
                    
                                />
                            )
                        }else{
                            return (
                                <HistoryButton 
                                    toPress={() => navigation.navigate('HistoryDetail', {
                                        coin_name: coinName,
                                        type: item.transferFromAddress.toLowerCase() === coinAddress.toLowerCase() ? 'withdraw' : 'deposit',
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
                                    type={item.transferFromAddress.toLowerCase() === coinAddress.toLowerCase() ? 'withdraw' : 'deposit'}
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
                    /> : <View style={{alignItems: 'center', justifyContent: 'center'}}>

                            <Image source={emptyicon}/>
                            <Text style={{color: display === 1 ? '#989a9c' : 'rgba(255,255,255,0.5)',  alignItems: 'center', alignSelf: 'center'}}>{checkLanguage({vi: 'Không có dữ liệu', en: `No data`},language)}</Text>
                    
                        </View>
                        
                    : <View style={{alignItems: 'center', justifyContent: 'center'}}>

                        <Image source={emptyicon}/>
                        <Text style={{color: display === 1 ? '#989a9c' : 'rgba(255,255,255,0.5)',  alignItems: 'center', alignSelf: 'center'}}>{checkLanguage({vi: 'Không có dữ liệu', en: `No data`},language)}</Text>
                
                    </View>
                     
                    }
                    
                    {
                        Transaction ? Transaction.length ? Transaction.length > 0 ?
                        <View style={{paddingTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
                            <TouchableOpacity onPress={() => leftArrowHandler(Skip)}>
                                <FontAwesomeIcon size={40} color={display === 1 ? '#fac800' : "rgba(255,255,255,0.6)"} icon={faAngleLeft}/>
                            </TouchableOpacity>
                                <Text style={{color: display === 1 ? '#fac800' :  'rgba(255,255,255,0.6)', fontSize: 20, paddingHorizontal: 20}}>{Skip+1 + '/' + ( Math.ceil(Transaction.length/5))}</Text>
                            <TouchableOpacity onPress={() =>  rightArrowHandler(Skip)}>
                                <FontAwesomeIcon size={40} color={display === 1 ? '#fac800' : "rgba(255,255,255,0.6)"} icon={faAngleRight}/>
                            </TouchableOpacity>
                        </View>
                        : null : null : null

                    }
                    
                </View>
            </View>     

        </>
    )
}