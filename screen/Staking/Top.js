import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import bg from '../../assets/images/background/bg.jpg'
import Button from '../../components/Button'
export default function App ({Tab, setTab}) {
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Staking ? state.Styles.Staking : {})
    const text = useSelector(state => state.Languages && state.Languages.Staking ? state.Languages.Staking : {})

    return (
    <>
        <View style={{borderBottomLeftRadius : 15, borderBottomRightRadius : 15 , overflow: 'hidden'}}>
            <ImageBackground  source={bg} style={[styles.top]}>
                <View style={[common.container,common.flexSize]}>
                    <View style={[common.row, common.center,styles.header]}>
                        <Text style={[styles.headerTitle]}>{text.staking}</Text>
                    </View>
                    <Text style={[common.textTitle , common.font16]}>{text.staking_des}</Text>
                    
                    <View style={[common.row , common.mt]}>
                        <Button 
                        text={text.staking}
                        disableLoading={true}
                        transparent={Tab !== 1}
                        onPress={() => setTab(1)}
                        style={{
                            Linear: common.pd ,
                            Text : common.font16
                        }}
                        />
                        <Button 
                        text={text.share}
                        disableLoading={true}
                        transparent={Tab !== 2}
                        onPress={() => setTab(2)}
                        style={{
                            Touchable : common.ml ,
                            Linear: common.pd ,
                            Text : common.font16
                        }}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    </>)
}