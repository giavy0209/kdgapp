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
    const [isSelected, setSelection] = useState(false);

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
                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: windowHeight/25}}>
                    <LinearGradient 
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                        colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                        style={{width: '90%', padding: 12, alignItems: 'center', borderRadius: 45}}>
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
                <Text style={stakingStyle.coinName}>KDG</Text>
                <View>
                    <View style={stakingStyle.timeContainer}>
                        <Text style={{...stakingStyle.timeName, textAlign: 'left'}}>Thời gian bắt đầu</Text>
                        <Text style={{...stakingStyle.timeName, textAlign: 'center'}}>Thời gian mở khóa</Text>
                        <Text style={{...stakingStyle.timeName, textAlign: 'right'}}>Thời gian phân bố gốc và lãi</Text>
                    </View>
                        <Image
                            resizeMode={'cover'}
                            style={{ width: (windowHeight/60)*25.75, height: windowHeight/60 }}
                            source={require('../../../assets/images/timeline.png')}
                        />
                    <View style={stakingStyle.dateContainer}>
                        <Text style={{...stakingStyle.dateName, textAlign: 'left'}}>25/08/2020</Text>
                        <Text style={{...stakingStyle.dateName, textAlign: 'center' }}>29/08/2020</Text>
                        <Text style={{...stakingStyle.dateName, textAlign: 'right' }}>25/09/2020</Text>
                    </View>
                </View>
            </View>
        </View>
        
        <View style={stakingStyle.mainStakingContainer}>
            <View style={stakingStyle.stakingNumberContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                    <View style={stakingStyle.numberOrderContainer}>
                        <Text style={{color: '#fff'}}>1</Text>
                    </View>
                    <Text style={{paddingLeft: 10, color: '#fff'}}>Số tiền Staking</Text>
                </View>


                <View>
                    <Text style={stakingStyle.dashSymbol}>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </Text>
                    <Text style={stakingStyle.valueStaking}>{value}</Text>
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
                    <View style={stakingStyle.numberOrderContainer}>
                        <Text style={{color: '#fff'}}>2</Text>
                    </View>
                    <Text style={{paddingLeft: 10, color: '#fff'}}>Lãi suất tham chiếu năm</Text>
                </View>
                <Text style={{color: '#fff', paddingLeft: 10, fontSize: 20}}>30%</Text>
            </View>
            <View style={stakingStyle.interestReceiveContainer}>
                <View style={{alignItems: 'center'}}>
                    <Text style={stakingStyle.interestReceive}>Số tiền lãi nhận được</Text>
                    <Text style={stakingStyle.interestReceiveUnit}>{(2.5*0.2*value)} KDG</Text>
                </View>
            </View>
        </View>
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={stakingStyle.iconInfoContainer}>
                <FontAwesomeIcon size={20} color="#cb0d0d" icon={faInfoCircle}/>
                <Text style={stakingStyle.iconInfo}>Vui lòng đọc kĩ trước khi tham gia</Text>
            </View>
            <View>
            <FlatList
                data={[
                    {key: '(1) Số lượng tham gia Staking tối thiếu là 100 KDG, thời gian khóa tối thiểu là 60 ngày'},
                    {key: '(2) Lãi suất sẽ được tính vào ngày tiếp theo sau khi bạn tham gia Staking'},
                    {key: '(3) Bạn không thể rút, giao dịch hay sử dụng số lượng KDG trong thời gian tham gia Staking'},
                    {key: '(4) Khi thời gian tham gia Staking kết thúc, cả gốc và lãi sẽ được mở khóa vào tài khoản của bạn'},
                ]}
                renderItem={({item}) => <View style={{paddingLeft: windowWidth/19}}><Text style={stakingStyle.termContent}>{item.key}</Text></View>}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    tintColors={{ true: '#fac800', false: '#fff' }}
                />
                <View>
                    <Text style={stakingStyle.termCheckboxTitle}>Tôi đã đọc và hiểu <Text style={{textDecorationLine: 'underline', fontWeight: 'bold', color: '#fff'}}>cảnh báo rủi ro</Text> trước khi tham gia</Text>
                </View>
                
            </View>
            </View>
        </View>
    </View>
</View>
        </>
    )
}