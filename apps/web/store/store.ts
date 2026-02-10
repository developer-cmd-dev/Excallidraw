import { Canvas } from "@repo/common/types.ts";
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


interface CanvasStoreType {
    canvas:Canvas[],
    addCanvas:(canvas:Canvas[]|Canvas)=>void;
    removeCanvas:(canvas_id:string)=>void;
}

const useCanvasStore = create<CanvasStoreType>((set)=>({
    canvas:[],
    addCanvas:(data:Canvas[]|Canvas)=>{
        if(Array.isArray(data)){
            set(()=>({
                canvas:data
            }))
        }else{
            set((state) => ({
            canvas:[...state.canvas,data]
            }))
        }
     
    },
    removeCanvas:(id:string)=>{
        
    }
}))

export { useUserInfo,useLoggedInInfo,useCanvasStore};