import React, {useState } from 'react'
import {View, Text, Platform, Image, TouchableOpacity} from 'react-native'  
import WebView from 'react-native-webview'
import { Dimensions } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/logo.png'
import { useNavigation, useRoute } from '@react-navigation/native'


const windowHeight = Dimensions.get('window').height;
export default function App({setOutScrollViewTop}){
    const [Width , setWidth] = useState(0);
    const navigation = useNavigation();
    const route = useRoute();

    const {NewsID} = route.params ?? {}

 

    const dimen = Dimensions.get('window');
    const isIphoneTaiTho =  Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    return (
        <>
          <WebView
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled
            style={{ height: isIphoneTaiTho ? (95*windowHeight)/100 : windowHeight+30, width: '100%' }}
            source={{
              uri: NewsID === undefined ? 'https://kingdomgame.org/kdg-news' : `https://kingdomgame.org/news/${NewsID}`,
            }}
            automaticallyAdjustContentInsets={false}
          />
          <View style={{width: '100%', backgroundColor: '#2c3040', position: 'absolute', height: 80}}>
            <TouchableOpacity 
              onPress={()=>{navigation.goBack()}}
              style={{position:'absolute', top: 35, left: 20}}>
              <FontAwesomeIcon color='#fff' size={20} icon={faChevronLeft} />
            </TouchableOpacity>
            <View style={{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={()=>{navigation.navigate('News')}}
            >
              <Image source={logo}/>
            </TouchableOpacity>
            </View>
          </View>

        </>
    )
}