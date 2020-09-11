import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, TextInput} from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import FollowList from '../FollowList'
export default function App({setOutScrollViewTop}){
    const navigation = useNavigation()

    
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
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`13:00\n20/01/2020`}</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '44%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>tuton@gmai.com</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`Đăng ký\nthành công`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 10, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`13:00\n18/01/2020`}</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '44%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>batuton@gmai.com</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`KYC\nthành công`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`13:00\n20/01/2020`}</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '44%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>tuton@gmai.com</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`Đăng ký\nthành công`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 10, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`13:00\n18/01/2020`}</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '44%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>batuton@gmai.com</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`KYC\nthành công`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`13:00\n20/01/2020`}</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '44%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>tuton@gmai.com</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(36,45,65 ,0.8)', width: '28%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`Đăng ký\nthành công`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 10, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`13:00\n18/01/2020`}</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '44%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>batuton@gmai.com</Text>
                        </View>
                        <View style={{backgroundColor: 'rgba(28,37,54,0.8)', width: '28%' , paddingVertical: 10, borderLeftColor: 'rgba(255,255,255,0.3)', borderLeftWidth: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center' ,textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>{`KYC\nthành công`}</Text>
                        </View>
                    </View>
                </View>
            </View>
            
        </>
    )
}