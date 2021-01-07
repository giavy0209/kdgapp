import calAPI from '../axios'
import { storage,maptheme, maplanguage, mapstyles } from '../helper';
import {theme} from '../const'

import * as language from '../language'
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

export const asyncInitAll = () => {
    return async dispatch => {
        dispatch(asyncInitTheme())
        dispatch(asyncInitLanguage())
    }
}