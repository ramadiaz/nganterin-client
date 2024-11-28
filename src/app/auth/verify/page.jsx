'use client'

import Loading from "@/app/loading";

const { BASE_URL } = require("@/utilities/environtment");
const { useSearchParams, useRouter } = require("next/navigation");
const { useEffect } = require("react");

const Page = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const fetchData = async () => {
        const token = searchParams.get('token')
        if (!token) {
            router.push("/")
        }

        try {
            const res = await fetch(BASE_URL + `/auth/verify?token=${token}`, {
                method: "POST",
                cache: "no-store"
            })
            if (res.ok) {
                router.push("/auth/verify/verified")
            } else if (res.status == 404) {
                router.push("/auth/verify/invalid")
            } else {
                router.push("/auth/verify/error")
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Loading />
    )
}

export default Page