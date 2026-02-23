"use client"
import React, { useEffect, useState } from 'react'
import {motion} from 'motion/react'
import { RoomUsers } from './Canvas'
import { SocketUser } from '@repo/common/types.ts'





function UsersOfRoom({users}:{users:SocketUser[]}) {

    useEffect(()=>{
        console.log(users)
    },[users])


  return (
    <motion.div
   
    className='absolute border w-fit h-80  rounded-md left-2 flex flex-col  p-4 gap-2'
    >

{
    users.map((element)=>(
        <motion.div
        whileHover={{
            width:'160px'
        }
    }
        key={element.userId} className='bg-white p-2 h-15  w-15 rounded-full text-black flex items-center justify-center'>
            <h1>{element.email[0].toUpperCase()}</h1>
        </motion.div>
    ))  
}


    </motion.div>
  )
}





const arr=[1,2,3,4]

export default UsersOfRoom