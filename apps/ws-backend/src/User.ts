import { WebSocket } from "ws";

export default class User  {
    userId: string;
    email: string;
    socket:WebSocket|null;
    roomId:string|null=null;
    active:boolean;
    constructor(userId: string, email: string, socket: WebSocket|null,active:boolean) {
        this.userId = userId;
        this.email = email;
        this.socket = socket;
        this.active=active
    }

    setRoomId(id:string){
        this.roomId=id;
    }


    toJson(){
        return{
            userId: this.userId,
            email: this.email,
            roomId: this.roomId,
            active:this.active
        }
    }
}