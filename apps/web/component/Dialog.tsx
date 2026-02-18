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
  children?: React.ReactNode;
  type: 'blank-page' | 'room-workspace',
  access_token: string;
}




export function DialogBox({ children, access_token }: Props) {
  const backendUrl = process.env.NEXT_BACKEND_URL;
  const [name, setName] = useState('Untitled Project');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const { addCanvas } = useCanvasStore((state) => state)
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
    <Dialog open={open} onOpenChange={() => setOpen(true)} >
      <form  >
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
              <Input onChange={(e) => setName(e.target.value)} value={name} id="name-1" name="name" />
            </Field>
          </FieldGroup>
          <DialogFooter>
           
              <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>

            <Button className="cursor-pointer" type="submit" onClick={() => {
              createCanvas();
            }}>{loading ? <Spinner /> : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
