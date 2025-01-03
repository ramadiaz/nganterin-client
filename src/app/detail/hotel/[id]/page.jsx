"use client";

import Loading from "@/app/loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { BASE_API } from "@/utilities/environtment";
import { Button, ButtonGroup, DateRangePicker, Image, Progress, User } from "@nextui-org/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { GetUserData } from "@/utilities/getUserData";
import { MoneyWavy } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { parseDate } from "@internationalized/date";
import { toast } from "sonner";
import FsLightbox from "fslightbox-react";
import { RatingStars } from "@/components/RatingStars";

const Page = ({ params: id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false)
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

  function calculateDaysBetween(start, end) {
    const startDate = new Date(start.year, start.month - 1, start.day);
    const endDate = new Date(end.year, end.month - 1, end.day);
    const diffInTime = endDate - startDate;
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
    return Math.ceil(diffInDays);
  }

  const startDate = formatDate(today);
  const endDate = formatDate(threeDaysLater);

  const [bookingDate, setBookingDate] = useState({
    start: parseDate(startDate),
    end: parseDate(endDate),
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
      toast.error("Something went wrong")
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBooking = (room_id) => {
    const jsonString = JSON.stringify({
      check_in_date: bookingDate.start.toString(),
      check_out_date: bookingDate.end.toString(),
      days: calculateDaysBetween(bookingDate.start, bookingDate.end),
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
      <div className="h-14"></div>
      <div className="min-h-screen text-gray-900">
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
                    onClick={() => setIsLightBoxOpen(!isLightBoxOpen)}
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
                          onClick={() => setIsLightBoxOpen(!isLightBoxOpen)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full">
                <div className="rounded-lg border border-slate-200 bg-white flex flex-row justify-between">
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
                    <div className="flex flex-row items-center gap-2">
                      <h3 className="text-xs">from</h3>
                      <h2 className="text-red-500 font-semibold text-xl">
                        Rp. {detail.pricing_start.toLocaleString()}
                      </h2>
                    </div>
                    <Button
                      as={Link}
                      href={`#rooms`}
                      className="bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold"
                      radius="full"
                      size="md"
                      variant="flat"
                    >
                      Select Room
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row mt-4 gap-4">
                <div className="basis-2/3 flex flex-col gap-4">
                  <div className="rounded-lg border border-slate-200 bg-white bg-[url('https://ik.imagekit.io/tvlk/image/imageResource/2023/03/08/1678269700277-fb3bdb104bce257a9f273c868f0fdf56.svg?tr=q-75')]">
                    <div className="bg-gradient-to-tr from-white from-50% to-white/0 p-4">
                      <div className="flex flex-row gap-2 mb-4 ">
                        <div className="bg-gradient-to-r from-sky-500 to-sky-700 text-white text-xs px-2 py-1 rounded-md">
                          Domestic Deal
                        </div>
                        <div className="bg-gradient-to-r from-rose-500 to-rose-700 text-white text-xs px-2 py-1 rounded-md">
                          Best seller
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">
                        {detail.name}
                      </h3>
                      <h4 className="text-sm">{detail.description}</h4>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
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
                  <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2" id="select-date">
                    <h2 className="font-semibold">Reservation Date</h2>
                    <DateRangePicker
                      label="Check in - Check out date"
                      value={bookingDate}
                      onChange={setBookingDate}
                      visibleMonths={2}
                      variant="bordered"
                      classNames={{
                        inputWrapper: ["border", "border-slate-200", "bg-white", "hover:border-slate-200"]
                      }}
                    />
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4" id="rooms">
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
                                <Button size="sm" variant="flat" radius="full" className="text-xs bg-gradient-to-r from-sky-500 to-sky-700 text-white" onClick={() => handleBooking(item.id)}>BOOK</Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="basis-1/3">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-2">
                    <div className=" flex flex-col gap-1">
                      <h2 className="text-xl font-semibold">{(detail.rating.rating * 2).toFixed(1)} Excellent</h2>
                      <h4 className="text-xs opacity-90 text-sky-600">
                        {detail.hotel_reviews?.length || 0} Reviews
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Service {(detail.rating.service_quality * 2).toFixed(1)}
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Cleanliness {(detail.rating.cleanliness * 2).toFixed(1)}
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Value for money {(detail.rating.value_for_money * 2).toFixed(1)}
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Comfort {(detail.rating.comfort * 2).toFixed(1)}
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Facilities {(detail.rating.facilities * 2).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 mt-10 space-y-4 w-full">
                <div className="space-y-2 mx-auto w-max">
                  <h2 className="text-4xl sm:text-5xl font-superbold text-center">
                    {detail.review_statistic.average_rating.toFixed(1)}
                  </h2>
                  <RatingStars value={detail.review_statistic.average_rating} count={5} gap={5} />
                </div>
                <div className="space-y-2 w-full max-w-lg mx-auto">
                  <div className="flex flex-row items-center gap-2">
                    <h4 className="w-1/4 text-sm opacity-80">Excelent</h4>
                    <Progress color="primary" className="w-full" value={detail.review_statistic.percentage_5} />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <h4 className="w-1/4 text-sm opacity-80">Very Good</h4>
                    <Progress color="secondary" className="w-full" value={detail.review_statistic.percentage_4} />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <h4 className="w-1/4 text-sm opacity-80">Good</h4>
                    <Progress color="success" className="w-full" value={detail.review_statistic.percentage_3} />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <h4 className="w-1/4 text-sm opacity-80">Not Good</h4>
                    <Progress color="warning" className="w-full" value={detail.review_statistic.percentage_2} />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <h4 className="w-1/4 text-sm opacity-80">So Bad</h4>
                    <Progress color="danger" className="w-full" value={detail.review_statistic.percentage_1} />
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-2 w-full my-4">
                <div className=" flex flex-col gap-1">
                  <h2 className="font-semibold">Hear It from Our Guests</h2>
                  <h4 className="text-xs opacity-90 text-sky-600 mb-4">
                    {detail.hotel_reviews?.length || 0} Reviews
                  </h4>

                  {detail.hotel_reviews?.map((item) => {
                    return (
                      <div className="w-full space-y-2 px-6">
                        <div className="border-t p-4">
                          <User
                            avatarProps={{
                              src: item.user.avatar,
                            }}
                            description="Guest"
                            name={item.user.name}
                          />
                          <div className="flex flex-wrap gap-1 my-1">
                            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-2xs px-2 py-1 rounded-md whitespace-nowrap">
                              Service {(item.service_quality)}
                            </div>
                            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-2xs px-2 py-1 rounded-md whitespace-nowrap">
                              Cleanliness {(item.cleanliness)}
                            </div>
                            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-2xs px-2 py-1 rounded-md whitespace-nowrap">
                              Value for money {(item.value_for_money)}
                            </div>
                            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-2xs px-2 py-1 rounded-md whitespace-nowrap">
                              Comfort {(item.comfort)}
                            </div>
                            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-2xs px-2 py-1 rounded-md whitespace-nowrap">
                              Facilities {(item.facilities)}
                            </div>
                          </div>
                          <p className="font-normal text-sm">
                            {item.review}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <FsLightbox
              toggler={isLightBoxOpen}
              sources={images.map(photo => photo.url)}
            />
          </div>
        )}
      </div >
      <div className="h-20"></div>
    </>
  );
};

export default Page;
