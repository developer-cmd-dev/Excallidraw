"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { FormEvent, useState } from "react"

interface Props{
    children?:React.ReactNode;
    type:'blank-page'|'room-workspace'
}




export function DialogBox({children}:Props) {
    const  BACKEND_URL = process.env.NEXT_BACKEND_URL;
    const [name,setName]=useState('Untitled Project');
    const [loading,setLoading]=useState(false);

    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const response =await axios.post(`${BACKEND_URL}/blank-page`,{name:name});
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }

    }




  return (
    <Dialog >
      <form  onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Blank Canvas </DialogTitle>
            <DialogDescription>
            A short description about creating a new blank canvas. Fill out the details below and click "Save changes" to proceed.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input onChange={(e)=>setName(e.target.value)} value={name} id="name-1" name="name"  />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={loading} type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
