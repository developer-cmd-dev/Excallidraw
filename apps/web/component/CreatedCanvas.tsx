"use client"
import { AuthUserPayload, CanvasSchema } from '@repo/common/types.ts'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FastForward, Trash } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useCanvasStore } from '../store/store'
interface Props {
    canvasPayload: CanvasSchema[]
    authPayload: AuthUserPayload
}
function CreatedCanvas({ canvasPayload, authPayload }: Props) {

    const { addCanvas, canvasData, removeCanvas } = useCanvasStore((state) => state);
    const router = useRouter()
    const backendUrl = process.env.NEXT_BACKEND_URL;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        addCanvas(canvasPayload)
    }, [canvasPayload])





    const handleDeleteDrawing = async (canvasId: string) => {
        if (canvasId) {
            try {
                setLoading(true)
                const response = await axios.delete(`${backendUrl}/delete-canvas/?canvasId=${canvasId}`, {
                    headers: {
                        Authorization: `Bearer ${authPayload.access_token}`
                    }
                })
                console.log(response)
                if (response.status === 200) {
                    setLoading(false);
                    removeCanvas(canvasId);

                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                    setLoading(false)
                }

            } finally {
                setLoading(false)
            }
        }
    }


    return (
        <div className=' w-full flex-1'>

            {canvasData.map((data) => (
                <div key={data.id} className='hover:bg-neutral-800 cursor-pointer     px-2 flex items-center justify-between h-10 text-sm font-normal border border-neutral-800 border-l-0 border-r-0'>
                    <div onClick={() => {
                        router.push(`/canvas/${data.id}`)
                    }} className='flex items-center justify-center  gap-3 h-full   text-light'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /></svg>
                        <h1 >{data.name}</h1>

                    </div>

                    <div className=' h-full w-50 flex items-center justify-center text-sm opacity-20'>
                        {data.canvasType}
                    </div>

                    <div className=' flex h-full w-fit'>
                        {loading ? <Spinner /> : <Button onClick={() => handleDeleteDrawing(data.id)} className='hover:bg-neutral-500 z-12 cursor-pointer' variant={'ghost'}>
                            <Trash />
                        </Button>}
                    </div>
                </div>



            ))}
        </div>
    )
}

export default CreatedCanvas