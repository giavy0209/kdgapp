import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity,Switch,Image, Alert } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import {Header2} from '../../../../Header'
import {mainStyles, walletStyles} from '../../../../../styles'
import { useNavigation } from '@react-navigation/native'
import Select from './Select'
import Confirm from './Confirm'
export default function App({setOutScrollView}){
    const navigation = useNavigation()

    const [SelectType, setSelectType] = useState(null)
    const [SelectedCountry, setSelectedCountry] = useState('Việt Nam')
    const [SelectedID, setSelectedID] = useState('Số CMND')
    const [SelectedSex, setSelectedSex] = useState('Nam')

    const screenHeight = useSelector(state => state.height)
    const [Height, setHeight] =useState(0)
    const [ContentHeight, setContentHeight] =useState(0)
    const [ButtonHeight, setButtonHeight] =useState(0)
    useEffect(()=>{
        if(SelectType !== null){
            setOutScrollView(<Select 
                SelectType={SelectType}
                setSelectType={setSelectType}
                SelectValue={SelectType === 0 ? SelectedCountry : SelectType === 1 ? SelectedID : SelectedSex}
                setSelectValue={SelectType === 0 ? setSelectedCountry : SelectType === 1 ? setSelectedID : setSelectedSex}
            />)
        }else{
            setOutScrollView(null)
        }
    },[SelectType])

    const handleNext = useCallback(()=>{
        setOutScrollView(<Confirm setOutScrollView={setOutScrollView} SelectedID={SelectedID}/>)
    },[SelectedID])
    return (
        <>
            <Header2 setHeight={setHeight} title="Xác minh danh tính"/>
            <View 
            onLayout={e=>setContentHeight(e.nativeEvent.layout.height)}
            style={[mainStyles.container, {marginHorizontal: 14, marginVertical: 8}]}>
                <Text style={[mainStyles.color1, mainStyles.fontsize13,{marginBottom: 7}]}>Chỉ mất khoảng hơn 2 phút. Vui lòng cung cấp thông tin cá nhân đầy đủ của bạn để tiếp tục</Text>

                <Text style={[mainStyles.fontsize12, mainStyles.color1,{marginTop: 21}]}>QUỐC GIA</Text>
                <TouchableOpacity 
                style={{marginTop: 8}}
                onPress={()=>setSelectType(0)}>
                    <View style={{position: 'relative',height: 40, justifyContent: 'center', paddingHorizontal: 19}}>
                        <View style={walletStyles.maskOpacity}></View>
                        <Text style={[mainStyles.fontsize14, mainStyles.color2]}>{SelectedCountry}</Text>
                        <FontAwesomeIcon 
                        size={12}
                        color='#8a8c8e'
                        style={{position: 'absolute', right: 12, top: '50%',transform: [{translateY: -6}] }}
                        icon={faSort}/>
                    </View>
                </TouchableOpacity>

                <Text style={[mainStyles.fontsize12, mainStyles.color1,{marginTop: 21}]}>LOẠI GIẤY TỜ</Text>
                <TouchableOpacity 
                style={{marginTop: 8}}
                onPress={()=>setSelectType(1)}>
                    <View style={{position: 'relative',height: 40, justifyContent: 'center', paddingHorizontal: 19}}>
                        <View style={walletStyles.maskOpacity}></View>
                        <Text style={[mainStyles.fontsize14, mainStyles.color2]}>{SelectedID}</Text>
                        <FontAwesomeIcon 
                        size={12}
                        color='#8a8c8e'
                        style={{position: 'absolute', right: 12, top: '50%',transform: [{translateY: -6}] }}
                        icon={faSort}/>
                    </View>
                </TouchableOpacity>

                <Text style={[mainStyles.fontsize12, mainStyles.color1,{marginTop: 21}]}>GIỚI TÍNH</Text>
                <TouchableOpacity 
                style={{marginTop: 8}}
                onPress={()=>setSelectType(2)}>
                    <View style={{position: 'relative',height: 40, justifyContent: 'center', paddingHorizontal: 19}}>
                        <View style={walletStyles.maskOpacity}></View>
                        <Text style={[mainStyles.fontsize14, mainStyles.color2]}>{SelectedSex}</Text>
                        <FontAwesomeIcon 
                        size={12}
                        color='#8a8c8e'
                        style={{position: 'absolute', right: 12, top: '50%',transform: [{translateY: -6}] }}
                        icon={faSort}/>
                    </View>
                </TouchableOpacity>
            </View>

            {SelectType === null && <TouchableOpacity 
            onPress={handleNext}
            onLayout={e => setButtonHeight(e.nativeEvent.layout.height)}
            style={[{marginHorizontal: 11 , flex: 1,height: 47, justifyContent: 'center', alignItems: 'center',borderRadius: 50, overflow: 'hidden'},
            {marginTop: screenHeight - ContentHeight - Height - ButtonHeight - 22}
            ]}>
                <LinearGradient
                start={[0,1]}
                end={[1,0]}
                colors={['#a47b00','#edda8b', '#d6b039', '#edda8b', '#a47b00']}
                style={{width: '100%',height: 47, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={{color: '#111b2d', fontSize: 14}}>Tiếp theo</Text>
                </LinearGradient>
            </TouchableOpacity>}
        </>
    )
}