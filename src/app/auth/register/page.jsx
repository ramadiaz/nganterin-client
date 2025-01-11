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
    <div className="mx-auto max-w-5xl w-full sm:mt-20" data-aos="fade-up">
      <TracingBeam>
        <div className="flex flex-col-reverse sm:flex-row">
          <div className="sm:w-1/2 scale-90 sm:scale-100">
            <SignUpContainer />
          </div>
          <div className="sm:w-1/2 flex items-start mt-14 justify-center h-auto">
            <Image
              src="/images/auth-assets/travel-vlogger.png"
              width={400}
              alt="hotel image"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </TracingBeam>
    </div>
  );
};

export default Page;