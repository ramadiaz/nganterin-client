"use client";

import Loading from "@/app/loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { BASE_API } from "@/utilities/environtment";
import { Button, ButtonGroup, Image } from "@nextui-org/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { GetUserData } from "@/utilities/getUserData";
import { MoneyWavy } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { parseDate } from "@internationalized/date";

const Page = ({ params: id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([]);
  const user_data = GetUserData()
  const router = useRouter()

  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const startDate = formatDate(today);
  const endDate = formatDate(threeDaysLater);

  const [bookingDate, setBookingDate] = useState({
    check_in_date: parseDate(startDate),
    check_out_date: parseDate(endDate),
  })

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(`${BASE_API}/hotel/details?id=${id.id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setDetail(data.data);
        setImages(data.data.hotel_photos);

        setIsLoading(false)
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBooking = (room_id) => {
    const jsonString = JSON.stringify({
      check_in_date: bookingDate.check_in_date,
      check_out_date: bookingDate.check_out_date,
      room_id: room_id,
      hotel_id: id.id
    });
    const data = btoa(jsonString)

    if (user_data.id) {
      router.push(`/order/hotel/${id.id}?secdat=${data}`)
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <>
      <div className="bg-white h-14"></div>
      <div className="min-h-screen text-black bg-white">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="w-3/5 mx-auto flex flex-col items-center">
              <div className="flex flex-row gap-4 items-center w-max mx-auto mb-8 select-none">
                <div className="w-96 h-96 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500">
                  <Image
                    src={images[0].url}
                    width={0}
                    height={0}
                    className="w-96 h-96 overflow-hidden object-cover selector"
                    alt="hotel image"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 justify-between">
                  {images.slice(1).map((image, index) => {
                    return (
                      <div
                        className="w-44 h-44 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500"
                        key={index}
                      >
                        <Image
                          src={image.url}
                          width={0}
                          height={0}
                          className="w-44 h-44 overflow-hidden object-cover selector"
                          alt="hotel image"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full">
                <div className="rounded-lg border border-neutral-300 flex flex-row justify-between">
                  <ButtonGroup radius="sm">
                    <Button className="text-sm" size="lg" variant="light">
                      Overview
                    </Button>
                    <Button className="text-sm" size="lg" variant="light" as={Link} href="#rooms">
                      Rooms
                    </Button>
                    <Button className="text-sm" size="lg" variant="light">
                      Facilites
                    </Button>
                    <Button className="text-sm" size="lg" variant="light">
                      Reviews
                    </Button>
                  </ButtonGroup>
                  <div className="flex flex-row items-center text-black gap-4 mr-8">
                    <div className="flex fleex-row items-center gap-2">
                      <h3 className="text-xs">from</h3>
                      <h2 className="text-red-500 font-semibold text-xl">
                        Rp. {detail.pricing_start.toLocaleString()}
                      </h2>
                    </div>
                    {user_data.id ? (
                      <Button
                        as={Link}
                        href={`/order/hotel/${id.id}`}
                        className="uppercase bg-sky-700 text-white"
                        radius="full"
                        size="md"
                        variant="flat"
                      >
                        View this deal
                      </Button>
                    ) : (
                      <Button
                        as={Link}
                        href="/auth/login"
                        className="uppercase bg-sky-700 text-white"
                        radius="full"
                        size="md"
                        variant="flat"
                      >
                        Login to order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row mt-4 gap-4">
                <div className="basis-2/3 flex flex-col gap-4">
                  <div className="rounded-lg border border-neutral-300 p-4">
                    <div className="flex flex-row gap-2 mb-4 ">
                      <div className="bg-sky-700 text-white text-xs px-2 py-1 rounded-md">
                        Domestic Deal
                      </div>
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                        Best seller
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {detail.name}
                    </h3>
                    <h4 className="text-sm">{detail.description}</h4>
                  </div>
                  <div className="rounded-lg border border-neutral-300 p-4">
                    <h2 className="font-semibold">Facilites</h2>
                    <div className="flex flex-wrap font-semibold text-xs gap-2 mt-2">
                      {detail.hotel_facilities?.map((item, index) => {
                        return (
                          <h2
                            className="flex flex-row items-center gap-2 w-max"
                            key={index}
                          >
                            <Check size={12} weight="bold" /> {item.facility}
                          </h2>
                        );
                      })}
                    </div>
                  </div>
                  <div className="rounded-lg border border-neutral-300 p-4" id="rooms">
                    <h2 className="font-semibold">{detail.hotel_rooms.length} Types of Rooms</h2>
                    <div className="flex flex-row gap-2 items-center">
                      <h3 className="text-xs opacity-90">Prices do not include taxes & fees</h3>
                      <MoneyWavy size={18} />
                    </div>
                    <div className="space-y-2 mt-4">
                      {detail.hotel_rooms.map((item, index) => {
                        return (
                          <div className={`flex flex-row gap-2 ${index < detail.hotel_rooms.length - 1 && "pb-2 mb-2 border-b border-neutral-300"}`} key={index}>
                            <Image
                              src={item.hotel_room_photos[0].url + "=w200"}
                              width={0}
                              height={0}
                              className="w-28 h-28 overflow-hidden object-cover selector"
                              alt="hotel image"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-grow flex flex-col">
                              <div>
                                <h2 className="font-semibold">{item.type}</h2>
                                <h3 className="text-xs">Bed Type: {item.bed_type}</h3>
                                <div className="flex flex-wrap items-center font-semibold text-xs gap-2 mt-2">
                                  <Check size={12} weight="bold" />
                                  Max Visitor: {item.max_visitor}
                                  <Check size={12} weight="bold" />
                                  Smooking Allowed:{" "}
                                  {item.smoking_allowed ? "Yes" : "No"}
                                </div>
                              </div>
                              <div className="flex-grow flex flex-row justify-end items-end gap-1">
                                <h2 className="font-semibold">
                                  IDR {item.overnight_price.toLocaleString("id-ID")}
                                </h2>
                                <h3 className="text-xs mr-3">
                                  /night
                                </h3>
                                <Button size="sm" variant="bordered" radius="full" className="text-xs" onClick={() => handleBooking(item.id)}>BOOK</Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="basis-1/3">
                  <div className="rounded-lg border border-neutral-300 p-4 flex flex-col gap-2">
                    <div className=" flex flex-col gap-1">
                      <h2 className="text-xl font-semibold">8.9 Excellent</h2>
                      <h4 className="text-xs opacity-90 text-sky-600">
                        4,222 Reviews
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Service 9.2
                      </div>
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Cleanliness 8.9
                      </div>
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Value for money 9.0
                      </div>
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Location 9.0
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div >
      <div className="bg-gradient-to-b from-white to-orange-50 h-20"></div>
    </>
  );
};

export default Page;
