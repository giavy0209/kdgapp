import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView} from 'react-native'
import { mainStyles, stakingStyle } from '../../styles'
import { stakingStyleLight } from '../../styles/light'
import {HeaderStaking} from '../Header'
import { JoinButton } from '../Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'

import { checkLanguage } from '../../helper'
import { useSelector } from 'react-redux'
// ------------------Icon---------------------
import kdgicon from '../../assets/images/IconCoin/KDG.png'
import ethicon from '../../assets/images/IconCoin/ETH.png'
import trxicon from '../../assets/images/IconCoin/TRX.png'
import usdticon from '../../assets/images/IconCoin/USDT.png'
import mchicon from '../../assets/images/IconCoin/MCH.png'
import tomoicon from '../../assets/images/IconCoin/TOMO.png'
// ------------------------------------------

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function App({setOutScrollViewTop, setOutScrollView}){
    const [Width , setWidth] = useState(0);
    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)
    const btnActive = (
    <JoinButton
    title={checkLanguage({vi: 'Tham gia ngay', en: 'Join now'},language)}
    titleColor="#fac800"
    tintColor="#fac800"
    iconColor="#fff"
    toPress={() => 
        navigation.navigate('StakingJoining')}
    />)
    const btnInActive = 
(    <JoinButton
    title={checkLanguage({vi: 'Tham gia ngay', en: 'Join now'},language)}
    titleColor="red"
    borderTintColor='#707582'
    borderTintWidth={1}
    iconColor="#fff"
    />)
    const btnDisable = 
(    <JoinButton
    title={checkLanguage({vi: 'Tham gia ngay', en: 'Join now'},language)}
    titleColor="#707582"
    tintColor="#707582"
    iconColor="#fff"
    />)

    const list = [
        {icon: kdgicon, token: ' KDG ', time: checkLanguage({vi: '60 ngày', en: '60 days'},language), ratio: '30%', btn: btnActive},
        {icon: ethicon, token: ' ETH ', time: checkLanguage({vi: '60 ngày', en: '60 days'},language), ratio: '8%', btn: btnDisable},
        {icon: trxicon, token: ' TRX ', time: checkLanguage({vi: '60 ngày', en: '60 days'},language), ratio: '10%', btn: btnDisable},
        {icon: usdticon, token: 'USDT', time: checkLanguage({vi: '60 ngày', en: '60 days'},language), ratio: '6%', btn: btnDisable},
        {icon: mchicon, token: ' MCH', time: checkLanguage({vi: '60 ngày', en: '60 days'},language), ratio: '15%', btn: btnDisable},
        {icon: tomoicon, token: 'TOMO', time: checkLanguage({vi: '60 ngày', en: '60 days'},language), ratio: '15%', btn: btnDisable},
        
      ];

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<HeaderStaking
                                title=""
                                subTitle=""
                            />)

    },[])
    
    // -------------------style------------------------------

var StakingStyle = display === 1 ? stakingStyleLight : stakingStyle

// ------------------------------------------------------

    return (
        
        <>

<View style={mainStyles.container}>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={StakingStyle.contentContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                <Text style={{color: display === 1 ?  '#989a9c' : 'rgba(255,255,255,0.6)', fontSize: 13 }}>Staking</Text>
                <TouchableOpacity
                    onPress={() => 
                    navigation.navigate('StakingHistory')} 
                >
                    <Text style={{color: display === 1 ?  '#fac800' :'#d7ae07', fontSize: 13 }}>{checkLanguage({vi: 'Lịch sử Staking >', en: 'Staking history >'},language)}</Text>
                </TouchableOpacity>
            </View>
            <View style={StakingStyle.tableContainer}>
                {/* -----S-Header------ */}
                <View style={StakingStyle.tableHeaderContainer}>
                    <View style={{width: '24%'}}>
                        <Text style={StakingStyle.titleHeader} >Token</Text>
                    </View>
                    <View style={{width: '24%'}}>
                        <Text style={StakingStyle.titleHeader} >{checkLanguage({vi: 'Thời gian khoá', en: 'Locking time'},language)}</Text>
                    </View>
                    <View style={{width: '26%'}}>
                        <Text style={StakingStyle.titleHeader} >{checkLanguage({vi: 'Tỷ lệ lợi nhuận hàng năm dự kiến', en: 'Expected annual rate of return'},language)}</Text>
                    </View>
                    <View style={{width: '26%'}}> 
                        <Text style={StakingStyle.titleHeader} ></Text>
                    </View>
                </View>
                {/* -----E-Header------ */}
                {/* -----S-Content------ */}
                 <FlatList
                            data={list}
                            renderItem={({item}) => (
                                <View style={StakingStyle.tableContentContainer}>
                                    <View style={{width: '24%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image
                                            style={{width: 33, height: 33}}
                                            source={item.icon}
                                        />
                                        <Text style={StakingStyle.titleContent} >{item.token}</Text>
                                    </View>
                                    <View style={{width: '24%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={StakingStyle.titleContent} >{item.time}</Text>
                                    </View>
                                    <View style={{width: '26%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={StakingStyle.titleContent} >{item.ratio}</Text>
                                    </View>
        
                                        <View style={{width: '26%', justifyContent: 'flex-end', alignItems: 'center'}}> 
                                            {item.btn}
                                        </View>
                                </View> 
                            )}
                        />

                {/* -----E-Content------ */}     
            </View>
        </View> 
    </View>
</View>
        </>
    )
}