import { Input } from '@/components/ui/input'
import React from 'react'
import DropdownMenu from '../../component/DropdownMenu'
import { Plus, Search } from 'lucide-react'
import Card from '../../component/Card'

function page() {
    return (
        <div className='h-screen w-full bg-neutral-900 flex'>

            {/* Sidebarf */}
            <div className='w-60 h-full border-r border-neutral-800 flex items-end justify-center  '>
                <div className='w-full h-16 border-t border-neutral-800 flex items-center justify-center hover:bg-neutral-700 cursor-pointer  transition-all ease-in-out delay-3'>
                    <DropdownMenu />
                </div>
            </div>

            {/* main dashboard */}
            <div className=' h-full w-full flex-col flex p-4 '>

                {/* header */}

                <div className=' h-15  w-full flex items-center justify-end'>
                    <div className='w-1/3  flex items-center justify-end gap-1 pr-3 h-full '>
                        <Input className='w-60 h-8 bg-none border border-neutral-800 rounded-sm' placeholder='search' />
                    </div>
                </div>
                <div className='flex-1 w-full flex gap-4  '>
                    <Card className=' bg-neutral-800  font-extralight p-2 text-sm h-25 w-40 flex flex-col  items-center justify-center'>
                        <div className='w-full h-3/4 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        </div>
                        <p>Create a Blank file</p>
                    </Card>


                    <Card className=' bg-neutral-800  font-extralight p-2 text-sm h-25 w-40 flex flex-col  items-center justify-center'>
                        <div className='w-full h-3/4 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
                        </div>
                        <p>Create and Join Team</p>
                    </Card>
                </div>

            </div>






        </div>
    )
}

export default page