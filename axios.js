import axios from 'axios'
import {storage} from './helper'

const API_DOMAIN = "https://kdg-api.kingdomgame.co/api"

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

const reLogin =async () => {
    var {email , password} = await storage.getLogin()
    if(!email || !password) {
        return
    }

    var resLogin = (await (await create()).post('/login', {email , password})).data
    console.log(resLogin);
    if(resLogin.status !== 1){
        return {status : 0}
    }
    
    await storage.setItem(resLogin.jwt)
    return {status : 1}
}

const callAPI = {
    get : async (url) => {
        try {
            return (await (await create()).get(url)).data
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.get(url)
        }
    },
    post : async (url, body) => {
        try {
            var res = (await (await create()).post(url,body)).data
            return res
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.post(url, body)
        }
    },
    put : async (url, body) => {
        try {
            return (await (await create()).post(url,body)).data
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.put(url,body)
        }
    },
}

export default callAPI