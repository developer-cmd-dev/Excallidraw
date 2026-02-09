import express, { response } from 'express';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config.ts";
import { authMiddleware } from './middleware.js';
import { AuthUserPayload, CreateUserZodSchema, Room, SignInUserZodSchema, SignUpUser } from '@repo/common/types.ts';
import { prisma } from '@repo/db/prisma.ts';
import  bycrypt, { hash } from 'bcrypt';
import bodyparser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser'




const app = express();
app.use(bodyparser.json())
app.use(cors())
app.use(cookieParser())



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

app.post('/google-auth',async(req,res)=>{
    const {name,email }=req.body;

    try {
        const checkUserExist =await prisma.user.findUnique({where:{email},include:{rooms:true,canvas:true}});
        if(checkUserExist){
        const token = jwt.sign({userId:checkUserExist.id,email:checkUserExist.email},JWT_SECRET,{expiresIn:60*1000});
            const responseData = {
                ...checkUserExist,
                access_token:token
            }
            res.status(200).json(responseData);
            return;
        }

        await prisma.user.create({
            data:{
                email,
                name
            },
            include:{
                rooms:true,
                
            }
        })

        res.status(200).json("User created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong") 
    }
})

app.post('/signin', async(req, res) => {
    const body = req.body as { email?: string; password?: string };

if (!body.email || !body.password) {
  return res.status(400).json("Email and password required");
}

    try {

        const getUserFromDb =await prisma.user.findUnique({
          where:{email:body.email},
          include:{
            rooms:true,
            canvas:true,
            chats:true
          }

        });

        console.log(getUserFromDb)

        if(!getUserFromDb){
            res.status(404).json("User not found");
            return;
        }
        //@ts-ignore
        const verifyPassword =await bycrypt.compare(body.password,getUserFromDb.password||'');
        if(!verifyPassword){
            res.status(401).json("Invalid credentials");
            return;
        }

        const token = jwt.sign({userId:getUserFromDb.id,email:getUserFromDb.email},JWT_SECRET,{expiresIn:60*1000});
        const responseData= {
            ...getUserFromDb,
            access_token:token,
        }
        res.status(200).json(responseData)
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong")
    }


})


app.post('/blank-page',authMiddleware,async(req,res)=>{
 try {
    const {name}=req.body as {name:string};
    if(!name && name.length==0){
        res.status(204).json("Invalid Formate");
        return;
    }
    // @ts-ignore
    const userId = req.userId;

   const response = await prisma.canvas.create({
        data:{
            name,
            userId
        }
    })

    if(!response){
        res.status(500).json("Something went wrong")
    }

    res.status(200).json(response);

    
 } catch (error) {
    console.log(error);
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




app.listen(3001, (error) => {
    if(error){
        console.log(error);
        return;
    }
    console.log("Server is running on - ", 3001)
})