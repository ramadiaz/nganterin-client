"use client";

import { BellSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row h-32 px-28 items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <Link href={`/`} className="font-semibold text-3xl mr-4">
          Nganterin
        </Link>
        <Link
          href={`/##`}
          className="hover:opacity-80 transition-all duration-500"
        >
          Flights
        </Link>
        <Link
          href={`/##`}
          className="hover:opacity-80 transition-all duration-500"
        >
          Hotels
        </Link>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Link
          href={`/##`}
          className="hover:opacity-80 transition-all duration-500 text-lg"
        >
          Home
        </Link>
        <Link
          href={`/##`}
          className="hover:opacity-80 transition-all duration-500 text-lg"
        >
          Why Nganterin
        </Link>
        <Link
          href={`/##`}
          className="hover:opacity-80 transition-all duration-500 text-lg"
        >
          Contact
        </Link>
        <Link
          href={`/##`}
          className="hover:opacity-80 transition-all duration-500 text-lg"
        >
          FAQ
        </Link>
      </div>
      <div className="flex flex-row items-center gap-6">
        <Link href={`/##`} className="border-2 rounded-full px-4 py-2 text-sm">
          List your reservations
          </Link>
        <BellSimple size={28} color="#fcfcfc" />
        <Image
          src={`/avatar/default.png`}
          width={45}
          height={45}
          className="rounded-full ml-8"
        />
      </div>
    </div>
  );
};

export default Navbar;
