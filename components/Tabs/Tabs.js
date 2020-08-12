import React from 'react'
import {Image} from 'react-native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TABS} from '../../routers'
import Maincomponent from '../Maincontainer'
const Tab = createBottomTabNavigator();
const {Navigator, Screen} = Tab
export default function App(){
    return (
        <Navigator

        tabBarOptions={{
        activeTintColor: '#fac800',
        inactiveTintColor: "#ffffff",
        style: {
            backgroundColor: '#283349',
            borderTopWidth: 0,
        }
        }}
        >

        {TABS.map(tab=>
        <Screen
        options={{tabBarIcon: ({focused}) =><Image source={focused ? tab.logoActive : tab.logo} />}}  
        key={tab.name} 
        name={tab.name}
        >
            {props => <Maincomponent {...props} reqLogin={tab.reqLogin} Component={tab.render}></Maincomponent>}
        </Screen>
        )}

        </Navigator>
    )
}