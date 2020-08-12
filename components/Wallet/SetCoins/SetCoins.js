import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, Image, TextInput,TouchableOpacity,Switch} from 'react-native'
import { mainStyles } from '../../../styles'
import {Header2} from '../../Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

import coin from '../../../assets/images/coin.png'
export default function App(){
    const [SearchHeight , setSearchHeight] = useState(0)
    const [Search , setSearch] = useState('')

    const handleSearch = useCallback(value=>{
        setSearch(value)
    },[Search])
    return (
        <>
        <View style={mainStyles.container}>
            <Header2 title="Add Coins"/>
            <View style={{marginHorizontal: 15, marginTop: 15}}>
                <View style={{position: 'relative'}}>
                    <FontAwesomeIcon onLayout={e=>setSearchHeight(e.nativeEvent.layout.width)}  icon={faSearch} style={{color:"#8a8c8e", position: 'absolute', top: '50%', transform: [{translateY: - (SearchHeight /2)}] ,left:18,zIndex: 9}}/>
                    <TextInput 
                    onChangeText={handleSearch}
                    value={Search}
                    style={{color: '#8a8c8e',fontSize: 13,backgroundColor: '#2e394f', borderRadius: 50, paddingVertical: 0, paddingLeft: 50}} placeholder="Nhập loại Coin hoặc Địa chỉ hợp đồng"/>
                    <TouchableOpacity 
                    onPress={()=>setSearch('')}
                    style={[{position: 'absolute',  top: '50%', right:10,zIndex: 9},{transform: [{translateY: -8}]}
                    ]}>
                    <FontAwesomeIcon icon={faTimes} style={[{color:"#8a8c8e", opacity: 0}, Search !== '' && {opacity: 1}]}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{marginTop: 17}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignContent: 'center', marginTop: 10, paddingBottom: 13, borderBottomColor: '#29303d', borderBottomWidth: 1}}>
                            <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                <Image source={coin} style={{width: 37, height: 37, resizeMode: 'contain'}}/>
                                <View style={{marginLeft: 12}}>
                                    <Text style={{color: '#fff'}}>KDG</Text>
                                    <Text style={{color: '#8a8c8e'}}>Kingdom Game 4.0</Text>
                                </View>
                            </View>
                            <Switch />
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </>
    )
}