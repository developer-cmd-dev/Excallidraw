"use client"
import React, { useEffect, useState } from 'react'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { FieldGroup, Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRoomStore } from '../store/store';
import { connectSocket } from '../ws/websocket';
interface Props {
  children: React.ReactNode,
  accessToken: string;
}

function CreateRoomDialog({ children, accessToken }: Props) {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.NEXT_BACKEND_URL;
  const router = useRouter();
  const {roomStoreData, setRoomStoreData } = useRoomStore((state) => state)
  const socketUrl = process.env.NEXT_WEBSOCKET_URL;
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
        const ws = connectSocket(accessToken);


        if (ws) {
          ws.send(JSON.stringify(
            {
              type: 'create-room',
              room_id: result.data.room.roomCode
            }
          ))


          ws.on('message', (data) => {
            console.log(data.toString());
          })
        }

      }
      router.push(`/canvas/${result.data.canvas.id}`)
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false)
    }



  }



  useEffect(()=>{

    if(roomStoreData){
  const ws = connectSocket(accessToken);

  if(ws){
    ws.send(JSON.stringify({
      type:"create-room",
      room_id:roomStoreData.room.roomCode
    }))



    ws.on('message',(data)=>{
      console.log(data.toString())
    })
  }


    }



  },[roomStoreData])


  return (
    <Dialog open={open} onOpenChange={() => setOpen(true)} >
      <form  >
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Workspace </DialogTitle>
            <DialogDescription>
              A short description about creating a new workspace. Fill out the details below and click "Save changes" to proceed.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input onChange={(e) => setName(e.target.value)} value={name} id="name-1" name="name" />
            </Field>
          </FieldGroup>
          <DialogFooter>

            <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>

            <Button className="cursor-pointer" type="submit" onClick={() => {
              createRoom();
            }}>{loading ? <Spinner /> : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateRoomDialog