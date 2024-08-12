import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";

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
import { Button } from "@/components/ui/button";
import { Check, CopyIcon, Info } from "lucide-react";

export const QrDialog = ({ publicKey }: { publicKey: string }) => {
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

                            {copied ? <Check /> : <CopyIcon />}
                        </button>
                    </div>
                    <div className="flex mt-3 items-center gap-x-3">
                        <Info className="h-4 w-4" />
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