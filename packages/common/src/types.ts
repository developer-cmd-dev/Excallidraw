import z, { parseAsync } from "zod";


export const CreateUserZodSchema = z.object({
    name:z.string(),
    username:z.string().email(),
    password:z.string(),
})

export const SignInUserZodSchema = z.object({
    username:z.string().email(),
    password:z.string()

})


export const CreateRoomZodSchema = z.object({
    name:z.string()
})