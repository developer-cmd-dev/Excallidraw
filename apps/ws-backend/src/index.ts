
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
            if (message.type === 'create-room') {
                
                roomObj = new Room(Number(message.roomCode), user);
                roomObj.setUser(user);
                rooms.set(message.room_id, roomObj);
                ws.send(JSON.stringify(
                    roomObj.toJson()
                ))
                console.log('Room Created..')
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
                        getRoom?.setUser(user);
                        user.setRoomId(message.room_id);
                        ws.send('room joined')
                    }

                } catch (error) {
                    console.log(error);
                    ws.close()
                }

            }else if(message.type==='get-users'){
               const findRoom =  rooms.get(Number(message.roomCode))
               if(!findRoom){
                ws.send("Expired Room");
                return;
               }

                const users=findRoom.users.map((value)=>value.toJson())

               ws.send(JSON.stringify(users))
               
            }else if (message.type === 'message') {
                const getRoom = rooms.get(message.room_id);
                if (getRoom) {
                    getRoom.users.forEach((users) => {
                        if (users !== user) {
                            users.socket.send(message.data);
                        }
                    })
                }
            }
        })

        ws.on('close', () => {
            if (roomObj) {
                rooms.delete(roomObj.roomId);
                console.log('Room closed')
            } else {
                if (user.roomId) {
                    const getRoom = rooms.get(user.roomId);
                    if (getRoom) {
                        getRoom.deleteUser(user);
                        console.log('User left')
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
