import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useCallback } from 'react';
import { View ,Dimensions} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';

import { useSelector,useDispatch } from 'react-redux'
import {actChangeScreenHeight, actChangeScreenWidth, asyncGetRouters, asyncLogin} from '../../store/actions'

import Maincomponent from '../Maincontainer'

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack

export default function App() {
  const { top,bottom } = useSafeAreaInsets();
  const dispatch = useDispatch()

  const ScreenWidth = useSelector(state => state.width)
  const ScreenHeight = useSelector(state => state.height)

  const Routers = useSelector(state => state.routers)

  const checkRefreshToken = useCallback(async ()=>{
    var loginTime = JSON.parse(await storage('loginTime').getItem()) 
    var currTime = new Date().getTime()
    if(currTime - loginTime >= 1200000){
      var {email, password} = JSON.parse(storage('loginInfo').getItem())
      dispatch(asyncLogin({email, password}))
    }
    setInterval(async () => {
      var loginTime = JSON.parse(await storage('loginTime').getItem()) 
      var currTime = new Date().getTime()
      if(currTime - loginTime >= 1200000){
        var {email, password} = JSON.parse(storage('loginInfo').getItem())
        dispatch(asyncLogin({email, password}))
      }
    }, 20000);
  },[])

  useMemo(()=>{
    dispatch(asyncGetRouters())
    checkRefreshToken()
  },[])
  
  useEffect(()=>{
    dispatch(actChangeScreenWidth(Dimensions.get('screen').width ))
    dispatch(actChangeScreenHeight(Dimensions.get('screen').height - top - bottom))
  },[])
    return (
      <SafeAreaView>
      <View
        style={[{
          width: ScreenWidth,
          height: ScreenHeight + bottom,
        }]}
      >
      {Routers && Routers.length !== 0 && <NavigationContainer>
          <Navigator
          screenOptions={{headerShown:false}}
          >
          {
            Routers && Routers.map(Router => {
              if(Router.needInMain){
                return (
                  <Screen
                    key={Router.name && Router.name}
                    name={Router.name && Router.name}
                  > 
                    {props => <Maincomponent {...props} reqLogin={Router.reqLogin} Component={Router.render && Router.render}></Maincomponent>}
                  </Screen>
                )
              }else{
                return (
                  <Screen key={Router.name} name={Router.name} component={Router.render}/>
                )
              }
            })
          }
          </Navigator>

        
        
      </NavigationContainer>}
      </View>
      </SafeAreaView>
    );
}