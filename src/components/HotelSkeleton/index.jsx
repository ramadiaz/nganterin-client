import React from "react";
import { Skeleton } from "@nextui-org/react";

const SearchSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200">
      <div className="flex flex-row gap-1">
        <div className="w-96 space-y-1">
          <Skeleton className="rounded-lg">
            <div className="h-44 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>

        <div className="flex p-2 w-full">
          <div className="space-y-0.5 w-1/2">
            <Skeleton className="w-3/4 rounded-lg mb-1">
              <div className="h-7 w-full rounded-lg bg-default-300"></div>
            </Skeleton>

            <Skeleton className="w-1/2 rounded-lg mb-1">
              <div className="h-5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>

          <div className="text-right mr-2 w-1/2 mt-auto">
            <Skeleton className="w-40 ml-auto rounded-lg mb-1">
              <div className="h-7 rounded-lg bg-default-300"></div>
            </Skeleton>

            <Skeleton className="w-28 ml-auto rounded-lg mb-1">
              <div className="h-4 rounded-lg bg-default-300"></div>
            </Skeleton>

            <Skeleton className="w-24 ml-auto mt-2 rounded-full">
              <div className="h-8 rounded-full bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchSkeletonList = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <SearchSkeleton key={i} />
      ))}
    </div>
  );
};

export default SearchSkeletonList;
