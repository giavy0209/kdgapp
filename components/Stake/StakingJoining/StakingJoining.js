import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, TouchableOpacity, Image, FlatList, Alert, TextInput, ActivityIndicator} from 'react-native'
import { mainStyles, stakingStyle } from '../../../styles'
import { stakingStyleLight } from '../../../styles/light'
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
import { storage, checkLanguage } from '../../../helper'
import { useDispatch, useSelector } from 'react-redux'
import { Value } from 'react-native-reanimated'
import { PopupCongras } from '../../Popup'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height



export default function App({setOutScrollViewTop, setOutScrollView}){
    const dispatch = useDispatch();
    const [ValueStaking, setValueStaking] = useState(0);
    const [isSelected, setSelection] = useState(false);
    const language = useSelector(state => state.language)

    const display = useSelector(state => state.display)

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
        setOutScrollViewTop(<Header2 title={checkLanguage({vi: 'Tham gia Staking', en: 'Join Staking'},language)}/>)
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
                checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                checkLanguage({vi: 'Không đủ KDG Staking', en: 'Not enough KDG Staking'},language),
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
            checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
            checkLanguage({vi: 'Đã có lỗi xảy ra', en: 'An error has occurred'},language)
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



 // -------------------style------------------------------

 var StakingStyle = display === 1 ? stakingStyleLight : stakingStyle

 // ------------------------------------------------------
    return (
        
        <>

<View style={mainStyles.container}>
<PopupCongras title={checkLanguage({vi: 'Chúc mừng!', en: 'Congrats!'},language)} content={checkLanguage({vi: 'Chúc mừng bạn đã tham gia Staking thành công', en: `You've joined KDG Staking successfully!`},language)} toPress={() => setModalVisible(false)} isModalVisible={isModalVisible}/>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: (windowWidth*windowHeight)/29376, backgroundColor: display === 1? '#ffff'  :'rgba(29,37,54,0.8)', marginBottom: 13}}>
            <View style={{alignItems: 'center'}}>
                <Image
                    source={require('../../../assets/images/coin.png')}
                />
                <Text style={StakingStyle.coinName}>KDG</Text>
                <View>
                    <View style={StakingStyle.timeContainer}>
                        <Text style={{...StakingStyle.timeName, textAlign: 'left'}}>{checkLanguage({vi: 'Thời gian bắt đầu', en: 'Locking start time'},language)}</Text>
                        <Text style={{...StakingStyle.timeName, textAlign: 'center'}}>{checkLanguage({vi: 'Thời gian mở khoá', en: 'Unlocking time'},language)}</Text>
                        <Text style={{...StakingStyle.timeName, textAlign: 'right'}}>{checkLanguage({vi: 'Thời gian phân bổ gốc và lãi', en: 'Time to allocate principal and interest'},language)}</Text>
                    </View>
                        <Image
                            resizeMode={'cover'}
                            style={{ width: (windowHeight/60)*25.75, height: windowHeight/60 }}
                            source={require('../../../assets/images/timeline.png')}
                        />
                    <View style={StakingStyle.dateContainer}>
                        <Text style={{...StakingStyle.dateName, textAlign: 'left'}}>{lockDate}</Text>
                        <Text style={{...StakingStyle.dateName, textAlign: 'center' }}>{unLockdate}</Text>
                        <Text style={{...StakingStyle.dateName, textAlign: 'right' }}>{endDate}</Text>
                    </View>
                </View>
            </View>
        </View>
        
        <View style={StakingStyle.mainStakingContainer}>
            <View style={StakingStyle.stakingNumberContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                    <View style={StakingStyle.numberOrderContainer}>
                        <Text style={{color: '#fff'}}>1</Text>
                    </View>
                    <Text style={{paddingLeft: 10, color: display === 1 ? '#283349'  :'#fff'}}>{checkLanguage({vi: 'Số tiền staking', en: 'Staking quantity'},language)}</Text>
                </View>


                <View>
                    <Text style={StakingStyle.dashSymbol}>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </Text>
                    <TextInput keyboardType='decimal-pad' onEndEditing={edittingHandler} style={[StakingStyle.valueStaking, {width: '100%'}]}>{ValueStaking}</TextInput>
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
                            maximumTrackTintColor='#989a9c'
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
                    <View style={StakingStyle.numberOrderContainer}>
                        <Text style={{color: '#fff'}}>2</Text>
                    </View>
                    <Text style={{paddingLeft: 10, color: display === 1 ? '#283349' : '#fff'}}>{checkLanguage({vi: 'Lãi suất tham chiếu năm', en: 'Estimated annual interest rate'},language)}</Text>
                </View>
                <Text style={{color: '#fff', paddingLeft: 10, fontSize: 20}}>30%</Text>
            </View>
            <View style={StakingStyle.interestReceiveContainer}>
                <View style={{alignItems: 'center'}}>
                    <Text style={StakingStyle.interestReceive}>{checkLanguage({vi: 'Số tiền lãi và gốc nhận được', en: 'The amount of interest and principal received'},language)}</Text>
                    <Text style={StakingStyle.interestReceiveUnit}>{(1.05*ValueStaking).toFixed(2)} KDG</Text>
                </View>
            </View>
        </View>
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={StakingStyle.iconInfoContainer}>
                <FontAwesomeIcon size={20} color="#cb0d0d" icon={faInfoCircle}/>
                <Text style={StakingStyle.iconInfo}>{checkLanguage({vi: 'Vui lòng đọc quỹ quy tắc trước khi tham gia', en: 'Please read the following Staking rules carefully before join'},language)}</Text>
            </View>
            <View>
            <FlatList
                data={[
                    {key: `(1) ${checkLanguage({vi: 'Số lượng tham gia Staking tối thiếu là 200 KDG, thời gian khóa tối thiểu là 60 ngày', en: 'Minimum investment amount is 200KDG, Minimum locked days is 60days'},language)}`},
                    {key: `(2) ${checkLanguage({vi: 'Lãi suất sẽ được tính sau 2 ngày kể từ khi bạn tham gia Staking', en: 'The yield starts to be counted from two days after you participate in Staking'},language)}`},
                    {key: `(3) ${checkLanguage({vi: 'Bạn không thể rút, giao dịch hay sử dụng số lượng KDG trong thời gian tham gia Staking', en: 'Trade, withdrawal and pre-unlocking are unvailable during locking period'},language)}`},
                    {key: `(4) ${checkLanguage({vi: 'Khi thời gian tham gia Staking kết thúc, cả gốc và lãi sẽ được mở khóa vào tài khoản của bạn', en: 'When the Staking period ends, both principal and interest will be unlocked to your account'},language)}`},
                ]}
                renderItem={({item}) => <View style={{paddingLeft: windowWidth/19}}><Text style={StakingStyle.termContent}>{item.key}</Text></View>}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{paddingRight: 10}} onPress={()=> setToggleCheckBox(!ToggleCheckBox)}>
                    <View style={[StakingStyle.checkBox,ToggleCheckBox && {backgroundColor: '#fac800'}]}><Image style={[StakingStyle.checkBoxTick,!ToggleCheckBox && {opacity: 0}]} source={ticker}/></View>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={StakingStyle.termCheckboxTitle}>{checkLanguage({vi: 'Tôi đã đọc và hiểu rõ', en: 'I have read and understood'},language)}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Terms', {
                            id: 1,
                        })}
                    >
                        <Text style={{textDecorationLine: 'underline', fontWeight: 'bold', color: display === 1 ? '#283349' :'#fff', paddingHorizontal: 5}}>{checkLanguage({vi: 'cảnh báo rủi ro', en: ' the risk warning '},language)}</Text>
                    </TouchableOpacity>
                    <Text style={StakingStyle.termCheckboxTitle}>{checkLanguage({vi: ' trước khi tham gia', en: ' before joining'},language)}</Text>
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
                    :<Text style={{color: '#111b2d', fontSize: 16, opacity: ToggleCheckBox ? 1 : 0.4}}>{checkLanguage({vi: 'THAM GIA NGAY', en: 'JOIN NOW'},language)}</Text>}
            </LinearGradient>
        </View>
    </TouchableOpacity>
</View>
        </>
    )
}