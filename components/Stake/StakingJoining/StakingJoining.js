import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, TouchableOpacity, Image, FlatList, Alert, TextInput, ActivityIndicator} from 'react-native'
import { mainStyles, stakingStyle } from '../../../styles'
import {Header2} from '../../Header'
import { JoinButton } from '../../Button'
import coin from '../../../assets/images/coin.png'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ticker from '../../../assets/images/ticker.png'

// import RangeSlider, { Slider } from 'react-native-range-slider-expo'
import Slider from '@react-native-community/slider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { asyncStaking } from '../../../store/actions'
import { storage } from '../../../helper'
import { useDispatch, useSelector } from 'react-redux'
import { Value } from 'react-native-reanimated'
import { PopupCongras } from '../../Popup'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height


export default function App({setOutScrollViewTop, setOutScrollView}){
    const dispatch = useDispatch();
    const [ValueStaking, setValueStaking] = useState(0);
    const [isSelected, setSelection] = useState(false);
    const [ToggleCheckBox, setToggleCheckBox] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);

    const [Loading, setLoading] = useState(false);

    var addDate = function(date,days){
        date.setDate(date.getDate() + days);
        return date
    }

    const lockDate = (addDate(new Date(), 2).getDate()) + "/" + (addDate(new Date(), 2).getMonth() + 1)+ "/" +(addDate(new Date(), 2).getFullYear())
    const unLockdate = (addDate(new Date(), 2).getDate()) + "/" + (addDate(new Date(), 60).getMonth() + 1)+ "/" +(addDate(new Date(), 2).getFullYear())
    const endDate = (addDate(new Date(), 4).getDate()) + "/" + (addDate(new Date(), 60).getMonth() + 1)+ "/" +(addDate(new Date(), 2).getFullYear())
    const [Width , setWidth] = useState(0);

    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Tham gia Staking"/>)
        setOutScrollView(                
           
        )
    },[ValueStaking])

    const Staking = useCallback(async () => {
        setLoading(true)  

        var userinfo = await storage('_id').getItem();

        dispatch(asyncStaking({userId: userinfo._id, kdg_coin: ValueStaking}))
        .then((res)=>{      
          if(res.status === 103){
            setToggleCheckBox(false)
            setLoading(false)
            Alert.alert(
                "Staking",
                "Không đủ KDG để Staking",
            )
            return;
          }
          if(res.status === 1){
            setLoading(false)
            setModalVisible(true)
            setToggleCheckBox(false)
            return;
          }
          setToggleCheckBox(false)
          Alert.alert(
            "Staking",
            "Đã có lỗi xảy ra",
        )
        })
        
        .catch(console.log)

    }, [ValueStaking])

    const edittingHandler = (e) => {
        var value = parseInt(e.nativeEvent.text);
        setValueStaking(value)
    }
    useEffect(() => {
        if(ValueStaking < 200){
            setValueStaking(200)
            return
        }
        if(ValueStaking > 50000){
            setValueStaking(50000)
            return
        }
    },[ValueStaking])

    const okPopupHandler = () => {
        setModalVisible(false)
    }
    return (
        
        <>

<View style={mainStyles.container}>
<PopupCongras title='Staking thành công !' content='Chúc mừng bạn đã tham gia Staking thành công' toPress={() => setModalVisible(false)} isModalVisible={isModalVisible}/>
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
                        <Text style={{...stakingStyle.dateName, textAlign: 'left'}}>{lockDate}</Text>
                        <Text style={{...stakingStyle.dateName, textAlign: 'center' }}>{unLockdate}</Text>
                        <Text style={{...stakingStyle.dateName, textAlign: 'right' }}>{endDate}</Text>
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
                    <TextInput onEndEditing={edittingHandler} style={[stakingStyle.valueStaking, {width: '100%'}]}>{ValueStaking}</TextInput>
                </View>
                <Text style={{color: '#rgba(138,140,142, 0.8)', color: '#fff'}}>KDG</Text>
            </View>

            <View style={{paddingHorizontal: 30, width: '100%'}}>
                <View style={{alignItems: 'center'}}>
                    {/* <Slider
                        styleSize='small'
                        valueOnChange={value => ValueStaking(value)}
                        showRangeLabels={false}
                        inRangeBarColor='#fff'
                        outOfRangeBarColor= "#e4c23d"
                        knobColor='#e7be1a'
                        valueLabelsBackgroundColor= 'rgba(234,192,22, 0.2)'      
                        min={200}
                        max={50000}
                    /> */}

                     
                        <Slider
                            style={{width: '100%'}}
                            step={1}
                            minimumValue={200}
                            maximumValue={50000}
                            thumbTintColor='#fac800'
                            minimumTrackTintColor='#fac800'
                            maximumTrackTintColor='#fff'
                            value={parseInt(ValueStaking)}
                            onValueChange={value => setValueStaking(value)}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'rgba(255,255,255,0.4)'}}>200 KDG</Text>
                    <Text style={{color: 'rgba(255,255,255,0.4)'}}>50000 KDG</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
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
                    <Text style={stakingStyle.interestReceive}>Số tiền lãi và gốc nhận được</Text>
                    <Text style={stakingStyle.interestReceiveUnit}>{(1.05*ValueStaking).toFixed(2)} KDG</Text>
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
                    {key: '(1) Số lượng tham gia Staking tối thiếu là 200 KDG, thời gian khóa tối thiểu là 60 ngày'},
                    {key: '(2) Lãi suất sẽ được tính sau hai ngày kể từ khi bạn tham gia Staking'},
                    {key: '(3) Bạn không thể rút, giao dịch hay sử dụng số lượng KDG trong thời gian tham gia Staking'},
                    {key: '(4) Khi thời gian tham gia Staking kết thúc, cả gốc và lãi sẽ được mở khóa vào tài khoản của bạn'},
                ]}
                renderItem={({item}) => <View style={{paddingLeft: windowWidth/19}}><Text style={stakingStyle.termContent}>{item.key}</Text></View>}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{paddingRight: 10}} onPress={()=> setToggleCheckBox(!ToggleCheckBox)}>
                    <View style={[stakingStyle.checkBox,ToggleCheckBox && {backgroundColor: '#fac800'}]}><Image style={[stakingStyle.checkBoxTick,!ToggleCheckBox && {opacity: 0}]} source={ticker}/></View>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={stakingStyle.termCheckboxTitle}>Tôi đã đọc và hiểu</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Terms', {
                            id: 1,
                        })}
                    >
                        <Text style={{textDecorationLine: 'underline', fontWeight: 'bold', color: '#fff', paddingHorizontal: 5}}>cảnh báo rủi ro</Text>
                    </TouchableOpacity>
                    <Text style={stakingStyle.termCheckboxTitle}> trước khi tham gia</Text>
                </View>
                
            </View>
            </View>
            
        </View>
        
    </View>
    <TouchableOpacity
        disabled={ToggleCheckBox  && Loading === false ? false : true}
        style={{paddingVertical: 20}}
        onPress={Staking}
    >
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: windowHeight/15}}>
            <LinearGradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                colors={ToggleCheckBox && Loading === false ? ['rgba(212, 175, 55, 1)', 'rgba(237, 218, 139, 1)', 'rgba(167, 123, 0, 1)', 'rgba(231, 190, 34, 1)', 'rgba(232, 191, 35, 1)'] : 
                                         ['rgba(212, 175, 55, 0.4)', 'rgba(237, 218, 139, 0.4)', 'rgba(167, 123, 0, 0.4)', 'rgba(231, 190, 34, 0.4)', 'rgba(232, 191, 35, 0.4)']}
                style={{width: '90%', padding: 12, alignItems: 'center', borderRadius: 20}}>
                    {  Loading === true ?   <ActivityIndicator size="small" color="#000" />
                    :<Text style={{color: '#111b2d', fontSize: 16, opacity: ToggleCheckBox ? 1 : 0.4}}>THAM GIA NGAY</Text>}
            </LinearGradient>
        </View>
    </TouchableOpacity>
</View>
        </>
    )
}