import React from 'react';
import { Platform} from 'react-native';
import { Provider } from 'react-redux'
import { setStatusBarHidden, setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useFonts} from 'expo-font'
import store from './store'
import MainComponent from './components/Maincontainer'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import {tabs,routes} from './routers'
const Stack = createStackNavigator();
const {Screen , Navigator} = Stack
setStatusBarHidden(false, 'slide')
setStatusBarStyle('dark')
Platform.OS === 'android' && setStatusBarTranslucent(true)


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
                    <NavigationContainer>
                        <Navigator
                        screenOptions={{
                            headerShown: false,
                            animationEnabled : false
                        }}
                        >
                            {
                                routes.map((o, index) => 
                                    <Screen key={'routes' + index} name={o.page}>
                                        {props => <MainComponent haveTabs={o.haveTabs} Screen={o.screen} {...props} name={o.page} />}
                                    </Screen>
                                )
                            }
                            {
                                tabs.map((o, index) => 
                                    <Screen key={'navigate' + index} name={o.page}>
                                        {props => <MainComponent haveTabs={true} Screen={o.screen} {...props} name={o.page} />}
                                    </Screen>
                                )
                            }
                            
                        </Navigator>
                    </NavigationContainer>
                </Provider>
            </SafeAreaProvider>
        )
    }else{
        return null
    }
}