import axios from 'axios';
import { profileEnd } from 'console';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { use } from 'react';
const googleClientId = process.env.NEXT_GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.NEXT_GOOGLE_CLIENT_SECRET as string
const backendUrl = process.env.NEXT_BACKEND_URL
const JWT_SECRET = process.env.NEXTAUTH_SECRET

interface UserPayload {
    name: string;
    email: string;
    password: null;
}


export const authOption:NextAuthOptions = {
    secret: JWT_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn:'/signin'
    },
    providers: [
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
        })
    ],

    callbacks: {
        async signIn({ user }) {

            const userData: UserPayload = user as unknown as UserPayload
            console.log(userData)
            try {
                const response = await axios.post(`${backendUrl}/google-auth`, { name: userData.name, email: userData.email, password: userData.password });
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }



        },

        async jwt({ token, user, account }) {


            if (account?.provider === "google" && user?.email) {
                const res = await axios.post(`${backendUrl}/google-auth`, {
                    email: user.email,
                });

                token.userData = res.data;
            }

            return token;
        },

        async session({ session, user, token }) {
            if (token.userData) {
                session.user = {
                    ...session.user,
                    ...token.userData
                }
            }
            return session;
        }

    }
}

