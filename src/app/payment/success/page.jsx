'use client'

import Cookies from "js-cookie";
import { useEffect } from "react";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

const Page = () => {
  const user_token = Cookies.get("user_token");

  const order_id = useSearchParams().get("order_id");
  const transaction_status = useSearchParams().get("transaction_status");

  const pushData = async () => {
    const formData = new FormData();
    formData.append("order_id", order_id);
    formData.append("transaction_status", transaction_status);
    try {
      const response = await fetch(
        `${BASE_API}/checkout/payments/update-status`,
        {
          method: "POST",
          headers: {
            "X-Authorization": API_KEY,
            Authorization: `Bearer ${user_token}`,
          },
          body: formData,
        }
      );
      if(response.ok) {
        console.log("PUSH SUCCESS")
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    pushData();
  }, [])

  return (
    <>
      <div className="bg-orange-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-7  rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center">
            <iframe
              src="https://lottie.host/embed/ce238ffe-d768-4db3-86ac-1a2bdaf1a740/yArFCrp3ls.json"
              className="size-60"
            ></iframe>
          </div>
          <div className="text-center">
            <h3 className="md:text-2xl text-gray-900 font-semibold">
              Payment Success!
            </h3>
            <p className="text-gray-900 mt-1 mb-5">
              Thank you for completing your payment.
            </p>
            <div>
              <button
                href="#"
                className="px-12 bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-orange-100 to-orange-50 h-24"></div>
    </>
  );
};

export default Page;
