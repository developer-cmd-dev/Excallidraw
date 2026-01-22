import * as z from "zod"
export const UserZodSchema = z.object({
    firstname:z.string(),
    lastname:z.string(),
    email:z.email(),
    password:z.string()
}) 