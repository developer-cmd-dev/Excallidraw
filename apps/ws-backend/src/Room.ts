import { WebSocket } from "ws";
import User from "./User";

export default class Room{

    roomId:number;
    owner:User;
    users:WebSocket[];

constructor(roomId: number, owner: User, users: WebSocket[] = []) {
    this.roomId = roomId;
    this.owner = owner;
    this.users = users;
}


setUser(ws:WebSocket){
    this.users.push(ws);  
}

deleteUser(ws:WebSocket){
    this.users.splice(this.users.indexOf(ws),1);
}


}

