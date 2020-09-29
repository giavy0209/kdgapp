import 'react-native-gesture-handler';
//pushnoti
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import React, { useEffect, useRef } from 'react';
import {View,Platform, LogBox } from 'react-native'
import { Provider} from 'react-redux'
import store from './store'
import Navigation from './components/Navigation'
import { SafeAreaProvider} from 'react-native-safe-area-context';
import {
  useFonts,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import {
  RobotoCondensed_300Light
} from '@expo-google-fonts/roboto-condensed';
import { setStatusBarHidden } from 'expo-status-bar';
import calAPI from './axios';
import AsyncStorage from '@react-native-community/async-storage';
import { storage } from './helper';
import { actChangeNotify } from './store/actions';
import io from 'socket.io-client/dist/socket.io';
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000
};
const socket = io('https://ws.kingdomgame.org',connectionConfig);

socket.on('notify',({title,content})=>{
  console.log('recive');
  Notifications.presentNotificationAsync({
    title: title,
    body: content,
  });
})
LogBox.ignoreAllLogs()
setStatusBarHidden(false, 'none')

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// registerForPushNotificationsAsync().then( async token => {
//   console.log(token);
//   (await calAPI()).post('/token',{token})
//   .then(res => {
//     console.log(res.data);
//   })
//   .catch(res => {
//     console.log(res);
//   })
// });



export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    RobotoCondensed_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(()=>{
    async function setFirstTime(){
      
      await AsyncStorage.clear()
    }
    
    setFirstTime()

  },[])

  useEffect(() => {
    

  }, []);


  if (fontsLoaded) {
    return (

    <SafeAreaProvider>
      <Provider store={store}> 
        <Navigation/>      
      </Provider>
    </SafeAreaProvider>
   
    )
  }else{
    return (<View></View>)
  }
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    console.log(existingStatus);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}