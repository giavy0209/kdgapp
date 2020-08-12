import React from 'react';
import { View , Text,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';
export default function Button({ScreenWidth, ScreenHeight,ActivePage,setActivePage}){
    const navigation = useNavigation();
    return(
        <>
        <View 
        style={[
            {position: 'absolute',top: ScreenHeight * 0.8245,left: ScreenWidth * 0.08, flex: 1, flexDirection: 'row', justifyContent:'space-between',alignContent: 'space-between'},
            ActivePage !== 3 && {transform: [{ scale: 0 }]}
        ]}
        >
            <TouchableOpacity onPress={()=>navigation.replace('Login')}>
                <LinearGradient
                    start={[0,1]}
                    end={[1,0]}
                    colors={['#e3bb4c', '#edda8b']}
                    style={{  paddingTop: ScreenHeight * 0.01499, paddingBottom: ScreenHeight * 0.01499, alignItems: 'center', borderRadius: 50 ,width: ScreenWidth * 0.4}}>
                    <Text
                        style={{
                        backgroundColor: 'transparent',
                        fontSize: 14,
                        color: '#000',
                        }}>
                        Đăng nhập
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.replace('Reg')} style={{marginLeft: ScreenWidth * 0.03,paddingTop: ScreenHeight * 0.01499, paddingBottom: ScreenHeight * 0.01499, alignItems: 'center', borderRadius: 50 ,width: ScreenWidth * 0.4, borderWidth: 1, borderColor: '#ebc660'}}>
                <Text style={{color: '#ebc660', fontSize: 14}}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}