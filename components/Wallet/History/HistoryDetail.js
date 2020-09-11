import React, { useState, useCallback, useEffect} from 'react';
import {  View, Text, Image, Dimensions, Clipboard} from 'react-native';
import {LineChart } from 'react-native-chart-kit'
import {mainStyles} from '../../../styles'
import {Header2} from '../../Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faCopy, faFilter } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Select from './Select'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({coin = 'BTC', setOutScrollView, setOutScrollViewTop}){

    const navigation = useNavigation()
    const route = useRoute();

    
    const [SelectType, setSelectType] = useState(null)
    const [SelectedHistory, setSelectedHistory] = useState('Tất cả')
    const [SelectedTime, setSelectedTime] = useState('1 ngày')

    // ------------content---------------
    const [Status, setStatus] = useState(                        
        <Text style={{color: '#259e58'}}>
            Giao dịch thành công
        </Text>
    )

    const [Title, setTitle] = useState(                
        <View style={{paddingBottom: 10}}>
            <Text style={{color: 'rgba(255,255,255,0.4)', fontSize: 14}}>THÔNG TIN CHI TIẾT</Text>
        </View>
    )
    const [Icon, setIcon] = useState(                        
        <Image
            style={{
                width: 32.5,
                height: 37.7
            }}
            source={require('../../../assets/images/walletDeposit.png')}
        />
    )

    // ---------------------------------

    const { id, type, status } = route.params;

    useEffect(()=>{
       if(status === 2){
            setStatus(
                <Text style={{color: '#c00e0f'}}>
                    Giao dịch thất bại
                </Text>
            )
       }
       if(status === 1){
            setStatus(
                <Text style={{color: '#fac800'}}>
                    Giao dịch đang chờ
                </Text>
            );
            
            setTitle(
                <View style={{paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'rgba(255,255,255,0.4)', fontSize: 14}}>THÔNG TIN CHI TIẾT</Text>
                    <TouchableOpacity>
                        <View style={{borderColor: '#fac800', borderWidth: 1, borderRadius: 45, paddingHorizontal: 8, flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: '#fac800'}}>Hủy giao dịch</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }


        if(type === 'withdraw'){
            setIcon(
                <Image
                    style={{
                        width: 32.5,
                        height: 37.7
                    }}
                    source={require('../../../assets/images/walletWithdraw.png')}
                />
            )
        }
    },[])

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={coin} />)
    },[])

    
    // useEffect(()=>{
    //    if(type === success){

    //    }
    // },[])
    useEffect(()=>{
        setOutScrollView(        
        <View style={{flex: 50  , backgroundColor: '#283349', borderRadius: 15}}>
            <View style={{padding: 20}}>
                {Title}
                <View style={{height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 80}}>
                    <View>
                        <Text style={{color: '#fff'}}>Từ</Text>
                        <TouchableOpacity 
                            onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu</Text>
                                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Đến</Text>
                        <TouchableOpacity 
                            onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu</Text>
                                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Mã giao dịch</Text>
                        <TouchableOpacity 
                            onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>TS8jRFiS3sjnwwJMAydTS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFuZifV9Bas3rKgFFu</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Block</Text>
                        <TouchableOpacity 
                            onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>TS8jRFiS3sjnwwJMAydTS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFuZifV9Bas3rKgFFu</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Ghi chú</Text>
                        <TouchableOpacity 
                            onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>N/A</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>)
    },[Title])

    
    return (
        <>   
            <View style={[mainStyles.container]}>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/* <Text style={{color: '#259e58'}}>
                            Giao dịch thành công
                        </Text> */}
                        {Status}
                        <Text style={{color: 'rgba(255,255,255,0.5)'}}>
                            08:21 - 20/02/2020
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        {Icon}
                        <View style={{paddingTop: 5}}>
                            <Text style={{color: '#fac800', fontSize: 20, fontWeight: 'bold'}}>+ 0.1 BTC</Text>
                        </View>
                        <View style={{paddingTop: 5}}>
                            <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: 16}}>$500</Text>
                        </View>
                    </View>
                </View>
            </View>     


        </>
    )
}