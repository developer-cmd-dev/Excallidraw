import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config.ts";

export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    if(!token || !token.startsWith("Bearer ")){
        res.json("Invalid token");
        return;
    }


    const extractedToken = token.replace("Bearer ","");


    const payload = jwt.verify(extractedToken,JWT_SECRET);
    if(payload){
        req.userPayload=payload as {userId:string,email:string};
        next()
    }else{
        res.status(403).json("Unauthorized")
    }

}