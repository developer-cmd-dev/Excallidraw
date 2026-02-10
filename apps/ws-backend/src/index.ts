import {WebSocket, WebSocketServer} from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config.ts';

const wss = new WebSocketServer({
    port:8080
})




interface User{
    userId:string;
    rooms:string[],
    ws:WebSocket
}


const users:User[]=[];



function checkUser(token:string):string |null{
   const decode =  jwt.verify(token,JWT_SECRET);

   if(typeof decode =='string'){
    return null;
   }

   if(!decode || !decode.userId){
    
    return null;
   }

   return decode.userId;

}

wss.on('connection',(ws,req)=>{
    const url = req.url;

    if(!url){
        return;
    }

    const queryParams= new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') ?? "";

    const userId = checkUser(token);
    if(userId==null){
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms:[],
        ws
    });

    ws.on('message',(message)=>{
        ws.send('pong');
    })


})
