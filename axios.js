import axios from 'axios'
import {storage} from './helper'

const API_DOMAIN = "https://kdg-api.kingdomgame.co/api"

async function create() {
    const jwt = await storage.getItem('jwt')
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
    var {email , password} = await storage.getItem('login')
    if(!email || !password) {
        return
    }

    var resLogin = (await create()).post('/authorize', {email , password}).data
    if(resLogin.status !== 1){
        return 
    }
    
    await storage.setItem(resLogin.jwt)
    return {status : 1}
}

const callAPI = {
    get : async (url) => {
        try {
            return (await create()).get(url).data
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.get(url)
        }
    },
    post : async (url, body) => {
        try {
            return (await create()).post(url,body).data
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.post(url, body)
        }
    },
    put : async (url, body) => {
        try {
            return (await create()).post(url,body).data
        } catch (error) {
            var {status} = await reLogin()
            if(status === 1) await callAPI.put(url,body)
        }
    },
}

export default callAPI