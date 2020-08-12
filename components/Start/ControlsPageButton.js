import React, { useState, useCallback } from 'react';
import {Text,TouchableOpacity } from 'react-native';
export default function Page1({ScreenWidth,ActivePage,count}){
    const [VerWidth,setVerWidth] = useState(0)
    return(
        <>
        <TouchableOpacity onPress={()=>{count((3 - ActivePage) * 300,3)}} style={[{position: 'absolute', bottom: 36, left: 32,}, 
        ActivePage === 3 && {transform: [{ scale: 0 }]}
    ]
    }
        >
            <Text style={{color: '#8a8c8e', fontSize: 14}}>BỎ QUA</Text>
        </TouchableOpacity>
        <Text 
        onLayout={e => setVerWidth(e.nativeEvent.layout.width)}
        style={{position: 'absolute', bottom: 36, left: ScreenWidth / 2 - VerWidth / 2, color: '#fff', fontSize: 12}}>Ver 1.0</Text>
        <TouchableOpacity onPress={()=>count(300, ActivePage + 1)} style={[{position: 'absolute', bottom: 36, right: 32},
        ActivePage === 3 && {transform: [{ scale: 0 }]}
    ]
    }
        >
            <Text style={{color: '#fac800', fontSize: 14}}>TIẾP THEO</Text>
        </TouchableOpacity>
        </>
    )
}