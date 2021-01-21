import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Text, TextInput, View,TouchableOpacity, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import camera from '../../assets/images/icons/camera.png'
import Button from '../../components/Button'
import FormData from 'form-data'
import callAPI from '../../axios'
import { actChangeToast, asyncHandleToast } from '../../store/initLocal'

const listUpload = ['front' ,'back' , 'left' , 'right' , 'up' , 'nomal']
export default function App ({setHeaderTitle}) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const common = useSelector(state => state.Styles && state.Styles.Common ? state.Styles.Common : {})
    const styles = useSelector(state => state.Styles && state.Styles.Me ? state.Styles.Me : {})
    const text = useSelector(state => state.Languages && state.Languages.Me ? state.Languages.Me : {})

    const [ListContry , setListContry] = useState([])
    const [Contry , setContry] = useState('VN')
    const [Paper , setPaper] = useState(1)
    const [Name , setName] = useState('')
    const [ID , setID] = useState('')
    const [Images, setImages] = useState({})
    const getCountry = useCallback(async () => {
        const res = (await axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag')).data
        setListContry([...res])
    },[])

    useEffect(() => {
        getCountry()
    },[getCountry])

    useEffect(() => {
        setHeaderTitle(text.kyc);
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert(text.permissions);
            }
          }
        })();
    },[text])

    const pickImage = useCallback(async (name) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: .5,
          allowsEditing : false,
        });
    
        if (!result.cancelled) {
            Images[name] = result.uri
            setImages({...Images})
        }
    },[Images])

    const handleSubmit = useCallback(async () => {
        const ArrUpload = []
        for (const key in Images) {
            const uri = Images[key]
            const photo = {
                uri : uri,
                name : uri,
                type : 'image/jpeg'
            }
            const formData = new FormData()
            formData.append('file' , photo)
            ArrUpload.push(callAPI.post('/upload_kyc_image', formData))
        }
        if(ArrUpload.length < 6) return dispatch(asyncHandleToast(text.missing_img , 0))
        const upload = await Promise.all(ArrUpload)
        let isError = false
        upload.forEach(el => {
            if(!el || el.status !== 1) isError = true
        })

        if(isError) return dispatch(asyncHandleToast(text.upload_err , 0))

        const res = await callAPI.put('/user',{
            kyc_name : Name,
            kyc_country : Contry,
            kyc_number : ID,
            kyc : 2
        })
        console.log(res);
        if(res.status === 100) return dispatch(asyncHandleToast(text.exist , 0))

        if(res.status === 1) return dispatch(asyncHandleToast(text.kyc_submited,1))

    },[Contry , Name, ID, Images,text])

    return (
        <>
        <View style={[common.container]}>
            <View>
                
                <Text style={[common.textMain]}>{text.kyc_des1}</Text>
                <Text style={[common.textMain]}>{text.kyc_des2}</Text>
                <Text style={[common.textSub, common.mt]}>{text.country}</Text>
                <View style={[common.bgo(), common.radius]}>
                    <Picker
                    selectedValue={Contry}
                    onValueChange={(value) => setContry(value)}
                    style={[common.textTitle]}>
                        {
                            ListContry.map(o => 
                                <Picker.Item key={o.alpha2Code} label={o.name} value={o.alpha2Code} />
                            )
                        }
                    </Picker>
                </View>
                <Text style={[common.textSub, common.mt]}>{text.paper_type}</Text>
                <View style={[common.bgo(), common.radius]}>
                    <Picker
                    selectedValue={Paper}
                    onValueChange={(value) => setPaper(value)}
                    style={[common.textTitle]}>
                        <Picker.Item label={text.id} value={1} />
                        <Picker.Item label={text.pp} value={2} />
                    </Picker>
                </View>
                <Text style={[common.textSub, common.mt]}>{text.name}</Text>
                <View style={[common.bgo(), common.radius]}>
                    <TextInput onChangeText={setName} value={Name} style={[common.textTitle,{padding : 10}]} />
                </View>
                <Text style={[common.textSub, common.mt]}>{Paper === 1 ? text.paper_id : text.paper_pp}</Text>
                <View style={[common.bgo(), common.radius]}>
                    <TextInput onChangeText={setID} value={ID} style={[common.textTitle,{padding : 10}]} />
                </View>

                <View style={[common.row_col(-7), common.mt]}>
                    {
                        listUpload.map((o, index) => 
                        <TouchableOpacity key={o} onPress={()=>pickImage(o)} style={[common.column(2, index ,7),]}>
                            <View style={[common.center,common.bgo()]}>
                                <View style={[common.center,{paddingVertical : 30, overflow : 'visible'}]}>
                                    <Image source={camera}/>
                                    <Text style={[common.textMain, common.font14]}>{text[`upload_${o}`]}</Text>
                                </View>
                                {Images[o] && <Image style={[common.fullSize, {position : "absolute"}]} source={{uri : Images[o]}}/>}
                            </View>
                        </TouchableOpacity>
                        )
                    }
                    
                </View>
                <Button
                onPress={handleSubmit}
                style={{Touchable : common.mt, Linear : common.pv}}
                text={text.finish}
                />
                
            </View>
        </View>
        </>
    )
}