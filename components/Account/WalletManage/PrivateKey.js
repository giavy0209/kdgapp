import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, Clipboard} from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import FollowList from '../FollowList'
import Popup from '../../Popup/Popup'
export default function App({setOutScrollViewTop}){
    const navigation = useNavigation()
    const route = useRoute()
    const [isModalVisible, setModalVisible] = useState(false);
   
    const {coinAdress, coinPrivate, coinName} = route.params
    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Xuất Private Key"/>)
    },[])

    const copyHandler1 = (coinAdress) => {
        Clipboard.setString()
        toggleModal()
    }

    const copyHandler2 = () => {
        Clipboard.setString(coinPrivate)
        toggleModal()
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
      };

      console.log(coinAdress)
    
    return (
        <>
            <View style={[mainStyles.container,]}>
            <Popup type='success' title='Đã copy' isModalVisible={isModalVisible}/>
                <View style={{padding: 10}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255,255,255,0.5)'}}>{`Dưới đây là địa chỉ ${coinName} và Private key`}</Text>
                    </View>
                    <View style={{paddingTop: 15}}>
                        <Text style={{color: '#fff', paddingBottom: 5}}>Địa chỉ</Text>
                        <TouchableOpacity 
                            onPress={copyHandler1}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(40,51,73,0.4)', borderRadius: 10}}>
                            <Text style={{color: 'rgba(255,255,255,0.5)'}}>{coinAdress}</Text>
                                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 15}}>
                        <Text style={{color: '#fff', paddingBottom: 5}}>Private key (HEX)</Text>
                        <TouchableOpacity 
                            onPress={copyHandler2}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(40,51,73,0.4)', borderRadius: 10}}>
                            <Text style={{color: 'rgba(255,255,255,0.5)', paddingRight: 20}}>{coinPrivate}</Text>
                                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 15}}>
                        <View style={{padding: 10, backgroundColor: 'rgba(40,51,73,0.4)', borderRadius: 10}}>
                            <View>
                                <Text style={{color: '#fac800', textDecorationLine: 'underline', fontStyle: 'italic'}}>Nhắc nhở:</Text>
                            </View>
                            <View style={{paddingTop: 10}}>
                                <View  style={{paddingTop: 5}}> 
                                    <Text style={{color: 'rgba(255,255,255,0.5)', fontStyle: 'italic'}}>1. Sở hữu Private key tương đương với toàn quyền kiểm soát tài sản trên địa chỉ</Text>
                                </View>
                            </View>
                            <View style={{paddingTop: 10}}>
                                <View  style={{paddingTop: 5}}> 
                                    <Text style={{color: 'rgba(255,255,255,0.5)', fontStyle: 'italic'}}>2. Vui lòng sao chép và lưu trữ an toàn. Tránh chia sẻ với bất cứ ai</Text>
                                </View>
                            </View>
                            <View style={{paddingTop: 10}}>
                                <View  style={{paddingTop: 5}}> 
                                    <Text style={{color: 'rgba(255,255,255,0.5)', fontStyle: 'italic'}}>3. Nhân viên KDG sẽ không bao giờ yêu cầu Private key của bạn dưới mọi hình thức</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
        </>
    )
}