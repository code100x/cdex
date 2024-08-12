"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TokenWithbalance, useTokens } from "../api/hooks/useTokens";
import { useQRCode } from 'next-qrcode';


import { TokenList } from "./TokenList";
import { Swap } from "./Swap";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Check, CopyIcon, Info } from "lucide-react";
  


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
        // TODO: replace with a skeleton
        return <div>
            Loading...
        </div>
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

function Assets({publicKey, tokenBalances, loading}: {
    publicKey: string;
    tokenBalances: {
        totalBalance: number,
        tokens: TokenWithbalance[]
    } | null;
    loading: boolean;
}) {

    if (loading) {
        return "Loading..."
    }

    return <div className="text-slate-500">
        <div className="mx-12 py-2">
            Account assets
        </div>
        <div className="flex justify-between mx-12">
            <div className="flex">
                <div className="text-5xl font-bold text-black">
                    ${tokenBalances?.totalBalance}
                </div>
                <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-0 pl-2">
                    USD
                </div>
            </div>

            <div>
                <QrDialog publicKey={publicKey}/>
            </div>
        </div>

        <div className="pt-4 bg-slate-50 p-12 mt-4">
            <TokenList tokens={tokenBalances?.tokens || []} />
        </div>
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

function QrDialog({ publicKey } : { publicKey: string}) {
    const { Canvas } = useQRCode();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            let timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Your wallet address
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="text-center">
                            Your Wallet Address
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        <div className="text-center">
                            You can deposit crypto or NFTs into your account via this Solana wallet address:
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col justify-center items-center py-4">
                    <Canvas
                        text={publicKey}
                        options={{
                            width: 300,
                        }}
                    />
                    <div 
                        className="relative flex h-12 w-full cursor-pointer items-center justify-between rounded-full border border-grey-100 bg-white px-4 css-0"
                    >
                        <div className="inline-flex w-full text-center text-foreground css-0">
                            <div className="w-full text-center text-foreground css-0">
                                {publicKey.slice(0, 4)}
                                <span className="text-gray-400">....</span>
                                {publicKey.slice(-4)}
                            </div>                                        
                        </div>
                        <button 
                            className="flex items-center justify-center absolute right-[5px] top-[50%] translate-y-[-50%]"
                            onClick={() => {
                                navigator.clipboard.writeText(publicKey)
                                setCopied(true)
                            }}
                        >
                            
                            {copied ? <Check/> : <CopyIcon/>}
                        </button>
                    </div>
                    <div className="flex mt-3 items-center gap-x-3">
                        <Info className="h-4 w-4"/>
                        <span className="text-xs text-muted-foreground">Only send crypto to this address via the Solana network.</span>
                    </div>
                </div>

                <DialogFooter>
                    <div className="w-full flex justify-between">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 mr-2"
                        >
                            <a href={`https://solscan.io/account/${publicKey}`} target="_blank">View on SolScan</a>
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" size="lg" className="flex-1 ml-2">Done</Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}