import axios from 'axios'
import {storage} from './helper'

const API_DOMAIN = "https://api.kingdomgame.org/api"

async function create() {
    const jwt = await storage.getToken()
    var Axios =  axios.create({
        baseURL : API_DOMAIN,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${jwt}`,
        }
    });
    return Axios
}

export const reLogin =async () => {
    var {email , password} = await storage.getLogin()
    if(!email || !password) {
        return {status : 0}
    }

    var resLogin = (await (await create()).post('/login', {email , password})).data
    if(resLogin.status !== 1){
        return {status : 0}
    }
    
    await storage.setToken(resLogin.jwt)
    return {status : 1}
}

const callAPI = {
    get : async (url) => {
        try {
            var res = (await (await create()).get(url)).data
            return res
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.get(url)
            else return {status : 0}
        }
    },
    post : async (url, body) => {
        try {
            var res = (await (await create()).post(url,body)).data
            return res
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.post(url, body)
            else return {status : 0}
        }
    },
    put : async (url, body) => {
        try {
            return (await (await create()).put(url,body)).data
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.put(url,body)
            else return {status : 0}
        }
    },
}

export default callAPI