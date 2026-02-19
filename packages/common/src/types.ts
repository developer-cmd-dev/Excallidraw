import z, { parseAsync } from "zod";


export const CreateUserZodSchema = z.object({
    email:z.email(),
    name:z.string(),
    password:z.string(),
})

export const SignInUserZodSchema = z.object({
    email:z.string().email(),
    password:z.string()

})


export const CreateRoomZodSchema = z.object({
    name:z.string()
})


export interface AuthUserPayload{
    id:string;
    name:string;
    email:string;
    image?:string;
    password:string|null;
    access_token:string;
    rooms:[];
    canvas:[];
    createdAt:string;
    updatedAt:string;
}

export interface SignUpUser{
    email:string;
    name?:string;
    password:string;
}

<<<<<<< HEAD
export interface Canvas{
    id:string,
    name: string,
    userId: string,
    drawing:[]
    createdAt: string,
    updatedAt: string
=======



export interface CanvasSchema{
    id:string;
    name: string;
    userId: string;
    drawing:string[];
    canvasType:'PROJECT'|'WORKSPACE'
    createdAt: string;
    updatedAt: string;
>>>>>>> master
}


export interface Room {
<<<<<<< HEAD
    slug:string;
    adminId:string;
}

export interface Chat{
    message:string;
    roomId:number;
}
=======
    name:string,
    adminId:string,
    roomCode:number,
}

>>>>>>> master


export interface SignInUser{
    email:string;
    password:string;
}


<<<<<<< HEAD
=======

export type Drawings={
    type:'rect',
    x:number,
    y:number,
    width:number,
    height:number,
    canvasId:string
}
>>>>>>> master
