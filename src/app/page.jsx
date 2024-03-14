"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Card, Tabs, Tab, CardBody, Input } from "@nextui-org/react";
import {
  CalendarCheck,
  CalendarX,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { DateRangePicker } from "react-date-range";

export default function Home() {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  
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
      <div className="justify-center flex bg-orange-100">
        <Card className="w-[700px] -translate-y-28">
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
                        <Input
                          variant={"bordered"}
                          placeholder="Holiday Inn & Suites Jakarta Gajah Mada"
                          startContent={
                            <CalendarCheck size={32} color="#2e2e2e" />
                          }
                          size="lg"
                        />
                        <Input
                          variant={"bordered"}
                          placeholder="Holiday Inn & Suites Jakarta Gajah Mada"
                          startContent={<CalendarX size={32} color="#2e2e2e" />}
                          size="lg"
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
      </div>
    </div>
  );
}
