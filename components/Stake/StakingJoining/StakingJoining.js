import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image, FlatList, CheckBox} from 'react-native'
import { mainStyles, stakingStyle } from '../../../styles'
import {Header2} from '../../Header'
import { JoinButton } from '../../Button'
import coin from '../../../assets/images/coin.png'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

import RangeSlider, { Slider } from 'react-native-range-slider-expo'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'




export default function App({setOutScrollViewTop, setOutScrollView}){

    const [value, setValue] = useState(0);


    const btnActive = (
        <JoinButton
        title="Tham gia ngay" 
        titleColor="#fac800"
        tintColor="#fac800"
        iconColor="#fff"
        />)
        const btnInActive = 
    (    <JoinButton
        title="Tham gia nsgay" 
        titleColor="red"
        borderTintColor='#707582'
        borderTintWidth={1}
        iconColor="#fff"
        />)
        const btnDisable = 
    (    <JoinButton
        title="Tham gia ngay" 
        titleColor="#707582"
        tintColor="#707582"
        iconColor="#fff"
        />)

    const [Width , setWidth] = useState(0);

    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Tham gia Staking"/>)
        setOutScrollView(                
            <TouchableOpacity>
                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: windowHeight/56}}>
                    <LinearGradient 
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                        colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                        style={{width: '90%', height: windowHeight/17, position: 'relative', backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                            <Text style={{color: '#111b2d', fontSize: 16}}>THAM GIA NGAY</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        )
    },[])

    return (
        
        <>

<View style={mainStyles.container}>

    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: (windowWidth*windowHeight)/29376, backgroundColor: 'rgba(29,37,54,0.8)', marginBottom: 13}}>
            <View style={{alignItems: 'center'}}>
                <Image
                    source={require('../../../assets/images/coin.png')}
                />
                <Text style={{color: 'white', paddingBottom: windowHeight/30, fontSize: windowWidth*windowHeight/20843}}>KDG</Text>
                <View>
                    <View style={{width: (windowHeight/60)*25.75, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255,255,255,0.7)', width: '33.33%', fontSize: (windowWidth*windowHeight)/30020, textAlign: 'left'}}>Thời gian bắt đầu</Text>
                        <Text style={{color: 'rgba(255,255,255,0.7)', width: '33.33%', fontSize: (windowWidth*windowHeight)/30020, textAlign: 'center' }}>Thời gian mở khóa</Text>
                        <Text style={{color: 'rgba(255,255,255,0.7)', width: '33.33%', fontSize: (windowWidth*windowHeight)/30020, textAlign: 'right' }}>Thời gian phân bố gốc và lãi</Text>
                    </View>
                        <Image
                            resizeMode={'cover'}
                            style={{ width: (windowHeight/60)*25.75, height: windowHeight/60 }}
                            source={require('../../../assets/images/timeline.png')}
                        />
                    <View style={{width: (windowHeight/60)*25.75, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255,255,255,0.9)', width: '33.33%', fontSize: (windowWidth*windowHeight)/26020, textAlign: 'left'}}>25/08/2020</Text>
                        <Text style={{color: 'rgba(255,255,255,0.9)', width: '33.33%', fontSize: (windowWidth*windowHeight)/26020, textAlign: 'center' }}>29/08/2020</Text>
                        <Text style={{color: 'rgba(255,255,255,0.9)', width: '33.33%', fontSize: (windowWidth*windowHeight)/26020, textAlign: 'right' }}>25/09/2020</Text>
                    </View>
                </View>
            </View>
        </View>
        
        <View style={{padding: (windowWidth*windowHeight)/29376, backgroundColor: 'rgba(29,37,54,0.8)'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                    <View style={{backgroundColor: 'rgba(16,20,34, 0.8)', width: (windowWidth*windowHeight)/10125, height: (windowWidth*windowHeight)/10125 , borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>1</Text>
                    </View>
                    <Text style={{paddingLeft: 10, color: '#fff'}}>Số tiền Staking</Text>
                </View>


                <View>
                    <Text style={{color: '#rgba(138,140,142, 0.8)', fontSize: (windowWidth*windowHeight)/25012}}>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </Text>
    <Text style={{color: '#rgba(138,140,142, 0.8)', color: '#fff', fontSize: (windowWidth*windowHeight)/18506, position: 'absolute', bottom: windowHeight/222, left: windowWidth/7}}>{value}</Text>
                </View>
                <Text style={{color: '#rgba(138,140,142, 0.8)', color: '#fff'}}>KDG</Text>
            </View>

            <View style={{paddingHorizontal: 30}}>
                <View style={{marginVertical: -20}}>
                    <Slider
                        knobColor='#000'
                        valueOnChange={value => setValue(value)}
                        showRangeLabels={false}
                        inRangeBarColor='#fff'
                        outOfRangeBarColor= "#e4c23d"
                        knobColor='#e7be1a'
                        valueLabelsBackgroundColor= 'rgba(234,192,22, 0.2)'      
                        min={200}
                        max={50000}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: -20}}>
                    <Text style={{color: 'rgba(255,255,255,0.4)'}}>200 KDG</Text>
                    <Text style={{color: 'rgba(255,255,255,0.4)'}}>50000 KDG</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                    <View style={{backgroundColor: 'rgba(16,20,34, 0.8)', width: (windowWidth*windowHeight)/10125, height: (windowWidth*windowHeight)/10125 , borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>2</Text>
                    </View>
                    <Text style={{paddingLeft: 10, color: '#fff'}}>Lãi suất tham chiếu năm</Text>
                </View>
                <Text style={{color: '#fff', paddingLeft: 10, fontSize: 20}}>30%</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fcf7bb', margin: (windowWidth*windowHeight)/3573 , marginVertical: windowHeight/50 , padding: (windowWidth*windowHeight)/12506, paddingVertical: windowHeight/80, borderRadius: 5}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: (windowWidth*windowHeight)/23000, fontWeight: 'bold'}}>Số tiền lãi nhận được</Text>
                    <Text style={{paddingTop: 5, color: '#fac800', fontSize: (windowWidth*windowHeight)/19000, fontWeight: 'bold'}}>{(2.5*0.2*value)} KDG</Text>
                </View>
            </View>
        </View>
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 20}}>
                <FontAwesomeIcon size={20} color="#cb0d0d" icon={faInfoCircle}/>
                <Text style={{paddingLeft: 10, color: '#fff', fontSize:  (windowWidth*windowHeight)/21000}}>Vui lòng đọc kĩ trước khi tham gia</Text>
            </View>
            <View>
            <FlatList
                data={[
                    {key: '(1) Số lượng tham gia Staking tối thiếu là 100 KDG, thời gian khóa tối thiểu là 60 ngày'},
                    {key: '(2) Lãi suất sẽ được tính vào ngày tiếp theo sau khi bạn tham gia Staking'},
                    {key: '(3) Bạn không thể rút, giao dịch hay sử dụng số lượng KDG trong thời gian tham gia Staking'},
                    {key: '(4) Khi thời gian tham gia Staking kết thúc, cả gốc và lãi sẽ được mở khóa vào tài khoản của bạn'},
                ]}
                renderItem={({item}) => <Text style={{color: 'rgba(255,255,255, 0.6)', paddingBottom: 10}}>{item.key}</Text>}
            />
            <View style={{flexDirection: 'row'}}>
                
            </View>
            </View>
        </View>
    </View>
</View>
        </>
    )
}