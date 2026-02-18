import {WebSocket} from 'ws'

const wsUrl = process.env.NEXT_WEBSOCKET_URL||"";
export const connectSocket=(token:string)=>{
    try {
        
        const ws = new WebSocket(wsUrl,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })

        return ws;
    } catch (error) {
        console.log(error)
    }
}

