import {
    asyncInitTheme,
    asyncInitLanguage,
    asyncInitShowHideBalance,
    asyncInitSortUpDown
} from './initLocal'

import {
    asyncInitLogin
} from './initBE'

export const asyncInitAll = () => {
    return async dispatch => {
        dispatch(asyncInitLogin())
        dispatch(asyncInitTheme())
        dispatch(asyncInitLanguage())
        dispatch(asyncInitShowHideBalance())
        dispatch(asyncInitSortUpDown())
    }
}

