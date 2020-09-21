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
import Popup from '../../Popup/Popup'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({coin = 'BTC', setOutScrollView, setOutScrollViewTop}){

    const navigation = useNavigation()
    const route = useRoute();

    const [isModalVisible, setModalVisible] = useState(false);

    
    const [SelectType, setSelectType] = useState(null)
    const [SelectedHistory, setSelectedHistory] = useState('Tất cả')
    const [SelectedTime, setSelectedTime] = useState('1 ngày')

    // ------------content---------------
    const [Status, setStatus] = useState(                        
        <Text style={{color: '#fac800'}}>
           Giao dịch đang chờ
       </Text>
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

    const { coin_name, type, status, fromAddress, toAddress, block, hash, amount, datetime } = route.params;

    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
      };

    useEffect(()=>{
       if(status === 'failed'){
            setStatus(
                <Text style={{color: '#c00e0f'}}>
                    Giao dịch thất bại
                </Text>
            )
       }
       if(status === 'success'){
            setStatus(
                <Text style={{color: '#259e58'}}>
                    Giao dịch thành công
                </Text>
            );
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
        setOutScrollViewTop(<Header2 title={coin_name} />)
    },[])

    
    const copyHandler1 = () => {
        Clipboard.setString(fromAddress)
        toggleModal()
    }

    const copyHandler2 = () => {
        Clipboard.setString(toAddress)
        toggleModal()
    }

    
    const copyHandler3 = () => {
        Clipboard.setString(hash)
        toggleModal()
    }


    useEffect(()=>{
        setOutScrollView(        
        <View style={{flex: 50  , backgroundColor: '#283349', borderRadius: 15}}>
            <View style={{padding: 20}}>
                 <View style={{paddingBottom: 10}}>
                    <Text style={{color: 'rgba(255,255,255,0.4)', fontSize: 14}}>THÔNG TIN CHI TIẾT</Text>
                 </View>
                <View style={{height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 80}}>
                    <View>
                        <Text style={{color: '#fff'}}>Từ</Text>
                        <TouchableOpacity 
                            onPress={copyHandler1}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>{fromAddress}</Text>
                                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Đến</Text>
                        <TouchableOpacity 
                            onPress={copyHandler2}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>{toAddress}</Text>
                                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Mã giao dịch</Text>
                        <TouchableOpacity 
                            onPress={copyHandler3}
                            disabled={true}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>{hash}</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Block</Text>
                        <TouchableOpacity 
                            // onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            disabled={true}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>{block}</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Ghi chú</Text>
                        <TouchableOpacity 
                            // onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            disabled={true}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(18,24,39,0.8)', borderRadius: 5}}>
                                <Text style={{color: 'rgba(255,255,255, 0.7)'}}>N/A</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>)
    },[])


    return (
        <>   
            <View style={[mainStyles.container]}>
            <Popup type='success' title='Đã copy' isModalVisible={isModalVisible}/>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/* <Text style={{color: '#259e58'}}>
                            Giao dịch thành công
                        </Text> */}
                        {Status}
                        <Text style={{color: 'rgba(255,255,255,0.5)'}}>
                           {datetime}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        {Icon}
                        <View style={{paddingTop: 5}}>
                            <Text style={{color: '#fac800', fontSize: 20, fontWeight: 'bold'}}>{type === 'deposit' ? `+ ${amount} ${coin_name}` : type === 'withdraw' ? `- ${amount} ${coin_name}` : 'Không xác định'}</Text>
                        </View>
          
                    </View>
                </View>
            </View>     


        </>
    )
}