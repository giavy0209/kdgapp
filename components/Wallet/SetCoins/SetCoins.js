import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, Image, TextInput,TouchableOpacity,Switch, FlatList} from 'react-native'
import { mainStyles } from '../../../styles'
import {Header2} from '../../Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import {asyncSetCoin} from '../../../store/actions'

// ------------------Icon Image---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'
import kncicon from '../../../assets/images/IconCoin/KNC.png'
import mchicon from '../../../assets/images/IconCoin/MCH.png'

// ------------------------------------------
export default function App(){

    const coinDisplay = useSelector(state => state.coin)
    const dispatch = useDispatch()
    const [SearchHeight , setSearchHeight] = useState(0)
    const [Search , setSearch] = useState('')

    const handleSearch = useCallback(value=>{
        setSearch(value)
    },[Search])
// -------------------------Coin isEnable---------------------------
    const [isEnabledKDG, setIsEnabledKDG] = useState(coinDisplay ? coinDisplay.kdg : true);
    const [isEnabledETH, setIsEnabledETH] = useState(coinDisplay ? coinDisplay.eth : true);
    const [isEnabledTRX, setIsEnabledTRX] = useState(coinDisplay ? coinDisplay.trx : true);
    const [isEnabledUSDT, setIsEnabledUSDT] = useState(coinDisplay ? coinDisplay.usdt : true);
    const [isEnabledKNC, setIsEnabledKNC] = useState(coinDisplay ? coinDisplay.knc : true);
    const [isEnabledMCH, setIsEnabledMCH] = useState(coinDisplay ? coinDisplay.mch : true);
// ---------------------------------------------------------

// -------------------------Coin toggle---------------------------
const toggleSwitchKDG = () => setIsEnabledKDG(previousState => !previousState);
const toggleSwitchETH = () => setIsEnabledETH(previousState => !previousState);
const toggleSwitchTRX = () => setIsEnabledTRX(previousState => !previousState);
const toggleSwitchUSDT = () => setIsEnabledUSDT(previousState => !previousState);
const toggleSwitchKNC = () => setIsEnabledKNC(previousState => !previousState);
const toggleSwitchMCH = () => setIsEnabledMCH(previousState => !previousState);
// ---------------------------------------------------------

const data = [
    { isEnabled: isEnabledKDG, toggle: toggleSwitchKDG, text: 'KDG', icon: kdgicon, description: 'Kingdom Game 4.0', key: '1'},
    { isEnabled: isEnabledETH, toggle: toggleSwitchETH, text: 'ETH', icon: ethicon, description: 'Ethereum', key: '2'},
    { isEnabled: isEnabledTRX, toggle: toggleSwitchTRX, text: 'TRX',icon: trxicon, description: 'Tron', key: '3'},
    { isEnabled: isEnabledUSDT, toggle: toggleSwitchUSDT, text: 'USDT', icon: usdticon, description: 'Tether', key: '4'},
    { isEnabled: isEnabledKNC, toggle: toggleSwitchKNC, text: 'KNC', icon: kncicon, description: 'Kyber Network', key: '5'},
    { isEnabled: isEnabledMCH, toggle: toggleSwitchMCH, text: 'MCH', icon: mchicon, description: 'MeconCash', key: '6'},
]



useEffect(() => {

    dispatch(asyncSetCoin({
        kdg: isEnabledKDG, 
        eth: isEnabledETH, 
        trx: isEnabledTRX, 
        usdt: isEnabledUSDT, 
        knc: isEnabledKNC, 
        mch: isEnabledMCH
    }))

}, [isEnabledKDG, isEnabledETH, isEnabledTRX, isEnabledUSDT, isEnabledKNC, isEnabledMCH])

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
                    placeholderTextColor='rgba(255,255,255, 0.2)'
                    style={{color: '#8a8c8e',fontSize: 13,backgroundColor: '#2e394f', borderRadius: 20, paddingVertical: 10, paddingLeft: 50}} placeholder="Nhập loại Coin hoặc Địa chỉ hợp đồng"/>
                    <TouchableOpacity 
                    onPress={()=>setSearch('')}
                    style={[{position: 'absolute',  top: '50%', right:10,zIndex: 9},{transform: [{translateY: -8}]}
                    ]}>
                    <FontAwesomeIcon icon={faTimes} style={[{color:"#8a8c8e", opacity: 0}, Search !== '' && {opacity: 1}]}/>
                    </TouchableOpacity>
                </View>
                
                    
               


{
            Search ? (
            <View>
                <Text style={{color: 'rgba(241,243,244, 0.5)', fontSize: 12, padding: 10}}>Kết quả</Text>
                <FlatList
                data={data}
                renderItem={({item}) => 
                {
                    if(((item.text).toLowerCase()).startsWith(Search.toLowerCase()) || ((item.description).toLowerCase()).startsWith(Search.toLowerCase())){
                        return (
                            <View>
                            <View style={{marginTop: 17}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between',alignContent: 'center', marginTop: 10, paddingBottom: 13, borderBottomColor: '#29303d', borderBottomWidth: 1}}>
                                    <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                        <Image source={item.icon} style={{width: 37, height: 37, resizeMode: 'contain'}}/>
                                        <View style={{marginLeft: 12}}>
                                            <Text style={{color: '#fff'}}>{item.text}</Text>
                                            <Text style={{color: '#8a8c8e'}}>{item.description}</Text>
                                        </View>
                                    </View>
                                    <Switch
                                        trackColor={{ false: "#767577", true: '#FFFF99' }}
                                        thumbColor={item.isEnabled ? "#fac800" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={item.toggle}
                                        value={item.isEnabled}
                                    />
                                </View>
                            </View>
                        </View>
    
                        )         
                    }
                }
              }
                />
                
            </View>
            
            ) : (
                    <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <View>
                        <View style={{marginTop: 17}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',alignContent: 'center', marginTop: 10, paddingBottom: 13, borderBottomColor: '#29303d', borderBottomWidth: 1}}>
                                <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                    <Image source={item.icon} style={{width: 37, height: 37, resizeMode: 'contain'}}/>
                                    <View style={{marginLeft: 12}}>
                                        <Text style={{color: '#fff'}}>{item.text}</Text>
                                        <Text style={{color: '#8a8c8e'}}>{item.description}</Text>
                                    </View>
                                </View>
                                <Switch
                                    trackColor={{ false: "#767577", true: '#FFFF99' }}
                                    thumbColor={item.isEnabled ? "#fac800" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={item.toggle}
                                    value={item.isEnabled}
                                />
                            </View>
                        </View>
                    </View>

                        )}
                    />

                )
            }


            </View>
        </View>
        </>
    )
}