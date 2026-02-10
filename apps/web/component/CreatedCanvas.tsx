"use client"
import { Canvas } from '@repo/common/types.ts'
import React, { useEffect } from 'react'
import { useCanvasStore } from '../store/store'
import { useRouter } from 'next/navigation'

interface Props{
    canvases:Canvas[]
}
function CreatedCanvas({canvases}:Props) {

    const {canvas,addCanvas}=useCanvasStore((state)=>state)
    const router = useRouter()

    useEffect(()=>{
        addCanvas(canvases)
    },[canvases])


    return (
        <div className=' w-full flex-1'>
            
            {canvas.map((data) => (
                <div onClick={()=>{
                    router.push(`/canvas/${data.id}`)
                }} key={data.id} className='hover:bg-neutral-700 cursor-pointer    px-2 flex items-center h-10 text-sm font-normal border border-neutral-800 border-l-0 border-r-0'>
                    <div className='flex items-center justify-center gap-3 h-full w-fit font-light'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /></svg>
                        <h1 >{data.name}</h1>

                    </div>
                </div>
            ))}
        </div>
    )
}   

export default CreatedCanvas