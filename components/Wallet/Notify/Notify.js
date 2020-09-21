import React, { useState, useEffect } from 'react'
import {View, Text, Image} from 'react-native'
import { mainStyles,notifyStyles } from '../../../styles/'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Notification from './Notification'
import { storage } from '../../../helper'
import { useRoute } from '@react-navigation/native'

export default function App(){
    const [Width , setWidth] = useState(0)
    const [CreateDate, setCreateDate] = useState('')
    const route = useRoute();

    const {NewsData} = route.params ?? {}

    useEffect(async () => {
        var userinfo = await storage('_id').getItem()
        var date_time =     (new Date(userinfo.create_date)).getHours().toString()  + ":" +
                            (new Date(userinfo.create_date)).getMinutes().toString()  + ":" +
                            (new Date(userinfo.create_date)).getSeconds().toString()  + " - " +
                            (new Date(userinfo.create_date)).getDate().toString()  + "/"   +
                            ((new Date(userinfo.create_date)).getMonth() + 1).toString() + "/"   +
                            (new Date(userinfo.create_date)).getFullYear().toString()

        setCreateDate(date_time);

    },[])

    var listnoti = [
        { title: 'Chúc mừng bạn đã tham gia King Wallet', 
          content: 'Bạn đã đăng ký thành công Bạn đã đăng ký thành công. Nếu đủ điểm bạn sẽ được thưởng nhiều quà tăng. Giữ vững phong độ nhé!',
          datetime: CreateDate,
          status: true,
        },
    ]

    return (
        <>
        <View style={mainStyles.container}>
            <Header2 title="Thông báo"/>
            <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} style={notifyStyles.listNotify}>
                {NewsData.slice(0,4).map((item) =>{
                    if(item.content_vi !== undefined && item.meta_vi !== undefined){
                       return (
                            <Notification
                                title={item.title_vi}
                                content={item.meta_vi  + '...'}
                                datetime={
                                    (new Date(item.create_date)).getHours().toString()  + ":" +
                                    (new Date(item.create_date)).getMinutes().toString()  + ":" +
                                    (new Date(item.create_date)).getSeconds().toString()  + " - " +
                                    (new Date(item.create_date)).getDate().toString()  + "/"   +
                                    ((new Date(item.create_date)).getMonth() + 1).toString() + "/"   +
                                    (new Date(item.create_date)).getFullYear().toString()
                                }
                                status={false}
                    
                        />

                        )
                    }


                })}
                {listnoti.map((item) => (
                    <Notification
                        title={item.title}
                        content={item.content}
                        datetime={item.datetime}
                    />

                ))}
              
            </View>
        </View>
        </>
    )
}