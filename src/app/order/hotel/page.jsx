"use client";

import Loading from "@/app/loading";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import Head from "next/head";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Cookies from "js-cookie";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

const Page = () => {
  const user_token = Cookies.get("user_token");
  const [status, setStatus] = useState({
    loading: false,
    forSomeoneElse: true,
  });
  const [dataSnap, setDataSnap] = useState({})

    useEffect(() => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', CLIENT_KEY);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        }
    }, []);

  const showTransPayments = async () => {
      const formData = new FormData();
      formData.append('product_id', '9c12658d-f339-4d6e-8234-b7c9f67636ae')
      formData.append('overnight_stays', '3')
      await fetch(`${BASE_API}/checkout`, {
          method: "POST",
          headers: {
              'X-Authorization': API_KEY,
              'Authorization': `Bearer ${user_token}`,
          },
          body: formData
      }).then( async (res) => {
          const data = await res.json();
          await window.snap.pay(data.data.snap_token, {
              onSuccess: (res) => {
                  console.log(res)
              },
              onPending: (res) => {
                  console.log(res)
              },
              onError: (res) => {
                  console.log(res)
              },
              onClose: () => {
                  console.log('Closed')
              }
          })
      }).catch((err) => {
          console.log(err)
      })
 }

  return (
    <>
        <div className="bg-white min-h-screen text-neutral-700">
            {status.loading ? (
                <Loading/>
            ) : (
                <div className="w-3/5 mx-auto flex flex-row gap-4 pt-12 transition-all duration-500">
            <div className="basis-2/3">
              <div className="border rounded-lg border-neutral-300 p-4 shadow-sm shadow-black/50 transition-all duration-500">
                <h2 className="font-semibold">Let us know who you are!</h2>
                <Input
                  label="Full name*"
                  required
                  labelPlacement="outside"
                  radius="sm"
                  variant="bordered"
                  size="lg"
                  placeholder="Kimi no namae waaa"
                  className="pt-4"
                  classNames={{
                    label: ["text-sm"],
                  }}
                />
                <Input
                  label="Email*"
                  type="email"
                  required
                  labelPlacement="outside"
                  radius="sm"
                  variant="bordered"
                  size="lg"
                  placeholder="Enter your email"
                  className="pt-4"
                  classNames={{
                    label: ["text-sm"],
                  }}
                />
                <Input
                  label="Re-type email*"
                  type="email"
                  required
                  labelPlacement="outside"
                  radius="sm"
                  variant="bordered"
                  size="lg"
                  placeholder=" "
                  className="pt-4"
                  classNames={{
                    label: ["text-sm"],
                  }}
                />
                <h3 className="mt-4 text-sm opacity-90">
                  If you enter your email address and do not complete your
                  reservation, we may send you reminders to help you resume your
                  booking.
                </h3>
                <div className="flex flex-row gap-4">
                  <Input
                    label="Phone number (optional)"
                    labelPlacement="outside"
                    radius="sm"
                    variant="bordered"
                    size="lg"
                    placeholder=" "
                    className="pt-4"
                    classNames={{
                      label: ["text-sm"],
                    }}
                  />
                  <Input
                    label="Country/region of residence*"
                    required
                    labelPlacement="outside"
                    radius="sm"
                    variant="bordered"
                    size="lg"
                    placeholder=" "
                    className="pt-4"
                    classNames={{
                      label: ["text-sm"],
                    }}
                  />
                </div>
                <Checkbox
                  value={status.forSomeoneElse}
                  defaultSelected={status.forSomeoneElse}
                  onChange={(e) =>
                    setStatus({ ...status, forSomeoneElse: e.target.checked })
                  }
                  size="sm"
                  className="pt-8"
                >
                  Make this booking for someone else
                </Checkbox>
                <div
                  className={`border rounded-lg border-neutral-300 p-4 mt-4 ${
                    status.forSomeoneElse ? "h-52" : "h-0 opacity-0"
                  } transition-all duration-500`}
                >
                  <Input
                    label="Full name*"
                    required
                    labelPlacement="outside"
                    radius="sm"
                    variant="bordered"
                    size="lg"
                    placeholder="Kimi no namae waaa"
                    classNames={{
                      label: ["text-sm"],
                    }}
                  />
                  <Input
                    label="Country/region of residence*"
                    required
                    labelPlacement="outside"
                    radius="sm"
                    variant="bordered"
                    size="lg"
                    placeholder=" "
                    className="pt-4"
                    classNames={{
                      label: ["text-sm"],
                    }}
                  />
                </div>
              </div>
              <div className="border rounded-lg border-neutral-300 p-4 shadow-sm shadow-black/50 transition-all duration-500 mt-4">
                <h3 className="text-sm">
                  By proceeding with this booking, I agree to Nganterin’s{` `}
                  <span className="text-sky-700">Terms of Use</span>
                  {` `}and{` `}
                  <span className="text-sky-700">Privacy Policy</span>.
                </h3>
                <h3 className="text-red-500 text-right text-sm mt-8">
                  Hurry! Our last room for your dates at this price
                </h3>
                <Button color="primary" size="lg" onClick={showTransPayments}>
                  Payment
                </Button>
              </div>
            </div>
            <div className="basis-1/3 ">
              <div className="border rounded-lg border-neutral-300 p-4 shadow-sm shadow-black/50">
                <div className="flex flex-row gap-4">
                  <Image
                    src={`/images/hotel-assets/Choska.webp`}
                    height={200}
                    width={200}
                    className="object-cover w-20 h-32"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-red-500 text-white px-2 py-1 text-xs">
                        Top Value
                      </div>
                      <div className="bg-red-500 text-white px-2 py-1 text-xs">
                        Best Seller
                      </div>
                    </div>
                    <div>
                      <h2 className="uppercase text-xl">Choska Residence</h2>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ef4444"
                        edit={false}
                        value={3}
                      />
                      <h4 className="text-xs opacity-90">
                        No.16 Jalan Kebon Kacang 29, Choska Residence, Thamrin,
                        Jakarta, DKI Jakarta, Indonesia, 10240
                      </h4>
                      <div className="flex flex-row gap-1 mt-4">
                        <Sparkle size={18} />
                        <h5 className="font-semibold text-xs whitespace-nowrap">
                          Exceptional location{" "}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg border-neutral-300 p-4 shadow-sm shadow-black/50 mt-4 text-sm">
                <div className="border-b border-neutral-500/50 pb-4">
                  <div className="flex flex-row justify-between px-2 py-1">
                    <h3>Original Price</h3>
                    <h3 className="text-red-600 line-through">Rp 1.099.999</h3>
                  </div>
                  <div className="flex flex-row justify-between px-2 py-1">
                    <h3>Our Price</h3>
                    <h3 className="text-red-600 line-through">Rp 899.999</h3>
                  </div>
                  <div className="flex flex-row justify-between border border-dashed border-green-600 bg-green-200 px-2 py-1">
                    <h3>Instant Discount</h3>
                    <h3 className="text-green-600">-Rp 100.000</h3>
                  </div>
                  <div className="flex flex-row justify-between px-2 py-1">
                    <h3>Room price (1 room x 1 night)</h3>
                    <h3 className="">Rp 799.999</h3>
                  </div>
                  <div className="flex flex-row justify-between px-2 py-1">
                    <h3>Booking Fees</h3>
                    <h3 className="font-semibold text-sky-600">FREE</h3>
                  </div>
                </div>
                <div className="pt-4 border-b border-neutral-500/50 pb-4">
                  <div className="flex flex-row justify-between px-2 py-1 text-medium">
                    <h3 className="font-semibold">Price</h3>
                    <h3 className="font-semibold">Rp 799.999</h3>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex flex-row justify-between px-2 py-1 text-xs">
                    <h3 className="">
                      Included in price: Service Charge 30%, Tax 10%, Service
                      charge 10%
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-gradient-to-b from-white to-orange-50 h-24"></div>
    </>
  );
};

export default Page;
