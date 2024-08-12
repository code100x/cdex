"use client";

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Hero = () => {
    const session = useSession();
    const router = useRouter();

    return <div>
        <div className="text-6xl font-medium">
            <span>
            The Indian Cryptocurrency
            </span>
            
            <span className="text-blue-500 pl-4"> 
                Revolution
            </span>
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Create a frictionless wallet from India with just a Google Account.
        </div>
        <div className="flex justify-center pt-2 text-2xl text-slate-500">
            Convert your INR into Cryptocurrency
        </div>
        <div className="pt-8 flex justify-center">
            {session.data?.user ? <Button onClick={() => {
                router.push("/dashboard");
            }}>Go to Dashboard</Button> : <Button onClick={() => {
                signIn("google");
            }}>Login with Google</Button>}
        </div>
    </div>
}