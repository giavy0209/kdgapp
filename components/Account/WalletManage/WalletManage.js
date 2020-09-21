import React, { useState, version } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import Dialog from "react-native-dialog"
export default function App(){
    const navigation = useNavigation()
    const [WalletName, setWalletName] = useState('Kingdome game 4.0')
    const [WalletNames, setWalletNames] = useState('Kingdome game 4.0')

    const [DialogVisible, setDialogVisible] = useState(false)

    const submitHandler = (value) => {
        setWalletNames(value)
        setDialogVisible(false)
    }

    return (
        <>
            <Header2 title="Quản lý ví"/>
            <View style={[mainStyles.container,]}>
                <Dialog.Container visible={DialogVisible}>
                    <Dialog.Title>Tên ví</Dialog.Title>
                        <Dialog.Description>
                        Tên ví bạn muốn đổi
                        </Dialog.Description>
                        <Dialog.Input onChangeText={value => setWalletName(value)}/>
                        <Dialog.Button onPress={() => setDialogVisible(false)} label="Cancel" />
                    <Dialog.Button onPress={() => submitHandler(WalletName)} label="OK" />
                </Dialog.Container>
                <View>
                    <TouchableOpacity 
                    onPress={() => setDialogVisible(true)}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                        <View style={accountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: '#ddd9d8'}}>Tên ví</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, color: '#ddd9d8', paddingRight: 10}}>{WalletNames}</Text>
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