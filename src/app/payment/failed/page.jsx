"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BASE_URL } from "@/utilities/environtment";
import fetchWithAuth from "@/utilities/fetchWIthAuth";

const Page = () => {
  const order_id = useSearchParams().get("order_id");
  const transaction_status = useSearchParams().get("transaction_status");

  const pushData = async () => {
    const formData = new FormData();
    formData.append("order_id", order_id);
    formData.append("transaction_status", transaction_status);
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/checkout/payments/update-status`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("PUSH SUCCESS");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    pushData();
  }, []);

  return (
    <>
      <div className="bg-orange-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-7  rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center">
            <iframe
              src="https://lottie.host/embed/24974c2f-1a70-4863-990c-6c74400cbbf4/8iooS94tOj.json"
              className="size-60"
            ></iframe>
          </div>
          <div className="text-center">
            <h3 className="md:text-2xl text-gray-900 font-semibold">
              Payment failed!
            </h3>
            <p className="text-gray-900 mt-1 mb-5">
              We're waiting for you to completing your payment.
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
