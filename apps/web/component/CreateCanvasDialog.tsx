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
import { Spinner } from "@/components/ui/spinner"
import axios, { AxiosError } from "axios"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { useCanvasStore } from "../store/store"
import { useRouter } from "next/navigation"

interface Props {
  type: 'blank-page' | 'room-workspace',
  access_token: string;
}




export function CreateCanvasDialog({  access_token }: Props) {
  const backendUrl = process.env.NEXT_BACKEND_URL;
  const [name, setName] = useState('Untitled Project');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const { addCanvas, canvasData } = useCanvasStore((state) => state)
  const router = useRouter();
  const createCanvas = async () => {
    try {
      const fileName = name.trim();
      if (!fileName) {
        toast.warning('Empty File name');
        return
      }
      setLoading(true)

      const result = await axios.post(`${backendUrl}/blank-canvas`, { name: fileName }, { headers: { Authorization: `Bearer ${access_token}` } });
      addCanvas(result.data)
      setLoading(false)
      setOpen(false);
      router.push(`/canvas/${result.data.id}`)
    } catch (error) {
      if (error instanceof AxiosError) {

        toast.error(error.response?.data);
        setLoading(false);
        setOpen(false);
      }
    }
  }



  return (



    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button className=' bg-neutral-800 text-white border cursor-pointer hover:bg-neutral-700 font-extralight p-2 text-sm h-25 w-40 flex flex-col  items-center justify-center'>
            <div className='w-full h-3/4 flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </div>
            <p>Create a Blank file</p>
          </Button>

        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Canvas</DialogTitle>
            <DialogDescription>
            Create a new blank canvas by entering a name below. Click "Save changes" to create your canvas.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={createCanvas}>{loading ?<Spinner/>:"Save changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
