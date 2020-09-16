import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, TextInput} from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import FollowList from '../FollowList'
export default function App({setOutScrollViewTop}){
    const navigation = useNavigation()
    const route= useRoute();

    const { RewardData } = route.params

    console.log(RewardData);
    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Phần thưởng của tôi"/>)
    },[])
    
    return (
        <>
            <View style={[mainStyles.container,]}>
                <View style={{paddingTop: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 15, alignItems: 'center'}}>
                            <Text style={{color: '#fac800'}}>Thời gian</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '44%' , paddingVertical: 15, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, alignItems: 'center'}}>
                            <Text style={{color: '#fac800'}}>Email</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 15, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, alignItems: 'center'}}>
                            <Text style={{color: '#fac800'}}>Tình Trạng</Text>
                        </View>
                    </View>
                
                    {RewardData.map((item) => (
                        <View style={{flexDirection: 'row'}}>
                            <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, justifyContent: 'center'}}>
                                <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{item.create_date}</Text>
                            </View>
                            <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '44%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                                <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{item.from.email}</Text>
                            </View>
                            <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                                <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{item.type === 'kyc-success' ? 'KYC thành công' : ''}</Text>
                            </View>
                        </View>
                    ))}
                    
 
                </View>
            </View>
            
        </>
    )
}