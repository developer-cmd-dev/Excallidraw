
import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config.ts';
import User from './User';
import Room from './Room';
import { prisma } from '@repo/db/prisma.ts';
import { URL } from 'url'
import { doesNotMatch } from 'assert';
import { closeConnection, createRoom, getUser, joinRoom, sendMessage } from './service';
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
                const data =await createRoom(message.roomCode, user, rooms, ws) // create room functions
                if(data){
                    roomObj=data;
                }
            } else if (message.type === 'join-room') {

                joinRoom(message.roomCode, rooms, ws, user) // join room function
            } else if (message.type === 'get-users') {

                getUser(rooms, message.roomCode, ws); // get users from the room

            } else if (message.type === 'message') {
                sendMessage(rooms,message.roomCode,user,message.data); // send message
            }       
        })

        ws.on('close', () => {
            closeConnection(roomObj,rooms,user);
        })
    }




})



async function authUser(token: string, ws: WebSocket): Promise<User | null> {



    try {

        const extractedToken = token.replace('Bearer ', "");

        const payload = jwt.verify(extractedToken, JWT_SECRET) as { userId: string, email: string };
        return new User(payload.userId, payload.email, ws,true);
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



