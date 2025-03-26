import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import authOptions from "./api/auth/[...nextauth]"
import {Card, CardFooter} from "@nextui-org/react";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Spline from '@splinetool/react-spline';
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] })


  export default function SignIn({
    providers,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    useEffect(()  => {
      const lightMode = localStorage.getItem("lightMode");
      if (lightMode == "false") {
        document.documentElement.classList.add("dark");
      }else {
        document.documentElement.classList.remove("dark");
      }
    
    }, []);
    return (
      <>
        <div className={`flex flex-row items-center justify-between min-h-screen bg-[--gunmetal] dark:bg-[--gunmetal] ${inter.className}`}>
        <Spline className="absolute z-0 w-[350px] dark:hidden " scene="https://prod.spline.design/HNtmdwrcHn4KC5la/scene.splinecode" />

        <Card className=" relative z-10 md:ml-20 w-[650px] bg-[--delftblue] h-fit shadow-lg shadow-[--delftblue] hover:shadow-xl duration-300 hover:shadow-[--pompnpower] dark:bg-[--pompnpower] dark:hover:shadow-[--periwinkle] dark:shadow-[--periwinkle] rounded-lg">
            <CardHeader>
              <CardTitle className=' flex items-center text-2xl bg-gradient-to-r from-[--periwinkle] to-[--pompnpower] dark:bg-gradient-to-r dark:from-[--gunmetal] dark:to-[--pompnpower] text-transparent bg-clip-text justify-center'>Login</CardTitle>
              <CardDescription className='text-[--platinum] dark:text-[--platinum]'>Hey you! Why waste time lurking around when you could be exploring HHS Computer Science Club? Your next project is waiting, and so are your exclusive club bragging rights.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className='flex flex-col  items-start justify-between'>
            {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <Button className='mb-2 text-[--platinum] bg-[--delftblue] hover:bg-[--pompnpower] dark:text-[--platinum] dark:bg-[--pompnpower] dark:hover:bg-[--periwinkle]' onClick={() => signIn(provider.id)}>Continue with {provider.name}</Button>
            </div>
            ))}
            

            </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <h1 className='text-[--platinum] dark:text-[--platinum] m-2 '>Made With ❤️ By Soham Bhagat</h1>
            </CardFooter>
          </Card>             
        </div>
      </>
    )
  }
  
  export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)
  
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
      return { redirect: { destination: "/" } }
    }
  
    const providers = await getProviders()
  
    return {
      props: { providers: providers ?? [] },
    }
  }