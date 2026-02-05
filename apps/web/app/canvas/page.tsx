"use client"
import React, { Activity, useEffect, useRef, useState, useTransition } from 'react'
import { Circle, Diamond, Minus, MoveRight, RectangleHorizontal, Section } from 'lucide-react'
import { initDraw } from '../../draw/drawingLogic';
import rough from 'roughjs'

function page() {
    const canvaRef=useRef<HTMLCanvasElement|null>(null)
    useEffect(() => {
        if(canvaRef.current){
            const rc = rough.canvas(canvaRef.current);
            initDraw(rc,canvaRef.current)
        }
    }, [canvaRef])


 

    





    return (
        <div className='relative h-screen w-full bg-neutral-900 overflow-hidden flex items-center justify-center'>

            {/* menubar */}
            <div className='absolute z-10 p-1 top-5 left-1/2 transform -translate-x-1/2 h-10 w-100 flex items-center justify-center gap-3 rounded-full bg-zinc-900'>

                {
                    shape.map((elem) => (
                        <span
                            title={elem.type}
                            
                            className={`hover:bg-slate-600 cursor-pointer  h-full w-fit p-1 px-3  flex items-center justify-center text-white rounded-xl`}
                            key={elem.type}>
                            {elem.icon}
                        </span>
                    ))
                }

            </div>

            <canvas height={800} width={1800} id='canvas' ref={canvaRef} className=' bg-black rounded-3xl ' />
        </div>
    )
}

export default page


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