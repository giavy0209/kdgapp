import React, {useCallback, useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, Clipboard, Share} from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy, faLink, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import FollowList from '../FollowList'
import { storage } from '../../../helper'
import { asyncGetTransaction, asyncGetUserbyID } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../../Popup/Popup'
import { LinearGradient } from 'expo-linear-gradient'
import store from '../../../store'


export default function App({setOutScrollViewTop}){
    const navigation = useNavigation()
    const [KDGReward, setKDGReward] = useState(0)
    const [RefCode, setRefCode] = useState('')
    const [RewardData, setRewardData] = useState([]);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        async function getUserInfo() {
          var userinfo = await storage('_id').getItem();
 
          dispatch(asyncGetTransaction(userinfo._id))
         .then((res)=>{
            setRewardData(res.data)
         })
         .catch(console.log) 

         dispatch(asyncGetUserbyID(userinfo._id))
          .then((res)=>{
            setKDGReward(res.data ? (res.data.kdg_reward ? res.data.kdg_reward : 0 ): 0 )
            setRefCode(res.data ? (res.data.ref_code ? res.data.ref_code : '' ): '' )
          })
          .catch(console.log)
         }
         getUserInfo()  
    
      }, [])
    
    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Giới thiệu"/>)
    },[])


    const copyHandler1 = (val) => {
        Clipboard.setString(`https://www.kingdomgame.org/reg/${val}`)
        toggleModal()
    }
    
    const copyHandler2 = (val) => {
        Clipboard.setString(val)
        toggleModal()

    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
    }
    

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Ví KDG là một công cụ tuyệt vời giúp quản lý tài sản số một cách hiệu quả và có thật nhiều chức năng hữu ích cho người dùng. Hãy đăng ký theo link này và trải nghiệm nhé!
              \nhttps://www.kingdomgame.org/reg/${RefCode}
              `,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return (
        <>
            <View style={[mainStyles.container,]}>
            <Popup type='success' title='Đã copy' isModalVisible={isModalVisible}/>
                <View style={{paddingBottom: 10}}>
                    <Image
                        style={{width: '100%'}}
                        source={require('../../../assets/images/headerReward.png')}
                    />
                    <View style={{position: 'absolute', right: 15, top: 30}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 17, textAlign: 'center'}}>{`NHẬN NGAY GẤP ĐÔI \n PHẦN QUÀ`}</Text>
                            <Text style={{paddingTop: 5, fontSize: 14, textAlign: 'center', color: '#fac800', fontWeight: 'bold'}}>Khi Mời Bạn Bè Tham Gia</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgba(40, 51, 73, 0.4)', width: '100%', padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 16}}>Mã Liên Kết</Text>
                        <View style={{position: 'absolute', right: 0}}>
                            <TouchableOpacity
                                onPress={() => {navigation.navigate('Rule')}}
                            >
                                <Text style={{color: '#fac800', fontWeight: 'bold'}}>Quy luật</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingTop: 20}}>
                      <View style={{flexDirection: 'row', paddingBottom: 15}}>
                          <Text style={{fontSize: 15, color: 'rgba(255,255,255,0.4)'}}>Tổng số KDG Reward:</Text>
                          <Text style={{paddingLeft: 10, fontSize: 15, color: '#fac800'}}>{KDGReward} KDG Reward</Text>
                      </View>
                      <View style={{flexDirection: 'row', paddingBottom: 15}}>
                          <Text style={{fontSize: 15, color: 'rgba(255,255,255,0.4)'}}>Link giới thiệu:</Text>
                          <TouchableOpacity onPress={()=>copyHandler1(RefCode)} style={{flexDirection: 'row'}}>
                            <Text style={{paddingHorizontal: 10, fontSize: 15, color: '#0687d7', paddingLeft: 60}}>{`https://www.kingdomgame.\norg/reg/${RefCode}`}</Text>
                            <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                          </TouchableOpacity>
                      </View>
                      <View style={{flexDirection: 'row', paddingBottom: 15}}>
                          <Text style={{fontSize: 15, color: 'rgba(255,255,255,0.4)'}}>Mã giới thiệu:</Text>
                          <TouchableOpacity onPress={()=>copyHandler2(RefCode)} style={{flexDirection: 'row'}}>
                            <Text style={{paddingHorizontal: 10, fontSize: 15, color: '#fff', paddingLeft: 70}}>{RefCode}</Text>
                            <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                          </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={onShare}>
                            <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: '25%'}}>
                                <LinearGradient 
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                                style={{width: '90%', padding: 12, alignItems: 'center', borderRadius: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                <FontAwesomeIcon size={15} color="rgba(0,0,0,0.8)" icon={faShareAlt}/>
                                <Text style={{color: '#111b2d', fontSize: 16, paddingLeft: 10}}>Chia sẻ</Text>
                                </LinearGradient>
                            </View>
                       </TouchableOpacity>
                    </View>
                  
                </View>
                <View style={{marginTop: 15,backgroundColor: 'rgba(40, 51, 73, 0.4)', width: '100%', padding: 20}}>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('MyReward', {
                            RewardData: RewardData
                        })}}
                        style={{alignItems: 'center'}}
                    >
                        <Text style={{color: '#fff'}}>Phần Thưởng Của Tôi</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 30}}>
                        <View style={{backgroundColor: '#121827', borderRadius: 10, width: '90%', padding: 5}}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', color: 'rgba(255,255,255,0.5)'}}>Số người mới KYC thành công</Text>
                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fac800', paddingTop: 5}}>{RewardData ? RewardData.length : 0}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
                
            </View>
            
        </>
    )
}