import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import bg from '../../assets/images/background/bg.jpg'
import TextNumber from '../../components/Number'
export default function App ({Stake, Profit}) {
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Staking ? state.Styles.Staking : {})
    const text = useSelector(state => state.Languages && state.Languages.Staking ? state.Languages.Staking : {})

    return (
    <>
        <View style={{borderBottomLeftRadius : 15, borderBottomRightRadius : 15 , overflow: 'hidden'}}>
            <ImageBackground  source={bg} style={[styles.top]}>
                <View style={[common.container]}>
                    <View style={[common.row, common.center,styles.header]}>
                        <Text style={[styles.headerTitle]}>{text.staking}</Text>
                    </View>
                    <Text style={[common.textTitle , common.font16]}>{text.staking_des}</Text>
                    <View style={[common.row_col(-8), common.mt]}>
                        <View style={[common.column(2 , 0 , 8)]}>
                            <View style={[styles.totalBlock]}>
                                <Text style={[common.textTitle, common.font18]}>~ <TextNumber value={Stake} showCurrency={false}/> USDT</Text>
                                <Text style={[common.textMain]}>{text.sum}</Text>
                            </View>
                        </View>
                        <View style={[common.column(2 , 0 , 8)]}>
                            <View style={[styles.totalBlock]}>
                                <Text style={[common.textTitle, common.font18]}>~ <TextNumber value={Profit} showCurrency={false}/> USDT</Text>
                                <Text style={[common.textMain]}>{text.profit}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    </>)
}