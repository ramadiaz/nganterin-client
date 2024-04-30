"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });
  return (
    <div>
      <div className="img -mt-16 h-[650px]">
        <div
          className="flex flex-col justify-center items-center h-full gap-4"
          data-aos="fade-up"
        >
          <h3 className="text-6xl font-bold">Why Nganterin?</h3>
          <h3 className="text-sm font-thin">
            Discover your trip and planning with us.
          </h3>
        </div>
      </div>
      <div className="bg-orange-100 min-h-screen text-sky-900 py-40">
        <div className="w-3/4 mx-auto flex flex-col gap-40 ">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="w-11/12 lg:w-3/4 xl:w-1/2" data-aos="fade-right">
              <h2 className="text-2xl">Easy to use</h2>
              <h4 className="border-t border-sky-700 mt-2 text-justify">
                You can purchase plane tickets and book hotels easily now via
                Nganterin. The easy and fast process will certainly save you
                more time and energy. You can do all the processes from the
                office while on your lunch break or even at home while relaxing
                with your family.
              </h4>
            </div>
            <Image
              src={`/images/about-assets/easy.png`}
              height={200}
              width={200}
              data-aos="fade-right"
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <Image
              src={`/images/about-assets/cheap.png`}
              height={200}
              width={200}
              data-aos="fade-left"
            />
            <div
              className="w-11/12 lg:w-3/4 xl:w-1/2 text-right"
              data-aos="fade-left"
            >
              <h2 className="text-2xl">Chepeast Price</h2>
              <h4 className="border-t border-sky-700 mt-2 text-justify">
                Traveloka offers the cheapest prices compared to competing
                online ticket sales agents. You can compare prices for your
                favorite airlines by opening the Traveloka.com website. This
                cheapest price is partly because Traveloka does not charge
                transaction fees to consumers. You are only required to pay the
                price of the plane ticket you ordered.
              </h4>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-11/12 lg:w-3/4 xl:w-1/2" data-aos="fade-right">
              <h2 className="text-2xl">Ready 24 Hours</h2>
              <h4 className="border-t border-sky-700 mt-2 text-justify">
                With the growing traffic of ticket orders made by consumers,
                Nganterin always tries to provide the best service. You can
                contact Customer Service which is ready 24 hours a day and will
                help you if you experience difficulties in processing
                transactions or other complaints. With the growing traffic of
                ticket orders made by consumers, Nganterin always tries to
                provide the best service. You can order plane tickets and hotel
                reservations at any time. You can also contact customer service
                which is ready 24 hours.
              </h4>
            </div>
            <div className="scale-75">
              <Image
                src={`/images/about-assets/24-hours.png`}
                height={200}
                width={250}
                data-aos="fade-right"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-24 bg-gradient-to-b from-orange-100 to-orange-50 from-10%">

      </div>
    </div>
  );
};

export default Page;
