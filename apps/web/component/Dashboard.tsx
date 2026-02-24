"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import DropdownMenco from './DropdownMenu'
import Card from './Card'
import { CreateCanvasDialog } from './CreateCanvasDialog'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { AuthUserPayload, CanvasSchema } from '@repo/common/types.ts'
import axios, { Axios, AxiosError, toFormData } from 'axios'
import { toast } from 'sonner'
import CreatedCanvas from './CreatedCanvas'
import CreateRoomDialog from './CreateRoomDialog'
import { useCanvasStore } from '../store/store'
import { Spinner } from '@/components/ui/spinner'
import JoinRoomDialog from './JoinRoomDialog'

interface Props {
    authPayload: AuthUserPayload;
}



const fetchData = async (token: string): Promise<AuthUserPayload> => {
    const backendUrl = process.env.NEXT_BACKEND_URL;
    try {
        const result = await axios.get(`${backendUrl}/canvas`, { headers: { Authorization: `Bearer ${token}` } })
        return result.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
            signOut()
            toast.message("Session Expired")
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
            addCanvas(data.canvas);
        })()
    }, [])




    return (
        // <div className='h-screen w-full bg-neutral-900 flex '>

        //     {/* Sidebar */}
        //     <div className='w-60 h-full border-r border-neutral-800 flex flex-col items-center justify-center  '>

        //         <div className='w-full  h-15 flex items-center justify-center'>
        //             <img src="./Logo.png" alt="" className=' w-30 border invert' />
        //         </div>

        //         <div className='w-full flex-1 border-t border-neutral-800'>

        //         </div>



        //         <div className='w-full h-16 border-t border-neutral-800 flex items-center justify-center hover:bg-neutral-700 cursor-pointer  transition-all ease-in-out delay-3'>
        //             <DropdownMenco authPayload={authPayload} />
        //         </div>
        //     </div>

        //     {/* main dashboard */}
        //     <div className=' h-full w-full flex-col flex  '>

        //         {/* header */}

        //         <div className=' h-15  w-full flex items-center justify-end'>
        //             <div className='w-1/3  flex items-center justify-end gap-1 pr-3 h-full '>
        //                 <Input className='w-60 h-8 bg-none border border-neutral-800 rounded-sm' placeholder='search' />
        //             </div>
        //         </div>
        //         <div className=' flex-1 w-full flex flex-col gap-4   '>

        //             <div className='flex gap-4 p-3 '>
        //                 <CreateCanvasDialog access_token={authPayload.access_token} type='blank-page' />
        //                 <CreateRoomDialog accessToken={authPayload.access_token} />
        //                 <JoinRoomDialog accessToken={authPayload.access_token}/>
        //             </div>

        //             <div className=' h-full  '>
        //             <CreatedCanvas authPayload={authPayload} canvasPayload={canvasData} />

        //             </div>


        //         </div>





        //     </div>
        // </div>


        <div className="min-h-screen w-full bg-neutral-900 flex flex-col md:flex-row">

            {/* Sidebar */}
            <div className="hidden md:flex md:w-60 w-full h-16 md:h-auto border-b md:border-b-0 md:border-r border-neutral-800 flex-col items-center">

                {/* Logo */}
                <div className="w-full h-16 flex items-center justify-center">
                    <img src="./Logo.png" alt="logo" className="w-24 invert" />
                </div>

                {/* Middle Empty Space */}
                <div className="hidden md:block w-full flex-1 border-t border-neutral-800" />

                {/* Dropdown */}
                <div className="w-full h-16 border-t border-neutral-800 flex items-center justify-center hover:bg-neutral-700 cursor-pointer transition-all">
                    <DropdownMenco authPayload={authPayload} />
                </div>
            </div>

            {/* Main Dashboard */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <div className="h-16 w-full flex items-center justify-between md:justify-end px-3 border-b border-neutral-800">

                    {/* Mobile Logo (shown only on small screens) */}
                    <div className="md:hidden">
                        <img src="./Logo.png" alt="logo" className="w-20 invert" />
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-1/3 flex items-center justify-end">
                        <Input
                            className="w-full md:w-40 h-8 bg-transparent border border-neutral-800 rounded-sm px-2"
                            placeholder="Search"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-4 p-3">

                    {/* Buttons Section */}
                    <div className="flex flex-row flex-wrap gap-4 ">
                        <CreateCanvasDialog
                            access_token={authPayload.access_token}
                            type="blank-page"
                        />
                        <CreateRoomDialog accessToken={authPayload.access_token} />
                        <JoinRoomDialog accessToken={authPayload.access_token} />
                    </div>

                    {/* Canvas Section */}
                    <div className="flex-1">
                        <CreatedCanvas
                            authPayload={authPayload}
                            canvasPayload={canvasData}
                        />
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Dashboard