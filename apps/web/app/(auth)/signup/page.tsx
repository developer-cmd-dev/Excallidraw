import SignupForm from '@/components/sign-up'
import { CreateUserZodSchema, SignUpUser } from '@repo/common/types.ts'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

async function page() {
const BACKEND_URL = process.env.BACKEND_URL as string;



  const handleData =async (data:SignUpUser)=>{
    "use server"
    const {success}=CreateUserZodSchema.safeParse(data);

    if (!success) {
      toast.error("Invalid credentials format. Please check your email and password.");
    }

    const response= await axios.post(`${BACKEND_URL}/signup`,data);
    if(response.status){
      redirect('/signin')
    }else{
      console.log('something went wrong')
    }
    
  }

  return (
    <SignupForm handleData={handleData} className=' rounded-md bg-[#FFFEF7] z-20'/>
  )
}

export default page