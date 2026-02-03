import { UUID } from "crypto";
import { createStore } from "zustand";



interface User{
    id:UUID;
    email:string;
    token:string;
}

