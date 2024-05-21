"use client";

import Loading from "@/app/loading";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [status, setStatus] = useState({ loading: false });

  const imageData = [
    {
      image_url: `/images/detail-hotel-assets/2.jpg`,
    },
    {
      image_url: `/images/detail-hotel-assets/3.jpg`,
    },
    {
      image_url: `/images/detail-hotel-assets/4.webp`,
    },
    {
      image_url: `/images/detail-hotel-assets/5.jpg`,
    },
    {
      image_url: `/images/detail-hotel-assets/6.webp`,
    },
    {
      image_url: `/images/detail-hotel-assets/7.webp`,
    },
  ];

  const facilites = [
    "Front desk [24-hour]",
    "Airport transfer",
    "Bicycle rental",
    "Valet parking",
    "Swimming pool [indoor]",
    "Fitness center",
    "Shuttle service",
    "Free Wi-Fi in all rooms!",
  ];

  return (
    <>
      <div className="bg-white h-14"></div>
      <div className="min-h-screen text-black bg-white">
        {status.loading ? (
          <Loading />
        ) : (
          <div>
            <div className="w-3/5 mx-auto flex flex-col items-center">
              <div className="flex flex-row gap-4 items-center w-max mx-auto mb-8 select-none">
                <div className="w-96 h-96 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500">
                  <Image
                    src={`/images/detail-hotel-assets/1.jpg`}
                    width={800}
                    height={800}
                    className="w-full h-full overflow-hidden object-cover selector"
                    alt="hotel image"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 justify-between">
                  {imageData.map((image, index) => {
                    return (
                      <div
                        className="w-44 h-44 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500"
                        key={index}
                      >
                        <Image
                          src={image.image_url}
                          width={800}
                          height={800}
                          className="w-full h-full overflow-hidden object-cover selector"
                          alt="hotel image"
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
                    <Button className="text-sm" size="lg" variant="light">
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
                        Rp.799.000,-
                      </h2>
                    </div>
                    <Button
                      className="uppercase bg-sky-700 text-white"
                      radius="full"
                      size="md"
                      variant="flat"
                    >
                      View this deal
                    </Button>
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
                    <h3 className="text-xl font-semibold">
                      Greenhost Boutique Hotel Prawirotaman
                    </h3>
                    <h4 className="text-sm">
                      Jalan Prawirotaman II No.629 Brontokusuman, Kota Gede,
                      Yogyakarta, Indonesia, 55153{" "}
                    </h4>
                  </div>
                  <div className="rounded-lg border border-neutral-300 p-4">
                    <h2 className="font-semibold">Facilites</h2>
                    <div className="flex flex-wrap font-semibold text-xs gap-2 mt-2">
                      {facilites.map((item, index) => {
                        return (
                          <h2 className="flex flex-row items-center gap-2 w-max" key={index}>
                            <Check size={12} weight="bold" /> {item}
                          </h2>
                        );
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
      </div>
      <div className="bg-gradient-to-b from-white to-orange-50 h-20"></div>
    </>
  );
};

export default Page;
