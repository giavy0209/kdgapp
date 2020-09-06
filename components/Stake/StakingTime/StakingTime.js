import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image, FlatList, CheckBox} from 'react-native'
import { mainStyles, stakingStyle } from '../../../styles'
import {Header2} from '../../Header'
import { JoinButton } from '../../Button'
import coin from '../../../assets/images/coin.png'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

import {Calendar, LocaleConfig} from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler'
const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    monthNamesShort: ['Th1.','Th2.','Th3.','Th4.','Th5.','Th6.','Th7.','Th8.','Th9.','Th10.','Th11.','Th12.'],
    dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
    dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
    today: 'Hôm nay\'Hẹn'
  };
  LocaleConfig.defaultLocale = 'vi';


export default function App({setOutScrollViewTop, setOutScrollView}){

    const [value, setValue] = useState(0);


    const [dateString, setDateString] = useState('2020-09-01');

    const [Width , setWidth] = useState(0);

    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Thời gian"/>)
        setOutScrollView(    
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: windowHeight/25, paddingHorizontal: 15}}>
                <TouchableOpacity style={{width: '45%'}}>
                    <View style={{alignItems: 'center', borderColor: '#fac800', borderWidth: 2, padding: 20, width: '100%', borderRadius: 45}}>
                            <Text style={{color: '#fac800'}}>HỦY</Text>
                    </View>
               </TouchableOpacity>
                <TouchableOpacity style={{width: '45%'}}>
                    <LinearGradient 
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                            colors={['#d4af37', '#edda8b', '#a77b00', '#e7be22', '#e8bf23']}
                            style={{alignItems: 'center', padding: 20, width: '100%', borderRadius: 45}}>
                            <Text style={{color: '#111b2d', fontSize: 16}}>OK</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>            

        )
    },[])

    return (
        
        <>

<View style={mainStyles.container}>

    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
    <Calendar
        onDayPress={(day) => {console.log('selected day', day)}}
        markingType={'period'}
        markedDates={{
            '2020-09-01': {startingDay: true, color: '#fac800', textColor: '#fff'},
            '2020-09-02': {color: '#fcf7bb', textColor: 'rgba(0,0,0,0.7)'},
            '2020-09-03': {color: '#fcf7bb', textColor: 'rgba(0,0,0,0.7)'},
            '2020-09-04': {color: '#fcf7bb', textColor: 'rgba(0,0,0,0.7)'},
            '2020-09-05': {endingDay: true, color: '#fac800', textColor: '#fff'},
           
        }}
        theme={{
            backgroundColor: 'red',
            calendarBackground: 'rgba(255,255,255,0)',
            textSectionTitleColor: '#fff',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            todayTextColor: '#00adf5',
            dayTextColor: 'rgba(255,255,255,1)',
            textDisabledColor: 'rgba(255,255,255,0.4)',
            monthTextColor: '#fac800',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 13,
            textMonthFontSize: 15,
            textDayHeaderFontSize: 13
        }}
  
    />

        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={stakingStyle.stakingTimeContainer}>
                <View style={{width: '45%'}}>
                    <Text style={{color: 'rgba(255,255,255,0.5)'}}>Từ</Text>
                    <TextInput
                        placeholder='dd/mm/yyyy'
                        style={stakingStyle.stakingTimeInput}
                        onChangeText={value => {
                            setDateString(value);
                            console.log(value)
                        }}
                    />
                </View>
                <View style={{width: '45%'}}>
                    <Text style={{color: 'rgba(255,255,255,0.5)'}}>Đến</Text>
                    <TextInput
                        placeholder='dd/mm/yyyy'
                        style={stakingStyle.stakingTimeInput}
                    />
                </View>
            </View>
        </View>
    </View>
</View>
        </>
    )
}