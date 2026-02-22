import { CanvasSchema, Room } from "@repo/common/types.ts";
import { create, createStore } from "zustand";

type UserInfo = {
    name: string;
    email: string;
    rooms: [];
    chats: [];
    token: string;
} | null;

interface UserStore {
    data: UserInfo;
    addUserData: (data: UserInfo) => void;
    clearUserData: () => void;
}

const useUserInfo = create<UserStore>((set) => ({
    data: null,
    addUserData: (data) => {
        set({ data })
    },
    clearUserData: () => {
        set({ data: null })
    }

}))

interface LoggedInInfo {
    isLoggedIn: boolean;

    setIsLoggedIn: (value: boolean) => void;

}

const useLoggedInInfo = create<LoggedInInfo>((set) => (
    {
        isLoggedIn: false,
        setIsLoggedIn: (value: boolean) => {
            set({ isLoggedIn: value })
        }
    }
))


interface CanvasStoreType {
    canvasData: CanvasSchema[],
    addCanvas: (canvas: CanvasSchema[] | CanvasSchema) => void;
    removeCanvas: (canvas_id: string) => void;
}




const useCanvasStore = create<CanvasStoreType>((set) => (
    {
        canvasData: [],
        addCanvas: (data) => {
            if (Array.isArray(data)) {
                set(() => ({
                    canvasData: data
                }))
            }else {
                set((state)=>(
                    {
                        canvasData:[...state.canvasData,data]
                    }
                    
                ))
            }
        },
        removeCanvas: (data) => {
            set((state) => ({
                canvasData: state.canvasData.filter((element) => element.id != data)
            }))
        }
    }
))


interface RoomStoreSchema {
    roomStoreData: Room | null;

    setRoomStoreData: (data: Room) => void;

}

const useRoomStore = create<RoomStoreSchema>((set) => (
    {
        roomStoreData: null,
        setRoomStoreData: (data: Room) => {
            set((state) => (
                {
                    roomStoreData: data
                }
            ))
        }

    }
))

export { useUserInfo, useLoggedInInfo, useCanvasStore,useRoomStore };