import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity,Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {Header2} from '../../../../../Header'
import {mainStyles} from '../../../../../../styles'

import font from '../../../../../../assets/images/fontID.png'
import back from '../../../../../../assets/images/backID.png'
import selfy from '../../../../../../assets/images/selfy.png'
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
export default function App(){

    const screenHeight = useSelector(state => state.height)
    const [Height, setHeight] =useState(0)
    const [ContentHeight, setContentHeight] =useState(0)
    const [ButtonHeight, setButtonHeight] =useState(0)

    const [ImageFront, setImageFront] = useState(null)
    const [ImageBack, setImageBack] = useState(null)
    const [ImageSelfy, setImageSelfy] = useState(null)

    const pickImage = useCallback(async (type) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3,2],
                quality: 1,
                base64: true,
            });
            if (!result.cancelled) {
                if(type === 'front') setImageFront(result.base64)
                if(type === 'back') setImageBack(result.base64)
                if(type === 'self') setImageSelfy(result.base64)
            }
        } catch (E) {
            console.log(E);
        }
    },[])

    const getPermissionAsync = useCallback(async (type) => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                Alert.alert('Tải hình','Bạn cần cấp quyền để ứng dụng tải hình lên');
            }else pickImage(type)
        }else pickImage(type)
    }, []);

    const handleNext = useCallback(()=>{
        if(ImageFront && ImageBack && ImageSelfy){
            //some api here
            Alert.alert('Xác Minh Danh Tính', 'Bạn đã cập nhập thông tin xác minh danh tínhthành công')
        }
    },[ImageFront, ImageBack,ImageSelfy])
    return (
        <>
            <Header2 setHeight={setHeight} title="Tải lên hình ảnh"/>
            <View 
            onLayout={e=>setContentHeight(e.nativeEvent.layout.height)}
            style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 10,}]}>
                <Text style={[mainStyles.color1, mainStyles.fontsize13]}>Vui lòng sử dụng định dạng JPG, JPEG, PNG. Kích thước tệp tối đa = 2MB</Text>
                <Text style={[mainStyles.color1, mainStyles.fontsize13]}>Để đảm bảo quá trình xác minh được thuận tiện, vui lòng không che hoặc làm nhòe ảnh.</Text>

                <View style={{flexDirection:'row', alignItems: 'center', marginTop: 33, justifyContent:'space-between', position: 'relative'}}>
                    {ImageFront && <TouchableOpacity 
                    onPress={()=>setImageFront(null)}
                    style={{position:'absolute', top: -7 , right: -3, width:16, height: 16, borderRadius: 25,backgroundColor: '#8a8c8e',zIndex: 99}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TouchableOpacity>}
                    <Text style={[mainStyles.fontsize12, mainStyles.color3, {width: '60%'}]}>1. Mặt trước CMND/Bằng lái xe</Text>
                    <TouchableOpacity disabled={ImageFront} onPress={()=>getPermissionAsync('front')} style={{width:131, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[{marginTop: 15,},ImageFront && {width: 131, height: 81,marginTop: 0,borderRadius: 8}]} source={ImageFront ? {uri : 'data:image/png;base64,'+ ImageFront} : font}/>
                        {!ImageFront &&<Text style={{marginTop: 8, color: '#005cfc', fontSize: 11,paddingBottom: 4, textDecorationLine: 'underline', textDecorationColor: '#005cfc', textAlign: 'center'}}>Nhấn vào đây để tải lên ảnh mặt trước</Text>}
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginTop: 33, justifyContent:'space-between', position: 'relative'}}>
                    {ImageBack && <TouchableOpacity 
                    onPress={()=>setImageBack(null)}
                    style={{position:'absolute', top: -7 , right: -3, width:16, height: 16, borderRadius: 25,backgroundColor: '#8a8c8e',zIndex: 99}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TouchableOpacity>}
                    <Text style={[mainStyles.fontsize12, mainStyles.color3, {width: '60%'}]}>2. Mặt sau CMND/Bằng lái xe</Text>
                    <TouchableOpacity disabled={ImageBack} onPress={()=>getPermissionAsync('back')} style={{width:131, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[{marginTop: 15,},ImageBack && {width: 131, height: 81,marginTop: 0,borderRadius: 8}]} source={ImageBack ? {uri : 'data:image/png;base64,'+ ImageBack} : back}/>
                        {!ImageBack &&<Text style={{marginTop: 8, color: '#005cfc', fontSize: 11,paddingBottom: 4, textDecorationLine: 'underline', textDecorationColor: '#005cfc', textAlign: 'center'}}>Nhấn vào đây để tải lên ảnh mặt sau</Text>}
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginTop: 33, justifyContent:'space-between', position: 'relative'}}>
                    {ImageSelfy && <TouchableOpacity 
                    onPress={()=>setImageSelfy(null)}
                    style={{position:'absolute', top: -7 , right: -3, width:16, height: 16, borderRadius: 25,backgroundColor: '#8a8c8e',zIndex: 99}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TouchableOpacity>}
                    <Text style={[mainStyles.fontsize12, mainStyles.color3, {width: '60%'}]}>3. Ảnh có mặt của bạn chụp chung với mặt trước CMND/Bằng lái xe và ngày tháng năm hiện tại</Text>
                    <TouchableOpacity disabled={ImageSelfy} onPress={()=>getPermissionAsync('self')} style={{width:131, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[{marginTop: 15,},ImageSelfy && {width: 131, height: 81,marginTop: 0,borderRadius: 8}]} source={ImageSelfy ? {uri : 'data:image/png;base64,'+ ImageSelfy} : selfy}/>
                        {!ImageSelfy &&<Text style={{marginTop: 8, color: '#005cfc', fontSize: 11,paddingBottom: 4, textDecorationLine: 'underline', textDecorationColor: '#005cfc', textAlign: 'center'}}>Nhấn vào đây để tải lên</Text>}
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity 
            onPress={handleNext}
            onLayout={e => setButtonHeight(e.nativeEvent.layout.height)}
            style={[{marginHorizontal: 11 , flex: 1,height: 47, justifyContent: 'center', alignItems: 'center',borderRadius: 50, overflow: 'hidden'},
            {marginTop: screenHeight - ContentHeight - Height - ButtonHeight - 22}
            ]}>
                <LinearGradient
                start={[0,1]}
                end={[1,0]}
                colors={['#a47b00','#edda8b', '#d6b039', '#edda8b', '#a47b00']}
                style={{width: '100%',height: 47, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={{color: '#111b2d', fontSize: 14}}>Tiếp theo</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}