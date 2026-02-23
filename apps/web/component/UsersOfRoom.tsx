"use client"
import React, { useEffect, useState } from 'react'
import {motion} from 'motion/react'
import { RoomUsers } from './Canvas'
import { SocketUser } from '@repo/common/types.ts'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'





function UsersOfRoom({users}:{users:SocketUser[]}) {

    const [onHover,setOnHover]=useState<{userId:string}>({userId:''})

  return (
    <div
   
    className='absolute  w-30  h-80  rounded-md left-2 flex flex-col  p-4 gap-2'
    >


{
    users.map((element)=>(
      <motion.div 
        whileHover={
            {
                width:'190px',
                backgroundColor:"#94a3b8"
            }
        }
        onHoverStart={()=>{
            setOnHover({userId:element.userId})
        }}
        onHoverEnd={()=>{
            setOnHover({userId:''})
        }}
      className='w-13 h-13 cursor-pointer bg-gray-300 rounded-3xl rounded-bl-none text-black flex items-center justify-center text-md '>
        {
            onHover.userId===element.userId ? <p>@{element.email.replace("@gmail.com",'')}</p>:<p>{element.email[0].toUpperCase()}</p>
        }
      </motion.div>    
    ))  
}



    </div>
  )
}





const arr=[1,2,3,4]

export default UsersOfRoom