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


export interface SignUpUser{
    email:string;
    name?:string;
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


export interface SignInUser{
    email:string;
    password:string;
}


