import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { useSelector } from 'react-redux'
import bg from '../../../assets/images/spinbg.png'
import calAPI from '../../../axios'
import { checkLanguage } from '../../../helper'
import { Popup } from '../../Popup'
import html from './WebviewHTML'

import spintextvi from '../../../assets/images/spintextvi.png'
import kdgcoin from '../../../assets/images/kdg-coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
const {width,height} = Dimensions.get('screen')
var getSpinRate = async() =>{

    var res = (await (await calAPI()).get(`/setting`)).data
    const setting = {}
    res.forEach(el => {
        setting[el.key] = el.data
    })
    var spin_rate= setting.luckyspin

    var listRate = []
    var strBg = 'bg_color_'
    var strColor = 'text_color_'
    var strTextVi = 'text_vi_'
    var strTextEn = 'text_en_'
    var strReward = 'kdg_reward_'
    for (let index = 0; true; index++) {
        var reward = strReward + index;
        var bg = strBg + index;
        var color = strColor + index;
        var vi = strTextVi + index;
        var en = strTextEn + index;
        if(!spin_rate[reward] ||!spin_rate[bg] ||!spin_rate[color] ||!spin_rate[vi] ||!spin_rate[en]) {
            return listRate
        }
        var obj = {
            reward:spin_rate[reward],
            bg : spin_rate[bg],
            color : spin_rate[color],
            vi : spin_rate[vi],
            en : spin_rate[en],
        }
        listRate.push(obj)
    }
}



const styles = StyleSheet.create({
    container : {
        
    },
    containerText : {
        height : height/2 - width /2,
        width : '100%',
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        position : 'relative'
    }, 
    text : {
        resizeMode : 'contain',
        width : '60%'
    },
    backBtn : {
        position : 'absolute',
        width: 31,
        height: 31,
        top : 35,
        left : 15,
        backgroundColor: '#fac800',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color :'#fff'
    },
    webview : {
        width : height >= width ? width : height,
        height: height >= width ? width : height,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    infoBlock : {
        display : 'flex',
        flexDirection : 'row',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 33
    },
    infoBlockText : {
        color : '#ddd9d8',
        fontSize : 16,
        textAlign : 'center',
        width : '100%',
        marginTop : 10
    },
    totalKDGReward : {
        width : '50%',
        paddingRight : 7
    },
    totalKDGRewardTop : {
        borderRadius : 5,
        backgroundColor : 'rgba(250 , 200 , 0 , .37)',
        borderWidth : 2,
        borderColor : '#fac800',
        position : 'relative',
        height: 38,
        paddingRight : 22,
        alignItems : 'center',
        justifyContent : 'center'
    },
    totalKDGRewardTopText : {
        fontSize: 20,
        fontWeight : '600',
        textAlign : 'right',
        color : '#fff',
        width : '100%'
    },
    
    totalKDGRewardTopImg :{
        position : 'absolute',
        bottom : 0,
        left : 0
    },
    fee : {
        width : '50%',
        paddingLeft : 7
    },
    feeTop : {
        borderWidth : 2,
        borderColor: '#fac800',
        height: 38,
        backgroundColor: 'rgba(0,0,0,.37)',
        borderRadius: 5,
        alignItems : 'center',
        justifyContent : 'center'
    },
    feeTopText : {
        fontSize : 14,
        color : '#fff',
        textAlign : 'center',
        width : '100%'
    }
})
export default function App ({setBackGround}) {
    const webview = useRef()
    const navigation = useNavigation()
    useMemo(()=>{
        setBackGround(bg)
    },[])

    const [isModalVisible,setModalVisible] = useState(false)
    const [ModalStyle,setModalStyle] = useState('')
    const [ModalMess,setModalMess] = useState('')

    const language = useSelector(state => state.language)
    const user = useSelector(state => state.userInfo)

    const toggleModal = useCallback(() => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
    },[isModalVisible])
    const message = useMemo(()=>{
        return {
            success : (msg) => {
                setModalMess(msg)
                setModalStyle('success')
                toggleModal()
            },
            error : (msg) => {
                setModalMess(msg)
                setModalStyle('error')
                toggleModal()
            }
        }
    },[])

    const inject = useCallback(async ()=>{
        var spinInfo = await getSpinRate()
        webview.current.injectJavaScript(`window.spinInfo = ${JSON.stringify(spinInfo)}`)
    },[])

    const injectValue = useCallback(async ()=>{
        var res = (await (await calAPI()).post('/api/get_lucky_spin', { userId: user._id})).data
        console.log(res);
        if(res.status === 1){
            webview.current.injectJavaScript(`window.spinValue = ${res.spin_value}`)
        }
        if(res.status === 0) {
            message.error(checkLanguage({vi: 'Bạn không đủ KDG Reward', en : 'You dont have enough KDG Reward'}, language))
        }
    },[user])
    return (
        <>
            <View style={styles.container}>
            <Popup type={ModalStyle} title={ModalMess} isModalVisible={isModalVisible}/>
            <View style={styles.containerText}>
                <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={styles.backBtn}>
                    <FontAwesomeIcon color='#fff' icon={faChevronLeft} />
                </TouchableOpacity>
                <Image style={styles.text} source={spintextvi} />
            </View>
            <WebView
                ref={ref => webview.current = ref}
                style={styles.webview}
                originWhitelist={['*']}
                source={{ html}}
                onLoad={inject}
                onMessage={e => {
                    if(e.nativeEvent.data === 'req-spin-value'){
                        injectValue()
                    }
                }}
            />
            <View style={styles.infoBlock}>
                <View style={styles.totalKDGReward}>
                    <View style={styles.totalKDGRewardTop}>
                        <Image style={styles.totalKDGRewardTopImg} source={kdgcoin}/>
                        <Text style={styles.totalKDGRewardTopText}> {user.kdg_reward ? user.kdg_reward : 0} </Text>
                    </View>
                    <Text style={styles.infoBlockText}>
                        {checkLanguage({vi : "Số KDG Reward", en: 'Total KDG Reward'},language)}
                    </Text>
                </View>  
                <View style={styles.fee}>
                    <View style={styles.feeTop}> 
                        <Text style={styles.feeTopText}> 2 KDG Reward/{checkLanguage({vi : "lượt", en: 'turn'},language)} </Text>
                    </View>
                    <Text style={styles.infoBlockText}>
                        {checkLanguage({vi : "Phí", en: "Fee"},language)}
                    </Text>
                </View>
            </View>
            </View>
        </>
    ) 
}

