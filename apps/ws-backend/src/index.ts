
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


const rooms = new Map<string, Room>();



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
                
                roomObj = new Room(message.roomCode, user);
                roomObj.setUser(user);
                rooms.set(message.roomCode, roomObj);
                ws.send(JSON.stringify(
                    {
                        type:'create-room',
                        data:roomObj.toJson()
                    }
                ))
                console.log('Room Created..')
            } else if (message.type === 'join-room') {
                try {
                        const getRoom = rooms.get(message.roomCode);
                        getRoom?.setUser(user);
                        user.setRoomId(message.roomCode);
                        ws.send(JSON.stringify(getRoom?.toJson()));
                        getRoom?.users.forEach((user)=>{
                            if(user.socket != ws){
                                user.socket.send(JSON.stringify(
                                    {
                                        type:'joined-user',
                                        data:user.toJson()
                                    }
                                ))
                            }
                        })
                        console.log('room joined')
                } catch (error) {
                    console.log(error);
                ws.close()
                }

            }else if(message.type==='get-users'){
               const findRoom =  rooms.get(message.roomCode)
               if(!findRoom){
                ws.send("Expired Room");
                return;
               }

                const users=findRoom.users.map((value)=>value.toJson())

               ws.send(JSON.stringify(users))
               
            }else if (message.type === 'message') {
                const getRoom = rooms.get(message.roomCode);
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
