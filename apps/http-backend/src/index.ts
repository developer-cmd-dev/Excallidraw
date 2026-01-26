import express from 'express';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config.ts";
import { authMiddleware } from './middleware.js';
import { CreateUserZodSchema } from '@repo/common/types.ts';
const app = express();



app.post('/signup',(req,res)=>{

    const body = req.body;
    const {success}= CreateUserZodSchema.safeParse(body);
    if(!success){
        res.json("Invalid input");
        return;
    }





})

app.post('/signin',(req,res)=>{
    const userId = "1";

    const token = jwt.sign(userId,JWT_SECRET);
    res.json(token);
})


app.post('/room',authMiddleware,async(req,res)=>{
    
})




app.listen(3001,()=>console.log("Server is running on - ",3002))