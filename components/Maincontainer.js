import React, { useMemo, useState } from 'react'
import {ImageBackground, ScrollView, } from 'react-native'

import bg from '../assets/images/bg.jpg'
import { mainStyles } from '../styles/'
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { asyncGetSettings } from '../store/actions';
export default function Maincontainer({Component,route ,reqLogin, ...restProps}){
    const {bottom} = useSafeAreaInsets()
    const dispatch = useDispatch()
    
    const [OutScrollView, setOutScrollView] = useState(null)
    const [OutScrollViewTop, setOutScrollViewTop] = useState(null)
    const [BackGround, setBackGround] = useState(bg)

    return (
      <ImageBackground source={BackGround} style={[mainStyles.bg,{width: '100%', height: '100%',position: 'relative'}]}>
        {OutScrollViewTop && OutScrollViewTop}
        <ScrollView 
          style={{ paddingBottom: bottom}}>
          <Component setOutScrollViewTop={setOutScrollViewTop} setOutScrollView={setOutScrollView} setBackGround={setBackGround} {...restProps}/>
        </ScrollView>
        {OutScrollView && OutScrollView}
      </ImageBackground>
    )
}