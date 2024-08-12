import { Skeleton } from "@/components/ui/skeleton";

export default function AssetsSkeleton() {
    return (
      <div
        className="w-full"
      >
        <div className="flex md:justify-between items-center mx-12 md:py-5 py-2 flex-wrap justify-center md:gap-x-0 gap-x-6">
            <div>
                <Skeleton className="w-28 h-4 bg-slate-300 mb-2" />
                <Skeleton className="w-48 h-16 bg-slate-300" />
            </div>
            <Skeleton className="w-48 h-10 bg-slate-300 mt-10" />
        </div>

        {
            Array(4).fill(null).map((_, i) => (
                <div className="flex justify-between pb-1" key={i}>
                    <div className="flex pt-2 ps-10">
                        <Skeleton className="h-16 w-16 rounded-full mr-2 bg-slate-300" />
                        <div className="mt-3">
                            <Skeleton className="h-4 w-20 bg-slate-300" />
                            <Skeleton className="h-4 w-48 bg-slate-300 mt-2" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mr-5 pt-4">
                        <Skeleton className="w-14 h-4 bg-slate-300" />
                        <Skeleton className="w-14 h-4 bg-slate-300 mt-1" />
                    </div>
                </div>
            ))
        }
      </div>
    );
};
