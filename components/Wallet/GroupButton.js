import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ScrollView, Button, View, TextInput, Text, TouchableOpacity, Alert, ImageBackground, Image, StyleSheet, Dimensions,BackHandler } from 'react-native';
import withdraw from '../../assets/images/withdraw.png'
import deposit from '../../assets/images/deposit.png'
import stake from '../../assets/images/stake.png'
import swap from '../../assets/images/swap.png'
import { walletStyles } from '../../styles/'
import { useNavigation } from '@react-navigation/native';
export default function App(){
    const navigation = useNavigation()
    return (
        <View style={walletStyles.groupButton}>
            <TouchableOpacity  
                onPress={()=>navigation.navigate('Withdraw',{

                })} 
                style={walletStyles.buttonBlock} 
                style={walletStyles.buttonBlock}>
            <View style={walletStyles.button}>
                <View style={walletStyles.maskOpacity}></View>
                <Image source={withdraw}/>
                <Text style={walletStyles.buttonText}>Gửi</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  
                onPress={()=>navigation.navigate('Deposit', {
                })}  
                style={walletStyles.buttonBlock}>
            <View style={walletStyles.button}>
                <View style={walletStyles.maskOpacity}></View>
                <Image source={deposit}/>
                <Text style={walletStyles.buttonText}>Nạp</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>navigation.navigate('Staking')}
                style={walletStyles.buttonBlock}>
            <View style={walletStyles.button}>
                <View style={walletStyles.maskOpacity}></View>
                <Image source={stake}/>
                <Text style={walletStyles.buttonText}>Staking</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={walletStyles.buttonBlock}>
            <View style={walletStyles.button}>
                <View style={walletStyles.maskOpacity}></View>
                <Image source={swap}/>
                <Text style={walletStyles.buttonText}>Swap</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}