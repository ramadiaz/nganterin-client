'use client'

import Image from "next/image";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="w-3/4 mx-auto">
        <div
          className="flex flex-row justify-center items-center gap-4"
          data-aos="fade-up"
        >
          <Image src={`/images/faq-assets/faq.png`} width={400} height={400} />
          <div className="flex flex-col gap-2">
            <h1 className="text-9xl font-extrabold text-sky-700">FAQ</h1>
            <h3 className="text-sky-700">Frequently Asked Questions (?)</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
