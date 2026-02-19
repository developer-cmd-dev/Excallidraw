
import { getServerSession, Session } from 'next-auth'
import { authOption } from '../../lib/auth'
import { redirect } from 'next/navigation'
import { AuthUserPayload, CanvasSchema } from '@repo/common/types.ts'
import Dashboard from '../../component/Dashboard'
import axios, { AxiosError } from 'axios'


const backendUrl = process.env.NEXT_BACKEND_URL;
async function page() {



  const session = await getServerSession(authOption);
  if (!session) {
    redirect('/signin')

  }


  const userData: AuthUserPayload = session.user as AuthUserPayload;

  return (
    <Dashboard  authPayload={userData} />
  )

}

export default page




