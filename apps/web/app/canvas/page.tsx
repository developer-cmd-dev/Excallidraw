"use client"
import React, { Activity, useEffect, useRef, useState } from 'react'
import { getShapeType, initDraw } from '../../draw/drawingLogic';
import { Circle, Diamond, Minus, MoveRight, RectangleHorizontal } from 'lucide-react'
import Link from 'next/link';
function page() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [innerWidth, setInnerWidth] = useState(0);
    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.style.background = 'black'
        initDraw(canvas);
        if (typeof window !== 'undefined') {
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth);
        }
    }, [canvasRef])




    return (
        <div className='relative h-screen w-full bg-neutral-900 overflow-hidden'>

            {/* menubar */}
            <div className='absolute p-1 top-5 left-1/2 transform -translate-x-1/2 h-10 w-100 flex items-center justify-center gap-3 rounded-full bg-zinc-900'>

                {
                    shape.map((elem) => (
                        <span
                        title={elem.type}
                        onClick={()=>getShapeType(elem.type)}
                        className={ `hover:bg-slate-600 cursor-pointer  h-full w-fit p-1 px-3  flex items-center justify-center text-white rounded-xl`}
                            key={elem.type}>
                            {elem.icon}
                        </span>
                    ))
                }

            </div>

            <canvas ref={canvasRef} height={innerHeight} width={innerWidth} className='border' />



        </div>
    )
}

export default page


export type Shapes ='rec'|'circle'|'line'|'diamond'|'arrow'


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