'use client'

import Loading from "@/app/loading";
import { BASE_API } from "@/utilities/environtment";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { Button } from "@nextui-org/react";
import { ArrowsClockwise, ClockCounterClockwise, Ticket } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";

const Page = () => {
    const secdat = useSearchParams().get("secdat");
    const router = useRouter()

    const [orderData, setOrderData] = useState({})
    const [paymentStatus, setPaymentStatus] = useState("pending")
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async (order_id) => {
        try {
            const res = await fetchWithAuth(BASE_API + `/order/hotel/get?id=${order_id}`, {
                method: 'GET',
            })
            if (res.ok) {
                const data = await res.json()

                setOrderData(data.data)
                setPaymentStatus(data.data.payment_status)
            }
        } catch (err) {
            toast.error("Failed to fetch Order Data")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const parseSecdat = async () => {
            try {
                const jsonString = atob(secdat)
                const data = JSON.parse(jsonString);
                if (data) {
                    setOrderData({ id: data.id })
                    fetchData(data.id)
                }

            } catch (err) {
                console.error(err)
                router.push(`/order/history/hotel`)
            }
        }

        parseSecdat()
    }, [])

    const iframeData = {
        pending: "https://lottie.host/embed/a3fee573-af4d-4c05-8005-3e9ad024825a/udSpO5AEK3.json",
        paid: "https://lottie.host/embed/db40c001-7105-4ce4-9eee-ae9928688a08/rRhddbiJyS.json"
    }

    const headlineData = {
        pending: "Reservation Payment Pending",
        paid: "Reservation Payment Successful!"
    }


    return (
        <div className={!orderData.id && "hidden"}>
            <div className="w-max max-w-md mx-auto mt-8 text-gray-900">
                <iframe
                    src={iframeData[paymentStatus]}
                    className="size-60 mx-auto"
                ></iframe>
                <h2 className="text-center text-xl font-bold mt-8">{headlineData[paymentStatus]}</h2>
                <h3 className="text-center text-sm font-thin">Transaction Number: {orderData.id}</h3>
                <div className="space-y-2 my-4">
                    <Button className={`w-full ${paymentStatus === "paid" && "hidden"}`} variant="bordered" radius="full" onClick={() => fetchData(orderData.id)} isDisabled={isLoading}>Refresh <ArrowsClockwise size={22} color="#111827" weight="bold" className={isLoading && "animate-spinner-ease-spin"} /></Button>
                    <div className="flex flex-row gap-2">
                        <Button className="w-full bg-yellow-200 border-gray-900" variant="bordered" radius="full" as={Link} href="/order/history/hotel">My Order <ClockCounterClockwise size={22} color="#111827" weight="bold" /></Button>
                        <Button className="w-full bg-sky-300 border-gray-900" variant="bordered" radius="full" as={Link} href="/ticket/hotel">My Ticket <Ticket size={22} color="#111827" weight="bold" /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page