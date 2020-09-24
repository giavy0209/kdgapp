import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import bg from '../../../assets/images/spinbg.png'
import calAPI from '../../../axios'
import html from './WebviewHTML'
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
        paddingTop : height/2 - width /2
    },
    webview : {
        width : height >= width ? width : height,
        height: height >= width ? width : height,
        backgroundColor: 'rgba(0,0,0,.3)',
    }
})
export default function App ({setBackGround}) {
    const webview = useRef()
    useMemo(()=>{
        setBackGround(bg)
    },[])

    const inject = useCallback(async ()=>{
        var spinInfo = await getSpinRate()
        webview.current.injectJavaScript(`window.spinInfo = ${JSON.stringify(spinInfo)}`)
    },[])
    return (
        <>
            <View style={styles.container}>
            <WebView
                ref={ref => webview.current = ref}
                style={styles.webview}
                originWhitelist={['*']}
                source={{ html}}
                onLoad={inject}
            />
            </View>
        </>
    ) 
}

