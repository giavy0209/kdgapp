import AsyncStorage from '@react-native-community/async-storage';
import {ROUTERS} from '../routers'
import calAPI from '../axios'

export const GET_ROUTERS = 'GET_ROUTERS';
export const CHANGE_ROUTER = 'CHANGE_ROUTER';
export const CHANGE_SCREEN_WIDTH = 'CHANGE_SCREEN_WIDTH';
export const CHANGE_SCREEN_HEIGHT = 'CHANGE_SCREEN_HEIGHT';
export const CHANGE_USER_DATA = 'CHANGE_USER_DATA';
export const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
export const CHANGE_PIN = 'CHANGE_PIN';

export function actChangeRouters(routers){
    return {
        type: CHANGE_ROUTER,
        payload: {routers}
    }
}

export function actChangeScreenWidth(width){
    return {
        type: CHANGE_SCREEN_WIDTH,
        payload: {width}
    }
}

export function actChangeScreenHeight(height){
    return {
        type: CHANGE_SCREEN_HEIGHT,
        payload: {height}
    }
}
export function actChangeUserData(userData){
    return {
        type: CHANGE_USER_DATA,
        payload: {...userData}
    }
}
export function actChangeLoginStatus(status){
    return {
        type: CHANGE_LOGIN_STATUS,
        payload: {status}
    }
}


export function actChangeCurrency(currency){
    return {
        type: CHANGE_CURRENCY,
        payload: {currency}
    }
}

export function actChangeLanguage(language){
    return {
        type: CHANGE_LANGUAGE,
        payload: {language}
    }
}

export function actChangeDisplay(display){
    return {
        type: CHANGE_DISPLAY,
        payload: {display}
    }
}

export function actChangePin(pin){
    return {
        type: CHANGE_PIN,
        payload: {pin}
    }
}

export function asyncGetRouters(){
    return async (dispatch) => {
      try {
        const isLogin = JSON.parse(await AsyncStorage.getItem('isLogin'))
        const userData = JSON.parse(await AsyncStorage.getItem('userData'))
        const isNotFirstTime = JSON.parse(await AsyncStorage.getItem('isNotFirstTime'))

        const PIN = JSON.parse(await AsyncStorage.getItem('pin'))

        const currency = JSON.parse(await AsyncStorage.getItem('currency'))
        const language = JSON.parse(await AsyncStorage.getItem('language'))
        const display = JSON.parse(await AsyncStorage.getItem('display'))
        if(PIN){
            dispatch(actChangePin(PIN))
        }

        if(!currency && currency!== 0) {
            await AsyncStorage.setItem('currency', JSON.stringify(0))
            dispatch(actChangeCurrency(0))
        }else{
            dispatch(actChangeCurrency(currency))
        }

        if(!language &&language !== 0) {
            await AsyncStorage.setItem('language', JSON.stringify(0))
            dispatch(actChangeLanguage(0))
        }else{
            dispatch(actChangeLanguage(language))
        }

        if(!display && display!== 0) {
            await AsyncStorage.setItem('display', JSON.stringify(0))
            dispatch(actChangeDisplay(0))
        }else{
            console.log(display);
            dispatch(actChangeDisplay(display))
        }

        const newRouters = []
        
        if(isLogin && userData){
            ROUTERS.forEach((router)=>{
                if(router.reqLogin){
                    newRouters.push(router)
                }
            })
            dispatch(actChangeUserData(userData))
            dispatch(actChangeLoginStatus(true))
        }else{
            ROUTERS.forEach((router)=>{
                if(!router.reqLogin){
                    newRouters.push(router)
                }
            })

            if(isNotFirstTime){
                newRouters.forEach((el,index)=>{
                    if(el.needFirstTime){
                        newRouters.splice(index, 1)
                    }
                })
            }

            dispatch(actChangeLoginStatus(false))
        }
        

        dispatch(actChangeRouters(newRouters))

        
        return null
      } catch (err) {
        dispatch(actChangeRouters(ROUTERS))
        dispatch(actChangeLoginStatus(false))
        console.log('error router' ,err);
      }
    }
}

export function asyncLogin(loginInfo){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).post('/api/authorize', loginInfo)).data
            console.log(res)
            return res

        } catch (error) {
            console.log('login error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}


export function asyncReg(regInfo){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).post('/api/register_user', regInfo)).data
            return res

        } catch (error) {
            console.log('register error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}

export function asyncRegisterCode(Email){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).post('/api/create_register_code ', Email)).data
            return res

        } catch (error) {
            console.log('send mail error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}

export function asyncWithdraw(submiteData){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).post('/api/deposit', submiteData)).data
            console.log(res)
            return res

        } catch (error) {
            console.log('Withdraw error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}
// --------------------------2FA------------------------

export function async2FA(userId){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).post('/api/create_2fa', userId)).data
            console.log(res)
            return res

        } catch (error) {
            console.log('2FA error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}

export function asyncVerify2FA(verifyInfo){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).post('/api/verify_2fa', verifyInfo)).data
            console.log(res)
            return res

        } catch (error) {
            console.log('2FA error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}

export function asyncDisable2FA(verifyInfo){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).post('/api/disable_2fa', verifyInfo)).data
            console.log(res)
            return res

        } catch (error) {
            console.log('2FA error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}

// ----------------------------------------------------

export function asyncGetUserbyID(userId){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).get(`/api/user/${userId}`)).data
            return res
        } catch (error) {
            console.log('login error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}

export function asyncGetNews(skip, take){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).get(`/api/news?skip=${skip}&take=${take}`)).data
            return res
        } catch (error) {
            console.log('login error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}


export function asyncGetBalance(type, address){
    return async (dispatch) =>{
        try {
            const res = (await (await calAPI()).get(`/api/${type}/balance/${address}`)).data
            return res
        } catch (error) {
            console.log('login error ',error);
            return {ok: false, status: error.response.status}
        }
    }
}


export function asyncGetBalanceDouble(address1, address2){
    return async () =>{
        var callAPI = await calAPI()
            // const res = (await (await calAPI()).get(`/api/${type}/balance/${address}`)).data
            // const res2 = (await (await calAPI()).get('/api/news?skip=0&take=10')).data
        return Promise.all([
            callAPI.get(`/api/eth_usdt/balance/${address1}`),
            callAPI.get(`/api/tron_kdg/balance/${address2}`),
        ])
        .then(([resETH, resTRX]) =>{
            return {resETH, resTRX};
        })
        .catch(error =>{
            console.log('get balance error ',error);
            return {ok: false, status: error.response.status}

        })
    }
}


// export function asyncGetCoinPrice(coinType){
//     return async (dispatch) =>{
//         try {
//             const res = (await (await calAPI()).get(`/api/markets/coin_price?coin_type=${coinType}`)).data

//             return res
//         } catch (error) {
//             console.log('login error ',error);
//             return {ok: false, status: error.response.status}
//         }
//     }
// }




export function asyncGetCoinPrice(coinType){
    return async () =>{
        var callAPI = await calAPI()

        return Promise.all([
            (await (callAPI.get(`/api/markets/coin_price?coin_type=${coinType}`))).data,
            (await (callAPI.get('api/global/convert_money/USDVND'))).data,
        ])
        .then(([resVND, resUSDVND]) =>{
            return {resVND, resUSDVND};
        })
        .catch(error =>{
            console.log('get coin price error ',error);
            return {ok: false, status: error.response.status}

        })
    }
}



export function asyncLogout(){
    return async (dispatch) =>{
        try {
            dispatch(actChangeLoginStatus(false))
            const newRouters = []

            ROUTERS.forEach((router)=>{
                if(!router.reqLogin && !router.needFirstTime){
                    newRouters.push(router)
                }
            })
            dispatch(actChangeRouters(newRouters))

            await AsyncStorage.removeItem('isLogin')
            return null
        } catch (error) {
            console.log('logout error');
        }
    }
}


export function asyncSetCurrency(currency){
    return async (dispatch) =>{
        try {
            console.log(currency);
            dispatch(actChangeCurrency(currency))
            await AsyncStorage.setItem('currency', JSON.stringify(currency))
        } catch (error) {   
            console.log('currency err');
        }
    }
}

export function asyncSetLanguage(language){
    return async (dispatch) =>{
        try {
            dispatch(actChangeLanguage(language))
            await AsyncStorage.setItem('language', JSON.stringify(language))
        } catch (error) {   
            console.log('lang err');
        }
    }
}

export function asyncSetDisplay(display){
    return async (dispatch) =>{
        try {
            dispatch(actChangeDisplay(display))
            await AsyncStorage.setItem('display', JSON.stringify(display))
        } catch (error) {   
            console.log('díplay err');
        }
    }
}

export function asyncSetPin(pin){
    return async (dispatch) =>{
        try {
            dispatch(actChangePin(pin))
            await AsyncStorage.setItem('pin', JSON.stringify(pin))
        } catch (error) {   
            console.log('pin err');
        }
    }
}