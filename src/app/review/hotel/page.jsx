'use client'

import Loading from "@/app/loading"
import { RatingStars } from "@/components/RatingStars"
import { BASE_API } from "@/utilities/environtment"
import fetchWithAuth from "@/utilities/fetchWIthAuth"
import { Button, Image, Spinner, Textarea } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Page = () => {
    const secdat = useSearchParams().get("secdat")
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const [orderData, setOrderData] = useState({})
    const [reviewData, setReviewData] = useState({
        hotel_order_id: "",
        review: "",
        cleanliness: 0,
        comfort: 0,
        service_quality: 0,
        facilities: 0,
        value_for_money: 0,
        rating: 0
    })

    useEffect(() => {
        const jsonString = atob(secdat)
        const data = JSON.parse(jsonString)
        setOrderData(data)

        setReviewData((prev) => ({ ...prev, hotel_order_id: data.id }))
        setIsLoading(false)
    }, [secdat])

    const handleSubmit = async () => {
        if (!formValidation(reviewData)) return;

        try {
            setIsSending(true)
            const res = await fetchWithAuth(BASE_API + "/review/hotel/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            })

            if (res.ok) {
                toast.success("Review submitted successfully")
                router.push("/reservation/hotel")
            } else {
                const data = await res.json()
                toast.error(data.message)
            }
        } catch (err) {
            console.error(err)
            toast.error("Connection error")
        } finally {
            setIsSending(false)
        }
    }

    const formValidation = (data) => {
        const requiredFields = {
            hotel_order_id: "",
            review: "",
            cleanliness: 0,
            comfort: 0,
            service_quality: 0,
            facilities: 0,
            value_for_money: 0,
            rating: 0
        };

        const missingFields = [];

        for (const [field, regex] of Object.entries(requiredFields)) {
            if (!data[field]) {
                missingFields.push(field);
            } else if (data[field] == requiredFields[field]) {
                missingFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            toast.error(`Missing fields: ${missingFields.join(", ")}`);
            return false;
        }

        return true;
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-full max-w-4xl mx-auto text-slate-900 mt-8 space-y-4">
                    <div className="flex flex-row gap-4">
                        <Image
                            alt="Hotel image"
                            className="object-cover w-64 h-36"
                            height={200}
                            shadow="md"
                            src={orderData.hotel_room.hotel_room_photos[0].url}
                            width={200}
                            referrerPolicy="no-referrer"
                        />
                        <div>
                            <p className="text-xs font-light opacity-70 text-right">{orderData.id}</p>
                            <h2 className="uppercase font-superbold">{orderData.hotel.name}</h2>
                            <h3 className="text-sm font-light opacity-90">{orderData.hotel_room.type} Room Class</h3>
                            <br />
                            <p className="text-xs font-light opacity-70">{orderData.hotel.hotels_location.complete_address}</p>
                            <br />
                        </div>
                    </div>
                    <div className="flex flex-row gap-8">
                        <div className="w-2/3 space-y-4">
                            <div className="mt-4 space-y-2">
                                <h3 className="text-sm opacity-80">Would you like to share any additional comments or feedback about your stay?</h3>
                                <Textarea
                                    variant="bordered"
                                    value={reviewData.review}
                                    onChange={(e) => setReviewData((prev) => ({ ...prev, review: e.target.value }))}
                                    placeholder="Write your review here..."
                                    classNames={{
                                        input: "min-h-[80px]",
                                    }} />
                            </div>
                            <div className="flex flex-row justify-end w-full">
                                <Button
                                    className="bg-gradient-to-r from-sky-500 to-sky-700 text-white"
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                    isDisabled={isSending}
                                >
                                    <div className="flex flex-row gap-2 items-center justify-center">
                                        <Spinner color="white" size="sm" className={isSending ? "block" : "hidden"} />
                                        Submit
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="w-1/3 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xs opacity-80">How clean was the hotel during your stay?</h3>
                                <RatingStars count={5} value={reviewData.cleanliness} gap={5} onChange={(e) => setReviewData((prev) => ({ ...prev, cleanliness: e }))} color="#fbbf24" description={description} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xs opacity-80">How would you rate the comfort of your room and facilities?</h3>
                                <RatingStars count={5} value={reviewData.comfort} gap={5} onChange={(e) => setReviewData((prev) => ({ ...prev, comfort: e }))} color="#fbbf24" description={description} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xs opacity-80">How would you describe the quality of service provided by the staff?</h3>
                                <RatingStars count={5} value={reviewData.service_quality} gap={5} onChange={(e) => setReviewData((prev) => ({ ...prev, service_quality: e }))} color="#fbbf24" description={description} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xs opacity-80">How satisfied were you with the facilities provided at the hotel?</h3>
                                <RatingStars count={5} value={reviewData.facilities} gap={5} onChange={(e) => setReviewData((prev) => ({ ...prev, facilities: e }))} color="#fbbf24" description={description} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xs opacity-80">Do you feel the price you paid was worth the overall experience?</h3>
                                <RatingStars count={5} value={reviewData.value_for_money} gap={5} onChange={(e) => setReviewData((prev) => ({ ...prev, value_for_money: e }))} color="#fbbf24" description={description} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xs opacity-80">How's your overall experience?</h3>
                                <RatingStars count={5} value={reviewData.rating} gap={5} onChange={(e) => setReviewData((prev) => ({ ...prev, rating: e }))} color="#fbbf24" description={description} />
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

const description = {
    1: "So bad",
    2: "Not good",
    3: "Good",
    4: "Very good",
    5: "Excellent",
}

export default Page