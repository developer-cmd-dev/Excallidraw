"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import DropdownMenco from './DropdownMenu'
import Card from './Card'
import { CreateCanvasDialog } from './CreateCanvasDialog'
import { SessionProvider, useSession } from 'next-auth/react'
import { AuthUserPayload, CanvasSchema } from '@repo/common/types.ts'
import axios, { Axios, AxiosError } from 'axios'
import { toast } from 'sonner'
import CreatedCanvas from './CreatedCanvas'
import CreateRoomDialog from './CreateRoomDialog'
import { useCanvasStore } from '../store/store'

interface Props {
    authPayload: AuthUserPayload;
}



const fetchData = async (token: string): Promise<CanvasSchema[]> => {
    const backendUrl = process.env.NEXT_BACKEND_URL;
    try {
        const result = await axios.get(`${backendUrl}/canvas`, { headers: { Authorization: `Bearer ${token}` } })
        return result.data as CanvasSchema[]
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
            throw new Error(error.response?.data)
        } else {
            throw new Error("Something went wrong");
        }


    }
}

function Dashboard({ authPayload }: Props) {

    const { canvasData, addCanvas } = useCanvasStore((state) => state)

    useEffect(() => {
        (async () => {
            const data = await fetchData(authPayload.access_token);
            addCanvas(data);
        })()
    }, [])




    return (
        <div className='h-screen w-full bg-neutral-900 flex '>

            {/* Sidebar */}
            <div className='w-60 h-full border-r border-neutral-800 flex flex-col items-center justify-center  '>

                <div className='w-full  h-15 flex items-center justify-center'>
                    <img src="./Logo.png" alt="" className=' w-30 border invert' />
                </div>

                <div className='w-full flex-1 border-t border-neutral-800'>

                </div>



                <div className='w-full h-16 border-t border-neutral-800 flex items-center justify-center hover:bg-neutral-700 cursor-pointer  transition-all ease-in-out delay-3'>
                    <DropdownMenco authPayload={authPayload} />
                </div>
            </div>

            {/* main dashboard */}
            <div className=' h-full w-full flex-col flex '>

                {/* header */}

                <div className=' h-15  w-full flex items-center justify-end'>
                    <div className='w-1/3  flex items-center justify-end gap-1 pr-3 h-full '>
                        <Input className='w-60 h-8 bg-none border border-neutral-800 rounded-sm' placeholder='search' />
                    </div>
                </div>
                <div className=' flex-1 w-full flex flex-col gap-4   '>

                    <div className='flex gap-4 p-3 '>
                        <CreateCanvasDialog access_token={authPayload.access_token} type='blank-page' />
                        <CreateRoomDialog accessToken={authPayload.access_token} />
                    </div>

                    {/* Canvas */}
                    <CreatedCanvas authPayload={authPayload} canvasPayload={canvasData} />


                </div>





            </div>
        </div>


    )
}

export default Dashboard