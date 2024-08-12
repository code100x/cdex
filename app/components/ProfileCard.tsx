"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTokens } from "../api/hooks/useTokens";

import { Swap } from "./Swap";
import { Assets } from "./Assets";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileCardSkeleton from "./skeletons/ProfileCardSkeleton";


type Tab = "tokens" | "send" | "add_funds" | "swap" | "withdraw"
const tabs: {id: Tab; name: string}[] = [
    {id: "tokens", name: "Tokens"}, 
    {id: "send", name: "Send"}, 
    {id: "add_funds", name: "Add funds"},
    {id: "withdraw", name: "Withdraw"},
    {id: "swap", name: "Swap"},
];

export const ProfileCard = ({publicKey}: {
    publicKey: string
}) => {
    const session = useSession();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<Tab>("tokens");
    const { tokenBalances, loading } = useTokens(publicKey);

    if (session.status === "loading") {
        return <ProfileCardSkeleton />
    }

    if (!session.data?.user) {
        router.push("/")
        return null
    }

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full">
            <Greeting 
                image={session.data?.user?.image ?? ""} 
                name={session.data?.user?.name ?? ""} 
            />
            <div className="w-full flex justify-center gap-x-2 pb-5">
                {
                    tabs.map((tab) => 
                    <Button
                        variant={tab.id === selectedTab ? "default" : "outline"}
                        size={"lg"}
                        key={tab.id}
                        onClick={() => {setSelectedTab(tab.id)}}
                    >
                        {tab.name}
                    </Button>
                )}
            </div>
            
            <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}><Assets tokenBalances={tokenBalances} loading={loading} publicKey={publicKey} /> </div>
            <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}><Swap tokenBalances={tokenBalances} publicKey={publicKey} /> </div>
            <div className={`${(selectedTab !== "swap" && selectedTab !== "tokens") ? "visible" : "hidden"}`}><Warning /> </div>
        </div>
        
    </div>
}

function Warning() {
    return <div className="bg-slate-50 py-32 px-10 flex justify-center">
        We dont yet support this feature
    </div>
}

function Greeting({
    image, name
}: {
    image: string, name: string
}) {
    return <div className="flex p-12">
        <img src={image} className="rounded-full w-16 h-16 mr-4" />
        <div className="text-2xl font-semibold flex flex-col justify-center">
           Welcome back, {name}
        </div>
    </div>
}
