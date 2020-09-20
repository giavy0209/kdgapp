import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView} from 'react-native'
import { mainStyles, stakingStyle } from '../../../styles'
import {Header2} from '../../Header'
import { JoinButton } from '../../Button'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { asyncGetStakingTransaction  } from '../../../store/actions'
import { storage } from '../../../helper'
import { useDispatch, useSelector } from 'react-redux'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({setOutScrollViewTop}){
    const dispatch = useDispatch();
    const [Width , setWidth] = useState(0);
    const [RightColumnn,setRightColumn] = useState(0);
    // const list = [
    //     {icon: coin, token: 'KDG', timeStartLock: '15 ngày', timeStartUnlock: '20 ngày', numLock: '5', ratio: '5 tỷ USD', progress: '20 ngày', productivity: '15 ngày', status: '20 ngày', action: '15 ngày'},  
    //   ];

    const [StakingHistory, setStakingHistory] = useState([]);
    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Lịch sử Staking"/>)
    },[])


    useEffect(() => {
        async function getStakingHistory() {
          var userinfo = await storage('_id').getItem();
          dispatch(asyncGetStakingTransaction(userinfo._id))
          .then((res)=>{
            setStakingHistory(res.data)
          })
          
          .catch(console.log)
        }
        getStakingHistory()
      }, [])    
    return (
        
        <>

<View style={mainStyles.container}>

    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
        <View style={{padding: (windowWidth*windowHeight)/29376, paddingVertical: 20}}>
            {/* <TouchableOpacity     
                onPress={() => 
                navigation.navigate('StakingTime')}>
            <View style={{flexDirection: 'row' ,alignItems: 'center',justifyContent: 'center' ,alignSelf: 'flex-end', backgroundColor: 'rgba(46,57,79,0.7)', height: 35, width: '57%', borderRadius: 20}}>
                <FontAwesomeIcon size={15} color="#fac800" icon={faCalendarAlt}/>
                <Text style={{color: 'rgba(255,255,255,0.6)', paddingLeft: 5}}>01/09/2020 - 01/05/2021</Text>
            </View>
            </TouchableOpacity> */}

            <View style={{flexDirection: 'row'}}>
                <View>
                    <View style={stakingStyle.tableContainer}>
                        <View style={{padding: 5, paddingTop: 10}}>
                            <Text style={stakingStyle.titleHeaderStakingHistory} >Coin/Token</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'rgba(26,37,56, 0.5)', paddingTop: RightColumnn/1.8}}>                  
                    {StakingHistory.map(item => (
                    <View style={{
                        width: '100%', 
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        paddingBottom: RightColumnn/2.25
       
                    }}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                style={{marginRight: 10, height: 30, width: 30}}
                                source={require('../../../assets/images/coin.png')}
                            />
                            <Text style={stakingStyle.titleContentStakingHistory} > KDG</Text>
                        </View>
                    </View>
                    ))}
                    </View>
                </View>
                <ScrollView horizontal={true}>
                    <View style={stakingStyle.tableContainer}>
                        {/* -----S-Header------ */}
                        <View style={stakingStyle.tableHeaderContainer}>
                            <View style={{width: '20%'}}>
                                <Text style={stakingStyle.titleHeaderStakingHistory} >Thời gian bắt đầu</Text>
                            </View>
                            <View style={{width: '20%'}}>
                                <Text style={stakingStyle.titleHeaderStakingHistory} >Thời gian mở khóa</Text>
                            </View>
                            <View style={{width: '20%'}}> 
                                <Text style={stakingStyle.titleHeaderStakingHistory} >Số tiền staking</Text>
                            </View>
                            <View style={{width: '20%'}}> 
                                <Text style={stakingStyle.titleHeaderStakingHistory} >Tỷ lệ lợi nhuận hàng năm dự kiến</Text>
                            </View>
                        </View>
                        {/* -----E-Header------ */}
                        {/* -----S-Content------ */}
                        <FlatList
                                    data={StakingHistory}
                                    renderItem={({item}) => (
                                        <View   onLayout={e => setRightColumn(e.nativeEvent.layout.height)}  style={stakingStyle.tableContentStackingHistoryContainer}>
                                            <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={stakingStyle.titleContentStakingHistory} >{        
                                                    (new Date(item.start_date)).getDate().toString()  + "/"   +
                                                    ((new Date(item.start_date)).getMonth() +1 ).toString() + "/"   +
                                                    (new Date(item.start_date)).getFullYear().toString()}</Text>
                                            </View>
                                            <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={stakingStyle.titleContentStakingHistory} >{        
                                                    (new Date(item.end_date)).getDate().toString()  + "/"   +
                                                    ((new Date(item.end_date)).getMonth() + 1).toString() + "/"   +
                                                    (new Date(item.end_date)).getFullYear().toString()}</Text>
                                            </View>
                                            <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={stakingStyle.titleContentStakingHistory} >{item.kdg_coin_send}</Text>
                                            </View>
                                            <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={stakingStyle.titleContentStakingHistory} >30%</Text>
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
</View>
        </>
    )
}