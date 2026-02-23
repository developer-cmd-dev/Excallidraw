import { WebSocket } from "ws";
import Room from "./Room";
import User from "./User";
import { prisma } from "@repo/db/prisma.ts";
import "dotenv/config"


export async function createRoom(roomCode: string, userData: User, rooms: Map<string, Room>, ws: WebSocket):Promise<Room|null> {


    try {
        const room = await prisma.room.update({
            where: {
                roomCode: Number(roomCode)
            },
            data:{
                active:true
            },
            include: {
                users: {
                    omit: {
                        password: true
                    }
                },

            },

        })

        // find the room and update the user here


        

        if (room) {
            let roomObj = new Room(roomCode, userData,[],true);  // create a room 
            room.users.map((data) => {

                if(data.email===userData.email){
                    
                    userData.setRoomId(roomCode)
                    roomObj.users.push(userData)
                }else{
                    const user = new User(data.id, data.email, null,false)
                    user.setRoomId(roomCode)
                    roomObj.users.push(user);
                }
               
            })
            rooms.set(roomCode, roomObj);
            ws.send(JSON.stringify(
                {
                    type: 'create-room',
                    data: roomObj.toJson()
                }
            ))

            return roomObj
        }

        return null

    } catch (error) {
        console.log(error)
        return null
    }





 

}


export function joinRoom(roomCode: string, rooms: Map<string, Room>, ws: WebSocket, user: User) {
    try {
        const getRoom = rooms.get(roomCode);
        if (!getRoom) {
            ws.send(JSON.stringify({
                type: 'error',
                data: {
                    message: "Room Expired"
                }
            }))

            return;
        }


       const checkUser= getRoom.users.filter((x)=>x.email===user.email)
       if(checkUser && checkUser.length>0){
        getRoom.users.forEach((data)=>{
            if(data.email === user.email && data.socket==null){
                data.socket=ws;
                data.active=true
                data.setRoomId(roomCode);
            }

        })

        getRoom.users.forEach((data)=>{
            if(data.email!=user.email && data.socket){
                data.socket.send(JSON.stringify({
                    type:'active-status',
                    data:getRoom.users.map((data)=>data.toJson())
                }))
            }
        })

       }else{
        
        getRoom?.setUser(user);
        user.setRoomId(roomCode);
        getRoom?.users.forEach((data) => {
            if (data.email != user.email) {
               if(data.socket){
                data.socket.send(JSON.stringify(
                    {
                        type: 'emit-message',
                        data: user.toJson()
                    }
                ))
               }

            }
        })
       }

       
        ws.send(JSON.stringify({
            type: 'join-room',
            data: getRoom?.toJson()
        }));
        
        console.log('room joined')
    } catch (error) {
        console.log(error);
        ws.close()
        return
    }
}


export function getUser(rooms: Map<string, Room>, roomCode: string, ws: WebSocket) {
    const findRoom = rooms.get(roomCode)
    if (!findRoom) {
        ws.send("Expired Room");
        return;
    }

    const users = findRoom.users.map((value) => value.toJson())

    ws.send(JSON.stringify(users))
}


export function sendMessage(rooms: Map<string, Room>, roomCode: string, user: User, data: string) {
    const getRoom = rooms.get(roomCode);
    if (getRoom) {
        getRoom.users.forEach((users) => {
            if (users !== user) {
                if(users.socket){
                    users.socket.send(data);
                }
            }
        })
    }
}


export async function closeConnection(roomObj:Room|null,rooms:Map<string,Room>,user:User){
    if (roomObj) {
        try {
          const result = await  prisma.room.update({
                where:{
                    roomCode:Number(roomObj.roomId)
                },
                data:{
                    active:false
                },
                include:{
                    users:{
                        omit:{
                            password:true
                        }
                    }
                }
            })
            if(result)
            rooms.delete(roomObj.roomId);
            console.log('Room closed')
        } catch (error) {
            console.log(error);    
        }


       
    } else {
        if (user.roomId) {
            const getRoom = rooms.get(user.roomId);
            if (getRoom) {
                getRoom.users.forEach((data)=>{
                    if(data.email==user.email){
                        data.active=false;
                    }
                })

                getRoom.users.forEach((data)=>{
                    if(data.email!=user.email){
                        data.socket?.send(JSON.stringify({
                            type:'active-status',
                            data:getRoom.users.map((data)=>data.toJson())
                        }))
                    }
                })

                console.log(getRoom, 'from left joined user')
            }
        }
    }
}