import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { Dimensions } from 'react-native'
import DepositIcon from '../../assets/images/depositIcon.png'
import WithDrawIcon from '../../assets/images/withdrawIcon.png'
import NoneIcon from '../../assets/images/question-marks.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({toPress, type, datetime, status, value, coin_name}){

    return (
        <>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(28,38,59,0.7)', borderRadius: 5, padding: 15, borderBottomWidth: 1, borderColor: 'rgba(114,118,125,0.8)'}}>
            <TouchableOpacity
                onPress={toPress}
            >
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Image
                            style={{
                                width: 35,
                                height: 35
                            }}
                            source={type === 'deposit' ? DepositIcon : type === 'withdraw' ? WithDrawIcon : NoneIcon}
                        />
                    </View>
                    <View style={{paddingLeft: 10}}>
                        <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>{type === 'deposit' ? 'Nạp' : type === 'withdraw' ? 'Rút' : 'Không xác định'}</Text>
                        <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: 12}}>{datetime}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 14}}>{type === 'deposit' ? `+ ${value} ${coin_name}` : type === 'withdraw' ? `- ${value} ${coin_name}` : 'Không xác định'}</Text>
                <Text style={{color: status === 'success' ? '#26a65b' : status === 'failed' ? '#e11f2e' : 'rgba(255,255,255,0.5)' , fontSize: 12, fontStyle: 'italic'}}>{status === 'success' ? 'Thành công' : status === 'failed' ? 'Thất bại' : 'Đang chờ' }</Text>
            </View>
    </View>
        </>
    )
}