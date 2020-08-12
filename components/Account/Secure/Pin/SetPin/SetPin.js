import React, { useState, useRef, useEffect, useCallback } from 'react'
import SmoothPinCodeInput  from 'react-native-smooth-pincode-input'
import { View, Text, TouchableOpacity,Switch,Image, Alert } from 'react-native'
import {Header2} from '../../../../Header'
import { mainStyles } from '../../../../../styles'
import Lock from '../../../../../assets/images/lock-pin.png'
import { LinearGradient } from 'expo-linear-gradient'

import {asyncSetPin} from '../../../../../store/actions'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function App(){
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [Pin1, setPin1] = useState('')
    const [PinBar1, setPinBar1] = useState(null)
    const [PinBar1Focus, setPinBar1Focus] = useState(false)
    const [Pin2, setPin2] = useState('')
    const [PinBar2, setPinBar2] = useState(null)
    const [PinBar2Focus, setPinBar2Focus] = useState(false)

    const onBlurPinBar1 = useCallback(()=>{
        setPinBar1Focus(false)
    },[])

    const onBlurPinBar2 = useCallback(()=>{
        setPinBar2Focus(false)
    },[])

    const handleSubmit = useCallback(()=>{
        if(Pin1.length !== 6){
            Alert.alert('Unlock PIN', 'Mã PIN phải đủ 6 chữ số')
            return null
        }
        if(Pin1 === Pin2){
            dispatch(asyncSetPin(Pin1))
            .then(()=>{
                Alert.alert('Unlock PIN', 'Mã PIN được cài đặt thành công')
                navigation.goBack()
            })
        }else{
            Alert.alert('Đổi mã pin', 'Nhập lại mã pin không chính xác')
        }
    },[Pin1,Pin2])

    return(
        <>
        <Header2 title="Cài đặt Unlock PIN"/>
        <View style={[mainStyles.container,{paddingHorizontal: 16, alignItems: 'center'}]}>
            <Text style={{marginTop:25,color: '#ddd9d8', fontSize: 13,textAlign:'center'}}>Tạo mật khẩu 6 số để bảo vệ an toàn Ví King của bạn</Text>
            <Text style={{color: '#ddd9d8', fontSize: 13,textAlign:'center'}}>Mã PIN dùng để mở khóa ví tiền và gửi tiền</Text>

            <TouchableOpacity disabled={PinBar1Focus} activeOpacity={false} onPress={()=>{PinBar1.focus(); setPinBar1Focus(true)}} style={{position:'relative',backgroundColor: '#1d2536', height: 55, flex: 1, justifyContent: 'center', alignItems: 'center',width: '100%', borderRadius: 40, marginTop:32}}>
                <Image style={{position: 'absolute', left: 19, top: 22}} source={Lock}/>
                <Text style={{color: '#8a8c8e',fontSize: 16,opacity: PinBar1Focus ? 0 : 1}}>Nhập mã PIN</Text>

                <View style={{opacity: PinBar1Focus ? 1 : 0,top: PinBar1Focus? 0 : -10000 ,position: 'absolute', width: '100%' , height : '100%',  left: 0, alignItems: 'center', justifyContent: 'center'}}>
                    <SmoothPinCodeInput
                    placeholder={<View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: '#8a8c8e',
                    }}></View>}
                    mask={<View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: '#ddd9d8',
                    }}></View>}
                    restrictToNumbers={true}
                    cellSize={12}
                    maskDelay={1000}
                    password={true}
                    cellStyle={null}
                    cellStyleFocused={null}
                    value={Pin1}
                    codeLength={6}
                    keyboardType="number-pad"
                    onTextChange={code => setPin1(code)}
                    ref={value => setPinBar1(value)}
                    inputProps={{onBlur:onBlurPinBar1}}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity disabled={PinBar2Focus} onPress={()=>{PinBar2.focus(); setPinBar2Focus(true)}} style={{position:'relative',backgroundColor: '#1d2536', height: 55, flex: 1, justifyContent: 'center', alignItems: 'center',width: '100%', borderRadius: 40, marginTop:10}}>
                <Image style={{position: 'absolute', left: 19, top: 22}} source={Lock}/>
                <Text style={{color: '#8a8c8e',fontSize: 16,opacity: PinBar2Focus ? 0 : 1}}>Nhập lại mã PIN</Text>

                <View style={{opacity: PinBar2Focus ? 1 : 0,top: PinBar2Focus? 0 : -10000 ,position: 'absolute', width: '100%' , height : '100%',  left: 0, alignItems: 'center', justifyContent: 'center'}}>
                    <SmoothPinCodeInput
                    placeholder={<View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: '#8a8c8e',
                    }}></View>}
                    mask={<View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: '#ddd9d8',
                    }}></View>}
                    restrictToNumbers={true}
                    cellSize={12}
                    maskDelay={1000}
                    password={true}
                    cellStyle={null}
                    cellStyleFocused={null}
                    value={Pin2}
                    codeLength={6}
                    keyboardType="number-pad"
                    onTextChange={code => setPin2(code)}
                    ref={value => setPinBar2(value)}
                    inputProps={{onBlur:onBlurPinBar2}}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={handleSubmit}
            style={{marginTop:10, width: '100%',height: 47, justifyContent: 'center', alignItems: 'center',borderRadius: 50, overflow: 'hidden'}}>
                <LinearGradient
                start={[0,1]}
                end={[1,0]}
                colors={['#a47b00','#edda8b', '#d6b039', '#edda8b', '#a47b00']}
                style={{width: '100%',height: 47, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={{color: '#111b2d', fontSize: 14}}>XÁC NHẬN</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        </>
    )
}