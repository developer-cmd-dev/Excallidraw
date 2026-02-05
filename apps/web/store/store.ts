import { UUID } from "crypto";
import { create, createStore } from "zustand";


type UserInfo ={
    name:string;
    email:string;
    rooms:[];
    chats:[];
    token:string;
}|null;

interface UserStore {
    data:UserInfo;
    addUserData:(data:UserInfo)=>void;
    clearUserData:()=>void;
}

const useUserInfo =create<UserStore>((set)=>({
    data:null,
    addUserData:(data)=>{
       set({data})
    },
    clearUserData:()=>{
        set({data:null})
    }

}))

interface LoggedInInfo{
    isLoggedIn:boolean;

    setIsLoggedIn:(value:boolean)=>void;

}

const useLoggedInInfo = create<LoggedInInfo>((set)=>(
    {
        isLoggedIn:false,
        setIsLoggedIn:(value:boolean)=>{
            set({isLoggedIn:value})
        }
    }
))

export { useUserInfo,useLoggedInInfo};