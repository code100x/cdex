import { Skeleton } from "@/components/ui/skeleton";
import AssetsSkeleton from "./AssetsSkeleton";

export default function ProfileCardSkeleton(){
    return(
        <div className="pt-8 flex justify-center">
            <div className="max-w-4xl bg-white rounded shadow w-full">
                <div className="flex items-center p-12">
                    <Skeleton className="rounded-full w-20 h-20 mr-4 bg-slate-400"/>
                    <Skeleton className="h-8 w-56 bg-slate-400"/>
                </div>
                <div className="flex flex-wrap md:flex-nowrap gap-y-3 justify-center gap-x-10 pb-5 mx-12">
                    {Array(5).fill(null).map((_, i) => (
                        <Skeleton className="h-11 rounded-md px-16 bg-slate-400" key={i}/>
                    ))}
                </div>
                <AssetsSkeleton />
            </div>
        </div>
    )
}