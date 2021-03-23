import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, View,TouchableOpacity , Clipboard } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../../const'
import frame from '../../assets/images/icons/frame.png'
import { asyncHandleToast } from '../../store/initLocal'
import QRCode from 'react-native-qrcode-svg'
import copy from '../../assets/images/icons/copy.png'
export default function App({setHeaderTitle,...prop}) {
    const {params} = useRoute()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})

    const [QRSize, setQRSize] = useState(0)

    useEffect(() => {
        setHeaderTitle(`${text.deposit} ${params.coin.code}`)
    },[setHeaderTitle,text ,params])

    const handleCopy = useCallback((value) => {
        Clipboard.setString(value)
        dispatch(asyncHandleToast(text.copied , 1))
    },[text])
    return (
        <>
        <View style={[common.container,styles.withdraw]}>
            <View style={styles.withdrawCoinInfo}>
                <View style={[common.fullSizeAbsolute , common.background,{opacity : .4}]}></View>
                <View style={[common.row,common.center , {padding : 15 , justifyContent : 'space-between'}]}>
                    <View style={[common.row, common.center,styles.withdrawCoinInfoLeft]}>
                        <Image style={{width : 35, height : 35, resizeMode : 'contain'}} source={{uri : `${baseURL}${params.coin.icon.path}`}}/>
                        <View>
                            <Text style={common.textTitle}> {params.coin.name} </Text>
                            <Text style={[common.text , common.font14]}> {params.coin.name} </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[common.center , common.mt]}>
                <Text style={[common.text,common.font14]}>{text.scan}</Text>
                <View
                style={{
                    position : 'relative',
                    width : '86%',
                }}
                >
                    <View style={{
                        paddingTop : '100%',
                        width : '100%',
                    }}></View>
                    <Image source={frame} style={{
                        position : 'absolute',
                        top : 0,
                        left : 0,
                        width : '100%',
                        height : '100%',
                        resizeMode : 'contain'
                    }}/>

                    <View
                    style={{
                        position : 'absolute',
                        top : 0,
                        left : 0,
                        width : '100%',
                        height : '100%',
                        justifyContent : 'center',
                        alignItems : 'center'
                    }}
                    onLayout={e => setQRSize(e.nativeEvent.layout.width)}
                    >
                        <QRCode size={QRSize * 0.8} value={params.wallet.address}/>
                    </View>

                </View>
                <Text style={[common.text,common.font14]}>{text.copy}</Text>
                <TouchableOpacity onPress={() => handleCopy(params.wallet.address)} style={[common.row, common.center , {alignItems : 'flex-start'}]}>
                    <Text style={[common.textTitle,common.font18 , {textAlign : 'center' , width : '80%'}]}>{params.wallet.address}</Text>
                    <Image source={copy} style={[common.ml]}/>
                </TouchableOpacity>
            </View>
            
        </View>
        </>
    )
}