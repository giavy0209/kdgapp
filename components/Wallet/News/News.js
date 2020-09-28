import React, {useState, useEffect, useRef } from 'react'
import {View, Text, Platform, Image, TouchableOpacity} from 'react-native'  
import WebView from 'react-native-webview'
import { Dimensions } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/logo.png'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'


  const dimen = Dimensions.get('window');
  const isIphoneTaiTho =  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))

const windowHeight = Dimensions.get('window').height;
export default function App({setOutScrollViewTop}){
    const navigation = useNavigation();
    const route = useRoute();
    const [lang, setlang] = useState('vi')
    const language = useSelector(state => state.language)

    const isFocuse = useIsFocused()
    useEffect(() => {
      if(language === 0){
        setlang('vi')
      }else{
        setlang('en')
      }
    },[isFocuse])

    const {NewsID} = route.params ?? {}

    const injectedJavaScript = useRef( `
    document.querySelectorAll('.menu .language li')[1].click()
    `)

    const webview = useRef('')

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
              uri: NewsID === undefined ? 'https://kingdomgame.org/kdg-news' : `https://kingdomgame.org/news/${NewsID}`,
            }}
            automaticallyAdjustContentInsets={false}
            injectedJavaScript={injectedJavaScript.current}
          />
          <View style={{width: '100%', backgroundColor: '#2c3040', position: 'absolute', height: 80}}>
            <TouchableOpacity 
              onPress={()=>{navigation.navigate('Wallet')}}
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