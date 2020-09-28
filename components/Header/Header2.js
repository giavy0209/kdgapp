import React, { useState, useCallback,useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {View,Text, TouchableOpacity, BackHandler } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
export default function App({title,setHeight }){
    const navigation = useNavigation();
    const [ArrowHeight,setArrowHeight] = useState(0)
    const [HeaderHeight,setHeaderHeight] = useState(0)

    const display = useSelector(state => state.display)

        
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
        {   display === 1 ? 
        
        <View 
        onLayout={e => {
            setHeaderHeight(e.nativeEvent.layout.height);
            if(setHeight)setHeight(e.nativeEvent.layout.height)
        }}
        style={{width: '100%', height: 68, position: 'relative', backgroundColor: '#fac800', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#111b2d', fontSize: 16}}>{title}</Text>
            <TouchableOpacity onLayout={e => setArrowHeight(e.nativeEvent.layout.height)}  
            style={{zIndex: 999,width: '10%', position: 'absolute', left: 0, top: (HeaderHeight / 2) - (ArrowHeight / 2)}} 
            onPress={()=>{navigation.goBack()}}>
                <View style={{padding: 20, paddingRight: 50}}>
                    <FontAwesomeIcon size={20} style={{color: '#111b2d',fontSize: 40}} icon={faAngleLeft}/>
                </View>
            </TouchableOpacity>
        </View>
            
            
            :
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
                style={{zIndex: 999,width: '10%', position: 'absolute', left: 0, top: (HeaderHeight / 2) - (ArrowHeight / 2)}} 
                onPress={()=>{navigation.goBack()}}>
                    <View style={{padding: 20, paddingRight: 50}}>
                        <FontAwesomeIcon size={20} style={{color: '#111b2d',fontSize: 40}} icon={faAngleLeft}/>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        }
        </>
    )
}