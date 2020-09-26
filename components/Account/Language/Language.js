import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { asyncSetLanguage } from '../../../store/actions'
import { checkLanguage } from '../../../helper'

export default function App(){
    const dispatch = useDispatch()
    const type = useSelector(state => state.language)
    const language = useSelector(state => state.language)
    return (
        <>
            <Header2 title={checkLanguage({vi: 'Ngôn ngữ', en: 'Language'},language)}/>
            <View style={[mainStyles.container,{paddingHorizontal: 15}]}>
                <TouchableOpacity onPress={()=>dispatch(asyncSetLanguage(0))} style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 12}}>
                    <Text style={{fontSize: 14, color: type === 0 ? '#fac800' : '#ddd9d8' }}>Tiếng Việt</Text>
                    {type === 0 && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(asyncSetLanguage(1))} style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 12, borderTopColor: '#3b3f49', borderTopWidth: 1}}>
                    <Text style={{fontSize: 14, color: type === 1 ? '#fac800' : '#ddd9d8' }}>English</Text>
                    {type === 1 && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                </TouchableOpacity>
            </View>
        </>
    )
}