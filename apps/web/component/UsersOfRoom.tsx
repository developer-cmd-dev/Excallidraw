"use client"
import React, { useState } from 'react'
import {motion} from 'motion/react'
import { RoomUsers } from './Canvas'





function UsersOfRoom({users}:{users:RoomUsers[]}) {
  return (
    <motion.div
   
    className='absolute w-fit h-80  rounded-md left-2 flex flex-col  p-4 justify-between'
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