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
    socket.emit('request-balance')
    socket.emit('request-coin')
    socket.emit('request-info')
})
socket.on('emiting-balance' , () =>{
    console.log('receiving balance');
})
socket.on('emiting-info' , () =>{
    console.log('receiving info');
})
socket.on('emiting-coin' , () =>{
    console.log('receiving coin');
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