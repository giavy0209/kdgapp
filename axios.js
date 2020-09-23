// import axios from 'axios'
// const API_DOMAIN = "https://kdg-api.kingdomgame.co/"
// const calAPI = axios.create({
//     baseURL: API_DOMAIN,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// export default calAPI

import axios from 'axios'
import {storage} from './helper'

const API_DOMAIN = "https://kdg-api.kingdomgame.co/"

export default async function calAPI() {
    const token = await storage('token').getItem();
    var Axios =  axios.create({
        baseURL : API_DOMAIN,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    });
    return Axios
}