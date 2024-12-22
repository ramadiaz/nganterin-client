'use client'

import { BASE_API } from "@/utilities/environtment";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const Page = () => {
    const secdat = useSearchParams().get("secdat");
    const router = useRouter()

    const [orderData, setOrderData] = useState({})

    const fetchData = async (order_id) => {
        try {
            const res = await fetchWithAuth(BASE_API + `/order/hotel/get?id=${order_id}`, {
                method: 'GET',
            })
            if (res.ok) {
                const data = await res.json()

                setOrderData(data.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const parseSecdat = async () => {
            try {
                const jsonString = atob(secdat)
                const data = JSON.parse(jsonString);
                if (data) {
                    fetchData(data.id)
                }

            } catch (err) {
                router.push(`/order/history/hotel`)
            }
        }

        parseSecdat()
    }, [])

    return (
        <div className="text-black">
            {orderData.payment_status}
        </div>
    )
}

export default Page