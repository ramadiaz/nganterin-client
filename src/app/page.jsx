"use client";

import BackgroundImage from "@/components/utilities/BackgroundImage";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <BackgroundImage>
      <div className="pt-32">
        <h4 className="text-center mt-20">It's time to vacation 🚀</h4>
        <div className="text-center mt-12 text-8xl font-bold">
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
    </BackgroundImage>
  );
}
