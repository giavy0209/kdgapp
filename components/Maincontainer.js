import React, { useCallback, useMemo, useState } from 'react'
import {ImageBackground, ScrollView, SafeAreaView,} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import bg from '../assets/images/bg.jpg'
import { mainStyles } from '../styles/'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
export default function Maincontainer({Component,route ,reqLogin, ...restProps}){
    const {bottom} = useSafeAreaInsets()
    const isLogin = useSelector(state=>state.isLogin)
    const navigation = useNavigation()
    
    const [OutScrollView, setOutScrollView] = useState(null)
    const [OutScrollViewTop, setOutScrollViewTop] = useState(null)

    // const checkLogin = useCallback(async ()=>{
    //   if(isLogin){
    //     if(!reqLogin){
    //       navigation.replace('Main')
    //     }
    //   }else{
    //     const isLoginInStorage = await AsyncStorage.getItem('isLogin')
    //     if(isLoginInStorage){
    //       if(!reqLogin){
    //         navigation.replace('Main')
    //       }
    //     }else{
    //       if(reqLogin){
    //         navigation.replace('Login')
    //       }
    //     }
    //   }
    // },[])
    // useMemo(()=>{
    //   checkLogin()
    // },[])
    return (
      <ImageBackground source={bg} style={[mainStyles.bg,{width: '100%', height: '100%',position: 'relative'}]}>
        {OutScrollViewTop && OutScrollViewTop}
        <ScrollView 
          style={{ paddingBottom: bottom}}>
          <Component setOutScrollViewTop={setOutScrollViewTop} setOutScrollView={setOutScrollView} {...restProps}/>
        </ScrollView>
        {OutScrollView && OutScrollView}
      </ImageBackground>
    )
}