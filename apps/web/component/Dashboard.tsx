
import React, { FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import DropdownMenco from './DropdownMenu'
import Card from './Card'
import { DialogBox } from './Dialog'
import { SessionProvider, useSession } from 'next-auth/react'
import { AuthUserPayload, Canvas } from '@repo/common/types.ts'
import axios, { Axios, AxiosError } from 'axios'
import { toast } from 'sonner'

interface Props {
    authPayload: AuthUserPayload;
    canvas: Canvas[]
}

function Dashboard({ authPayload, canvas }: Props) {
    const backendUrl = process.env.NEXT_BACKEND_URL
    const handleSubmit = async (data: string) => {
        "use server"

        const projectName = data.trim();
        try {
            const result = await axios.post(`${backendUrl}/blank-canvas`, { name: projectName }, {
                headers: {
                    Authorization: `Bearer ${authPayload.access_token}`
                }
            })
            console.log(result.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            }
        }



    }




    return (
        <div className='h-screen w-full bg-neutral-900 flex '>

            {/* Sidebar */}
            <div className='w-60 h-full border-r border-neutral-800 flex flex-col items-center justify-center  '>

                <div className='w-full  h-15 flex items-center justify-center'>
                    <img src="./Logo.png" alt="" className=' w-30 border invert' />
                </div>

                <div className='w-full flex-1 border-t border-neutral-800'>

                </div>



                <div className='w-full h-16 border-t border-neutral-800 flex items-center justify-center hover:bg-neutral-700 cursor-pointer  transition-all ease-in-out delay-3'>
                    <DropdownMenco authPayload={authPayload} />
                </div>
            </div>

            {/* main dashboard */}
            <div className=' h-full w-full flex-col flex '>

                {/* header */}

                <div className=' h-15  w-full flex items-center justify-end'>
                    <div className='w-1/3  flex items-center justify-end gap-1 pr-3 h-full '>
                        <Input className='w-60 h-8 bg-none border border-neutral-800 rounded-sm' placeholder='search' />
                    </div>
                </div>
                <div className=' flex-1 w-full flex flex-col gap-4   '>

                    <div className='flex gap-4 p-3 '>
                        <DialogBox handleSubmit={handleSubmit} type='blank-page'>
                            <Card className=' bg-neutral-800 cursor-pointer hover:bg-neutral-700 font-extralight p-2 text-sm h-25 w-40 flex flex-col  items-center justify-center'>
                                <div className='w-full h-3/4 flex items-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                </div>
                                <p>Create a Blank file</p>
                            </Card>
                        </DialogBox>

                        <Card className=' bg-neutral-800 cursor-pointer hover:bg-neutral-700  font-extralight p-2 text-sm h-25 w-40 flex flex-col  items-center justify-center'>
                            <div className='w-full h-3/4 flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
                            </div>
                            <p>Create and Join Team</p>
                        </Card>
                    </div>

                    <div className=' w-full flex-1'>
                      {canvas.map((data)=>(
                          <div key={data.id} className='px-2 flex items-center h-10 text-sm font-normal border border-neutral-800 border-l-0 border-r-0'>

                          <div className='flex items-center justify-center gap-3 h-full w-40 font-light'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /></svg>
                              <h1 >{data.name}</h1>

                          </div>
                      </div>
                      ))}
                    </div>
                </div>





            </div>
        </div>


    )
}

export default Dashboard