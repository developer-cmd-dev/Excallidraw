"use client"
import { useEffect } from "react";
import LandingPage from "../component/LandingPage";
import { useUserInfo } from "../store/store";
import axios from "axios";
import { SessionProvider } from "next-auth/react";

export default function Home() {
const {data}=useUserInfo((state)=>state);






  return (
   <SessionProvider>
     
     <LandingPage />
   </SessionProvider>
  )
}
