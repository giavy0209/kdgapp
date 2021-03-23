import React, { useCallback } from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigation} from '@react-navigation/native'

import bg from '../../assets/images/background/bg.jpg'
import scan from '../../assets/images/icons/scan.png'
import noti from '../../assets/images/icons/noti.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

import eye from '../../assets/images/icons/eye.png'
import eyeClose from '../../assets/images/icons/eyeClose.png'
import { asyncShowHideBalance } from '../../store/initLocal'
import Number from '../../components/Number'

export default function App () {
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Wallet ? state.Styles.Wallet : {})
    const text = useSelector(state => state.Languages && state.Languages.Wallet ? state.Languages.Wallet : {})
    const balances = useSelector(state => state.balances)
    const isShowBalance = useSelector(state => state.isShowBalance)

    const handleShowHideBalance = useCallback(() => {
        dispatch(asyncShowHideBalance(!isShowBalance))
    },[isShowBalance])
    return (
    <>
        <ImageBackground  source={bg} style={[styles.top]}>
            <View style={[common.container,common.flexSize]}>
                <View style={[common.row, common.center,styles.header]}>
                    <Text style={[styles.headerTitle]}>{text.king_wallet}</Text>
                    {/* <View style={[common.row,styles.headerIconRow]}>
                        <TouchableOpacity style={[styles.headerIcon]}>
                            <Image source={scan}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.headerIcon]}>
                            <Image source={noti}/>
                            <View style={[styles.notiCount, common.center]}>
                                <Text style={[styles.notiText]}>9</Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                </View>

                <View style={[common.center,common.flexSize]}>
                    <TouchableOpacity onPress={handleShowHideBalance} style={[common.center, common.row]}>
                        <Number style={[styles.totalBalance]} value={balances?.total}/>
                        <View style={[common.iconPadding]}>
                            <Image source={isShowBalance ? eye : eyeClose } />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.avaiBalanceBlock]}>
                <View style={[common.row , common.center,styles.avaiBalanceContainer,]}>
                    <View style={[styles.avaiBalanceContent , {borderLeftWidth : 0}]}>
                        <Text style={[styles.avaiBalanceContentTitle]}>{text.avai_balance}</Text>
                        <Number style={[styles.avaiBalanceContentData]} value={balances?.avai}/>
                    </View>
                    <View style={[styles.avaiBalanceContent]}>
                        <Text style={[styles.avaiBalanceContentTitle]}>{text.lock_balance}</Text>
                        <Number style={[styles.avaiBalanceContentData]} value={balances?.locked}/>
                    </View>
                </View>
            </View>
        </ImageBackground>
    </>)
}