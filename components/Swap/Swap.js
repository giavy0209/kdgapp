import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, TouchableOpacity, Image, Alert, TextInput} from 'react-native'
import { mainStyles } from '../../styles'
import {Header2} from '../Header'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import coin from '../../assets/images/IconCoin/KDG.png'
import { asyncConvertKDGReward } from '../../store/actions'
import { storage } from '../../helper'
import { useDispatch, useSelector } from 'react-redux'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function App({setOutScrollViewTop, setOutScrollView}){

    const [ValueSwap, setValueSwap] = useState(0);
    const [isSelected, setSelection] = useState(false);


    const [Width , setWidth] = useState(0);
    const dispatch = useDispatch();

    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Swap"/>)
    },[ValueSwap])

    

    const Swap = useCallback(async () => {
 

        var userinfo = await storage('_id').getItem();

        dispatch(asyncConvertKDGReward({userId: userinfo._id, value: ValueSwap}))
        .then((res)=>{
          console.log(res);
          if(res.status === 104){
            Alert.alert(
                "Swap",
                "Bạn phải chuyển đổi tối thiểu 25 KDG",
            )
            return;
          }          
          if(res.status === 100){
            Alert.alert(
                "Swap",
                "Bạn không đủ KDG Reward",
            )
            return;
          }
          if(res.status === 1){
            Alert.alert(
                "Swap",
                "Swap thành công",
            )
            setValueSwap(0)
            return;
          }
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
                                <Text style={{color: 'rgba(255,255,255,0.3)', fontWeight: 'bold'}}>Trả</Text>
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
                                <Text style={{color: 'rgba(255,255,255,0.3)', fontWeight: 'bold'}}>Nhận</Text>
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
                    <Text style={{fontSize: 15, color: 'rgba(255,255,255,0.3)', fontWeight: '400'}}>Khả dụng: </Text>
                    <Text style={{fontSize: 15, color: '#fff', fontWeight: '400'}}>1,000 KDG Reward</Text>
                </View>
            </View>

            <View style={{paddingTop: 10}}>
                <View>
                    <Text style={{color: '#fff', textDecorationLine: 'underline', fontStyle: 'italic'}}>Lưu ý:</Text>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 14}}>Tài khoản đăng ký trước ngày 1/9 sẽ được đổi tối đa <Text style={{color: '#fac800', fontWeight: 'bold', fontStyle: 'italic'}}>20 KDG Reward/ ngày</Text>, tối đa 1 lần/ ngày</Text>
                    <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 14, paddingTop: 10}}>1 KDG Reward = 1 KDG</Text>
                    <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 14, paddingTop: 20}}>Tài khoản đăng ký sau ngày 1/9 sẽ được quy đổi thành KDG token khi bạn <Text style={{color: '#fac800', fontWeight: 'bold', fontStyle: 'italic'}}>có đủ 25 KDG reward, tối đa 50 KDG reward </Text>, tối đa 1 lần/ ngày</Text>
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
                        <Text style={{color: '#111b2d', fontSize: 16}}>Xác nhận</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    </View>
</View>
        </>
    )
}