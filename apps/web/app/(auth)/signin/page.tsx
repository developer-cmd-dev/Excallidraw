"use server"
import LoginPage from '@/components/login'
import { SignInUser, SignInUserZodSchema } from '@repo/common/types.ts'
import axios, { AxiosError } from 'axios'
import { Axis3D } from 'lucide-react'
import React, { FormEvent, use } from 'react'
import { toast } from 'sonner'


const  BACKEND_URL = process.env.BACKEND_URL;

const fetchUser = async (data:SignInUser)=>{
  try {
    const response = await axios.post(`${BACKEND_URL}/signin`,data);
    if(response.status==200) {
     return response.data;
    } 
   } catch (error) {
      if(error instanceof AxiosError){
        if(error.status===401){
          return {error:"Invalid Credential"};
        }else{
          return {error:"Something went wrong"};
        }
      }
   }
  
}



async function page() {
  let error:string|null = null;

  const handleData = async (data: SignInUser) => {
    'use server'
  
    const { success } = SignInUserZodSchema.safeParse(data);
    if (!success) {
      error = "Invalid credentials format. Please check your email and password.";
    }
    const userData = await fetchUser(data);
    if(userData.error){
      error=userData.error;
    }
  
  
  }
  


  return (
    <LoginPage error={error} handleData={handleData} className='bg-white z-10 ' />
  )
}

export default page