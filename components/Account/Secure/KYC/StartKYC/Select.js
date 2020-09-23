import React, { useState, useCallback } from 'react'

import { View,Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const checkSelect = function (type,selected){
    if(type === 0) return {title: 'QUỐC GIA', list: [
        { id: 0, name: 'Việt Nam' },
        { id: 1, name: 'Quốc gia khác' }
    ]}
    if(type === 1) return {title: 'LOẠI GIẤY TỜ', list: [
        { id: 0, name: 'CMND/Bằng lái xe' },
        { id: 2, name: 'Hộ chiếu' }
    ]}
    if(type === 2) return {title: 'GIỚI TÍNH', list: [     
        { id: 0, name: 'Nam' },
        { id: 1, name: 'Nữ' }
    ]}

    return null
}

export default function App({
    SelectType,
    setSelectType,
    SelectValue,
    setSelectValue
}){
    const screenHeight = useSelector(state=>state.height)
    const screenWidth = useSelector(state=>state.width)

    const [Select, setSelect] = useState({...checkSelect(SelectType),selected: SelectValue})

    const handleSelect = useCallback((select)=>{
        setSelect({...Select, selected:select});
        setSelectType(null)
        setSelectValue(select)
    },[Select,setSelectType])
    return(
        <>
            <View
            style={[{flex: 1,flexDirection: 'column',justifyContent: 'flex-end',position:'absolute',pointerEvent: 'none',width:screenWidth,height: screenHeight, zIndex: 99}]}
            >
                <TouchableOpacity onPress={()=>setSelectType(null)} style={{backgroundColor: '#000', opacity: .6,flex: 1}}></TouchableOpacity>
                <View>
                    <Text style={{backgroundColor: '#202b3f', color: '#8a8c8e', fontSize: 13, paddingVertical: 13, paddingHorizontal: 15}}>{Select.title} </Text>
                    {
                    Select.list.map(select=>{
                        return(
                            <>
                            <TouchableOpacity onPress={()=>handleSelect(select.id)} style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',paddingVertical: 13, paddingHorizontal: 15,}}>
                                <Text style={Select.selected === select.id ? {color:'#fac800'} :{ color: '#ddd9d8'}}> {select.name} </Text>
                                {Select.selected === select && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                            </TouchableOpacity>
                            </>
                        )
                    })
                    }
                </View>
            </View>
        </>
    )
}