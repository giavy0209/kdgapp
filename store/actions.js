import {
    asyncInitTheme,
    asyncInitLanguage,
    asyncInitShowHideBalance,
    asyncInitSortUpDown
} from './initLocal'

import {
    asyncInitLogin
} from './initBE'
export const atcChangeLoading = isLoading => {
    return {
        type : 'IS_LOADING' ,
        payload : {isLoading}
    }
}
export const asyncInitAll = () => {
    return async dispatch => {
        dispatch(atcChangeLoading(true))
        await Promise.all([
            dispatch(asyncInitLogin()),
            dispatch(asyncInitTheme()),
            dispatch(asyncInitLanguage()),
            dispatch(asyncInitShowHideBalance()),
            dispatch(asyncInitSortUpDown()),
        ])
        dispatch(atcChangeLoading(false))
    }
}

