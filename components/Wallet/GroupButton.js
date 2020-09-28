import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ScrollView, Button, View, TextInput, Text, TouchableOpacity, Alert, ImageBackground, Image, StyleSheet, Dimensions,BackHandler } from 'react-native';
import withdraw from '../../assets/images/withdraw.png'
import deposit from '../../assets/images/deposit.png'
import stake from '../../assets/images/stake.png'
import swap from '../../assets/images/swap.png'
import { walletStyles } from '../../styles/'
import { walletStylesLight } from '../../styles/light'
import { useNavigation } from '@react-navigation/native'
import { checkLanguage } from '../../helper'
import { useSelector } from 'react-redux'

export default function App({}){
    const navigation = useNavigation()
    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)

    // -------------------style------------------------------

var WalletStyle = display === 1 ? walletStylesLight : walletStyles

// ------------------------------------------------------
    return (
        <View style={WalletStyle.groupButton}>
            <TouchableOpacity  
                onPress={()=>navigation.navigate('Withdraw',{

                })} 
                style={WalletStyle.buttonBlock}>
            <View style={WalletStyle.button}>
                <View style={WalletStyle.maskOpacity}></View>
                <Image source={withdraw}/>
                <Text style={WalletStyle.buttonText}>{checkLanguage({vi: 'Rút', en: 'Withdraw'},language)}</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  
                onPress={()=>navigation.navigate('Deposit', {
                })}  
                style={WalletStyle.buttonBlock}>
            <View style={WalletStyle.button}>
                <View style={WalletStyle.maskOpacity}></View>
                <Image source={deposit}/>
                <Text style={WalletStyle.buttonText}>{checkLanguage({vi: 'Nạp', en: 'Deposit'},language)}</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>navigation.navigate('Staking')}
                style={WalletStyle.buttonBlock}>
            <View style={WalletStyle.button}>
                <View style={WalletStyle.maskOpacity}></View>
                <Image style={{marginTop: 5}} source={stake}/>
                <Text style={WalletStyle.buttonText}>Staking</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>navigation.navigate('Swap')}
                style={WalletStyle.buttonBlock}>
            <View style={WalletStyle.button}>
                <View style={WalletStyle.maskOpacity}></View>
                <Image style={{marginTop: 5}}  source={swap}/>
                <Text style={WalletStyle.buttonText}>Swap</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}