"use client";

import Image from "next/image";
import faq from "/public/json/faq.json";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  return (
    <div className="min-h-screen bg-orange-50 py-20">
      <div className="w-1/2 mx-auto">
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
        <Accordion
          defaultExpandedKeys={["1"]}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          {faq.data.map((data, index) => {
            return (
              <AccordionItem
                key={index}
                aria-label={data.question}
                title={data.question}
                className="text-black"
              >
                {data.answer}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
