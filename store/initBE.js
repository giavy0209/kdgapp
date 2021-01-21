import { storage} from '../helper';
import callAPI from '../axios';
import { asyncChangeDropdown } from './dropdown';
export const actChangeJWT = (jwt) => {
    return {
        type : 'LOGIN' ,
        payload : {jwt}
    }
}

export const actChangeBalances = (balances) => {
    return {
        type : 'LOGIN' ,
        payload : {balances}
    }
}

export const actionChangeCoins = coins => {
    return {
        type : 'COIN' ,
        payload : {coins}
    }
}

export const actionChangeInfos = info => {
    return {
        type : 'INFO' ,
        payload : {info}
    }
}

export const asyncChangeBalances = (balances) => {
    return async dispatch => {
        if(balances) await storage.setItem('balances' , balances)
        if(!balances) balances = await storage.getItem('balances')
        if(!balances) return
        const isSortDown = await storage.getItem('isSortDown')
        if(typeof isSortDown !== 'boolean') return
        balances.balances.sort((a,b) => (a.coin.price * a.balance - b.coin.price * b.balance) * (isSortDown ? -1 : 1))
        dispatch(actChangeBalances(balances))

        dispatch(asyncChangeDropdown())
    }
}

export const asyncLogin = (Email , Password) => {
    return async dispatch => {
        var res = await callAPI.post('/login', {email :Email , password : Password})
        if(res.status === 1){
            await storage.setLogin({email : Email , password : Password})
            await storage.setToken(res.jwt)
            
            dispatch(actChangeJWT(res.jwt))
            await dispatch(asyncInitAuth())
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

export const asyncInitBalance = () => {
    return async dispatch => {
        var res = await callAPI.get('/balances')
        if(res.status !== 1) return
        dispatch(asyncChangeBalances(res.data))
    }
}

export const asyncChangeCoin = coins => {
    return async dispatch => {
        if(coins) storage.setItem('coins' , coins)
        dispatch(actionChangeCoins(coins))
        
    }
}

export const asyncChangeInfo = info => {
    return async dispatch => {
        if(info) storage.setItem('info' , info)
        dispatch(actionChangeInfos(info))
        
    }
}

export const asyncInitCoin = () => {
    return async dispatch => {
        var res = await callAPI.get('/coins')
        if(res.status !== 1) return
        dispatch(asyncChangeCoin(res.data))
    }
}

export const asyncInitInfo = () => {
    return async dispatch => {
        var res = await callAPI.get('/user/me')
        if(res.status !== 1) return
        dispatch(asyncChangeInfo(res.data))
    }
}

export const asyncInitAuth = () => {
    return async dispatch => {
        await Promise.all([
            dispatch(asyncInitBalance()),
            dispatch(asyncInitCoin()),
            dispatch(asyncChangeInfo()),
        ])
        
    }
}