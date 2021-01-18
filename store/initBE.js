import { storage} from '../helper';
import callAPI from '../axios';
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

export const asyncChangeBalances = (balances) => {
    return async dispatch => {
        if(balances) await storage.setItem('balances' , balances)
        if(!balances) balances = await storage.getItem('balances')
        if(!balances) return
        const isSortDown = await storage.getItem('isSortDown')
        if(typeof isSortDown !== 'boolean') return
        
        balances.balances.sort((a,b) => (a.coin.price * a.balance - b.coin.price * b.balance) * (isSortDown ? -1 : 1))
        dispatch(actChangeBalances(balances))
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

export const asyncInitAuth = () => {
    return async dispatch => {
        await dispatch(asyncInitBalance())
    }
}