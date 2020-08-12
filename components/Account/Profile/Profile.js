import React, { useCallback, useState } from 'react'
import { View, Text, Image, TouchableOpacity,Alert} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Header2 } from '../../Header'
import { mainStyles, accountStyle } from '../../../styles'
import defaultAvata from '../../../assets/images/default-avata.webp'

import {asyncLogout} from '../../../store/actions'

export default function App() {
    const dispatch = useDispatch()
    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const [ButtonHeight, setButtonHeight] = useState(0)
    const screenHeight = useSelector(state=>state.height)

    const [BlockWidth, setBlockWidth] = useState(0)
    const [ImageWidth, setImageWidth] = useState(0)
    const [image, setImage] = useState(defaultAvata)

    const getPermissionAsync = useCallback(async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                Alert.alert('Tải hình','Bạn cần cấp quyền để ứng dụng tải hình lên');
            }else pickImage()
        }else pickImage()
    }, []);

    const pickImage = useCallback(async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result);
            }
        } catch (E) {
            console.log(E);
        }
    },[])

    const handleLogout = useCallback(()=>{
        dispatch(asyncLogout())
        .then(()=>{
        })
    },[])

    return (
        <>
            <Header2 setHeight={setHeight} title="Hồ sơ cá nhân" />
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 36, paddingTop: 78,}]}>
                <View
                onLayout={e => setBlockWidth(e.nativeEvent.layout.width)}
                style={{paddingHorizontal: 19, paddingTop: 40, paddingBottom: 18, flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>
                    <View style={[accountStyle.maskOpacity, {borderRadius: 8}]}></View>
                    <Text style={{color: '#ddd9d8'}}>Email</Text>
                    <Text style={{color: '#8a8c8e'}}>luongthang9***@gmail.com</Text>

                    <TouchableOpacity
                    onLayout={e => setImageWidth(e.nativeEvent.layout.width)}
                    onPress={getPermissionAsync}
                    style={{position: 'absolute', top: -53, alignSelf: 'center',left: BlockWidth / 2 - ImageWidth/2 ,zIndex: 999}}>
                        <View style={{width: 66, height: 66, position: 'relative', borderRadius: 50, overflow: 'hidden'}}>
                            <Image style={{width: 66, height: 66,resizeMode: 'contain'}} source={image.uri ? {uri: image.uri} : image}/>
                        </View>
                        <FontAwesomeIcon color="#edcd6d" size={20} style={{position: 'absolute', bottom: -2, right: 0}} icon={faCamera} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity 
            onPress={handleLogout}
            style={{backgroundColor: '#283349', marginTop: screenHeight - Height - ContentHeight - ButtonHeight}} onLayout={e=>setButtonHeight(e.nativeEvent.layout.height)}>
                <Text style={{textAlign: 'center', color: '#fac800', fontSize: 14, padding: 20}}>Đăng Xuất</Text>
            </TouchableOpacity>
        </>
    )
}