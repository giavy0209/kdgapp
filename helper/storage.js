import AsyncStorage from '@react-native-community/async-storage';

export default storage = {
    setToken : async (jwt) => {
        await AsyncStorage.setItem('jwt' , jwt)
    },
    setItem : async (key, value) => {
        await AsyncStorage.setItem(key , JSON.stringify(value))
    },
    getItem : async (key) => JSON.parse(await AsyncStorage.getItem(key)),
}