import express from 'express';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';
import { authMiddleware } from './middleware.js';

const app = express();



app.post('/signup',(req,res)=>{

})

app.post('/signin',(req,res)=>{
    const userId = "1";

    const token = jwt.sign(userId,JWT_SECRET);
    res.json(token);
})


app.post('/room',authMiddleware,async(req,res)=>{
    
})




app.listen(3001,()=>console.log("Server is running on - ",3002))