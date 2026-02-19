<<<<<<< HEAD
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
=======
import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config.ts';
import User from './User';
import Room from './Room';
import { prisma } from '@repo/db/prisma.ts';
import {URL} from 'url'
const wss = new WebSocketServer({
    port: 8080
})


const rooms = new Map<number, Room>();



wss.on('connection', async (ws, req) => {

    
    const url = `ws://localhost:8080${req.url?.toString()}`;
    
    const urlObj = new URL(url);
    const token = urlObj.searchParams.get('token');

    if (!token) {
        ws.close()
        return;
    }

    const user: User | null = await authUser(token, ws);

    if (user) {
        let roomObj: Room | null = null;
        ws.on('message', async (data) => {
            const message = JSON.parse(data.toString());
            console.log(message)
            if (message.type === 'create-room') {
                roomObj = new Room(message.room_id, user);
                roomObj.setUser(ws);
                rooms.set(message.room_id, roomObj);
                ws.send('room created')
            } else if (message.type === 'join-room') {
                try {
                    const result = await prisma.room.update({
                        where:{roomCode:Number(message.room_id)},
                        data:{
                            adminId:user.userId
                        }
                    })
                    if (result) {
                        const getRoom = rooms.get(message.room_id);
                        getRoom?.setUser(ws);
                        user.setRoomId(message.room_id);
                        ws.send('room joined')
                    }

                } catch (error) {
                    console.log(error);
                    ws.close()
                }

            } else if (message.type === 'message') {
                const getRoom = rooms.get(message.room_id);
                if (getRoom) {
                    getRoom.users.forEach((users) => {
                        if (users !== ws) {
                            users.send(message.data);
                        }
                    })
                }
            }
        })

        ws.on('close', () => {
            if (roomObj) {
                rooms.delete(roomObj.roomId);
                console.log(rooms)
            } else {
                if (user.roomId) {
                    const getRoom = rooms.get(user.roomId);
                    if (getRoom) {
                        getRoom.deleteUser(ws);
                        console.log(getRoom)
                    }
                }
            }
        })
    }




})



async function authUser(token: string, ws: WebSocket): Promise<User | null> {



    try {

        const extractedToken = token.replace('Bearer ', "");

        const payload = jwt.verify(extractedToken, JWT_SECRET) as { userId: string, email: string };
        return new User(payload.userId, payload.email, ws);
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            ws.send(error.message);
            ws.close();
        } else {
            ws.send("Internal server error");
            ws.close()
        }
        return null

    }


}
>>>>>>> master
