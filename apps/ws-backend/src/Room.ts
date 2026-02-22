import { WebSocket } from "ws";
import User from "./User";

export default class Room{

    roomId:number;
    owner:User;
    users:User[];

constructor(roomId: number, owner: User, users: User[] = []) {
    this.roomId = roomId;
    this.owner = owner;
    this.users = users;
}


setUser(user:User){
    this.users.push(user);  
}

deleteUser(user:User){
    this.users.splice(this.users.indexOf(user),1);
}

toJson(){

    return {
        roomId:this.roomId,
        owner:this.owner.toJson(),
        users:this.users.map((user)=>user.toJson())
    }

}


}

