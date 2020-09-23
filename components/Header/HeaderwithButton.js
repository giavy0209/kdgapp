import React, { useState, useCallback,useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {View,Text, TouchableOpacity, Image, BackHandler } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import openscaner from '../../assets/images/openscaner.png'
export default function App({title,setHeight,toPress }){
    const navigation = useNavigation();
    const [ArrowHeight,setArrowHeight] = useState(0)
    const [HeaderHeight,setHeaderHeight] = useState(0)

            
    function handleBackButtonClick() {
        navigation.goBack();
        return true;
      }
    
      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);
      
    return(
        <>
        <LinearGradient 
        start={[0,1]}
        end={[1,0]}
        colors={['#e5be50', '#ecda8b', '#a47b00']}
        onLayout={e => {
            setHeaderHeight(e.nativeEvent.layout.height);
            if(setHeight)setHeight(e.nativeEvent.layout.height)
        }}
        style={{width: '100%', height: 68, position: 'relative', backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#111b2d', fontSize: 16}}>{title}</Text>
            <TouchableOpacity onLayout={e => setArrowHeight(e.nativeEvent.layout.height)}  
            style={{width: '10%', position: 'absolute', left: 0, top: (HeaderHeight / 2) - (ArrowHeight / 2)}} 
            onPress={()=>{navigation.goBack()}}>
                <View style={{padding: 30, paddingRight: 50}}>
                    <FontAwesomeIcon size={20} style={{color: '#111b2d',fontSize: 40}} icon={faAngleLeft}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                  style={{position: 'absolute', right: 20, top: (HeaderHeight / 1) - (ArrowHeight / 2)}} 
                  onPress={toPress}
            >
                  <Image style={{width: 20,height: 20}} source={openscaner} />
            </TouchableOpacity>
        </LinearGradient>
        </>
    )
}