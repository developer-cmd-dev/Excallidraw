"use client"

import React, { useCallback, useEffect, useRef, useState, } from 'react'
import { Circle, Diamond, Minus, MoveRight, RectangleHorizontal, } from 'lucide-react'
import rough from 'roughjs'
import axios, { Axios, AxiosError } from 'axios';
import { initDraw, redo, renderExistingCanvas, ShapesType, undo } from '../draw/drawingLogic'
import { handleType } from '../draw/drawingLogic';
import { AuthUserPayload } from '@repo/common/types.ts';
import { useParams } from 'next/navigation';
import { useCanvasStore, useRoomStore } from '../store/store';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';


interface Props {
    authData: AuthUserPayload
}



function Canvas({ authData }: Props) {
    const backendUrl= process.env.NEXT_BACKEND_URL;
    const canvaRef = useRef<HTMLCanvasElement | null>(null);
    const [innerHeight, setInnerHeight] = useState(300);
    const [innerWidth, setInnerWidth] = useState(100);
    const [drawingTabs, setDrawingTabs] = useState(0);
    const params = useParams();
    const canvasId = params.canvas_id;
    const { canvasData } = useCanvasStore((state) => state)
    const [loading,setLoading]=useState(false);
    const {roomStoreData}=useRoomStore((state)=>state)

    //render and load canvas
    useEffect(() => {
        if(!canvaRef.current)return;
            const rc = rough.canvas(canvaRef.current);
        try {
            initDraw(rc, canvaRef.current, authData.access_token, String(canvasId));
            
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error.response?.data)
            }
        }
        if (typeof window !== 'undefined') {
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth)
        }


    }, [canvaRef])


    //fetch drawing data
    useEffect(()=>{

        (async()=>{
            try {
                setLoading(true)
                if(canvasId){
                    const response=await  axios.get(`${backendUrl}/get-drawing/?canvasId=${canvasId}`);
                    renderExistingCanvas(response.data.drawing);
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if(error instanceof AxiosError){
                    toast.message(error.response?.data);
                }
            }finally{
                setLoading(false)
            }

        })()


    },[canvasData])



    //for room creation
    useEffect(() => {
      
        if(roomStoreData){
            console.log(roomStoreData)
        }

    }, [roomStoreData])
    

    //handle drawing tab switches
    const handleKeys = useCallback((event: KeyboardEvent) => {
        const key = Number(event.key);
        if (key >= 1 && key <= 5) {
            setDrawingTabs(key)
            const getType = shape.find((elem) => elem.keyBind == key);
            if (getType) {
                handleType(getType?.type)
            }
        }
    }, [])


    //handle undo and redo
    const handleUndoRedo = useCallback((e: KeyboardEvent) => {
        const isCtrlKeyPressed = e.ctrlKey;

        const isZkeyPressed = e.key == 'z';
        const isYkeyPressed = e.key == 'y';
        if (isCtrlKeyPressed && isZkeyPressed) {
            undo()
        } else if (isCtrlKeyPressed && isYkeyPressed) {
            redo()
        }
    }, [])



    useEffect(() => {

        if (typeof window !== 'undefined') {
            window.addEventListener('keypress', handleKeys);
            window.addEventListener('keydown', handleUndoRedo)
        }
    }, [handleKeys])





    return (
        
        <div className='relative h-screen w-full bg-neutral-900 overflow-hidden flex items-center justify-center'>

            {/* menubar */}
            <div className='absolute z-10 p-1 top-5 left-1/2 transform -translate-x-1/2 h-10 w-100 flex items-center justify-center gap-3 rounded-full bg-zinc-700'>

                {
                    shape.map((elem) => (
                        <span
                            title={elem.type}
                            onClick={(e) => {
                                handleType(elem.type)
                                setDrawingTabs(elem.keyBind)
                            }}
                            className={` relative hover:bg-slate-500 cursor-pointer  h-full w-fit p-2 px-4  flex items-center justify-center text-white rounded-xl`}
                            key={elem.type}
                            style={{
                                backgroundColor: drawingTabs == elem.keyBind ? "#64748b" : ""
                            }}

                        >
                            {elem.icon}
                            <p className='text-[12px] absolute bottom-0 right-2'>{elem.keyBind}</p>
                        </span>
                    ))
                }

            </div>

            <div className='border w-full h-full flex-1  flex items-center justify-center'>

                {/* {!loading ? <canvas height={innerHeight} width={innerWidth} id='canvas' ref={canvaRef} className=' bg-black ' />:<Spinner/>} */}

                <canvas height={innerHeight} width={innerWidth} id='canvas' ref={canvaRef} className=' bg-black ' />
            </div>

        </div>

    )
}

export default Canvas


interface TabsType {
    type: ShapesType;
    active: boolean;
    icon: React.ReactNode;
    keyBind: number;
}



const shape: TabsType[] = [
    {
        type: 'rec',
        active: false,
        icon: <RectangleHorizontal />,
        keyBind: 1
    },
    {
        type: 'circle',
        active: false,

        icon: <Circle />,
        keyBind: 2
    },
    {
        type: 'line',
        active: false,

        icon: <Minus />,
        keyBind: 3
    },
    {
        type: "diamond",
        active: false,

        icon: <Diamond />,
        keyBind: 4
    },
    {
        type: "arrow",
        active: false,
        icon: <MoveRight />,
        keyBind: 5
    },

]