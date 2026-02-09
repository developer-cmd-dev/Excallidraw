import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";


declare module 'next-auth'{
    interface Session{
        userData:UserData & DefaultSession['user']
    }

    interface User {
        id: string;
        role: string;
        accessToken: string;
      }

}

interface UserData{
    id:string;
    name:string;
    email:string;
    rooms:[];
    canvas:[];
}


