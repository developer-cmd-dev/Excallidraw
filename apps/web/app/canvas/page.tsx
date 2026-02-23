import React from 'react'
import Canvas from '../../component/Canvas'
import { getServerSession } from 'next-auth'
import { authOption } from '../../lib/auth'
import { redirect } from 'next/navigation';
import { AuthUserPayload } from '@repo/common/types.ts';

 async function page() {


    const authData:AuthUserPayload =await getServerSession(authOption) as AuthUserPayload;
    
    if(!authData){
        redirect('/signin')
    }


  return (
    <Canvas authData={authData}/>
  )
}

export default page