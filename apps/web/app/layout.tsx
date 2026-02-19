import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

<<<<<<< HEAD
export const metadata: Metadata = {
=======
 export const metadata: Metadata = {
>>>>>>> master
  title: "InkOS",
  description: "InkOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" >
    <body className={`${geistSans.variable} ${geistMono.variable} font-normal `  }>
<<<<<<< HEAD
    <Toaster position="top-center"/>
    {children}
=======
    {children}
    <Toaster position="top-center"/>
>>>>>>> master
      </body>
    </html>
  );
}
