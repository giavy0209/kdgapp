import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator} from 'react-native'
import { mainStyles } from '../../styles'
import {Header2} from '../Header'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import coin from '../../assets/images/IconCoin/KDG.png'
import { actChangeSecureStatus, asyncConvertKDGReward } from '../../store/actions'
import { storage, checkLanguage } from '../../helper'
import { useDispatch, useSelector } from 'react-redux'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function App({setOutScrollViewTop, setOutScrollView}){

    const [ValueSwap, setValueSwap] = useState(0);
    const [isSelected, setSelection] = useState(false);
    const secstatus = useSelector(state => state.secstatus )
    const [Loading, setLoading] = useState(false);
    const [Width , setWidth] = useState(0);
    const dispatch = useDispatch();
    const language = useSelector(state => state.language)

    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Swap"/>)
    },[ValueSwap])
    


    const Swap = useCallback(async () => {
        setLoading(true)  

        var userinfo = await storage('_id').getItem();

        dispatch(asyncConvertKDGReward({userId: userinfo._id, value: ValueSwap}))
        .then((res)=>{
            console.log(res)
          if(res.status === 104){
            setLoading(false)
            Alert.alert(
                checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                checkLanguage({vi: 'Bạn phải chuyển đổi tối thiểu 25 KDG', en: 'The mimimum amount to swap is 25 KDG reward'},language),
            )
            return;
          }          
          if(res.status === 100){
            setLoading(false)
            Alert.alert(
                checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                checkLanguage({vi: 'Bạn không đủ KDG Reward', en: `You don't have enough KDG reward`},language),
            )
            return;
          }
          if(res.status === 101){
            setLoading(false)
            Alert.alert(
                checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                checkLanguage({vi: 'Bạn chỉ có thể Swap tối đa 20 KDG 1 ngày', en: `You can swap maximum 20 KDG per day`},language),
            )
            return;
          }
          if(res.status === 1){
            setLoading(false)
            Alert.alert(
                checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
                checkLanguage({vi: 'Swap thành công', en: `Swap successfully`},language),
            )
            setKDGReward(secstatus.KDGReward)
            dispatch(actChangeSecureStatus({
                ...secstatus,
    
            }))
            setValueSwap(0)
            return;
          }
          setLoading(false)
          Alert.alert(
            checkLanguage({vi: 'Thông báo', en: 'Notification'},language),
            checkLanguage({vi: 'Swap không thành công', en: `Swap failed`},language),
         )
        
        })
        
        .catch(console.log)

    }, [ValueSwap])


    return (
        
        <>

<View style={mainStyles.container}>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: 15}}>
            <View style={{backgroundColor: 'rgba(40,51,73,0.4)'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                       <View style={{padding: 25,borderColor: 'rgba(255,255,255,0.3)', borderBottomWidth: 0.8, borderRightWidth: 0.8, justifyContent: 'center', alignItems: 'center'}}>
                          <View style={{alignItems: 'center'}}>
                              <Image style={{width: 35, height: 35}} source={coin}/>
                              <Text style={{color: '#fff', fontSize: 15, paddingTop: 5}}>KDG Reward</Text>
                          </View>
                       </View>
                       <View style={{position: 'absolute', top: 95, left: 125}}>
                            <View style={{backgroundColor: '#fff', borderRadius: 45, width: 35, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: 'rgba(0,0,0,0.5)'}}>=</Text>
                            </View>
                       </View>
                    </View>
                    <View style={{flex: 5}}>
                        <View style={{padding: 25,borderColor: 'rgba(255,255,255,0.3)', borderBottomWidth: 0.8, justifyContent: 'center'}}>
                            <View>
                                <Text style={{color: 'rgba(255,255,255,0.3)', fontWeight: 'bold'}}>{checkLanguage({vi: 'Trả', en: 'Pay'},language)}</Text>
                               <TextInput 
                                    value={ValueSwap.toString()}
                                    onChangeText={value => setValueSwap(value)}
                                    style={{color: '#fac800', 
                                    fontSize: 25, 
                                    paddingVertical: 3.5}}/>
                            </View>
                       </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                       <View style={{padding: 25,borderColor: 'rgba(255,255,255,0.3)', borderBottomWidth: 0.8, borderRightWidth: 0.8, justifyContent: 'center', alignItems: 'center'}}>
                          <View style={{alignItems: 'center'}}>
                              <Image style={{width: 35, height: 35}} source={coin}/>
                              <Text style={{color: '#fff', fontSize: 15, paddingTop: 5}}>KDG</Text>
                          </View>
                       </View>
                    </View>
                    <View style={{flex: 5}}>
                        <View style={{padding: 25,borderColor: 'rgba(255,255,255,0.3)', borderBottomWidth: 0.8, justifyContent: 'center'}}>
                            <View>
                                <Text style={{color: 'rgba(255,255,255,0.3)', fontWeight: 'bold'}}>{checkLanguage({vi: 'Nhận', en: 'Receive'},language)}</Text>
                               <TextInput 
                                    value={ValueSwap.toString()}
                                    editable={false}
                                    style={{color: '#fac800', 
                                    fontSize: 25, 
                                    paddingVertical: 3.5}}/>
                            </View>
                       </View>
                    </View>
                </View>
                <View style={{padding: 10, flexDirection: 'row'}}>
                    <Text style={{fontSize: 15, color: 'rgba(255,255,255,0.3)', fontWeight: '400'}}>{checkLanguage({vi: 'Khả dụng: ', en: 'Available: '},language)}</Text>
                    <Text style={{fontSize: 15, color: '#fff', fontWeight: '400'}}>{secstatus.kdg_reward === undefined ? 'Loading...' : secstatus.kdg_reward + "  KDG Reward"}</Text>
                </View>
            </View>

            <View style={{paddingTop: 10}}>
                <View>
                    <Text style={{color: '#fff', textDecorationLine: 'underline', fontStyle: 'italic'}}>{checkLanguage({vi: 'Lưu ý:', en: `Note:`},language)}</Text>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 14}}>{checkLanguage({vi: 'Tài khoản đăng ký trước ngày 1/9 sẽ được đổi tối đa ', en: 'Account registration before 1/9/2020 are able to swap the reward maximum '},language)}<Text style={{color: '#fac800', fontWeight: 'bold', fontStyle: 'italic'}}>{checkLanguage({vi: '20 KDG Reward/ ngày', en: '20KDG / day'},language)}</Text>, {checkLanguage({vi: 'duy nhất 1 lần / ngày', en: 'only 1 time / day'},language)}</Text>
                    <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 14, paddingTop: 10}}>1 KDG Reward = 1 KDG</Text>
                    <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 14, paddingTop: 20}}>{checkLanguage({vi: 'Tài khoản đăng ký sau ngày 1/9 sẽ được quy đổi thành KDG token khi bạn ', en: 'Account registration after 1/9/2020 are able to swap the reward when '},language)}<Text style={{color: '#fac800', fontWeight: 'bold', fontStyle: 'italic'}}>{checkLanguage({vi: 'có đủ 25 KDG reward, tối đa 50 KDG reward ', en: 'being enough 25KDG / day, maximum 50KDG / day'},language)}</Text>, {checkLanguage({vi: 'duy nhất 1 lần / ngày', en: 'only 1 time / day'},language)}</Text>
                    <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 14, paddingTop: 10}}>1 KDG Reward = 1 KDG</Text>
                </View>
            </View>

        </View>
        <TouchableOpacity
            onPress={Swap}
        >
            <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: windowHeight/15}}>
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                    colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                    style={{width: '90%', padding: 12, alignItems: 'center', borderRadius: 20}}>

                   {  Loading === true ?  <ActivityIndicator size="small" color="#fff" />
                    : <Text style={{color: '#111b2d', fontSize: 16}}>{checkLanguage({vi: 'Xác nhận', en: `Confirm`},language)}</Text> }
                </LinearGradient>
            </View>
        </TouchableOpacity>
    </View>
</View>
        </>
    )
}