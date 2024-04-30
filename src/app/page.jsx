"use client";

import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import {
  Card,
  Tabs,
  Tab,
  CardBody,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
} from "@nextui-org/react";
import { MagnifyingGlass, Path } from "@phosphor-icons/react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selectedTab, setSelectedTab] = useState("Hotels & Homes");

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const startDate = formatDate(today);
  const endDate = formatDate(threeDaysLater);

  const [hotelDate, setHotelDate] = useState({
    start: parseDate(startDate),
    end: parseDate(endDate),
  });

  const [flightDate, setFlightDate] = useState(parseDate("2024-04-04"));

  let formatter = useDateFormatter({ dateStyle: "long" });

  const handleHotelSearch = (e) => {
    e.preventDefault();
    router.push(
      `/hotel?search=${keyword}&dateStart=${hotelDate.start}&dateEnd=${hotelDate.end}`
    );
  };

  const airport = [
    { name: "Bandara Internasional Soekarno-Hatta", code: "CGK" },
    { name: "Bandara Internasional Ngurah Rai", code: "DPS" },
    { name: "Bandara Internasional Juanda", code: "SUB" },
    { name: "Bandara Internasional Sultan Hasanuddin", code: "UPG" },
    { name: "Bandara Internasional Adisutjipto", code: "JOG" },
    { name: "Bandara Internasional Adi Soemarmo", code: "SOC" },
    { name: "Bandara Internasional Kualanamu", code: "KNO" },
    { name: "Bandara Internasional Sultan Aji Muhammad Sulaiman", code: "BPN" },
    { name: "Bandara Internasional El Tari", code: "KOE" },
    { name: "Bandara Internasional Minangkabau", code: "PDG" },
  ];

  return (
    <div className="">
      <div className="img -mt-16 h-[650px]">
        <h4 className="text-center pt-32">It's time to vacation 🚀</h4>
        <div className="text-center mt-12 text-6xl md:text-7xl lg:text-8xl font-bold">
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
      <div className="justify-center items-center flex flex-col gap-4 bg-orange-50 pb-24">
        <Card className="w-[700px] -mt-28 overflow-visible">
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
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
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
                  <Tab key="Flights" title="Flights">
                    <Card>
                      <CardBody>
                        <div className="flex flex-col gap-4">
                          <div className="w-full h-10 flex flex-row justify-center items-center gap-3">
                            <Autocomplete
                              label="Flying from"
                              variant="bordered"
                            >
                              {airport.map((ap, index) => {
                                <AutocompleteItem key={index} value={ap.code}>
                                  {ap.name}
                                </AutocompleteItem>;
                              })}
                            </Autocomplete>
                            <Path size={60} weight="bold" />
                            <Autocomplete label="Flying to" variant="bordered">
                              {airport.map((ap, index) => {
                                <AutocompleteItem key={index} value={ap.code}>
                                  {ap.name}
                                </AutocompleteItem>;
                              })}
                            </Autocomplete>
                          </div>
                          <div className="flex flex-row gap-4">
                            <DatePicker
                              className=""
                              label="Departure Date"
                              value={flightDate}
                              variant="bordered"
                              onChange={setFlightDate}
                            />
                            <Autocomplete label="Passenger" variant="bordered">
                              {Array.from({ length: 10 }).map((_, index) => (
                                <AutocompleteItem key={index} value={index + 1}>
                                  {index + 1}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="Activities" title="Activities">
                    <Card>
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                    className="bg-blue-500 text-white w-64 h-16 "
                    onClick={handleHotelSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>
            ) : selectedTab === "Flights" ? (
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
            ) : null}
          </form>
        </Card>
        <div className="max-w-[932px] mt-14">
          <div className="flex flex-col justify-center text-black">
            <h1 className="text-center text-2xl my-4">
              Top destinations in Indonesia
            </h1>
            <div className="flex flex-row justify-center gap-4">
              <div className="flex flex-col justify-center items-center gap-3">
                <Image
                  src={`/images/destinations/1_8691_02.jpg`}
                  width={300}
                  height={300}
                  alt="destination 1"
                />
                <div className="flex flex-col items-center">
                  <h3>Jakarta</h3>
                  <h4 className="text-xs opacity-80">32,920 acommodations</h4>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <Image
                  src={`/images/destinations/1_17193_02.jpg`}
                  width={300}
                  height={300}
                  alt="destination 1"
                />
                <div className="flex flex-col items-center">
                  <h3>Bali</h3>
                  <h4 className="text-xs opacity-80">32,920 acommodations</h4>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <Image
                  src={`/images/destinations/1_18943_02.jpg`}
                  width={300}
                  height={300}
                  alt="destination 1"
                />
                <div className="flex flex-col items-center">
                  <h3>Bandung</h3>
                  <h4 className="text-xs opacity-80">32,920 acommodations</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
