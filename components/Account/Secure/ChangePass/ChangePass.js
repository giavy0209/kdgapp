import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, TextInput,Image } from 'react-native'

import {Header2} from '../../../Header'
import { mainStyles } from '../../../../styles'
import LockIcon from '../../../../assets/images/lock-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
export default function App(){
    const screenHeight = useSelector(state=>state.height)
    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const [ButtonHeight, setButtonHeight] = useState(0)

    const [OldPass, setOldPass] = useState('')
    const [OldPassVisible, setOldPassVisible] = useState(false)
    const [NewPass, setNewPass] = useState('')
    const [NewPassVisible, setNewPassVisible] = useState(false)
    const [ReNewPass, setReNewPass] = useState('')
    const [ReNewPassVisible, setReNewPassVisible] = useState(false)

    const handleChangePass = useCallback(()=>{
        
    },[OldPass, NewPass, ReNewPass])
    
    return (
        <>
            <Header2 setHeight={setHeight} title="Thay đổi mật khẩu"/>
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 8}]}>
                <Text style={{color: '#ddd9d8', fontSize: 14}}> Để cập nhật mật khẩu, đầu tiên nhập mật khẩu hiện tại của bạn và sau đó nhập mật khẩu mới 2 lần</Text>
                <Text style={{marginTop: 28, color: '#8a8c8e' ,fontSize: 13}}>Mật khẩu hiện tại</Text>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'flex-start', alignContent: 'center',marginTop: 8,position: 'relative'}}>
                    <View style={{width:46,backgroundColor: '#333f57',height: '100%', alignItems:'center', alignContent: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                        <Image source={LockIcon} />
                    </View>
                    <TextInput 
                    secureTextEntry={!OldPassVisible} 
                    value={OldPass} 
                    onChangeText={value => setOldPass(value)} 
                    placeholder='Mật khẩu hiện tại'
                    style={{borderTopRightRadius:5,borderBottomRightRadius: 5,flex: 1,width: '100%', paddingHorizontal: 13,paddingLeft: 9, paddingRight: 40, color: '#ddd9d8', fontSize: 14 ,backgroundColor: '#2e394f',}}/>
                    <TouchableOpacity onPress={()=>setOldPassVisible(!OldPassVisible)} style={{position: 'absolute', right: 16, top: '50%', transform: [{translateY: -8}]}}><FontAwesomeIcon color='#8a8c8e' icon={OldPassVisible ? faEye : faEyeSlash} /></TouchableOpacity>
                </View>

                <Text style={{marginTop: 22, color: '#8a8c8e' ,fontSize: 13}}>Mật khẩu mới</Text>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'flex-start', alignContent: 'center',marginTop: 8,position: 'relative'}}>
                    <View style={{width:46,backgroundColor: '#333f57',height: '100%', alignItems:'center', alignContent: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                        <Image source={LockIcon} />
                    </View>
                    <TextInput 
                    secureTextEntry={!NewPassVisible} 
                    value={NewPass} 
                    onChangeText={value => setNewPass(value)} 
                    placeholder='Mật khẩu mới'
                    style={{borderTopRightRadius:5,borderBottomRightRadius: 5,flex: 1,width: '100%', paddingHorizontal: 13,paddingLeft: 9, paddingRight: 40, color: '#ddd9d8', fontSize: 14 ,backgroundColor: '#2e394f',}}/>
                    <TouchableOpacity onPress={()=>setNewPassVisible(!NewPassVisible)} style={{position: 'absolute', right: 16, top: '50%', transform: [{translateY: -8}]}}><FontAwesomeIcon color='#8a8c8e' icon={NewPassVisible ? faEye : faEyeSlash} /></TouchableOpacity>
                </View>

                <Text style={{marginTop: 22, color: '#8a8c8e' ,fontSize: 13}}>Xác nhận mật khẩu</Text>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'flex-start', alignContent: 'center',marginTop: 8,position: 'relative'}}>
                    <View style={{width:46,backgroundColor: '#333f57',height: '100%', alignItems:'center', alignContent: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                        <Image source={LockIcon} />
                    </View>
                    <TextInput 
                    secureTextEntry={!ReNewPassVisible} 
                    value={ReNewPass} 
                    onChangeText={value => setReNewPass(value)} 
                    placeholder='Xác nhận mật khẩu'
                    style={{borderTopRightRadius:5,borderBottomRightRadius: 5,flex: 1,width: '100%', paddingHorizontal: 13,paddingLeft: 9, paddingRight: 40, color: '#ddd9d8', fontSize: 14 ,backgroundColor: '#2e394f',}}/>
                    <TouchableOpacity onPress={()=>setReNewPassVisible(!ReNewPassVisible)} style={{position: 'absolute', right: 16, top: '50%', transform: [{translateY: -8}]}}><FontAwesomeIcon color='#8a8c8e' icon={ReNewPassVisible ? faEye : faEyeSlash} /></TouchableOpacity>
                </View>

            </View>
            <TouchableOpacity
            onLayout={e => setButtonHeight(e.nativeEvent.layout.height)}
            onPress={handleChangePass}
            style={{
                marginTop: screenHeight - Height - ContentHeight - ButtonHeight - 23,
                marginHorizontal:11,
                borderRadius: 5,
                overflow:'hidden'
            }}
            >
                <LinearGradient
                start={[0,1]}
                end={[1,0]}
                colors={['#e5be50', '#ecda8b', '#a47b00']}
                style={{paddingVertical: 15}}
                >
                    <Text style={{textAlign: 'center', color: '#111b2d'}}>THAY ĐỔI MẬT KHẨU</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}