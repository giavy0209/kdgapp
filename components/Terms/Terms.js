import React, {useState, useEffect, useRef } from 'react'
import {View, Text, Platform, Image, TouchableOpacity} from 'react-native'  
import WebView from 'react-native-webview'
import { Dimensions } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/images/logo.png'
import { useNavigation, useRoute } from '@react-navigation/native'


const windowHeight = Dimensions.get('window').height;

const dimen = Dimensions.get('window');
const isIphoneTaiTho =  Platform.OS === 'ios' &&
!Platform.isPad &&
!Platform.isTVOS &&
((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))

export default function App({setOutScrollViewTop}){
    const webview = useRef('')
    const injectedJavaScript = useRef( `
    document.querySelectorAll('.menu .language li')[1].click()
    `)
    const [Width , setWidth] = useState(0);
    const [lang, setlang] = useState('vi')


    const navigation = useNavigation();
    const route = useRoute();

    useEffect(()=>{
      var index = lang === 'vi' ? 1 : 0
      injectedJavaScript.current = `document.querySelectorAll('.menu .language li')[${index}].click()`
      if(webview.current.reload ){
        webview.current.reload()
      }
    },[lang])
    return (
        <>
          <WebView
            ref={ref => webview.current = ref}
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled
            style={{ height: isIphoneTaiTho ? (95*windowHeight)/100 : windowHeight+30, width: '100%' }}
            source={{
              uri: `https://kingdomgame.org/terms-of-service/`,
            }}
            automaticallyAdjustContentInsets={false}
            injectedJavaScript={injectedJavaScript.current}
          />
          <View style={{width: '100%', backgroundColor: '#2c3040', position: 'absolute', height: 80}}>
            <TouchableOpacity 
              onPress={()=>{navigation.goBack()}}
              style={{position:'absolute', top: 10, left: 15, padding: 20, zIndex: 9999}}>
              <FontAwesomeIcon color='#fff' size={20} icon={faChevronLeft} />
            </TouchableOpacity>
            <View style={{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={()=>{navigation.goBack()}}
            >
              <Image source={logo}/>
            </TouchableOpacity>
            </View>
          </View>

        </>
    )
}