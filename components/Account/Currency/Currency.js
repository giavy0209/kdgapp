import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import {asyncSetCurrency} from '../../../store/actions'
import { checkLanguage } from '../../../helper'
export default function App(){
    const dispatch = useDispatch()
    const type = useSelector(state => state.currency)
    const language = useSelector(state => state.language)
    return (
        <>
            <Header2 title={checkLanguage({vi: 'Loại tiền tệ', en: 'Currency'},language)}/>
            <View style={[mainStyles.container,{paddingHorizontal: 15}]}>
                <TouchableOpacity onPress={()=>dispatch(asyncSetCurrency(0))} style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 12}}>
                    <Text style={{fontSize: 14, color: type === 0 ? '#fac800' : '#ddd9d8' }}>{checkLanguage({vi: 'USD (Mặc định)', en: 'USD (Default)'},language)}</Text>
                    {type === 0 && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(asyncSetCurrency(1))} style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 12, borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <Text style={{fontSize: 14, color: type === 1 ? '#fac800' : '#ddd9d8' }}>VND</Text>
                    {type === 1 && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(asyncSetCurrency(2))} style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 12, borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <Text style={{fontSize: 14, color: type === 2 ? '#fac800' : '#ddd9d8' }}>CNY</Text>
                    {type === 2 && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                </TouchableOpacity>
            </View>
        </>
    )
}

