import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config.ts';
import User from './User';
import Room from './Room';

const wss = new WebSocketServer({
    port: 8080
})


const rooms = new Map<number, Room>();



wss.on('connection', async (ws, req) => {

    const authToken = req.headers['authorization'];
    if (!authToken && !authToken?.startsWith('Bearer ')) {
        ws.close()
        return;
    }

    const user:User|null = await authUser(authToken, ws);

    if(user){
        let roomObj:Room|null = null;
        ws.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === 'create-room') {
                 roomObj = new Room(message.room_id, user);
                roomObj.setUser(ws);
                rooms.set(message.room_id,roomObj);
                ws.send('room created')
            }else if(message.type === 'join-room'){
                const getRoom = rooms.get(message.room_id);
                getRoom?.setUser(ws);
                user.setRoomId(message.room_id);
                ws.send('room joined')
            }else if(message.type==='message'){
                const getRoom = rooms.get(message.room_id);
                if(getRoom){
                    getRoom.users.forEach((users)=>{
                        if(users!==ws){
                            users.send(message.data);
                        }
                    })
                }
            }
        })

        ws.on('close',()=>{
           if(roomObj){
            rooms.delete(roomObj.roomId);
            console.log(rooms)
           }else{
            if(user.roomId){
                const getRoom = rooms.get(user.roomId);
                if(getRoom){
                    getRoom.deleteUser(ws);
                    console.log(getRoom)
                }
            }
           }
        })
    }




})



async function authUser(token: string, ws: WebSocket):Promise<User|null> {



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