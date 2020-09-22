import React, { useState, useCallback,useEffect } from 'react';
import Modal from 'react-native-modal'
import {View,Text, Platform, TouchableOpacity, Image } from 'react-native'
import { Dimensions } from 'react-native'
import making from '../../assets/images/making.png'
import { LinearGradient } from 'expo-linear-gradient'

export default function App({isModalVisible, toPress}){
    const dimen = Dimensions.get('window');
    const [Width , setWidth] = useState(0);
    const isIphoneTaiTho =  Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    return(
        <>
        <Modal animationIn='fadeIn'animationOut='fadeOut' animationInTiming={50} isVisible={isModalVisible}>
            <View style={{justifyContent: 'center', width: '100%', alignItems: 'center', position: 'absolute', top: isIphoneTaiTho ? 40 : 10,  position: 'absolute', alignSelf: 'center', bottom: 0}}>
                <Image
                    source={making}
                />
                <View style={{position: 'absolute', paddingTop: 130, paddingHorizontal: 80, alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 19}}>Staking thành công !</Text>
                    <Text style={{color: 'rgba(255,255,255,0.8)', textAlign: 'center', paddingTop: 10, fontSize: 15}}>Bạn đã đăng ký tham gia Staking KDG thành công</Text>

                    <TouchableOpacity
                         onPress={toPress}
                         style={{width: 120, paddingTop: 20}} >
       
                        <LinearGradient 
                            colors={['#e5be50', '#ecda8b', '#a47b00']}
                            style={{backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center', borderRadius: 20, width: '92%', height: 40}}>
                            <Text style={{color: '#fff', fontSize: 16}}>OK</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        </>
    )
}   