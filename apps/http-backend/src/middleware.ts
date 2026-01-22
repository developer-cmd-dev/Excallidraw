import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "./config.js";

export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;

    if(!token || !token.startsWith("Bearer ")){
        res.json("Invalid token");
        return;
    }


    const payload = jwt.verify(token,JWT_SECRET);

    if(payload){
        //@ts-ignore
        req.userId=payload.userId;
        next()
    }else{
        res.status(403).json("Unauthorized")
    }

}