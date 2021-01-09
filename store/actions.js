import { storage,maptheme, maplanguage, mapstyles } from '../helper';
import {theme} from '../const'

import * as language from '../language'
import callAPI from '../axios';

export const actChangeJWT = (jwt) => {
    return {
        type : 'LOGIN' ,
        payload : {jwt}
    }
}

export const actShowHideBalance = (isShowBalance) => {
    return {
        type : 'SHOW_HIDE_BALANCE',
        payload : {isShowBalance}
    }
}

export const asyncShowHideBalance = (isShowBalance) => {
    return async dispatch => {
        await storage.setItem('isShowBalance' , !!isShowBalance)
        dispatch(actShowHideBalance(isShowBalance))
    }
}

export const asyncInitShowHideBalance = () => {
    return async dispatch => {
        var isShowBalance = await storage.getItem('isShowBalance')
        console.log(isShowBalance);
        dispatch(actShowHideBalance(isShowBalance))
    }
}

export const actChangeToast = (text,type , visible) => {
    return {
        type : 'TOAST',
        payload : {
            toast : {
                type : type === 0 ? type : 1,
                text,
                visible,
            }
        }
    }
}

export const asyncHandleToast = (text,type, duration = 2000) => {
    return async (dispatch) => {
        dispatch(actChangeToast(text, type , true))

        setTimeout(() => {
            dispatch(actChangeToast('', 1 , false))
        }, duration);
    }
}

export const actChangeStyles = (themeType) => {
    var themeStyle = maptheme(theme, themeType)
    var Styles = mapstyles(themeStyle)
    return {
        type : 'STYLES',
        payload : {Styles}
    }
}

export const asyncInitTheme =  () => {
    return async dispatch => {
        var themeType = await storage.getItem('theme')

        if(!themeType) {
            await storage.setItem('theme', 'dark')
            themeType = 'dark'
        }

        dispatch(actChangeStyles(themeType))
    }
}

export const actChangeLanguage = (lang) => {

    var languagePage = maplanguage(language , lang)
    return {
        type : 'STYLES',
        payload : {Languages : languagePage}
    }
}

export const asyncInitLanguage = () => {
    return async dispatch => {
        var langType = await storage.getItem('lang')

        if(!langType) {
            await storage.setItem('lang', 'vi')
            langType = 'vi'
        }

        dispatch(actChangeLanguage(langType))
    }
}

export const asyncLogin = (Email , Password) => {
    return async dispatch => {
        var res = await callAPI.post('/login', {email :Email , password : Password})
        if(res.status === 1){
            await storage.setLogin({email : Email , password : Password})
            await storage.setToken(res.jwt)
            dispatch(actChangeJWT(res.jwt))
        }
        return res
    }
}

export const asyncInitLogin = () => {
    return async dispatch => {
        var isLoginSuccess = false
        var {email ,password} = await storage.getLogin()
        if(email && password) {
            var resLogin = await dispatch(asyncLogin(email , password))
            if(resLogin.status === 1) isLoginSuccess = true
        }

        return isLoginSuccess
    }
}

export const asyncInitAll = () => {
    return async dispatch => {
        dispatch(asyncInitTheme())
        dispatch(asyncInitLanguage())
        dispatch(asyncInitShowHideBalance())

        return await dispatch(asyncInitLogin())
    }
}