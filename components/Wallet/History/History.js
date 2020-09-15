import React, { useState, useCallback, useEffect} from 'react';
import {  View, Text, Image, Dimensions, Clipboard, FlatList} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {LineChart } from 'react-native-chart-kit'
import {mainStyles} from '../../../styles'
import {Header2} from '../../Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faChevronLeft, faChevronRight, faCopy, faFilter } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Select from './Select'
import HistoryButton from '../../Button/HistoryButton'

import { storage } from '../../../helper'
import { asyncGetBlockchainTransaction} from '../../../store/actions'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({setOutScrollView, setOutScrollViewTop}){

    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    const [SelectType, setSelectType] = useState(null)
    const [SelectedHistory, setSelectedHistory] = useState('Tất cả')
    const [SelectedTime, setSelectedTime] = useState('1 ngày')

    const coinName = route.params.id;
    const coinAddress = route.params.address;
    const coinBalance = route.params.balance;


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
          var type = coinName.toLowerCase()
          dispatch(asyncGetBlockchainTransaction(type, coinAddress, 1000,'2016-08-01'))
          .then((res)=>{
            setTransaction(res.data.data)
            console.log(res);
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

    console.log(SelectedTime);
    
    return (
        <>   
            <View style={[mainStyles.container]}>
                <View style={{flexDirection: 'row',justifyContent: 'center', paddingVertical: 20}}>
                   <View> 
                        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>$4123</Text>
                        <Text style={{color: '#26a65b', fontSize: 12, textAlign: 'center'}}>+$15000(2.57%)</Text>
                   </View>
                   <View style={{position: 'absolute', top: 25, right: 25}}>
                       <TouchableOpacity 
                            style={{flexDirection: 'row',  alignItems: 'center'}}
                            onPress={()=>setSelectType(1)}
                       >
                            <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: (windowWidth*windowHeight)/21000}}>7 ngày</Text>
                            <FontAwesomeIcon size={15} color="rgba(255,255,255,0.6)" icon={faAngleDown}/>
                        </TouchableOpacity>
                   </View>
                </View>
                <LineChart
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
                />

                <TouchableOpacity 
                    onPress={() => Clipboard.setString(coinAddress)}
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
                                style={{alignItems: 'center', padding: windowWidth/38, width: '100%', borderRadius: 45}}>
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
                        <View style={{alignItems: 'center', borderColor: '#fac800', borderWidth: 2, padding: windowWidth/38, width: '100%', borderRadius: 45}}>
                                <Text style={{color: '#fac800'}}>RÚT</Text>
                        </View>
                    </TouchableOpacity>
                </View>   

                <View style={{padding: 20}}>

                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10}}>
                        <View>
                            <Text style={{color: '#deb306', fontSize: 18}}>Lịch sử</Text>
                        </View>
                        <View style={{position: 'absolute', top: 2, right: 2}}>
                             <TouchableOpacity 
                                style={{flexDirection: 'row',  alignItems: 'center'}}
                                onPress={()=>setSelectType(0)}
                            >
                                <Text style={{color: 'rgba(255,255,255,0.4)', fontSize: 14}}>Tất cả </Text>
                                <FontAwesomeIcon size={12} color="rgba(255,255,255,0.4)" icon={faFilter}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                    data={Transaction}
                    renderItem={({item}) => 
                    
                    <HistoryButton 
                        type={item.transferFromAddress === coinAddress ? 'withdraw' : 'deposit'}
                        status={item.confirmed === true ? 'success' : 'failed'}
                        datetime={ 
                                    (new Date(item.timestamp)).getHours().toString()  + ":" +
                                    (new Date(item.timestamp)).getMonth().toString()  + ":" +
                                    (new Date(item.timestamp)).getSeconds().toString()  + " - " +
                                    (new Date(item.timestamp)).getDate().toString()  + "/"   +
                                    (new Date(item.timestamp)).getMonth().toString() + "/"   +
                                    (new Date(item.timestamp)).getFullYear().toString()
                                 }
                        value= {(item.amount)/Math.pow(10, 18)}
                        coin_name={coinName}
                    />
                    
                    }
                    />
                    
                </View>
            </View>     

        </>
    )
}