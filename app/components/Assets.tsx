import { TokenWithbalance } from "../api/hooks/useTokens";
import { QrDialog } from "./QrDialog";
import { TokenList } from "./TokenList";
import AssetsSkeleton from "./skeletons/AssetsSkeleton";

export const Assets = ({ publicKey, tokenBalances, loading }: {
    publicKey: string;
    tokenBalances: {
        totalBalance: number,
        tokens: TokenWithbalance[]
    } | null;
    loading: boolean;
}) => {

    if (loading) {
        return <AssetsSkeleton />
    }

    return (
        <div className="text-slate-500">
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
                    <QrDialog publicKey={publicKey} />
                </div>
            </div>

            <div className="pt-4 bg-slate-50 p-12 mt-4">
                <TokenList tokens={tokenBalances?.tokens || []} />
            </div>
        </div>
    )
}
