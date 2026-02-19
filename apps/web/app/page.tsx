"use client"
import { useEffect } from "react";
import LandingPage from "../component/LandingPage";
import { useUserInfo } from "../store/store";
import axios from "axios";
import { SessionProvider } from "next-auth/react";
<<<<<<< HEAD
=======
import { Toaster } from "sonner";
>>>>>>> master

export default function Home() {
const {data}=useUserInfo((state)=>state);






  return (
   <SessionProvider>
<<<<<<< HEAD
     
=======
    <Toaster position="top-center"/>
>>>>>>> master
     <LandingPage />
   </SessionProvider>
  )
}
