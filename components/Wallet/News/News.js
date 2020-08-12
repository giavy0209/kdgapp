import React from 'react'
import {View, Text, Image} from 'react-native'
import { mainStyles } from '../../../styles/'
import {Header2} from '../../Header'
import postImage from '../../../assets/images/post-image.jpg'
export default function App(){

    return (
        <>
        <View style={mainStyles.container}>
            <Header2 title="Tin tức"/>
            <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} style={{marginHorizontal: 15,}}>
                <View style={{marginTop:10,flexDirection: 'column'}}>
                    <View>
                        <Image source={postImage} style={{width: '100%',resizeMode:'cover',backgroundColor: '#fff', borderTopLeftRadius: 5,borderTopRightRadius: 5, overflow: 'hidden'}}/>
                        <View style={{backgroundColor: '#1d2436',padding: 15, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                            <Text style={{color: '#fac800', fontFamily: 'Roboto_500Medium'}}>Tháng 8 bùng nổ với chính sách Hoàn đậm 50%</Text>
                            <Text style={{color: '#8a8c8e'}}>Quy định mới về kinh doanh vận tải bằng xe ô tô; tung tin giả mạo, sai sự thật trên mạng xã hội bị phạt đến 20 triệu đồng; ưu đãi trong lựa chọn nhà đầu tư thực hiện ...</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </>
    )
}