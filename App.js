import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, LogBox, Platform} from 'react-native';
import { Provider } from 'react-redux'
import { setStatusBarHidden, setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useFonts} from 'expo-font'
import store from './store'
import MainComponent from './components/Maincontainer'
import { asyncInitAll } from './store/actions'
import { useDispatch, useSelector } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native'

import {tabs,routes} from './routers'
LogBox.ignoreAllLogs()
const Stack = createStackNavigator();
const {Screen , Navigator} = Stack
setStatusBarHidden(true, 'slide')
setStatusBarStyle('dark')
Platform.OS === 'android' && setStatusBarTranslucent(true)


const Router = function () {
    const dispatch = useDispatch()
    const [KeyboardHeight , setKeyboardHeight] = useState(0)
    console.log(KeyboardHeight);
    const _keyboardDidShow = useCallback(function (e) {
        setKeyboardHeight(e.endCoordinates.height)
    },[])
    const _keyboardDidHide = useCallback(function () {
        setKeyboardHeight(0)
    },[])

    useEffect(()=> {
        dispatch(asyncInitAll())

        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    },[])

    return (
        <NavigationContainer >
            <Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled : false,
            }}
            >
                {
                    routes.map((o, index) => 
                        <Screen options={{animationEnabled : o.animation}} key={'routes' + index} name={o.page}>
                            {props => <MainComponent header={o.header} KeyboardHeight={KeyboardHeight} haveTabs={o.haveTabs} Screen={o.screen} {...props} name={o.page} />}
                        </Screen>
                    )
                }
                {
                    tabs.map((o, index) => 
                        <Screen key={'navigate' + index} name={o.page}>
                            {props => <MainComponent KeyboardHeight={KeyboardHeight} haveTabs={true} Screen={o.screen} {...props} name={o.page} />}
                        </Screen>
                    )
                }
                
            </Navigator>
        </NavigationContainer>
    )
}

export default function App() {
    const [loaded] = useFonts({
        WorkSans: require('./assets/fonts/WorkSans.ttf'),
        'WorkSans-Bold': require('./assets/fonts/WorkSans-Bold.ttf'),
        'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
    });


    if(loaded){
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <Router />
                </Provider>
            </SafeAreaProvider>
        )
    }else{
        return null
    }
}