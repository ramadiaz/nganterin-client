"use client";

import { Image } from "@nextui-org/react";
import { SignUpContainer } from "@/components/SignupContainer";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { TracingBeam } from "@/components/ui/tracing-beams";

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="mx-auto max-w-5xl w-full mt-20" data-aos="fade-up">
      <div className="flex flex-row">
        <div className="w-1/2">
          <TracingBeam>
            <SignUpContainer />
          </TracingBeam>
        </div>
        <div className="w-1/2 flex items-start mt-14 justify-center h-auto">
          <Image
            src="/images/auth-assets/travel-vlogger.png"
            width={400}
            alt="hotel image"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;