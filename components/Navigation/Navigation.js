import 'react-native-gesture-handler';
import React, { useEffect, useMemo } from 'react';
import { View ,Dimensions} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';

import { useSelector,useDispatch } from 'react-redux'
import {actChangeScreenHeight, actChangeScreenWidth, asyncGetRouters} from '../../store/actions'

import Maincomponent from '../Maincontainer'

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack

export default function App() {
  const { top,bottom } = useSafeAreaInsets();
  const dispatch = useDispatch()

  const ScreenWidth = useSelector(state => state.width)
  const ScreenHeight = useSelector(state => state.height)

  const Routers = useSelector(state => state.routers)

  useMemo(()=>{
    dispatch(asyncGetRouters())
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