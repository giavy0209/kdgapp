import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity,Alert, TextInput, ActivityIndicator} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Header2, HeaderwithButton } from '../../Header'
import { mainStyles, accountStyle } from '../../../styles'
import defaultAvata from '../../../assets/images/default-avata.webp'
import defaultAvataPNG from '../../../assets/images/default-avata.png'
import { useRoute } from '@react-navigation/native'
import {asyncGetUserbyID, asyncLogout} from '../../../store/actions'
import { LinearGradient } from 'expo-linear-gradient'
import { storage } from '../../../helper';
import { asyncUpdateUser  } from '../../../store/actions'
import { Popup } from '../../Popup';


function isValidDate(dateString) {
    var regEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var [date, month, year] = dateString.split('/')
    var d = new Date(year, month - 1,0);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return true
}
export default function App() {
    const dispatch = useDispatch()
    const route = useRoute()
    const [Height, setHeight] = useState(0)
    const [ContentHeight, setContentHeight] = useState(0)
    const [ButtonHeight, setButtonHeight] = useState(0)
    const screenHeight = useSelector(state=>state.height)
    const [Loading, setLoading] = useState(false);

    const [BlockWidth, setBlockWidth] = useState(0)
    const [ImageWidth, setImageWidth] = useState(0)
    const [image, setImage] = useState(Platform.OS === 'ios' ? defaultAvataPNG : defaultAvata)

    const [SelectedGender, setSelectedGender] = useState(0)

    const [UserInfoInServer, setUserInfoInServer] = useState({
    })
    const [Name, setName] = useState('')
    const [Birthday, setBirthday] = useState('')
    const [IsUpadteSuccess, setIsUpadteSuccess] = useState(false)

    const {email} = route.params;

    useEffect(() => {
        async function getUserInfo() {
          var userinfo = await storage('_id').getItem();
          dispatch(asyncGetUserbyID(userinfo._id))
          .then((res)=>{
            // setUserInfoInServer({
            //     Name: res.data.first_name + " " + res.data.last_name,
            //     Gender: res.data.gioi_tinh_id,
            //     Birthday: res.data.birth_day,
            // })
            setSelectedGender(res.data.gioi_tinh_id)
            setName(res.data.first_name + res.data.last_name)
            setBirthday(
                (new Date(res.data.birth_day)).getDate().toString()  + "/"   +
                ((new Date(res.data.birth_day)).getMonth() + 1).toString() + "/"   +
                (new Date(res.data.birth_day)).getFullYear().toString()
            )
          })
    
        }
    
        getUserInfo()
    
    
      },[IsUpadteSuccess])

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


    const updateUser = useCallback(async (name, gender, birthday) => {
        var last_name = name.substr(name.indexOf(' '))
        var first_name = name.substr(0,name.indexOf(' '))
        var [day, month, year] = birthday.split('/')

        var birth_day = `${month}/${day}/${year}`


        toggleModal()
        if(name){
            var userinfo = await storage('_id').getItem();
            var submitInfo = 
            {
                id: userinfo._id, gioi_tinh_id: SelectedGender, first_name: first_name, last_name: last_name, birth_day: birth_day
            }

            dispatch(asyncUpdateUser(submitInfo))
            .then((res)=>{
                if(res.data !== null && res.status === 1){
                    setIsUpadteSuccess(true)
                    return
 
                }

                setIsUpadteSuccess(false)
            })
            .catch(console.log)
        }else{

        }

    }, [Name, SelectedGender])




      const [isModalVisible, setModalVisible] = useState(false);
    
      const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
      };
    


    return (
        <>
            <HeaderwithButton toPress={handleLogout} type='logout' setHeight={setHeight} title="Hồ sơ cá nhân" />
            <View onLayout={e=>setContentHeight(e.nativeEvent.layout.height)} style={[mainStyles.container,{paddingHorizontal: 36, paddingTop: 78,}]}>
            <Popup type='success' title='Cập nhật thành công' isModalVisible={isModalVisible}/>
                
                <View
                onLayout={e => setBlockWidth(e.nativeEvent.layout.width)}
                style={{paddingHorizontal: 19, paddingTop: 40, paddingBottom: 18, flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>

                    <TouchableOpacity
                    disabled={true}
                    onLayout={e => setImageWidth(e.nativeEvent.layout.width)}
                    onPress={getPermissionAsync}
                    style={{position: 'absolute', top: -53, alignSelf: 'center',left: BlockWidth / 2 - ImageWidth/2 ,zIndex: 999}}>
                        <View style={{width: 66, height: 66, position: 'relative', borderRadius: 50, overflow: 'hidden'}}>
                            <Image style={{width: 66, height: 66,resizeMode: 'contain'}} source={image.uri ? {uri: image.uri} : image}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{paddingTop: 20}}>
                    <View style={{flexDirection: 'row', borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 35}}>
                        <Text style={{color: '#fff'}}>Họ và tên</Text>
                        <TextInput onChangeText={(value) => setName(value)} value={Name} placeholder='Nhập họ và tên' placeholderTextColor='rgba(255,255,255,0.5)' style={{color: 'rgba(255,255,255,0.5)', paddingLeft: 35}} />
                    </View>
                    <View style={{flexDirection: 'row', borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 35}}>
                        <Text style={{color: '#fff'}}>Email</Text>
                        <TextInput editable={false} value={email} placeholder='Nhập họ và tên' placeholderTextColor='rgba(255,255,255,0.5)' style={{color: 'rgba(255,255,255,0.5)', paddingLeft: 60}} />
                    </View>
                    <View style={{flexDirection: 'row', borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 35}}>
                        <Text style={{color: '#fff'}}>Giới tính</Text>
                        <View  style={{flexDirection: 'row', paddingLeft: 40}}>
                            <TouchableOpacity onPress={() => setSelectedGender(0)} style={{backgroundColor: '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                                {
                                    SelectedGender === 0 ? 
                                    <View style={{backgroundColor: '#fac800', width: 10, height: 10, borderRadius: 20 }}>
                                    </View> : null
                                }

                            </TouchableOpacity>
                            <Text style={{color: 'rgba(255,255,255,0.5)', paddingLeft: 15, paddingRight: 40}}>Nam</Text>

                            <TouchableOpacity onPress={() => setSelectedGender(1)} style={{backgroundColor: '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                                {
                                    SelectedGender === 1 ? 
                                    <View style={{backgroundColor: '#fac800', width: 10, height: 10, borderRadius: 20 }}>
                                    </View> : null
                                }
                            </TouchableOpacity>
                            <Text style={{color: 'rgba(255,255,255,0.5)', paddingLeft: 15}}>Nữ</Text>
                        </View>
         
                    </View>

                    <View style={{flexDirection: 'row', borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 35}}>
                        <Text style={{color: '#fff'}}>Ngày sinh</Text>
                        <TextInput 
                            onChangeText={(value) => setBirthday(value)} 
                            value={Birthday}
                            placeholder='Ngày/tháng/năm' 
                            placeholderTextColor='rgba(255,255,255,0.5)' 
                            style={{color: 'rgba(255,255,255,0.5)', 
                            paddingLeft: 60}} />
                    </View>
                    
                </View>
                
            </View>

            <TouchableOpacity onPress={() => updateUser(Name, SelectedGender, Birthday)}>
                <View style={{paddingTop: 150, alignItems: 'center', justifyContent: 'center'}}>
                    <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                    colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                    style={{width: '90%', padding: 12, alignItems: 'center', borderRadius: 20, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: '#111b2d', fontSize: 16, paddingLeft: 10}}>Cập nhật</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>


        </>
    )
}