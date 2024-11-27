"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { BASE_API } from "@/utilities/environtment";
import fetchWithAuth from "@/utilities/fetchWIthAuth";

import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(`${BASE_API}/profile`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.data);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-orange-100 flex items-center justify-center min-h-screen">
            <div
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md "
              data-aos="fade-up"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="w-32 h-32 object-cover rounded-full border-4 border-sky-700"
                  src={userData.profile_picture}
                  width={200}
                  height={200}
                  alt="Profile Picture"
                />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">
                  {userData.name}
                </h2>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    Email
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.email}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    Gender
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.gender}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    Phone Number
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.phone_number}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    Country
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.country}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    Province
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.province}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    City
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.city}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    Zip Code
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.zip_code}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium w-1/3">
                    Address
                  </label>
                  <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                    {userData.complete_address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-orange-100 to-orange-50 h-24"></div>
        </>
      )}
    </>
  );
};

export default Page;
