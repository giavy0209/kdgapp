import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView} from 'react-native'
import { mainStyles, stakingStyle } from '../../../styles'
import {Header2} from '../../Header'
import { JoinButton } from '../../Button'
import coin from '../../../assets/images/coin.png'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({setOutScrollViewTop}){
    const btnActive = (
        <JoinButton
        title="Tham gia ngay" 
        titleColor="#fac800"
        tintColor="#fac800"
        iconColor="#fff"
        />)
        const btnInActive = 
    (    <JoinButton
        title="Tham gia nsgay" 
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

    const [Width , setWidth] = useState(0);
    const [list, setList] = useState([
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},
        
      ]);

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Lịch sử Staking"/>)
    },[])

    return (
        
        <>

<View style={mainStyles.container}>

    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <ScrollView horizontal={true}>
        <View style={stakingStyle.tableContainer}>
                {/* -----S-Header------ */}
                <View style={stakingStyle.tableHeaderContainer}>
                    <View style={{width: '14%'}}>
                        <Text style={stakingStyle.titleHeaderStakingHistory} >Coin/Token</Text>
                    </View>
                    <View style={{width: '14%'}}>
                        <Text style={stakingStyle.titleHeaderStakingHistory} >Thời gian bắt đầu khóa</Text>
                    </View>
                    <View style={{width: '14%'}}>
                        <Text style={stakingStyle.titleHeaderStakingHistory} >Thời gian mở khóa</Text>
                    </View>
                    <View style={{width: '14%'}}> 
                        <Text style={stakingStyle.titleHeaderStakingHistory} >Số lượng khóa</Text>
                    </View>
                    <View style={{width: '14%'}}> 
                        <Text style={stakingStyle.titleHeaderStakingHistory} >Năng suất khóa tại thời điểm này</Text>
                    </View>
                    <View style={{width: '14%'}}> 
                        <Text style={stakingStyle.titleHeaderStakingHistory} >Tình trạng</Text>
                    </View>
                    <View style={{width: '14%'}}> 
                        <Text style={stakingStyle.titleHeaderStakingHistory} >Hoạt động</Text>
                    </View>
                </View>
                {/* -----E-Header------ */}
                {/* -----S-Content------ */}
                 <FlatList
                            data={list}
                            renderItem={({item}) => (
                                <View style={stakingStyle.tableContentStackingHistoryContainer}>
                                    <View style={{width: '14%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image
                                            style={{marginRight: 10}}
                                            source={require('../../../assets/images/coin.png')}
                                        />
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.token}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.timeStartLock}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.timeStartUnlock}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.numLock}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.ratio}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.progress}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.productivity}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.status}</Text>
                                    </View>
                                    <View style={{width: '14%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={stakingStyle.titleContentStakingHistory} >{item.action}</Text>
                                    </View>
                                </View> 
                            )}
                        />

                {/* -----E-Content------ */}     
            </View>
            </ScrollView>
        </View>
    </View>
</View>
        </>
    )
}