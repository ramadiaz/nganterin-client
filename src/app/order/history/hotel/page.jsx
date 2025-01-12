"use client";

import { useEffect, useState } from "react";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { BASE_API, MIDTRANS_CLIENT_KEY, MIDTRANS_SNAP_SCRIPT } from "@/utilities/environtment";
import { toast } from "sonner";
import { Button, ButtonGroup, Image, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { DotsLoading } from "@/components/DotsLoading";
import { ArrowUpRight, PushPin, Ticket } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState([]);

    const router = useRouter();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchWithAuth(`${BASE_API}/order/hotel/getall`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setHistory(data.data);
                }
            }
        } catch (err) {
            toast.error("Failed to fetch Order History Data")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const snapScript = MIDTRANS_SNAP_SCRIPT;
        console.log({ snapScript })
        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const paymentStatusColor = {
        pending: "bg-gradient-to-r from-yellow-500 to-yellow-700",
        paid: "bg-gradient-to-r from-green-500 to-green-700",
        expire: "bg-gradient-to-r from-red-500 to-red-700",
        deny: "bg-gradient-to-r from-red-500 to-red-700",
        cancel: "bg-gradient-to-r from-red-500 to-red-700",
        failure: "bg-gradient-to-r from-red-500 to-red-700",
    }

    const handleContinuePayment = (order_data) => {
        window.snap.pay(order_data.snap_token, {
            onSuccess: async () => {
                toast.success('Payment success!');

                const jsonString = JSON.stringify({
                    id: order_data.id,
                    token: order_data.snap_token
                });
                const secdat = btoa(jsonString)

                router.push(`/payment/hotel?secdat=${secdat}`)
            },
            onPending: () => {
                toast.warning('Payment pending');
            },
            onError: () => {
                toast.error('Payment error');
            },
            onClose: () => {
                toast.error('Payment window closed');
            },
        });
    }

    return (
        <>
            <div className="w-full max-w-4xl mx-auto text-gray-900 mt-8 space-y-8 px-2 sm:px-0">
                <div className="space-y-4">
                    <div className="font-bold flex flex-row gap-2">Your Orders
                        <div className="rounded-md bg-white border border-slate-200 px-2 text-sm font-normal w-max">
                            {isLoading ? <DotsLoading /> : history.length}
                        </div>
                    </div>
                    <div>
                        <Tabs aria-label="Options" defaultSelectedKey={`hotel`}>
                            <Tab key="hotel" title="Hotel" as={Link} href="/order/history/hotel"></Tab>
                            <Tab key="flight" title="Flight"></Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="space-y-2">
                    {history.map((item, index) => {
                        const created_at = new Date(item.created_at)
                        const check_in_date = new Date(item.check_in_date)
                        const check_out_date = new Date(item.check_out_date)

                        return (
                            <div key={index} className="rounded-xl border border-slate-200 bg-white">
                                <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start text-xs px-4 sm:px-8 pt-4">
                                    <div className="w-full flex flex-row items-center justify-between gap-4">
                                        <div className="w-full flex flex-row items-center justify-start gap-4">
                                            <div>
                                                <h2 className="font-thin opacity-80">Order Placed</h2>
                                                <h3>{created_at.toDateString()}</h3>
                                            </div>
                                            <div>
                                                <h2 className="font-thin opacity-80">Total</h2>
                                                <h3>Rp. {item.total_price.toLocaleString()}</h3>
                                            </div>
                                        </div>
                                        <div className={`sm:hidden px-2 py-1 font-bold rounded-lg text-white ${paymentStatusColor[item.payment_status]} uppercase w-max text-2xs`}>{item.payment_status}</div>
                                    </div>
                                    <div className="flex flex-row items-center justify-end gap-4">
                                        <div className="flex flex-col items-end">
                                            <h2 className="sm:whitespace-nowrap">Order{" "}
                                                <span className="font-mono">
                                                    #{item.id}
                                                </span>
                                            </h2>
                                            <div className={`hidden sm:block px-2 py-1 font-bold rounded-lg text-white ${paymentStatusColor[item.payment_status]} uppercase w-max text-2xs`}>{item.payment_status}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 sm:px-8 py-4 w-full flex flex-row items-start justify-start gap-4">
                                    <Image
                                        alt="Hotel image"
                                        className="object-cover w-64 h-36"
                                        height={200}
                                        shadow="md"
                                        src={item.hotel_room.hotel_room_photos[0].url}
                                        width={200}
                                        referrerPolicy="no-referrer"
                                    />
                                    <div>
                                        <Link href={`/detail/hotel/${item.hotel.id}`} className="text-medium sm:text-lg font-bold hover:underline">{item.hotel.name}</Link>
                                        <h2 className="text-xs sm:text-sm font-thin opacity-80">{item.hotel_room.type} Room - Rp. {item.hotel_room.overnight_price.toLocaleString()} /night</h2>
                                        <br />
                                        <h2 className="text-xs sm:text-sm font-thin opacity-80 mb-2">Booked for {check_in_date.toDateString()} - {check_out_date.toDateString()}</h2>
                                        {
                                            item.payment_status === "paid" ? (
                                                <div className="flex flex-row items-center gap-2">
                                                    <Button size="sm" variant="flat" className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700" as={Link} href="/reservation/hotel">
                                                        Ticket <Ticket size={18} color="#ffffff" weight="bold" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => window.open(item.hotel.hotels_location.gmaps, '_blank', 'noopener,noreferrer')}
                                                        size="sm" variant="flat" className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-700"
                                                    >
                                                        Maps <PushPin size={18} color="#ffffff" weight="bold" />
                                                    </Button>
                                                </div>
                                            ) : item.payment_status === "pending" && (
                                                <Button size="sm" variant="flat" className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-700" onClick={() => handleContinuePayment(item)} >
                                                    Pay Now! <ArrowUpRight size={18} color="#ffffff" weight="bold" />
                                                </Button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="h-24"></div>
        </>
    );
};

export default Page;
