"use client"
import React, { useEffect, useState } from 'react'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { FieldGroup, Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRoomStore } from '../store/store';
import { connectSocket } from '../lib/websocket';

interface Props {
  accessToken: string;
}

function CreateRoomDialog({  accessToken }: Props) {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.NEXT_BACKEND_URL;
  const router = useRouter();
  const { roomStoreData, setRoomStoreData } = useRoomStore((state) => state)

  const createRoom = async () => {

    try {
      setLoading(true);
      const result = await axios.post(
        `${backendUrl}/create-room`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (result.status === 200) {
        setRoomStoreData(result.data);
        const socket = await connectSocket(accessToken);
        if (socket) {
          socket.send(JSON.stringify({
            type: 'create-room',
            room_id: roomStoreData?.room.roomCode
          }))

          socket.onmessage = (data) => {
            console.log(data.data)
          }
        }

      }
      router.push(`/canvas/${result.data.canvas.id}`)
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false)
    }



  }






  return (

    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button className=' border text-white bg-neutral-800 cursor-pointer hover:bg-neutral-700  font-extralight p-2 text-sm h-25 w-40 flex flex-col  items-center justify-center'>
            <div className='w-full h-3/4 flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
            </div>
            <p>Create and Join Team</p>
          </Button>

        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Create a new collaborative workspace for your team. Enter a name below and click "Save changes" to create and join the workspace.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={createRoom}>{loading ? <Spinner /> : "Save changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateRoomDialog