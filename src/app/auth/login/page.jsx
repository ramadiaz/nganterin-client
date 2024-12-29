"use client";

import { Image } from "@nextui-org/react";
import { LogInContainer } from "@/components/LoginContainer";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="mx-auto max-w-5xl w-full mt-20" data-aos="fade-up">
      <div className="flex flex-row">
        <div className="w-1/2 flex items-center justify-center h-auto">
          <Image
            src="/images/auth-assets/world-tour.png"
            width={400}
            alt="hotel image"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-1/2">
          <LogInContainer />
        </div>
      </div>

    </div>
  );
};

export default Page;