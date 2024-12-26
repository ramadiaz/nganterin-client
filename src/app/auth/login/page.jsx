"use client";

import { Image } from "@nextui-org/react";

import "aos/dist/aos.css";
import { LogInContainer } from "@/components/LoginContainer";

const Page = () => {
  return (
    <div className="mx-auto max-w-5xl w-full mt-20">
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
          <LogInContainer/>
        </div>
      </div>

    </div>
  );
};

export default Page;