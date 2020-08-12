import React from 'react'
import { View, Text, Image, ImageBackground ,TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen} from '@fortawesome/free-solid-svg-icons';

import image from '../../assets/images/account-header-background.jpg';
import {accountStyle, mainStyles} from '../../styles'
import wallet from '../../assets/images/wallet-account.png'
import support from '../../assets/images/support-account.png'
import invitation from '../../assets/images/invitation-account.png'
import defaultAvata from '../../assets/images/default-avata.webp'
import List from './ListSetting'
export default function App({navigation}){
    return(
        <>
        <View style={[mainStyles.container,]}>
            <ImageBackground style={{width: '100%'}} source={image}>
                <View style={accountStyle.backgroundHead}>
                    <Text style={accountStyle.title}>Tài khoản</Text>
                    <View style={accountStyle.rowHeader}>
                        <View style={accountStyle.itemHeader}>
                            <Image source={wallet}/>
                            <Text style={accountStyle.textHeader}>Quản lý ví</Text>
                        </View>
                        <View style={accountStyle.itemHeader}>
                            <Image source={support}/>
                            <Text style={accountStyle.textHeader}>Hỗ trợ</Text>
                        </View>
                        <View style={accountStyle.itemHeader}>
                            <Image source={invitation}/>
                            <Text style={accountStyle.textHeader}>Phần thưởng</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View style={accountStyle.profileBar}>
                <View style={accountStyle.blockAvata}>
                    <Image style={accountStyle.avata} source={defaultAvata}/>
                </View>
                <Text style={accountStyle.profileBarEmail}>luongdaithang***@gmail.com</Text>
                <LinearGradient 
                start={[0,1]}
                end={[1,0]}
                style={accountStyle.pen}
                colors={['#ab7f00', '#edd57c']}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={accountStyle.touchPen}>
                        <FontAwesomeIcon color="#fff" icon={faPen}/>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

           <List />
        </View>
        </>
    )
}