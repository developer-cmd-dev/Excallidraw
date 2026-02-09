import { cn } from '@/lib/utils'
import React from 'react'

interface Props{
  className?:string;
  children?:React.ReactNode
}

function Card({className,children}:Props) {
  return (
    <div className={cn('w-45 h-50 border rounded-md',className)}>
      {children}
    </div>
  )
}

export default Card