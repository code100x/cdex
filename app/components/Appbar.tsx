"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Appbar = () => {
    const session = useSession();
    const router = useRouter();

    return <div className="border-b px-2 py-2 flex justify-between">
        <div 
            className="text-xl font-bold flex flex-col justify-center" 
            role="button"
            onClick={() => router.push("/")}
        >
            DCEX
        </div>
        <div>
            {session.data?.user ? <Button onClick={() => {
                signOut()
            }}>Logout</Button> : <Button onClick={() => {
                signIn()
            }}>Signin</Button>}
        </div>
    </div>
}