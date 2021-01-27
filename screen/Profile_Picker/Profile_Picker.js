import React, { useEffect } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native'
export default function App ({setHeaderTitle}) {
    const navigation = useNavigation()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Me ? state.Styles.Me : {})
    const text = useSelector(state => state.Languages && state.Languages.Me ? state.Languages.Me : {})
    const info = useSelector(state => state.info)
    useEffect(() => {
        setHeaderTitle(text.profile)
    }, [text]);
    return (
        <>
        <View style={[common.container]}>
            <View style={[common.bgo(), common.radius]}>
                <TouchableOpacity style={common.pd}>
                    <Text style={[common.textMain]}>{text.profile}</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={info.kyc.status !== 0 && info.kyc.status !== 3} onPress={() => navigation.push('KYC')} style={[common.pd , common.row , {justifyContent : 'space-between'}]}>
                    <Text style={[common.textMain]}>{text.kyc}</Text>
                    <Text style={[common.textMain]}>
                        {
                            info && text[`kyc_status${info.kyc.status}`]
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}