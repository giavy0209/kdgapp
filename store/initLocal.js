import { storage,maptheme, maplanguage, mapstyles } from '../helper';
import {theme} from '../const'

import * as language from '../language'

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
        
        dispatch(actShowHideBalance(isShowBalance))
    }
}

export const actSortUpDown = (isSortDown) => {
    return {
        type : 'SORT',
        payload : {isSortDown}
    }
}

export const asyncSortUpDown = (isSortDown) => {
    return async dispatch => {
        await storage.setItem('isSortDown' , !!isSortDown)
        dispatch(actSortUpDown(isSortDown))
    }
}

export const asyncInitSortUpDown = () => {
    return async dispatch => {
        var isSortDown = await storage.getItem('isSortDown')
        if(!isSortDown && isSortDown !== false) isSortDown = true
        dispatch(actSortUpDown(isSortDown))
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