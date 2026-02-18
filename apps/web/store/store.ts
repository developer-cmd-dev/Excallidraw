import { Canvas, Room } from "@repo/common/types.ts";
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
    canvasData: Canvas[],
    addCanvas: (canvas: Canvas[] | Canvas) => void;
    removeCanvas: (canvas_id: string) => void;
}




const useCanvasStore = create<CanvasStoreType>((set) => (
    {
        canvasData: [],
        addCanvas: (data) => {
            if (Array.isArray(data)) {
                set((state) => ({
                    canvasData: [...state.canvasData, ...data]
                }))
            }
        },
        removeCanvas: (data) => {
            set((state) => ({
                canvasData: state.canvasData.filter((element) => element.id != data)
            }))
        }
    }
))


type RoomObjType = {
    room: Room,
    canvas: Canvas,
}

interface RoomStoreSchema {
    roomStoreData: RoomObjType | null;

    setRoomStoreData: (data: RoomObjType) => void;

}

const useRoomStore = create<RoomStoreSchema>((set) => (
    {
        roomStoreData: null,
        setRoomStoreData: (data: RoomObjType) => {
            set((state) => (
                {
                    roomStoreData: data
                }
            ))
        }

    }
))

export { useUserInfo, useLoggedInInfo, useCanvasStore,useRoomStore };