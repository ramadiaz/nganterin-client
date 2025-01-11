"use client";

import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Card, Tabs, Tab, CardBody, Input, Button } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import AOS from "aos";
import "aos/dist/aos.css";

import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [hotelKeyword, setHotelKeyword] = useState("");
  const [activityKeyword, setActivityKeyword] = useState("");
  const [selectedTab, setSelectedTab] = useState("Hotels & Homes");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightDate, setFlightDate] = useState(parseDate("2024-04-04"));

  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  const startDate = formatDate(today);
  const endDate = formatDate(nextDay);

  const [hotelDate, setHotelDate] = useState({
    start: parseDate(startDate),
    end: parseDate(endDate),
  });

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleHotelSearch = (e) => {
    e.preventDefault();
    router.push(
      `/search-result/hotel?keyword=${hotelKeyword}&dateStart=${hotelDate.start}&dateEnd=${hotelDate.end}`
    );
  };

  const handleFlightSearch = (e) => {
    e.preventDefault();
    router.push(
      `/flight?date=${flightDate}&departure=${departureAirport}&arrival=${arrivalAirport}`
    );
  };

  const promotions = [
    {
      name: "1",
      path: "/images/promotions/1.png",
    },
    {
      name: "2",
      path: "/images/promotions/2.png",
    },
    {
      name: "3",
      path: "/images/promotions/3.png",
    },
    {
      name: "4",
      path: "/images/promotions/4.png",
    },
    {
      name: "5",
      path: "/images/promotions/5.png",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  return (
    <div className="">
      <div className="img -mt-16 h-[650px] selector">
        <h4 className="text-center pt-32" data-aos="fade-up">
          It's time to vacation 🚀
        </h4>
        <div
          className="text-center mt-12 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          data-aos="fade-up"
        >
          <h1 className="mb-4">Discover the World's</h1>
          Most{" "}
          <Typewriter
            loop={0}
            cursor={true}
            cursorBlinking={true}
            typeSpeed={140}
            deleteSpeed={140}
            delaySpeed={3000}
            words={[
              "Luxurious Hotel",
              "Cozy Flight",
              "Stylish Flight",
              "Exclusive Hotel",
            ]}
          />
        </div>
      </div>
      <div className="justify-center items-center flex flex-col gap-4 bg-slate-50 pb-24 mx-4">
        <Card className="w-full max-w-[700px] -mt-28 overflow-visible">
          <form className="relative">
            <CardBody>
              <div className="flex w-full flex-col">
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  selectedKey={selectedTab}
                  onSelectionChange={setSelectedTab}
                >
                  <Tab key="Hotels & Homes" title="Hotels & Homes">
                    <Card>
                      <CardBody>
                        <Input
                          variant={"bordered"}
                          placeholder="Holiday Inn & Suites Jakarta Gajah Mada"
                          startContent={
                            <MagnifyingGlass size={32} color="#2e2e2e" />
                          }
                          size="lg"
                          value={hotelKeyword}
                          onChange={(e) => setHotelKeyword(e.target.value)}
                        />
                        <div className="flex flex-row mt-4">
                          <DateRangePicker
                            label="Vacation Time"
                            value={hotelDate}
                            onChange={setHotelDate}
                            visibleMonths={2}
                            variant="bordered"
                            classNames={{
                              base: ["border-gray-200"],
                            }}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </CardBody>
            {selectedTab === "Hotels & Homes" ? (
              <div className="h-8">
                <div className="absolute right-1/2 translate-x-1/2 bottom-0 translate-y-1/2">
                  <Button
                    size="lg"
                    type="submit"
                    className="bg-gradient-to-r from-sky-500 to-sky-700 text-white w-64 h-16"
                    onClick={handleHotelSearch}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            ) : selectedTab === "Flights" ? (
              <div className="h-8">
                <div className="absolute right-1/2 translate-x-1/2 bottom-0 translate-y-1/2">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-sky-500 to-sky-700 text-white w-64 h-16 "
                    onClick={handleFlightSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-8">
                <div className="absolute right-1/2 translate-x-1/2 bottom-0 translate-y-1/2">
                  <Button
                    size="lg"
                    className="bg-blue-500 text-white w-64 h-16 "
                    onClick={(e) => {
                      e.preventDefault();
                      alert("hai");
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
        <div className="max-w-[932px] mt-14 flex flex-col gap-14">
          <div className="flex flex-col justify-center text-black">
            <h1 className="text-center text-2xl my-4">
              Top destinations in Indonesia
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-col justify-center items-center gap-3 ">
                <Link
                  href={`/search-result/hotel?keyword=Jakarta&dateStart=${hotelDate.start}&dateEnd=${hotelDate.end}`}
                  className="overflow-hidden rounded-lg shadow-lg shadow-slate-800/50"
                >
                  <Image
                    src={`/images/destinations/1_8691_02.jpg`}
                    width={300}
                    height={300}
                    alt="destination 1"
                    className="hover:scale-125 transition-all duration-500"
                  />
                </Link>
                <div className="flex flex-col items-center">
                  <h3>Jakarta</h3>
                  <h4 className="text-xs opacity-80">32,920 acommodations</h4>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-3 ">
                <Link
                  href={`/search-result/hotel?keyword=Bali&dateStart=${hotelDate.start}&dateEnd=${hotelDate.end}`}
                  className="overflow-hidden rounded-lg shadow-lg shadow-slate-800/50"
                >
                  <Image
                    src={`/images/destinations/1_17193_02.jpg`}
                    width={300}
                    height={300}
                    alt="destination 1"
                    className="hover:scale-125 transition-all duration-500"
                  />
                </Link>
                <div className="flex flex-col items-center">
                  <h3>Bali</h3>
                  <h4 className="text-xs opacity-80">32,920 acommodations</h4>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-3 ">
                <Link
                  href={`/search-result/hotel?keyword=Bandung&dateStart=${hotelDate.start}&dateEnd=${hotelDate.end}`}
                  className="overflow-hidden rounded-lg shadow-lg shadow-slate-800/50"
                >
                  <Image
                    src={`/images/destinations/1_18943_02.jpg`}
                    width={300}
                    height={300}
                    alt="destination 1"
                    className="hover:scale-125 transition-all duration-500"
                  />
                </Link>
                <div className="flex flex-col items-center">
                  <h3>Bandung</h3>
                  <h4 className="text-xs opacity-80">32,920 acommodations</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-black">
            <h1 className="text-center text-2xl my-4">
              Acommodation Promotions
            </h1>
            <div className="w-full max-w-[600px] mx-auto rounded-xl overflow-hidden h-max shadow-md shadow-black/50">
              <Carousel
                transitionTime={3}
                autoPlay
                interval={3000}
                showStatus={false}
                infiniteLoop
                showThumbs={false}
                className="w-full"
              >
                {promotions.map((promo, index) => {
                  return (
                    <div key={index}>
                      <Image
                        src={promo.path}
                        width={400}
                        height={200}
                        className="bg-cover"
                        alt="promotion"
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
