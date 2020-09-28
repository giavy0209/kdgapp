import React from 'react'
import {Image} from 'react-native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TABS} from '../../routers'
import Maincomponent from '../Maincontainer'
import { useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();
const {Navigator, Screen} = Tab
export default function App(){

    const display = useSelector(state => state.display)
    return (
        <Navigator

        tabBarOptions={{
        activeTintColor: '#fac800',
        inactiveTintColor: "#ffffff",
        style: {
            backgroundColor: display === 1 ? '#ffff' :'#283349',
            borderTopWidth: display === 1 ? 1 : 0,
        }
        }}
        >

        {TABS.map(tab=>
        <Screen
        options={{tabBarIcon: ({focused}) =><Image source={focused ? tab.logoActive : tab.logo} />,}}  
        key={tab.name} 
        name={tab.name}
        >
            {props => <Maincomponent {...props} reqLogin={tab.reqLogin} Component={tab.render}></Maincomponent>}
        </Screen>
        )}

        </Navigator>
    )
}