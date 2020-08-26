import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles/'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App(){


    const [Width , setWidth] = useState(0);
  
    const [sendTo, setSendTo] = useState();
    const [address, setAddress] = useState();
    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation();
    const route = useRoute();

    const { coinID, coinName } = route.params;

    return (
        <>
<View style={mainStyles.container}>
    <Header2 title={"Gửi " +  coinName}/>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} > 
        <View style={withdrawStyle.balanceContainer}>
            <View style={{flexDirection: 'row'}}>
                <Image source={coin} style={{width: windowWidth*windowHeight/11750, height: windowWidth*windowHeight/11750}} />
                <View style={{paddingLeft: (windowWidth*windowHeight)/23040}}>
                    <Text style={withdrawStyle.coinName}>{coinName}</Text>
                    <Text style={withdrawStyle.balance}>Số dư: {'0'} BTC</Text>
                </View>                                   
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View style={{width: '100%'}}>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>Số tiền gửi</Text>   
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={withdrawStyle.inputNumContainer}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            keyboardType="number-pad"
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>setSendTo(value)} 
                            value={sendTo} 
                            style={withdrawStyle.inputNum} />
                        </View>
                        <View style={{backgroundColor: '#fac800', borderTopRightRadius: 10, flex: 2,  borderBottomRightRadius: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'white', alignItems: 'center', alignSelf: 'center', fontSize: (windowWidth*windowHeight)/28800}}>{coinName}</Text>
                        </View>
                    </View> 
                    <Text style={withdrawStyle.nearSymbol}>≈</Text>
                    <View style={withdrawStyle.inputNumContainer}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            // onChangeText={value=>setAddress(value)} 
                            value={150} 
                            style={withdrawStyle.inputNum} />
                        </View>
                        <View style={{backgroundColor: '#fac800', borderTopRightRadius: 10, flex: 2,  borderBottomRightRadius: 10, justifyContent: 'center'}}>
                            <Text style={{color: 'white', alignItems: 'center', alignSelf: 'center', fontSize: (windowWidth*windowHeight)/28800}}>USD</Text>
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>Gửi đến</Text>   
                <View style={{flexDirection: 'row'}}>
                    <View style={withdrawStyle.inputNumContainer2}>
                        <View style={{flex: 3, padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            placeholder="Nhập địa chỉ cần nhận tiền"
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>setSearchVal(value)} 
                            value={searchVal} 
                            style={withdrawStyle.inputNum} />
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth*windowHeight)/23040, marginBottom: windowHeight/213}}>Ghi chú</Text>   
                <View style={{flexDirection: 'row'}}>
                    <View style={withdrawStyle.inputNumContainer2}>
                        <View style={{padding: (windowWidth*windowHeight)/23040}}>
                            <TextInput
                            placeholder="Ghi chú"
                            placeholderTextColor = "#8a8c8e"
                            onFocus={()=>{}} 
                            onBlur={()=>{}} 
                            onChangeText={value=>setSearchVal(value)} 
                            value={searchVal} 
                            style={withdrawStyle.inputNum} />
                        </View>
                    </View> 
                </View>      
            </View>
        </View>

        <View style={withdrawStyle.numberSendContainer}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'rgba(241, 243, 244, 0.7)', fontSize: 12}}>Phí giao dịch</Text>   
                <Text style={{color: '#fac800',  fontSize: 12, paddingLeft: (windowWidth*windowHeight)/23040, fontWeight: 'bold'}}>0.000032 {coinName}</Text>
            </View>
        </View>

        <TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <LinearGradient 
                    colors={['#e5be50', '#ecda8b', '#a47b00']}
                    style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: '92%', height: windowHeight/14}}>
                    <Text style={{color: '#111b2d', fontSize: 16}}>Gửi</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
        
    </View>
</View> 
        </>
    )
} 