import React, { useMemo, useState } from 'react'
import {ImageBackground, ScrollView, } from 'react-native'

import bg from '../assets/images/bg.jpg'
import bg2 from '../assets/images/bg2.jpg'
import { mainStyles } from '../styles/'
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { asyncGetSettings } from '../store/actions';
import checkDisplays from '../helper/checkDisplays';
export default function Maincontainer({Component,route ,reqLogin, ...restProps}){
    const {bottom} = useSafeAreaInsets()
    const dispatch = useDispatch()
    
    const display = useSelector(state => state.display)
    const [OutScrollView, setOutScrollView] = useState(null)
    const [OutScrollViewTop, setOutScrollViewTop] = useState(null)
    const [BackGround, setBackGround] = useState()

    return (
      <ImageBackground source={checkDisplays({dark: bg, light: bg2},display)} style={[mainStyles.bg,{width: '100%', height: '100%',position: 'relative'}]}>
        {OutScrollViewTop && OutScrollViewTop}
        <ScrollView 
          style={{ paddingBottom: bottom}}>
          <Component setOutScrollViewTop={setOutScrollViewTop} setOutScrollView={setOutScrollView} setBackGround={setBackGround} {...restProps}/>
        </ScrollView>
        {OutScrollView && OutScrollView}
      </ImageBackground>
    )
}