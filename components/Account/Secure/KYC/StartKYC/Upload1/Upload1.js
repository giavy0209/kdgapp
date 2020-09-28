import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity,Image, Alert, Platform } from 'react-native'
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
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native'
import calAPI from '../../../../../../axios'
import { storage, checkLanguage } from '../../../../../../helper'
import { asyncSecureStatus, asyncUpdateUser } from '../../../../../../store/actions';

import FormData from 'form-data';
export default function App(){

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { SelectedID, SelectedCountry, SelectedSex, Name, IDNumber } = useRoute().params;
    const language = useSelector(state => state.language)

    const display = useSelector(state => state.display)
    const screenHeight = useSelector(state => state.height)
    const [Height, setHeight] =useState(0)
    const [ContentHeight, setContentHeight] =useState(0)
    const [ButtonHeight, setButtonHeight] =useState(0)

    const [ImageFront, setImageFront] = useState(null)
    const [ImageBack, setImageBack] = useState(null)
    const [ImageSelfy, setImageSelfy] = useState(null)


    const secureStatus = useSelector(state => state.secstatus)

    const pickImage = useCallback(async (type) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3,2],
                quality: 1,
                base64: false,
            });
            if (!result.cancelled) {
                
                if(type === 'front') setImageFront(result)
                if(type === 'back') setImageBack(result)
                if(type === 'self') setImageSelfy(result)
            }
        } catch (E) {
            console.log(E);
        }
    },[])

    const getPermissionAsync = useCallback(async (type) => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                Alert.alert(
                    checkLanguage({vi: 'Tải hình', en: `Upload photo`},language),
                    checkLanguage({vi: 'Bạn cần cấp quyền để ứng dụng tải hình lên', en: `You need permission for the app to upload photo`},language)
                );
            }else pickImage(type)
        }else pickImage(type)
    }, []);

    const handleNext = useCallback(async ()=>{
        var userinfo = await storage('_id').getItem();
        if(ImageFront && ImageBack && ImageSelfy){
        
                const arrayUpload = []
                const uploadFront = new FormData()
                const extFront = ImageFront.uri.substr(ImageFront.uri.lastIndexOf('.') + 1);
                const fileFront = {
                    uri : Platform.OS === 'android' ? ImageFront.uri : ImageFront.uri.replace ('file://' , ''),
                    type: 'image/png',
                    name: `photo.${extFront}`,
                }
                uploadFront.append('file', fileFront)
                uploadFront.append('userId' , userinfo._id)
                arrayUpload.push((await calAPI()).post('/api/upload_kyc_image', uploadFront))

                const extSelf = ImageFront.uri.substr(ImageFront.uri.lastIndexOf('.') + 1);
                const fileSelf = {
                    uri : Platform.OS === 'android' ? ImageSelfy.uri : ImageSelfy.uri.replace ('file://' , ''),
                    type: 'image/png',
                    name: `photo.${extSelf}`,
                }
                const uploadSelf = new FormData()
                uploadSelf.append('file', fileSelf)
                uploadSelf.append('userId' , userinfo._id)
                arrayUpload.push((await calAPI()).post('/api/upload_kyc_image', uploadSelf))

                if(SelectedID === 0){
                    const extBack = ImageFront.uri.substr(ImageFront.uri.lastIndexOf('.') + 1);
                    const fileBack = {
                        uri : Platform.OS === 'android' ? ImageBack.uri : ImageBack.uri.replace ('file://' , ''),
                        type: 'image/png',
                        name: `photo.${extBack}`,
                    }

                    const uploadBack = new FormData()
                    uploadBack.append('file',fileBack)
                    uploadBack.append('userId' , userinfo._id)
                    arrayUpload.push((await calAPI()).post('/api/upload_kyc_image', uploadBack))
                }
                try {
                    var res = await Promise.all(arrayUpload)
                    var isUploadOK = true
                    res.forEach(el=>{
                        if(el.data.status !== 1) isUploadOK = false
                    })

                    if(isUploadOK === false) {
                        Alert.alert(
                            checkLanguage({vi: 'Lỗi', en: `Error`},language),
                            checkLanguage({vi: 'Tải hình không thành công', en: `Upload photo failed`},language)
                          )
                        return
                    }
                    if(isUploadOK === true){

                        var kycInfo = {
                            kyc_country : SelectedCountry ===0 ? 'VN' : 'Others',
                            kyc_number : IDNumber.toString(),
                            kyc_name : Name,
                            kyc : '2',
                            id : userinfo._id,
                        }
                        dispatch(asyncUpdateUser(kycInfo))
                        .then((res)=>{
                            console.log(res)
                            if(res.status === 1){
                                dispatch(asyncSecureStatus({
                                    ...secureStatus,
                                    kyc: '2'
                
                                }))
                                Alert.alert(
                                    checkLanguage({vi: 'Thông báo', en: `Notification`},language),
                                    checkLanguage({vi: 'Đã nộp KYC, vui lòng chờ duyệt', en: `KYC is submitted, please wait for approval`},language)
                                )
                                navigation.navigate('Secure')
                                return
                            }
                            if(res.status === 100){
                                Alert.alert(
                                    checkLanguage({vi: 'Lỗi', en: `Error`},language),
                                    checkLanguage({vi: 'Số chứng minh / băng lái xe đã được sử dụng cho tài khoản khác', en: `ID card / Driver's license has been used for another account`},language)
                                )
                                return
                            }
                                Alert.alert(
                                    checkLanguage({vi: 'Lỗi', en: `Error`},language),
                                    checkLanguage({vi: 'KYC không thành công', en: `KYC failed`},language)
                                )
                        })
                        .catch(console.log)
            
                        // if(resUpdate.status === 1){
                        //     Alert.alert(
                        //         'Thành công',
                        //         'Gửi thành công vui lòng chờ xét duyệt'
                        //     )
                        // }else if (resUpdate.status === 100){
                        //     Alert.alert(
                        //         'Lỗi',
                        //         'Số chứng minh/passport đã được sử dụng cho tài khoản khác'
                        //     )
                        // }else{
                        //     Alert.alert(
                        //         'Lỗi',
                        //         'Gửi KYC không thành công, vui lòng thử lại'
                        //     )
                        // }
          
                    }
                    

                } catch (error) {
                
                    return
                }
                return
        }
        Alert.alert(
            checkLanguage({vi: 'Lỗi', en: `Error`},language),
            checkLanguage({vi: 'Tải hình không thành công', en: `Upload photo failed`},language)
        )
    },[ImageFront, ImageBack,ImageSelfy])

    
    return (
        <>
            <Header2 setHeight={setHeight} title={checkLanguage({vi: 'Tải lên hình ảnh', en: `Upload photo`},language)}/>
            <View 
            onLayout={e=>setContentHeight(e.nativeEvent.layout.height)}
            style={[mainStyles.container,{paddingHorizontal: 14, paddingVertical: 10,}]}>
                <Text style={[mainStyles.color1, mainStyles.fontsize13, {color: display === 1? '#364155' : '#8a8c8e'}]}>{checkLanguage({vi: 'Vui lòng sử dụng định dạng JPG., JPEG., PNG. Kích thước tệp tối đa = 2MB', en: 'Please use the format JPG., JPEG., PNG. Maximum file size = 2MB'},language)}</Text>
                <Text style={[mainStyles.color1, mainStyles.fontsize13]}>{checkLanguage({vi: 'Để đảm bảo quá trình xác minh được thuận tiện, vui lòng không che hoặc làm nhoè ảnh', en: 'To ensure the verification process most quickly, please do not hide or blur the image'},language)}</Text>

                <View style={{flexDirection:'row', alignItems: 'center', marginTop: 33, justifyContent:'space-between', position: 'relative'}}>
                    {ImageFront && <TouchableOpacity 
                    onPress={()=>setImageFront(null)}
                    style={{position:'absolute', top: -7 , right: -3, width:16, height: 16, borderRadius: 25,backgroundColor: '#8a8c8e',zIndex: 99}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TouchableOpacity>}
                    <Text style={[mainStyles.fontsize12, mainStyles.color3, {width: '60%'}]}>{checkLanguage({vi: '1. Mặt trước CMND/ Bằng lái xe', en: `1. ID card / Driver's license front image`},language)}</Text>
                    <TouchableOpacity disabled={ImageFront} onPress={()=>getPermissionAsync('front')} style={{width:131, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[{marginTop: 15,},ImageFront && {width: 131, height: 81,marginTop: 0,borderRadius: 8}]} source={ImageFront ? {uri : ImageFront.uri} : font}/>
                        {!ImageFront &&<Text style={{marginTop: 8, color: '#005cfc', fontSize: 11,paddingBottom: 4, textDecorationLine: 'underline', textDecorationColor: '#005cfc', textAlign: 'center'}}>{checkLanguage({vi: 'Nhấn vào đây để tải lên mặt trước', en: `Click here to upload`},language)}</Text>}
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginTop: 33, justifyContent:'space-between', position: 'relative'}}>
                    {ImageBack && <TouchableOpacity 
                    onPress={()=>setImageBack(null)}
                    style={{position:'absolute', top: -7 , right: -3, width:16, height: 16, borderRadius: 25,backgroundColor: '#8a8c8e',zIndex: 99}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TouchableOpacity>}
                    <Text style={[mainStyles.fontsize12, mainStyles.color3, {width: '60%'}]}>{checkLanguage({vi: '2. Mặt sau CMND/ Bằng lái xe', en: `2. ID card / Driver's license back image`},language)}</Text>
                    <TouchableOpacity disabled={ImageBack} onPress={()=>getPermissionAsync('back')} style={{width:131, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[{marginTop: 15,},ImageBack && {width: 131, height: 81,marginTop: 0,borderRadius: 8}]} source={ImageBack ? {uri : ImageBack.uri} : back}/>
                        {!ImageBack &&<Text style={{marginTop: 8, color: '#005cfc', fontSize: 11,paddingBottom: 4, textDecorationLine: 'underline', textDecorationColor: '#005cfc', textAlign: 'center'}}>{checkLanguage({vi: 'Nhấn vào đây để tải lên mặt sau', en: `Click here to upload`},language)}</Text>}
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginTop: 33, justifyContent:'space-between', position: 'relative'}}>
                    {ImageSelfy && <TouchableOpacity 
                    onPress={()=>setImageSelfy(null)}
                    style={{position:'absolute', top: -7 , right: -3, width:16, height: 16, borderRadius: 25,backgroundColor: '#8a8c8e',zIndex: 99}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TouchableOpacity>}
                    <Text style={[mainStyles.fontsize12, mainStyles.color3, {width: '60%'}]}>{checkLanguage({vi: '3. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe và một tờ giấy ghi chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn.',
                                    en: `3. Image with your face taken with your ID / Driver's License and a piece of paper which there is a written sentence "KINGDOM GAME 4.0", current date and your signature in that.`},language)}</Text>
                    <TouchableOpacity disabled={ImageSelfy} onPress={()=>getPermissionAsync('self')} style={{width:131, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[{marginTop: 15,},ImageSelfy && {width: 131, height: 81,marginTop: 0,borderRadius: 8}]} source={ImageSelfy ? {uri : ImageSelfy.uri} : selfy}/>
                        {!ImageSelfy &&<Text style={{marginTop: 8, color: '#005cfc', fontSize: 11,paddingBottom: 4, textDecorationLine: 'underline', textDecorationColor: '#005cfc', textAlign: 'center'}}>{checkLanguage({vi: 'Nhấn vào đây để tải lên', en: `Click here to upload`},language)}</Text>}
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
                    <Text style={{color: '#111b2d', fontSize: 14}}>{checkLanguage({vi: 'Tiếp theo', en: `Continue`},language)}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}