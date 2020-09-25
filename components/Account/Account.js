import React, {useEffect, useState} from 'react'
import { View, Text, Image, ImageBackground ,TouchableOpacity, Platform} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen} from '@fortawesome/free-solid-svg-icons';

import image from '../../assets/images/account-header-background.jpg';
import {accountStyle, mainStyles} from '../../styles'
import wallet from '../../assets/images/wallet-account.png'
import support from '../../assets/images/support-account.png'
import invitation from '../../assets/images/invitation-account.png'
import defaultAvata from '../../assets/images/default-avata.webp'
import defaultAvataPNG from '../../assets/images/default-avata.png'
import List from './ListSetting'
import { storage, checkLanguage } from '../../helper'

import { useSelector } from 'react-redux'

export default function App({navigation}){

  const [UserName, setUserName] = useState('')
  const [UserEmail, setUserEmail] = useState('')

  const language = useSelector(state => state.language)

  useEffect(() => {
    async function getUserInfo() {
      var userinfo = await storage('_id').getItem();
      setUserName(userinfo.first_name + " " + userinfo.last_name);
      setUserEmail(userinfo.email);
    }

    getUserInfo()
  }, [UserName, UserEmail])
    return(
        <>
        <View style={[mainStyles.container,]}>
            <ImageBackground style={{width: '100%'}} source={image}>
                <View style={accountStyle.backgroundHead}>
                    <Text style={accountStyle.title}>{checkLanguage({vi: 'Tài khoản', en: 'Profile'},language)}</Text>
                    <View style={accountStyle.rowHeader}>
                        <View style={accountStyle.itemHeader}>
                            <TouchableOpacity 
                                style={{alignItems: 'center'}}
                                onPress={() => {navigation.navigate('WalletManage')}}
                            >
                                <Image source={wallet}/>
                                <Text style={accountStyle.textHeader}>{checkLanguage({vi: 'Quản lý ví', en: 'Manage Wallet'},language)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={accountStyle.itemHeader}>
                            <Image source={support}/>
                            <Text style={accountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
                        </View>
           
                        <View style={accountStyle.itemHeader}>
                            <TouchableOpacity 
                                style={{alignItems: 'center'}}
                                onPress={() => {navigation.navigate('Reward')}}
                            >
                                <Image source={invitation}/>
                                <Text style={accountStyle.textHeader}>{checkLanguage({vi: 'Phần thưởng', en: 'Reward'},language)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <TouchableOpacity 
                onPress={()=>navigation.navigate('Profile', {
                    // userName: UserName,
                    email: UserEmail
                })} 
                style={accountStyle.profileBar}>
                <View style={accountStyle.blockAvata}>
                    <Image style={accountStyle.avata} source={Platform.OS === 'ios' ? defaultAvataPNG : defaultAvata}/>
                </View>
                    <Text style={accountStyle.profileBarEmail}>{UserEmail}</Text>
                <LinearGradient 
                start={[0,1]}
                end={[1,0]}
                style={accountStyle.pen}
                colors={['#ab7f00', '#edd57c']}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Profile', {
                                    // userName: UserName,
                                    email: UserEmail
                                })} style={accountStyle.touchPen}>
                        <FontAwesomeIcon color="#fff" icon={faPen}/>
                    </TouchableOpacity>
                </LinearGradient>
            </TouchableOpacity>

           <List />
        </View>
        </>
    )
}