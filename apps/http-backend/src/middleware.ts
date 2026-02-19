import e, { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config.ts";

const {TokenExpiredError}= jwt;


export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    if(!token || !token.startsWith("Bearer ")){
        res.json("Invalid token");
        return;
    }


    const extractedToken = token.replace("Bearer ","");

   try {
    const payload = jwt.verify(extractedToken,JWT_SECRET);
    if(payload){
        req.userPayload=payload as {userId:string,email:string};
        next()
    }else{
        res.status(403).json("Unauthorized")
    }

   } catch (error) {
    if(error instanceof TokenExpiredError){
        console.log(error.message)
        res.status(404).json(error.message)
    }
   }
}