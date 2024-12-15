"use client";

import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { BASE_URL } from "@/utilities/environtment";
import { Button, Card, CardBody, Image } from "@nextui-org/react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(`${BASE_URL}/checkout/history`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data.data.reverse());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-orange-100 py-14">
            <div className="w-3/4 mx-auto">
              <div className="flex flex-row gap-4 bg-white/50 text-neutral-700 rounded-xl shadow-xl shadow-neutral-500/50 pb-14 p-4">
                <div className="basis-2/5 p-4">
                  <div>
                    <h1 className="text-lg font-semibold">
                      Your Order History
                    </h1>
                    <h4 className="text-sm">
                      Your Booking History provides a detailed overview of all
                      your past travel reservations, including hotel stays, for
                      easy reference and management.
                    </h4>
                  </div>
                </div>
                {history.length != 0 && (
                  <div className="basis-3/5 flex flex-col gap-4 justify-center items-center">
                    {history.reverse().map((item) => {
                      const date = new Date(item.created_at);

                      const image_array = item.hotel_photos;
                      const imageUrl = JSON.parse(image_array);
                      const price = parseInt(item.total_price);

                      return (
                        <div className="hover:shadow-lg hover:shadow-black/30 transition-all duration-500 rounded-2xl">
                          <Card
                            isBlurred
                            className="border-none bg-background/50"
                            shadow="sm"
                          >
                            <CardBody>
                              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                  <Image
                                    alt="Hotel image"
                                    className="object-cover w-64 h-36"
                                    height={200}
                                    shadow="md"
                                    src={imageUrl[0]}
                                    width={200}
                                  />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-0 w-full">
                                      <h3 className="font-semibold text-foreground/90">
                                        {item.hotel_name}
                                      </h3>
                                      <p className="text-small text-foreground/80">
                                        {item.invoice}
                                      </p>
                                      <p className="text-small text-foreground/80">
                                        {date.toLocaleString()}
                                      </p>
                                      <h1 className="text-large text-right font-medium mt-2">
                                        <span>
                                          Rp. {price.toLocaleString()}
                                        </span>
                                      </h1>
                                    </div>
                                    <Button
                                      isIconOnly
                                      className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                      radius="full"
                                      variant="light"
                                    ></Button>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                )}
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
