import io from 'socket.io-client'
import {baseURL} from './const'
import { storage } from './helper'
import {reLogin} from './axios'
const socket = io(baseURL)
socket.on('connect' , async () => {
    const token = await storage.getToken()
    socket.emit('auth' , token)
    console.log('socket connected');
})
socket.on('authed' , () => {
    console.log('authed');
    // socket.emit('request-balance')
})
socket.on('emiting-balance' , () =>{
    console.log('receiving balance');
})
socket.on('not-auth' ,async () => {
    const {status} = await reLogin()
    if(status === 0) socket.disconnect()
    const token = await storage.getToken()
    socket.emit('auth' , token)
})

socket.on('disconnect' , () => {
    console.log('disconnect');
})
export default socket