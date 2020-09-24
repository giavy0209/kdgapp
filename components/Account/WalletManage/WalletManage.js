import React, { useState, version } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import PopupInput from '../../Popup/PopupInput'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeWalletName } from '../../../store/actions'
// import Dialog from "react-native-dialog"
export default function App(){
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const walletname = useSelector(state => state.walletname)
    const [WalletNames, setWalletNames] = useState('Kingdome game 4.0')
    const [isModalVisibleInput, setModalVisibleInput] = useState(false);

    const submitHandler = (value) => {
        setModalVisibleInput(false)
        dispatch(actChangeWalletName(value))
    }


    return (
        <>
            <Header2 title="Quản lý ví"/>
            <View style={[mainStyles.container,]}>
            <PopupInput 
                value={walletname ? walletname : 'Kingdom game 4.0'}
                toCancel={() => setModalVisibleInput(false)} 
                toSubmit={() => submitHandler(WalletNames)}
                toChangeText={(value) => setWalletNames(value)} 
                isModalVisible={isModalVisibleInput}/>
                <View>
                    <TouchableOpacity 
                    onPress={() => setModalVisibleInput(true)}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                        <View style={accountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: '#ddd9d8'}}>Tên ví</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, color: '#ddd9d8', paddingRight: 10}}>{walletname ? walletname : 'Kingdom game 4.0'}</Text>
                            <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('SelectCoin')}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                        <View style={accountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: '#ddd9d8'}}>Xuất Private key</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}