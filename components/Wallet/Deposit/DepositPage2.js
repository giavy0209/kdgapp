import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, Clipboard} from 'react-native'
import { mainStyles } from '../../../styles'
import {Header2} from '../../Header'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import QRCode from '../../QRGenerate/QRCode'

// ------------------Icon---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'

// ------------------------------------------


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({setOutScrollView, setOutScrollViewTop}){


    const [Width , setWidth] = useState(0);
  
    const [sendTo, setSendTo] = useState();
    const [address, setAddress] = useState();
    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation();
    const route = useRoute();

    const coinName = route.params.id;
    const coinAddress = route.params.address;

    
    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={"Nhận " +  coinName}/>)
    },[])

    useEffect(()=>{
        setOutScrollView(
            <TouchableOpacity style={{marginBottom: windowHeight/25}}>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <LinearGradient 
                    colors={['#e5be50', '#ecda8b', '#a47b00']}
                    style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: '92%', height: windowHeight/14}}>
                    <Text style={{color: '#111b2d', fontSize: 16}}>Chia sẻ địa chỉ</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
        )
    },[])

    return (
        <>
<View style={mainStyles.container}>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} > 
        <View style={{paddingTop: 15, alignItems: 'center'}}>
            <View>
                <Text style={{color: 'rgba(255,255,255,0.7)'}}>Scan tại đây để nạp</Text>
            </View>
            <View>
            <QRCode
                value={coinAddress}
                logo={coinName === 'KDG' ? kdgicon : coinName === 'TRX' ? trxicon : coinName === 'ETH' ? ethicon : usdticon}
            />
            </View>
            <View>
                <Text style={{color: 'rgba(255,255,255,0.7)'}}>Hoạt sao chép mã tại đây</Text>
            </View>
            <View>
                <TouchableOpacity 
                    onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                    style={{paddingTop: 5}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
                        <Text style={{color: 'rgba(84,86,89, 0.9)', paddingRight: 5}}>{coinAddress}</Text>
                        <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                    </View>
                 </TouchableOpacity>
            </View>
        </View>
        
    </View>
</View> 
        </>
    )
} 