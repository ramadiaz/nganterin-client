"use client";

import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchValue = useSearchParams().get("search");
  const dateStart = useSearchParams().get("dateStart");
  const dateEnd = useSearchParams().get("dateEnd");

  return (
    <></>
  )
};

export default Page;
