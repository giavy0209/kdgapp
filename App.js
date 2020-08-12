import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {View} from 'react-native'
import { Provider} from 'react-redux'
import store from './store'
import Navigation from './components/Navigation'
import AsyncStorage from '@react-native-community/async-storage';
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

console.disableYellowBox = true;
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
      await AsyncStorage.setItem('isNotFirstTime', JSON.stringify(true))
    }setFirstTime()
  },[])

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

// import React, { useRef, useState } from "react";
// import { Animated, Text, View, StyleSheet, Button } from "react-native";
// console.disableYellowBox = true;
// export default function App() {
//   // fadeAnim will be used as the value for opacity. Initial Value: 0
//   const [Index, setIndex] = useState(0)
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const fadeIn = () => {
//     Animated.timing(fadeAnim, {
//       toValue: Index + 5,
//       duration: 300,
//       useNativeDriver: false
//     }).start();
//     setIndex(Index + 5)
//   };

//   const fadeOut = () => {
//     // Will change fadeAnim value to 0 in 5 seconds
//     Animated.timing(fadeAnim, {
//       toValue: Index - 5,
//       duration: 300,
//       useNativeDriver: false
//     }).start();
//     setIndex(Index  - 5)
//   };
//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.fadingContainer,
//           {
//             left: fadeAnim // Bind opacity to animated value
//           }
//         ]}
//       >
//         <Text style={styles.fadingText}>Fading View!</Text>
//       </Animated.View>

//       <Animated.View
//         style={[
//           styles.fadingContainer,
//           {
//             left: fadeAnim // Bind opacity to animated value
//           }
//         ]}
//       >
//         <Text style={styles.fadingText}>Fading View2</Text>
//       </Animated.View>
//       <View style={styles.buttonRow}>
//         <Button title="Fade In" onPress={fadeIn} />
//         <Button title="Fade Out" onPress={fadeOut} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   fadingContainer: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     backgroundColor: "powderblue"
//   },
//   fadingText: {
//     fontSize: 28,
//     textAlign: "center",
//     margin: 10
//   },
//   buttonRow: {
//     flexDirection: "row",
//     marginVertical: 16
//   }
// });