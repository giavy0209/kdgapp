import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, Clipboard} from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import FollowList from '../FollowList'
import { storage } from '../../../helper'
import { asyncGetTransaction } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function App({setOutScrollViewTop}){
    const navigation = useNavigation()
    const [RefCode, setRefCode] = useState('');
    const [RewardData, setRewardData] = useState([]);
    const dispatch = useDispatch();
   
    useEffect(() => {
        async function getwalletBlance() {
          var userinfo = await storage('_id').getItem();
          setRefCode(userinfo.ref_code)
          console.log(userinfo._id)
          dispatch(asyncGetTransaction(userinfo._id))
         .then((res)=>{
            setRewardData(res.data)
         })
         .catch(console.log) 
         }
      getwalletBlance()
    
      }, [])
    
    
    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Phần thưởng"/>)
    },[])
    
    return (
        <>
            <View style={[mainStyles.container,]}>
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
                        <Text style={{color: '#fff'}}>Mã Liên Kết</Text>
                        <View style={{position: 'absolute', right: 0}}>
                            <TouchableOpacity
                                onPress={() => {navigation.navigate('Rule')}}
                            >
                                <Text style={{color: '#fac800', fontWeight: 'bold'}}>Quy luật</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingTop: 20}}>
                        <TouchableOpacity
                             onPress={() => Clipboard.setString(`https://www.kingdomgame.org/reg/${RefCode}`)}
                        >
                            <View style={{backgroundColor: '#121827', paddingLeft: 10, flexDirection: 'row', borderRadius: 5}}>
                                <View style={{flex: 7, paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesomeIcon size={15} color="rgba(255,255,255,0.5)" icon={faLink}/>
                                        <Text style={{color: 'rgba(255,255,255,0.5)', paddingLeft: 10}}>{`https://www.kingdomgame.org/reg/${RefCode}`}</Text>
                                </View>
                                <View style={{flex: 1, backgroundColor: '#fac800', alignItems: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5, paddingVertical: 10}}>
                                    <FontAwesomeIcon size={15} color="#fff" icon={faCopy}/>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <View style={{paddingVertical: 10}}>
                            <Text style={{color: 'rgba(255,255,255,0.7)'}}>Hoặc</Text>
                        </View>
                        <TouchableOpacity
                             onPress={() => Clipboard.setString(RefCode)}
                        >
                            <View style={{backgroundColor: '#121827', paddingLeft: 10, flexDirection: 'row', borderRadius: 5}}>
                                <View style={{flex: 7, paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesomeIcon size={15} color="rgba(255,255,255,0.5)" icon={faLink}/>
                                    <Text style={{color: 'rgba(255,255,255,0.5)', paddingLeft: 10}}>{RefCode}</Text>
                                </View>
                                <View style={{flex: 1, backgroundColor: '#fac800', alignItems: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5, paddingVertical: 10}}>
                                    <FontAwesomeIcon size={15} color="#fff" icon={faCopy}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{paddingTop: 10, flexDirection: 'row'}}>
                        <Text style={{color: 'rgba(255,255,255,0.5)'}}>Chia sẻ qua</Text>
                    </View>
                </View>
                <FollowList />
                <View style={{backgroundColor: 'rgba(40, 51, 73, 0.4)', width: '100%', padding: 20}}>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('MyReward', {
                            RewardData: RewardData
                        })}}
                        style={{alignItems: 'center'}}
                    >
                        <Text style={{color: '#fff'}}>Phần Thưởng Của Tôi ></Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 30}}>
                        <View style={{backgroundColor: '#121827', borderRadius: 10, width: '90%', padding: 5}}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', color: 'rgba(255,255,255,0.5)'}}>Số người mới KYC thành công</Text>
                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fac800', paddingTop: 5}}>{RewardData.length}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
                
            </View>
            
        </>
    )
}