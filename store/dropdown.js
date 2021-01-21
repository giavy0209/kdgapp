import { storage } from "../helper"

export const actChangeDropdown = (dropdown) => {
    return {
        type : 'DROPDOWN',
        payload : {dropdown}
    }
}

export const atcChangeShowDropdown = (isSelectSwapFrom , isSelectSwapTo) => {
    isSelectSwapFrom = isSelectSwapFrom ? true : false
    isSelectSwapTo = isSelectSwapTo ? true : false
    return {
        type : 'SHOW_DROPDOWN',
        payload : {isShowDropdown : {isSelectSwapFrom , isSelectSwapTo}}
    }
}

export const asyncChangeDropdown = (
    swapFrom,
    swapTo,
    listCoinCanSwap
) => {
    return async dispatch => {
        const lastData = await storage.getItem('dropdown')

        const listCoinSwapTo = []
        const balances = await storage.getItem('balances')

        if(!listCoinCanSwap) {
            listCoinCanSwap = []
            balances.balances.forEach(el => {
                if(el.coin.actions.includes(3)) {
                    listCoinCanSwap.push(el)
                }
            })
        }

        if(!swapFrom && !lastData) swapFrom = listCoinCanSwap[0]
        if(!swapFrom && lastData) {
            swapFrom = balances.balances.find(o => o._id === lastData.swapFrom._id)
        }

        if(swapFrom) {
            balances.balances.forEach(el => {
                if(swapFrom.coin.swap_with.includes(el.coin._id)){
                    listCoinSwapTo.push(el)
                }
            })
            swapTo = listCoinSwapTo[0]
        }

        

        if(!swapTo && !lastData) swapTo = listCoinSwapTo[0]
        if(!swapTo && lastData) {
            swapTo = balances.balances.find(o => o._id === lastData.swapTo?._id)
            swapTo = swapTo ? swapTo : swapTo = listCoinSwapTo[0]
        }

        const data = {
            swapFrom,
            swapTo,
            listCoinCanSwap,
            listCoinSwapTo
        }

        dispatch(actChangeDropdown(data))
        await storage.setItem('dropdown' , data)
    }
}
