"use client"
import { useEffect } from "react";
import LandingPage from "../component/LandingPage";
import { useUserInfo } from "../store/store";
import axios from "axios";

export default function Home() {
const {data}=useUserInfo((state)=>state);


useEffect(()=>{
(async()=>{

  try {
    axios.get('http://localhost:3000/')
  } catch (error) {
    
  }




})()
},[])



  return (
    
    <LandingPage />
  )
}
