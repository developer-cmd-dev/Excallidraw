"use client"
import React, { useEffect, useState } from 'react'


interface Props{
    cursorPosition:{
        x:number,
        y:number
    }
    data:string;
    
}

function CurstomCursor({cursorPosition,data}:Props) {
   

  return (
    <div  className='absolute  flex gap-2'
    style={{
        top:cursorPosition.y,
        left:cursorPosition.x
    }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse-pointer2-icon lucide-mouse-pointer-2"><path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/></svg>
        <span className='text-[15px] bg-white p-1 text-black rounded-md'>@{data.replace("@gmail.com","")}</span>
    </div>
  )
}

export default CurstomCursor