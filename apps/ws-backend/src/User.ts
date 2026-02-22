import { WebSocket } from "ws";

export default class User  {
    userId: string;
    email: string;
    socket:WebSocket;
    roomId:number|null=null
    constructor(userId: string, email: string, socket: WebSocket) {
        this.userId = userId;
        this.email = email;
        this.socket = socket;
    }

    setRoomId(id:number){
        this.roomId=id;
    }


    toJson(){
        return{
            userId: this.userId,
            email: this.email,
            roomId: this.roomId
        }
    }
}