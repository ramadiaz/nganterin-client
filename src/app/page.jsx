"use client";

import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Card, Tabs, Tab, CardBody, Input } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import Image from "next/image";

export default function Home() {
  const [value, setValue] = useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  let formatter = useDateFormatter({ dateStyle: "long" });

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
        <Card className="w-[700px] -mt-28">
          <CardBody>
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options" variant="underlined">
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
                      />
                      <div className="flex flex-row mt-4">
                        <DateRangePicker
                          label="Vacation Time"
                          value={value}
                          onChange={setValue}
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
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="Activities" title="Activities">
                  <Card>
                    <CardBody>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </CardBody>
        </Card>
        <div className="max-w-[932px]">
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
