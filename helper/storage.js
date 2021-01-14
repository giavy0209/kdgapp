import AsyncStorage from '@react-native-community/async-storage';

export default storage = {
    setToken : async (jwt) => {
        await AsyncStorage.setItem('jwt' , jwt)
    },
    getToken : async () => {
        var token = await AsyncStorage.getItem('jwt')
        return token
    },

    setLogin : async ({email , password}) => {
        await AsyncStorage.setItem('email' , email)
        await AsyncStorage.setItem('password' , password)
    },

    getLogin : async () => {
        return {
            email : await AsyncStorage.getItem('email'),
            password : await AsyncStorage.getItem('password')
        }
    },

    setItem : async (key, value) => {
        var itemType = typeof value
        if(itemType !== 'string') value = JSON.stringify(value)
        await AsyncStorage.setItem(key , value)
    },

    getItem : async (key) => {
        var item = await AsyncStorage.getItem(key)
        if(typeof item !== 'string') item = JSON.parse(item)
        return item
    },
}