
import { getServerSession } from 'next-auth'
import { authOption } from '../../lib/auth'
import { redirect } from 'next/navigation'
import { AuthUserPayload, Canvas } from '@repo/common/types.ts'
import Dashboard from '../../component/Dashboard'
import axios, { AxiosError } from 'axios'


const backendUrl = process.env.NEXT_BACKEND_URL;
async function page() {


  const session = await getServerSession(authOption)
  if (!session) {
    redirect('/signin')
  }


  const userData: AuthUserPayload = session.user as AuthUserPayload;


  const canvas = await fetchData(userData.access_token);
  return (
    <Dashboard canvas={canvas} authPayload={userData} />
  )
}

export default page



const fetchData = async (token: string): Promise<Canvas[]> => {
  try {
    const result = await axios.get(`${backendUrl}/canvas`, { headers: { Authorization: `Bearer ${token}` } })
    return result.data as Canvas[]
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    } else {
      throw new Error("Something went wrong")
    }
  }

}