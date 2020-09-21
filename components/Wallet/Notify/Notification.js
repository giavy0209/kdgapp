import React, { useState, useEffect } from 'react'
import {View, Text, Image} from 'react-native'
import { mainStyles,notifyStyles } from '../../../styles'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
export default function Notification({status, title, content, datetime}){
    const [Width , setWidth] = useState(0)



    return (
        <>

            
                <View style={notifyStyles.notify}>
                    <Image source={logo} style={{width: 25,padding: 0, height: 18 ,alignSelf: 'flex-start',resizeMode: 'contain'}} />
                    <View style={{marginLeft: 8, width: Width - 25 - 8 ,borderBottomWidth:1,borderBottomColor: '#29303d', paddingBottom:12}}>
                        <Text style={{includeFontPadding: false, color: '#fff', fontSize: 14,  paddingRight: 10}}>{title}</Text>
                        <Text style={{color: '#8a8c8e', fontSize: 13, paddingRight: 40}}>{content}</Text>
                        <Text style={{color: '#fac800', fontSize: 11, marginTop:7, paddingRight: 10}}>{datetime}</Text>
                    </View>
                     { status === true ? <FontAwesomeIcon  style={{position: 'absolute', right: 20}} color='#FFF862' size={8} icon={faCircle}/> 
                       : null
                     }
                </View>

           
               
       
        </>
    )
}