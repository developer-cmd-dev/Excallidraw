"use client"
import React, { useEffect, useRef, } from 'react'
import { Axis3D, Circle, Diamond, Minus, MoveRight, RectangleHorizontal, } from 'lucide-react'
import rough from 'roughjs'
import axios from 'axios';
import { SessionProvider, useSession } from 'next-auth/react';
import { initDraw } from '../draw/drawingLogic'
import { handleType } from '../draw/drawingLogic';

function Canvas() {
    const BACKEND_URL = process.env.NEXT_BACKEND_URL;
    const canvaRef = useRef<HTMLCanvasElement | null>(null);
    const { data: session, status } = useSession()
    useEffect(() => {
        if (canvaRef.current) {
            const rc = rough.canvas(canvaRef.current);
            initDraw(rc, canvaRef.current)
        }


        (async () => {
            if (!status) {
                try {
                    const getCanvasData = await axios.get(`${BACKEND_URL}/get-canvas`);
                    console.log(getCanvasData.data)
                } catch (error) {
                    console.log(error)
                }
            }
        })()


    }, [canvaRef,session])





    return (
            <div className='relative h-screen w-full bg-neutral-900 overflow-hidden flex items-center justify-center'>

                {/* menubar */}
                <div className='absolute z-10 p-1 top-5 left-1/2 transform -translate-x-1/2 h-10 w-100 flex items-center justify-center gap-3 rounded-full bg-zinc-700'>

                    {
                        shape.map((elem) => (
                            <span
                                title={elem.type}
                                onClick={(e) => handleType(elem.type)}
                                className={`hover:bg-slate-600 cursor-pointer  h-full w-fit p-1 px-3  flex items-center justify-center text-white rounded-xl`}
                                key={elem.type}>
                                {elem.icon}
                            </span>
                        ))
                    }

                </div>

                <canvas height={950} width={1900} id='canvas' ref={canvaRef} className=' bg-black rounded-3xl ' />
            </div>

    )
}

export default Canvas


export type Shapes = 'rec' | 'circle' | 'line' | 'diamond' | 'arrow'


const shape = [
    {
        type: 'rec',
        active: false,
        icon: <RectangleHorizontal />
    },
    {
        type: 'circle',
        active: false,
        icon: <Circle />
    },
    {
        type: 'line',
        active: false,
        icon: <Minus />
    },
    {
        type: "diamond",
        active: false,
        icon: <Diamond />
    },
    {
        type: "arrow",
        acitve: false,
        icon: <MoveRight />
    },

]