import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView} from 'react-native'
import { mainStyles, stakingStyle } from '../../styles'
import {HeaderStaking} from '../Header'
import { JoinButton } from '../Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'


// ------------------Icon---------------------
import kdgicon from '../../assets/images/IconCoin/KDG.png'
import ethicon from '../../assets/images/IconCoin/ETH.png'
import trxicon from '../../assets/images/IconCoin/TRX.png'
import usdticon from '../../assets/images/IconCoin/USDT.png'
// ------------------------------------------

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function App({setOutScrollViewTop, setOutScrollView}){
    const [Width , setWidth] = useState(0);
    const btnActive = (
    <JoinButton
    title="Tham gia ngay" 
    titleColor="#fac800"
    tintColor="#fac800"
    iconColor="#fff"
    toPress={() => 
        navigation.navigate('StakingJoining')}
    />)
    const btnInActive = 
(    <JoinButton
    title="Tham gia ngay" 
    titleColor="red"
    borderTintColor='#707582'
    borderTintWidth={1}
    iconColor="#fff"
    />)
    const btnDisable = 
(    <JoinButton
    title="Tham gia ngay" 
    titleColor="#707582"
    tintColor="#707582"
    iconColor="#fff"
    />)

    const list = [
        {icon: kdgicon, token: 'KDG ', time: '60 ngày', ratio: '30%', btn: btnActive},
        {icon: ethicon, token: 'ETH ', time: '60 ngày', ratio: '30%', btn: btnDisable},
        {icon: trxicon, token: 'TRX ', time: '60 ngày', ratio: '30%', btn: btnDisable},
        {icon: usdticon, token: 'USDT', time: '60 ngày', ratio: '30%', btn: btnDisable},
        
      ];

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<HeaderStaking
                                title="Kingdom Staking"
                                subTitle="Mô hình chia sẻ kinh tế trong thời đại số"
                            />)

    },[])

    return (
        
        <>

<View style={mainStyles.container}>
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={stakingStyle.contentContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Staking</Text>
                <TouchableOpacity
                    onPress={() => 
                    navigation.navigate('StakingHistory')} 
                >
                    <Text style={{color: '#d7ae07', fontSize: 13 }}>Lịch sử staking ></Text>
                </TouchableOpacity>
            </View>
            <View style={stakingStyle.tableContainer}>
                {/* -----S-Header------ */}
                <View style={stakingStyle.tableHeaderContainer}>
                    <View style={{width: '24%'}}>
                        <Text style={stakingStyle.titleHeader} >Token</Text>
                    </View>
                    <View style={{width: '24%'}}>
                        <Text style={stakingStyle.titleHeader} >Thời gian khoá tối thiểu</Text>
                    </View>
                    <View style={{width: '26%'}}>
                        <Text style={stakingStyle.titleHeader} >Tỷ lệ lợi nhuận hàng năm dự kiến</Text>
                    </View>
                    <View style={{width: '26%'}}> 
                        <Text style={stakingStyle.titleHeader} ></Text>
                    </View>
                </View>
                {/* -----E-Header------ */}
                {/* -----S-Content------ */}
                 <FlatList
                            data={list}
                            renderItem={({item}) => (
                                <View style={stakingStyle.tableContentContainer}>
                                    <View style={{width: '24%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image
                                            style={{width: 33, height: 33}}
                                            source={item.icon}
                                        />
                                        <Text style={stakingStyle.titleContent} >{item.token}</Text>
                                    </View>
                                    <View style={{width: '24%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContent} >{item.time}</Text>
                                    </View>
                                    <View style={{width: '26%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContent} >{item.ratio}</Text>
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