import React from 'react'
import Canvas from '../../component/Canvas'
import { getServerSession } from 'next-auth'
import { authOption } from '../../lib/auth'
import { redirect } from 'next/navigation';

 async function page() {


    const authData =await getServerSession(authOption);
    
    if(!authData){
        redirect('/signin')
    }


  return (
    <Canvas/>
  )
}

export default page