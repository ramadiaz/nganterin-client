"use client";

import Authenticating from "@/app/authenticating";
import Loading from "@/app/loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { BASE_API, SECRET_KEY } from "@/utilities/environtment";
import jwt from "jsonwebtoken";
import { Button, ButtonGroup, Image } from "@nextui-org/react";
import { Check } from "@phosphor-icons/react/dist/ssr";

const Page = ({ params: id }) => {
  const [status, setStatus] = useState({ loading: true });
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userData, setUserData] = useState("");

  const { push, refresh } = useRouter();

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      setIsAuthenticating(true);
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (res.ok) {
          const userInfo = await res.json();
          const token = jwt.sign(userInfo, SECRET_KEY, { expiresIn: "3d" });

          Cookies.remove("user_jwt");
          Cookies.set("user_jwt", token, { expires: 3 });

          pushLogin(userInfo);
          getCookies();
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  const pushLogin = async (data) => {
    console.log("AKU DIPANGGIL NIH KAK");
    const formData = new FormData();
    console.log({ data });
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("profile_picture", data.picture);

    try {
      const res = await fetchWithAuth(`${BASE_API}/auth/login/oauth/google`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();

        Cookies.remove("user_token");
        Cookies.set("user_token", data.token, { expires: 3 });

        Cookies.remove("user_partner_id");
        Cookies.set("user_partner_id", data.data.partner_id, { expires: 3 });

        const response = await fetchWithAuth(`${BASE_API}/profile`);
        const user_data = await response.json();
        if (
          !user_data.data.gender ||
          !user_data.data.phone_number ||
          !user_data.data.country ||
          !user_data.data.province ||
          !user_data.data.city ||
          !user_data.data.zip_code ||
          !user_data.data.complete_address
        ) {
          push("/register/user");
        } else {
          location.reload();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getCookies = () => {
    try {
      const token = Cookies.get("user_jwt");
      if (token) {
        var decoded = jwt.verify(token, SECRET_KEY);
        setUserData(decoded);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCookies();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(`${BASE_API}/hotels/${id.id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setDetail(data.data);

        const images_array = data.data.hotel_photos;
        const images_decoded = JSON.parse(images_array);
        console.log(images_decoded);
        setImages(images_decoded);
        setFacilities(JSON.parse(data.data.facilities));

        setStatus({ loading: false });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white h-14"></div>
      <div className="min-h-screen text-black bg-white">
        {status.loading ? (
          <Loading />
        ) : (
          <div>
            <div className="w-3/5 mx-auto flex flex-col items-center">
              <div className="flex flex-row gap-4 items-center w-max mx-auto mb-8 select-none">
                <div className="w-96 h-96 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500">
                  <Image
                    src={images[0]}
                    width={0}
                    height={0}
                    className="w-96 h-96 overflow-hidden object-cover selector"
                    alt="hotel image"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 justify-between">
                  {images.slice(1).map((image, index) => {
                    return (
                      <div
                        className="w-44 h-44 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500"
                        key={index}
                      >
                        <Image
                          src={image}
                          width={0}
                          height={0}
                          className="w-44 h-44 overflow-hidden object-cover selector"
                          alt="hotel image"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full">
                <div className="rounded-lg border border-neutral-300 flex flex-row justify-between">
                  <ButtonGroup radius="sm">
                    <Button className="text-sm" size="lg" variant="light">
                      Overview
                    </Button>
                    <Button className="text-sm" size="lg" variant="light">
                      Rooms
                    </Button>
                    <Button className="text-sm" size="lg" variant="light">
                      Facilites
                    </Button>
                    <Button className="text-sm" size="lg" variant="light">
                      Reviews
                    </Button>
                  </ButtonGroup>
                  <div className="flex flex-row items-center text-black gap-4 mr-8">
                    <div className="flex fleex-row items-center gap-2">
                      <h3 className="text-xs">from</h3>
                      <h2 className="text-red-500 font-semibold text-xl">
                        Rp. {parseInt(detail.overnight_prices).toLocaleString()}
                      </h2>
                    </div>
                    {userData ? (
                      <Button
                        as={Link}
                        href={`/order/hotel/${id.id}`}
                        className="uppercase bg-sky-700 text-white"
                        radius="full"
                        size="md"
                        variant="flat"
                      >
                        View this deal
                      </Button>
                    ) : (
                      <Button
                        onClick={() => googleLogin()}
                        className="uppercase bg-sky-700 text-white"
                        radius="full"
                        size="md"
                        variant="flat"
                      >
                        Login to order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row mt-4 gap-4">
                <div className="basis-2/3 flex flex-col gap-4">
                  <div className="rounded-lg border border-neutral-300 p-4">
                    <div className="flex flex-row gap-2 mb-4 ">
                      <div className="bg-sky-700 text-white text-xs px-2 py-1 rounded-md">
                        Domestic Deal
                      </div>
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                        Best seller
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {detail.name}
                    </h3>
                    <h4 className="text-sm">{detail.description}</h4>
                  </div>
                  <div className="rounded-lg border border-neutral-300 p-4">
                    <h2 className="font-semibold">Rooms</h2>
                    <div className="flex flex-wrap font-semibold text-xs gap-2 mt-2">
                      <h2 className="flex flex-row items-center gap-2 w-max">
                        <Check size={12} weight="bold" />
                        Max Visitor: {detail.max_visitor}
                        <Check size={12} weight="bold" />
                        Smooking Allowed:{" "}
                        {!detail.smoking_allowed === "0" ? "Yes" : "No"}
                      </h2>
                    </div>
                  </div>
                  <div className="rounded-lg border border-neutral-300 p-4">
                    <h2 className="font-semibold">Facilites</h2>
                    <div className="flex flex-wrap font-semibold text-xs gap-2 mt-2">
                      {facilities.map((item, index) => {
                        return (
                          <h2
                            className="flex flex-row items-center gap-2 w-max"
                            key={index}
                          >
                            <Check size={12} weight="bold" /> {item}
                          </h2>
                        );
                      })}
                      <h2 className="flex flex-row items-center gap-2 w-max">
                        <Check size={12} weight="bold" /> Room Size:{" "}
                        {detail.room_sizes} m<sup>3</sup>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="basis-1/3">
                  <div className="rounded-lg border border-neutral-300 p-4 flex flex-col gap-2">
                    <div className=" flex flex-col gap-1">
                      <h2 className="text-xl font-semibold">8.9 Excellent</h2>
                      <h4 className="text-xs opacity-90 text-sky-600">
                        4,222 Reviews
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Service 9.2
                      </div>
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Cleanliness 8.9
                      </div>
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Value for money 9.0
                      </div>
                      <div className="bg-emerald-300 text-black/70 text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Location 9.0
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isAuthenticating && <Authenticating />}
      <div className="bg-gradient-to-b from-white to-orange-50 h-20"></div>
    </>
  );
};

export default Page;
