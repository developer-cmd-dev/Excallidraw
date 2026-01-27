import z, { parseAsync } from "zod";


export const CreateUserZodSchema = z.object({
    email:z.email(),
    name:z.string(),
    password:z.string(),
})

export const SignInUserZodSchema = z.object({
    username:z.string().email(),
    password:z.string()

})


export const CreateRoomZodSchema = z.object({
    name:z.string()
})


export interface User{
    email:string;
    name?:string;
    photo?:string|null;
    password:string;
}


export interface Room {
    slug:string;
    adminId:string;
}

export interface Chat{
    message:string;
    roomId:number;
}