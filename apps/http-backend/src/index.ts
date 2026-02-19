import express, { response } from 'express';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config.ts";
import { authMiddleware } from './middleware.js';
<<<<<<< HEAD
import { AuthUserPayload, CreateUserZodSchema, Room, SignInUserZodSchema, SignUpUser } from '@repo/common/types.ts';
import { prisma } from '@repo/db/prisma.ts';
import  bycrypt, { hash } from 'bcrypt';
=======
import {  CreateUserZodSchema, SignUpUser } from '@repo/common/types.ts';
import { prisma } from '@repo/db/prisma.ts';
import bycrypt, { hash } from 'bcrypt';
>>>>>>> master
import bodyparser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser'
<<<<<<< HEAD


=======
import redisClient from '@repo/backend-common/redis.ts'
import _, { chain, result } from 'lodash'
>>>>>>> master


const app = express();
app.use(bodyparser.json())
app.use(cors())
app.use(cookieParser())

<<<<<<< HEAD
=======
redisClient.on('message', (channel, data) => {
    console.log(channel, data)
})

>>>>>>> master


app.post('/signup', async (req, res) => {
    try {

        const body = req.body as SignUpUser;
        const { success } = CreateUserZodSchema.safeParse(body);
        if (!success) {
            res.json("Invalid input");
            return;
        }

<<<<<<< HEAD
        const checkUserExistOrNot = await prisma.user.findUnique({where:{email:body.email}});

        if(checkUserExistOrNot){
=======
        const checkUserExistOrNot = await prisma.user.findUnique({ where: { email: body.email } });

        if (checkUserExistOrNot) {
>>>>>>> master
            res.status(409).json("User already exist");
            return;
        }

<<<<<<< HEAD
        const hashedPassword =await bycrypt.hash(body.password,5);

        await prisma.user.create({
            data:{
                ...body,
                password:hashedPassword
            }
        })

        res.status(200).json({message:'Signed up sccessfully',data:null});
=======
        const hashedPassword = await bycrypt.hash(body.password, 5);

        await prisma.user.create({
            data: {
                ...body,
                password: hashedPassword
            }
        })

        res.status(200).json({ message: 'Signed up sccessfully', data: null });
>>>>>>> master

    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }


})

<<<<<<< HEAD
app.post('/google-auth',async(req,res)=>{
    const {name,email }=req.body;

    try {
        const checkUserExist =await prisma.user.findUnique({where:{email},include:{rooms:true,canvas:true}});
        if(checkUserExist){
        const token = jwt.sign({userId:checkUserExist.id,email:checkUserExist.email},JWT_SECRET,{expiresIn:60*1000});
            const responseData = {
                ...checkUserExist,
                access_token:token
=======
app.post('/google-auth', async (req, res) => {
    const { name, email } = req.body;

    try {
        const checkUserExist = await prisma.user.findUnique({ where: { email }, include: { rooms: true, canvas: true } });
        if (checkUserExist) {
            const token = jwt.sign({ userId: checkUserExist.id, email: checkUserExist.email }, JWT_SECRET, { expiresIn: 60 * 1000 });
            const responseData = {
                ...checkUserExist,
                access_token: token
>>>>>>> master
            }
            res.status(200).json(responseData);
            return;
        }

        await prisma.user.create({
<<<<<<< HEAD
            data:{
                email,
                name
            },
            include:{
                rooms:true,
                
=======
            data: {
                email,
                name
            },
            include: {
                rooms: true,

>>>>>>> master
            }
        })

        res.status(200).json("User created successfully");
    } catch (error) {
        console.log(error);
<<<<<<< HEAD
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
=======
        res.status(500).json("Something went wrong")
    }
})

app.post('/signin', async (req, res) => {
    const body = req.body as { email?: string; password?: string };

    if (!body.email || !body.password) {
        return res.status(400).json("Email and password required");
    }

    try {

        const getUserFromDb = await prisma.user.findUnique({
            where: { email: body.email },
            include: {
                rooms: true,
                canvas: true,
            }
>>>>>>> master

        });

        console.log(getUserFromDb)

<<<<<<< HEAD
        if(!getUserFromDb){
            res.status(404).json("User not found");
            return;
        }
        const verifyPassword =await bycrypt.compare(body.password,getUserFromDb.password||'');
        if(!verifyPassword){
=======
        if (!getUserFromDb) {
            res.status(404).json("User not found");
            return;
        }
        const verifyPassword = await bycrypt.compare(body.password, getUserFromDb.password || '');
        if (!verifyPassword) {
>>>>>>> master
            res.status(401).json("Invalid credentials");
            return;
        }

<<<<<<< HEAD
        const token = jwt.sign({userId:getUserFromDb.id,email:getUserFromDb.email},JWT_SECRET,{expiresIn:60*1000});
        const responseData= {
            ...getUserFromDb,
            access_token:token,
=======
        const token = jwt.sign({ userId: getUserFromDb.id, email: getUserFromDb.email }, JWT_SECRET, { expiresIn: 60 * 1000 });
        const responseData = {
            ...getUserFromDb,
            access_token: token,
>>>>>>> master
        }
        res.status(200).json(responseData)
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong")
    }


})

<<<<<<< HEAD
app.get('/canvas',authMiddleware, async(req,res)=>{
    try {
       const result = await prisma.canvas.findMany({where:{userId:req.userPayload.id},take:10,include:{drawing:true}});
       res.status(200).json(result)
=======
app.get('/canvas', authMiddleware, async (req, res) => {
    try {

        const cache = await redisClient.get(req.userPayload.userId);
        if (cache && JSON.parse(cache).length > 0) {
            res.status(200).json(JSON.parse(cache));
        } else {
            const result = await prisma.canvas.findMany({ where: { userId: req.userPayload.userId }, take: 10 });
            redisClient.set(req.userPayload.userId, JSON.stringify(result), { expiration: { type: 'EX', value: 6000 } });
            res.status(200).json(result)
        }
>>>>>>> master
    } catch (error) {
        res.status(500).json("Internal Server error");
    }
})


<<<<<<< HEAD
app.post('/blank-canvas',authMiddleware,async(req,res)=>{
 try {
    const {name}=req.body as {name:string};
    if(!name && name.length==0){
        res.status(204).json("Invalid Formate");
        return;
    }
    const userId = req.userPayload.id;

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
    res.status(500).json("Something went wrong");
    return;
 }
=======
app.post('/blank-canvas', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body as { name: string };
        if (!name && name.length == 0) {
            res.status(204).json("Invalid Formate");
            return;
        }
        const userId = req.userPayload.userId;

        const response = await prisma.canvas.create({
            data: {
                name,
                userId
            }
        })

        redisClient.del(userId);

        if (!response) {
            res.status(500).json("Something went wrong")
        }

        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
        return;
    }


})

app.delete('/delete-canvas', authMiddleware, async (req, res) => {

    const canvasId = req.query.canvasId?.toString();    
    try {
        if (!canvasId) {
            res.status(400).json("Invalid id");
            return
        }
        const result = await prisma.canvas.delete({ where: { id: canvasId } });
        const cacheDel = await redisClient.del(req.userPayload.userId);
        res.status(200).json('Deleted');
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }



})

app.post('/save-drawing', authMiddleware, async (req, res) => {
    const body = req.body;
    try {
        debounce(body)

        if (body.canvasId) {
            await debounce(body);
            if (response) {
                res.status(200).json('data saved');
            }

        }
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})



app.get('/get-drawing', async (req, res) => {

    const canvasId = req.query.canvasId?.toString();


    try {

        if (!canvasId) {
            res.status(401).json("Invalid Id");
            return;
        }

        const cache = await redisClient.get(canvasId);
        if (cache) {
            res.status(200).json(JSON.parse(cache));
            return;
        }
        const result = await prisma.canvas.findUnique({ where: { id: canvasId } });
        if (!result) {
            res.status(404).json("Drawing not found");
            return
        }


        redisClient.set(canvasId, JSON.stringify(result));
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json('Internal server error');
    }


>>>>>>> master


})


<<<<<<< HEAD



app.post('/room', authMiddleware, async (req, res) => {

    const body = req.body as Room;
    try {
     const response = await prisma.room.create({data:body});
     res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
=======
async function debounceOperation(body: any) {

    if (body) {
        redisClient.del(body.canvasId);
        const response = await prisma.canvas.update({
            where: { id: body.canvasId },
            data: {
                drawing: {
                    push: JSON.stringify(body)
                }
            }

        })

        if (response) {
            redisClient.set(response.id, JSON.stringify(response));
        }

    }

}

const debounce = _.debounce(debounceOperation, 1000)




app.post('/create-room', authMiddleware, async (req, res) => {

    const body = req.body;
    if (!body) {
        res.status(400).json("Bad request");
    }
    try {

        const roomCode = Math.floor(Math.random() * 10000);

        const roomResult = await prisma.room.create({
            data: {
                name: body.name,
                roomCode,
                adminId: req.userPayload.userId,
                canvas:{
                    create:[{
                        name:body.name,
                        userId:req.userPayload.userId,
                        canvasType:"WORKSPACE",
                    }]
                }
            },
            include:{canvas:true}
        })

    //   const canvasResult = await  prisma.canvas.create({
    //         data:{
    //             name:"room canvas",
    //             userId:req.userPayload.userId,
    //             roomId:roomResult.roomCode,
    //             canvasType:body.canvasType
    //         }
    //     })

    console.log(roomResult)

        res.status(200).json("created room");


    } catch (error) {

        res.status(500).json('Internal Server Error');
>>>>>>> master
    }


})


<<<<<<< HEAD


app.listen(3001, (error) => {
    if(error){
=======
app.get('/get-room',authMiddleware,async(req,res)=>{
    const roomCode = req.query.roomCode?.toString()


    if(!roomCode){
        res.status(400).json("invalid room code");
        return
    }
    try {
      const result = await  prisma.room.findUnique({where:{roomCode:Number(roomCode)},include:{canvas:true}});
      res.status(200).json(result)
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
})




app.listen(3001, (error) => {
    if (error) {
>>>>>>> master
        console.log(error);
        return;
    }
    console.log("Server is running on - ", 3001)
})