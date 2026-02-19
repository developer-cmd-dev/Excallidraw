import axios, { Axios, AxiosError } from 'axios';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInUserZodSchema } from '@repo/common/types.ts';
const googleClientId = process.env.NEXT_GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.NEXT_GOOGLE_CLIENT_SECRET as string
const backendUrl = process.env.NEXT_BACKEND_URL
const JWT_SECRET = process.env.NEXTAUTH_SECRET

interface UserPayload {
    name: string;
    email: string;
    password: null;
}


export const authOption: NextAuthOptions = {
    secret: JWT_SECRET,
    session: {

        strategy: 'jwt',
        maxAge:60*1000
    },
    pages: {
        signIn: '/signin'
    },
    providers: [
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
        }),

        CredentialsProvider({
            name: 'credential',
            credentials: {},
            async authorize(credentials, req) {
                const userPayload = req.body;

                const { success } = SignInUserZodSchema.safeParse(userPayload);
                if (!success) {
                    return null;
                }
                try {
                    const response = await axios.post(`${backendUrl}/signin`, userPayload);
                    return response.data
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.log(error.response?.data)
                        throw new Error(error.response?.data)

                    }else{
                        console.log(error)
                    }
                }


            },
        })



    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                const userData: UserPayload = user as unknown as UserPayload
                try {
                    const response = await axios.post(`${backendUrl}/google-auth`, { name: userData.name, email: userData.email, password: userData.password });
                    return true;
                } catch (error) {
                    console.log(error)
                    return false;
                }

            }else{
                console.log('signin using credential')
                return true;
            }


        },

        async jwt({ token, user, account }) {
            if (account?.provider === "google" && user?.email) {
                const res = await axios.post(`${backendUrl}/google-auth`, {
                    email: user.email,
                });

                token.userData = res.data;
            } else if (account?.provider==='credentials') {
                token.userData = user;
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

