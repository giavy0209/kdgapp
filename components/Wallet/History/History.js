import React, { useState, useCallback, useEffect} from 'react';
import {  View, Text, Image, Dimensions, Clipboard} from 'react-native';
import {LineChart } from 'react-native-chart-kit'
import {mainStyles} from '../../../styles'
import {Header2} from '../../Header'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faCopy, faFilter } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Select from './Select'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({coin = 'BTC', setOutScrollView, setOutScrollViewTop}){

    const navigation = useNavigation()

    const [SelectType, setSelectType] = useState(null)
    const [SelectedHistory, setSelectedHistory] = useState('Tất cả')
    const [SelectedTime, setSelectedTime] = useState('1 ngày')


    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={coin} />)
    },[])
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

    const handleNext = useCallback(()=>{
        setOutScrollView(<Confirm setOutScrollView={setOutScrollView} SelectedTime={SelectedTime}/>)
    },[SelectedTime])
    
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
                    onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                    style={{padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(29,38,59,0.6)', borderRadius: 5}}>
                        <Text style={{color: 'rgba(255,255,255, 0.7)'}}>TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu</Text>
                        <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                    </View>
                </TouchableOpacity>

     
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: windowHeight/25, paddingHorizontal: 15}}>
                    <TouchableOpacity style={{width: windowWidth/2.3}}>
                        <LinearGradient 
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                                style={{alignItems: 'center', padding: windowWidth/38, width: '100%', borderRadius: 45}}>
                                <Text style={{color: '#111b2d', fontSize: 16}}>NHẬN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: windowWidth/2.3}}>
                        <View style={{alignItems: 'center', borderColor: '#fac800', borderWidth: 2, padding: windowWidth/38, width: '100%', borderRadius: 45}}>
                                <Text style={{color: '#fac800'}}>GỬI</Text>
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

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(28,38,59,0.7)', borderRadius: 5, padding: 15, borderBottomWidth: 1, borderColor: 'rgba(114,118,125,0.8)'}}>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('HistoryDetail')}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Image
                                        style={{
                                            width: 35,
                                            height: 35
                                        }}
                                        source={require('../../../assets/images/depositIcon.png')}
                                    />
                                </View>
                                <View style={{paddingLeft: 10}}>
                                    <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>Nhận</Text>
                                    <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: 12}}>08:21 - 20/02/20</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>+0.1 BTC</Text>
                            <Text style={{color: '#26a65b', fontSize: 12, fontStyle: 'italic'}}>Thành công</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(28,38,59,0.7)', borderRadius: 5, padding: 15,  borderBottomWidth: 1, borderColor: 'rgba(114,118,125,0.8)'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Image
                                        style={{
                                            width: 35,
                                            height: 35
                                        }}
                                        source={require('../../../assets/images/withdrawIcon.png')}
                                    />
                                </View>
                                <View style={{paddingLeft: 10}}>
                                    <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>Gửi</Text>
                                    <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: 12}}>08:21 - 20/02/20</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>-0.1 BTC</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: 12, fontStyle: 'italic'}}>Đang chờ</Text>
                                <TouchableOpacity>
                                    <Text style={{color: '#fac800', fontSize: 12, fontStyle: 'italic', paddingLeft: 5, textDecorationLine: 'underline'}}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(28,38,59,0.7)', borderRadius: 5, padding: 15}}>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Image
                                        style={{
                                            width: 35,
                                            height: 35
                                        }}
                                        source={require('../../../assets/images/withdrawIcon.png')}
                                    />
                                </View>
                                <View style={{paddingLeft: 10}}>
                                    <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>Gửi</Text>
                                    <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: 12}}>08:21 - 20/02/20</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>+0.1 BTC</Text>
                            <Text style={{color: '#e11f2e', fontSize: 12, fontStyle: 'italic'}}>Thất bại</Text>
                        </View>
                    </View>
                </View>
            </View>     

        </>
    )
}