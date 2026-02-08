import express from 'express';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config.ts";
import { authMiddleware } from './middleware.js';
import { CreateUserZodSchema, Room, SignUpUser } from '@repo/common/types.ts';
import { prisma } from '@repo/db/prisma.ts';
import  bycrypt, { hash } from 'bcrypt';
import bodyparser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';





const app = express();
app.use(bodyparser.json())
app.use(cors())



app.post('/signup', async (req, res) => {
    try {

        const body = req.body as SignUpUser;
        const { success } = CreateUserZodSchema.safeParse(body);
        if (!success) {
            res.json("Invalid input");
            return;
        }

        const checkUserExistOrNot = await prisma.user.findUnique({where:{email:body.email}});

        if(checkUserExistOrNot){
            res.status(409).json("User already exist");
            return;
        }

        const hashedPassword =await bycrypt.hash(body.password,5);

        await prisma.user.create({
            data:{
                ...body,
                password:hashedPassword
            }
        })

        res.status(200).json({message:'Signed up sccessfully',data:null});

    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }


})

app.post('/signin', async(req, res) => {
    const body = req.body as {email:string,password:string};
    try {
        const getUserFromDb =await prisma.user.findUnique({
          where:{email:body.email},
          include:{
            rooms:true,
            chats:true
          }

        });
        if(!getUserFromDb){
            res.status(404).json("User not found");
            return;
        }

        const verifyPassword =await bycrypt.compare(body.password,getUserFromDb.password);
        if(!verifyPassword){
            res.status(401).json("Invalid credentials");
            return;
        }

        const token = jwt.sign({userId:getUserFromDb.id},JWT_SECRET,{expiresIn:60*1000});

        res.status(200).json({data:{
            id:getUserFromDb.id,
            email:getUserFromDb.email,
            name:getUserFromDb.name,
            rooms:getUserFromDb.rooms,
            chats:getUserFromDb.chats
        },
        token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong")
    }


})






app.post('/room', authMiddleware, async (req, res) => {

    const body = req.body as Room;
    try {
     const response = await prisma.room.create({data:body});
     res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }


})




app.listen(3001, () => console.log("Server is running on - ", 3001))