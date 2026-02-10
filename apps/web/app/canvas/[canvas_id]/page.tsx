import React from 'react'
import Canvas from '../../../component/Canvas'
import { getServerSession } from 'next-auth'
import { authOption } from '../../../lib/auth'
import { redirect } from 'next/navigation';
import { AuthUserPayload } from '@repo/common/types.ts';

 async function page() {


    const authData =await getServerSession(authOption);
    
    if(!authData){
        redirect('/signin')
    }



  return (
    <Canvas authData={authData.user as AuthUserPayload}/>
  )
}

export default page