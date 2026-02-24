"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { SocketUser } from '@repo/common/types.ts'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'




function UsersOfRoom({ users }: { users: SocketUser[] }) {

  const [onHover, setOnHover] = useState<{ userId: string }>({ userId: '' })

  return (
    //     <div

    //     className='absolute  w-30  h-80  rounded-md left-2 flex flex-col  p-4 gap-2'
    //     >


    // {
    //     users.map((element)=>(
    //       <motion.div 
    //         whileHover={
    //             {
    //                 width:'190px',
    //                 backgroundColor:"#7dd3fc"
    //             }
    //         }
    //         onHoverStart={()=>{
    //             setOnHover({userId:element.userId})
    //         }}
    //         onHoverEnd={()=>{
    //             setOnHover({userId:''})
    //         }}

    //         style={{
    //             backgroundColor:!element.active ? "red":'gray'
    //         }}
    //         key={element.userId}
    //       className='w-13 h-13 cursor-pointer bg-gray-300 rounded-3xl rounded-bl-none text-black flex items-center justify-center text-md '>
    //         {
    //             onHover.userId===element.userId ? <p>@{element.email.replace("@gmail.com",'')}</p>:<p>{element.email[0].toUpperCase()}</p>
    //         }
    //       </motion.div>    
    //     ))  
    // }



    //     </div>

    <div className='absolute top-5 right-50'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='default' className='bg-green-300'>Users</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={20} className='border-none w-40 flex flex-col gap-3'>
          {
            users.map((data) => (
              <PopoverHeader key={data.userId} className='flex flex-row gap-4 items-center justify-between  '>
                <PopoverDescription>@{data.email.replace("@gmail.com", "")}</PopoverDescription>
                <div className='w-2 h-2 rounded-full'
                  style={{
                    backgroundColor:data.active?"#4ade80":"#a1a1aa"
                  }}
                ></div>
              </PopoverHeader>
            ))
          }
        </PopoverContent>
      </Popover>
    </div>

  )
}





const arr = [1, 2, 3, 4]

export default UsersOfRoom