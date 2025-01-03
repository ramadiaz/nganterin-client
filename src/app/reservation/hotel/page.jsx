"use client";

import { useEffect, useState } from "react";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { BASE_API } from "@/utilities/environtment";
import { toast } from "sonner";
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { DotsLoading } from "@/components/DotsLoading";
import { DoorOpen, PushPin, ShootingStar, SignOut, Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reservation, setReservation] = useState([]);
    const [tempQRData, setTempQRData] = useState({})

    const QRModal = useDisclosure()

    const router = useRouter();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchWithAuth(`${BASE_API}/reservation/hotel/getall`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setReservation(data.data);
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
    }, []);

    const paymentStatusColor = {
        Confirmed: "bg-gradient-to-r from-green-500 to-green-700",
        CheckedIn: "bg-gradient-to-r from-yellow-500 to-yellow-700",
        CheckedOut: "bg-gradient-to-r from-red-500 to-red-700",
    }

    const handleOpenTicket = (data) => {
        setTempQRData(data)
        QRModal.onOpen()
    }

    return (
        <>
            <div className="w-full max-w-4xl mx-auto text-gray-900 mt-8 space-y-8">
                <div className="space-y-4">
                    <div className="font-bold flex flex-row gap-2">Your Reservations
                        <div className="rounded-md bg-white border border-slate-200 px-2 text-sm font-normal w-max">
                            {isLoading ? <DotsLoading /> : reservation.length}
                        </div>
                    </div>
                    <div>
                        <Tabs aria-label="Options" defaultSelectedKey={`hotel`}>
                            <Tab key="hotel" title="Hotel" as={Link} href="/order/reservation/hotel"></Tab>
                            <Tab key="flight" title="Flight"></Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="space-y-2">
                    {reservation.map((item, index) => {
                        const created_at = new Date(item.hotel_reservation.created_at)
                        const check_in_date = new Date(item.check_in_date)
                        const check_out_date = new Date(item.check_out_date)

                        return (
                            <div key={index} className="rounded-xl border border-slate-200 bg-white">
                                <div className="w-full flex flex-row justify-between items-start text-sm px-8 pt-4">
                                    <div className="flex flex-row items-center justify-start gap-4">
                                        <div>
                                            <h2 className="font-thin opacity-80">Reservation Placed</h2>
                                            <h3>{created_at.toDateString()}</h3>
                                        </div>
                                        <div>
                                            <h2 className="font-thin opacity-80">Total Days</h2>
                                            <h3>{item.total_days.toLocaleString()} Days</h3>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-end gap-4">
                                        <div className="flex flex-col items-end">
                                            <h2 className="">
                                                <span className="font-mono">
                                                    #{item.id}
                                                </span>
                                            </h2>
                                            <div className={`px-2 py-1 font-bold rounded-lg text-white ${paymentStatusColor[item.hotel_reservation.reservation_status]} uppercase w-max text-2xs`}>{item.hotel_reservation.reservation_status}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-8 py-4 w-full flex flex-row items-start justify-start gap-4">
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
                                        <Link href={`/detail/hotel/${item.hotel.id}`} className="text-lg font-bold hover:underline">{item.hotel.name}</Link>
                                        <h2 className="text-sm font-thin opacity-80">{item.hotel_room.type} Room Class</h2>
                                        <br />
                                        <h2 className="text-sm font-thin opacity-80 mb-2">Booked for {check_in_date.toDateString()} - {check_out_date.toDateString()}</h2>
                                        {
                                            item.hotel_reservation.reservation_status === 'Confirmed' ? (
                                                <div className="flex flex-row items-center gap-2">
                                                    <Button size="sm" variant="flat" className="text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700" onClick={() => handleOpenTicket(item)}>
                                                        Check In <DoorOpen size={18} color="#ffffff" weight="bold" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => window.open(item.hotel.hotels_location.gmaps, '_blank', 'noopener,noreferrer')}
                                                        size="sm" variant="flat" className="text-sm font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-700"
                                                    >
                                                        Maps <PushPin size={18} color="#ffffff" weight="bold" />
                                                    </Button>
                                                </div>
                                            ) : item.hotel_reservation.reservation_status === 'CheckedIn' ? (
                                                <div className="flex flex-row items-center gap-2">
                                                    <Button size="sm" variant="flat" className="text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-700" onClick={() => handleOpenTicket(item)}>
                                                        Check Out <SignOut size={18} color="#ffffff" weight="bold" />
                                                    </Button>
                                                </div>
                                            ) : item.hotel_reservation.reservation_status === 'CheckedOut' && (
                                                <div className="flex flex-row items-center gap-2">
                                                    <Button size="sm" variant="flat" className="text-sm font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-700" as={Link} href={`/review/hotel?secdat=${btoa(JSON.stringify(item))}`}>
                                                        Review <ShootingStar size={18} color="#ffffff" weight="bold" />
                                                    </Button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal size="md" isOpen={QRModal.isOpen} onOpenChange={QRModal.onOpenChange} backdrop="blur" radius="sm">
                <ModalContent className="text-slate-900">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p>
                                    {tempQRData.hotel.name}
                                </p>
                                <p className="text-xs opacity-90">
                                    #{tempQRData.id}
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="mb-4">
                                    <div className="rounded-lg overflow-hidden w-44 mx-auto mb-4">
                                        <QRCode
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={tempQRData.hotel_reservation.reservation_key}
                                            viewBox={`0 0 256 256`}
                                        />
                                    </div>
                                    <p className="font-bold">How to use: </p>
                                    <div className="text-slate-900 text-sm">
                                        1. Show this ticket to the receptionist at the hotel.<br />
                                        2. Ensure the ticket details match your reservation.<br />
                                        3. If any issues occur, contact customer support.
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} className="bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold">Close</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="h-24"></div>
        </>
    );
};

export default Page;
