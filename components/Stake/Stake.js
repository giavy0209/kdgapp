import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, TouchableOpacity} from 'react-native'
import { mainStyles, stakingStyle } from '../../styles/'
import {Header3} from '../Header'
import {LinkBox, ListItemStaking} from '../MiniUI'
import logo from '../../assets/images/logo.png'
import coin from '../../assets/images/coin.png'
import { useNavigation } from '@react-navigation/native';
export default function App(){
    const [Width , setWidth] = useState(0);
    const [list, setList] = useState([
        {token: 'KDG', time: "15 ngày", coin: coin, percent: '+4.00%'},
        {token: 'KDG', time: "15 ngày", coin: coin, percent: '+4.00%'},
        {token: 'KDG', time: "15 ngày", coin: coin, percent: '+4.00%'},

    
      ]);

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    return (
        
        <>
        <View style={mainStyles.container}>
            <Header3/>
            <View onLayout={e=>setWidth(e.nativeEvent.layout.width)}>
                <View style={{padding: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'rgba(255,255,255,0.5)', fontSize: 14}}>Staking</Text>
                    <TouchableOpacity>
                        <Text style={{color: 'rgba(250,200,0,1)', fontSize: 14}}>Lịch sử staking ></Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{flexDirection: 'row', marginLeft: 20, marginRight: 20}}>
                        <View style={stakingStyle.tableHeaderContainer}>
                            <View style={stakingStyle.tableHeaderTextContainer}>
                                <Text style={stakingStyle.tableHeaderText}>Token</Text>
                            </View>
                        </View> 
                        <View style={stakingStyle.tableHeaderContainer}>
                            <View style={stakingStyle.tableHeaderTextContainer}>
                                <Text style={stakingStyle.tableHeaderText}>{`Thời hạn\nkhóa`}</Text>
                            </View>
                        </View> 
                        <View style={stakingStyle.tableHeaderContainer}>
                            <View style={stakingStyle.tableHeaderTextContainer}>
                                <Text style={stakingStyle.tableHeaderText}>{`Tỉ suất\nlợi nhuận ước\n tính hàng năm`}</Text>
                            </View>
                        </View> 
                        <View style={stakingStyle.tableHeaderContainer}>
                            <View style={stakingStyle.tableHeaderTextContainer}>
                                <Text style={stakingStyle.tableHeaderText}> </Text>
                            </View>
                        </View> 
                    </View>
                </View>
     
                    <View style={{marginLeft: 20, marginRight: 20, paddingLeft: 20, backgroundColor: 'rgba(26,37,56, 0.6)'}}>
                    <FlatList
                            data={list}
                            renderItem={({item}) => (
                                <ListItemStaking 
                                tokenTitle={item.token}
                                timeTitle={item.time}
                                percentTitle={item.percent}
                            />
                                
                            )}
                        />

                    </View>
                    

            </View>
        </View>
        </>
    )
}