'use client'

import { useSearchParams } from "next/navigation"

const Page = () => {
    const searchValue = useSearchParams().get('search')
    console.log({searchValue})

    return (
        <></>
    )

}

export default Page