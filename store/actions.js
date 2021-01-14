import {
    asyncInitTheme,
    asyncInitLanguage,
    asyncInitShowHideBalance,
    asyncInitSortUpDown
} from './initLocal'

import {
    asyncInitBalance,
    asyncInitLogin
} from './initBE'

export const asyncInitAll = () => {
    return async dispatch => {
        var isLoginSuccess = dispatch(asyncInitLogin())
        dispatch(asyncInitTheme())
        dispatch(asyncInitLanguage())
        dispatch(asyncInitShowHideBalance())
        dispatch(asyncInitSortUpDown())

        dispatch(asyncInitBalance())

        return isLoginSuccess
    }
}