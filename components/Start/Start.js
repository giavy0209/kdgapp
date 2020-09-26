import React, { useState, useCallback, useEffect,useRef} from 'react';
import { View, Dimensions,Animated, StyleSheet, Text, Image} from 'react-native';
import { mainStyles as styles } from '../../styles/'
import {startScreenStyle as styles2} from '../../styles/'
import { transition } from '../../helper'
import {useSelector} from 'react-redux'
import Button from './Button'

import AppIntroSlider from 'react-native-app-intro-slider';


import kwtext from '../../assets/images/kwtext.png'
import securetext from '../../assets/images/securetext.png'
import mainImage2 from '../../assets/images/main-image-2.png'
import multitext from '../../assets/images/multitext.png'
import mainImage3 from '../../assets/images/main-image-3.png'

import easytext from '../../assets/images/easytext.png'
import mainImage4 from '../../assets/images/main-image-4.png'

export default function App() {
    const ScreenWidth = useSelector(state=>state.width)
    const ScreenHeight = useSelector(state=>state.height)

    const [ShowRealApp, setShowRealApp] = useState(false)
    const [Skip, setSkip] = useState(false)

    const onDone = () => {
      setShowRealApp(true)
    };
    const onSkip = () => {
        // After user skip the intro slides. Show real app through
        // navigation or simply by controlling state
        setShowRealApp(true)
    };


    const renderItem = ( item) => {
        return (
          <View style={{
              width: item.width
          }}>
              {item.key === 's1' ?
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: ScreenWidth * 0.08, color: '#fff', marginTop: ScreenHeight * 0.33283, fontFamily: 'RobotoCondensed_300Light'}}>Chào mừng bạn đến với</Text>
                    <Image source={kwtext} style={{resizeMode: 'contain'}}></Image>
                    <Text style={[styles2.text,{fontSize: ScreenWidth * 0.037333,marginTop: ScreenHeight * 0.03448}]}>King Wallet đáp ứng tất cả nhu cầu</Text>
                    <Text style={[styles2.text,{fontSize: ScreenWidth * 0.037333}]}>của người dùng</Text>
                 </View> :
                 item.key === 's2' ?
                 <View style={{alignItems: 'center'}}>
                   <Image source={mainImage2} style={[styles2.image,{width: ScreenHeight * 0.4497,marginTop: ScreenHeight * 0.1079}]}></Image>
                    <Image source={securetext} style={[styles2.image,{width : ScreenWidth * 0.46933, marginTop: ScreenHeight * 0.0374812}]}></Image>
                    <Text style={[styles2.text,{marginTop: ScreenHeight * 0.02248}]}>Cơ chế bảo mật nhiều tầng đảm bảo tài sản</Text>
                    <Text style={styles2.text}>và giao dịch an toàn và ổn định</Text>
                </View> : 
                item.key === 's3' ?
                <View style={{alignItems: 'center'}}>
                    <Image source={mainImage3} style={[styles2.image,{width: ScreenHeight * 0.4497 ,marginTop: ScreenHeight * 0.1079}]}></Image>
                    <Image source={multitext} style={[styles2.image,{width : ScreenWidth * 0.46933, marginTop: ScreenHeight * 0.0374812}]}></Image>
                    <Text style={[styles2.text,{marginTop: ScreenHeight * 0.02248}]}>Người dùng có thể quản lý nhiều tài khoản </Text>
                    <Text style={styles2.text}>trên King Wallet</Text>
               </View> : 
                item.key === 's4' ?
                <View style={{alignItems: 'center'}}>
                    <Image source={mainImage4} style={[styles2.image,{width: ScreenHeight * 0.4497,marginTop: ScreenHeight * 0.1079}]}></Image>
                    <Image source={easytext} style={[styles2.image,{width : ScreenWidth * 0.46933, marginTop: ScreenHeight * 0.0374812}]}></Image>
                    <Text style={[styles2.text,{marginTop: ScreenHeight * 0.02248}]}>Thao tác đơn giản, giao diện thân thiện với</Text>
                    <Text style={styles2.text}>người dùng</Text>
                    <Button  ScreenWidth={ScreenWidth} ScreenHeight={ScreenHeight}/>
                </View> : null
            }
        </View>
        );
      }
    return (
        <>
        <View style={[styles.container, {width: ScreenWidth, height: ScreenHeight, position: 'relative', }]}>

            <AppIntroSlider
                slides={slides}
                showDoneButton={false}
                showSkipButton={false}
                showPrevButton={true}
                onSkip={onSkip}
                doneLabel='XONG'
                nextLabel='TIẾP THEO'
                prevLabel='TRỞ VỀ'
                buttonTextStyle={
                    {color: '#fac800',
                     fontSize: 15
                    }
                }
                // renderItem={item => renderItem(item)}
                activeDotStyle={{backgroundColor: '#fac800'}}
                dotStyle={{backgroundColor: 'rgba(255,255,255,0.5)'}}
                renderItem={(item) => renderItem(item)}

            
            />
            
        </View>
        </>
    );
}

export const mystyles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
    },
    text: {
      color: '#FFFFFF',
      fontSize: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'transparent',
      textAlign: 'center',
      marginTop: 16,
    },
  })
  ;
  
const slides = [
    {
        key: 's1',

      },
      {
        key: 's2',


      },
      {
        key: 's3',


      },
      {
        key: 's4',

      }
  ];