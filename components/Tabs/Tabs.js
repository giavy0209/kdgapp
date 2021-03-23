import React, { useCallback } from 'react';
import { Text, View , TouchableOpacity, Image} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation , useRoute  } from '@react-navigation/native';
import {tabs} from '../../routers'
export default function App({setTabHeight}) {
    const navigation = useNavigation()
    const route = useRoute()
    const TabsStyle = useSelector(state => state.Styles && state.Styles.Tabs ? state.Styles.Tabs : {})

    const handleNavigator = useCallback((screen)=> {
        navigation.push(screen)
    },[])
    return (
        <>
            <View onLayout={e => setTabHeight(e.nativeEvent.layout.height)} style={TabsStyle.container}>
                {
                    tabs.map((o, index) => <TouchableOpacity onPress={()=>handleNavigator(o.page)} style={TabsStyle.item} key={'tab' + index}>
                        <Image source={route.name === o.page ? o.icon_1 : o.icon_0} />
                        <Text style={[TabsStyle.text,route.name === o.page && TabsStyle.active]}>{o.name(1)}</Text>
                    </TouchableOpacity>)
                }
            </View>
        </>
    )
}