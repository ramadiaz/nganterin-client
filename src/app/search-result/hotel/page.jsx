"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { BASE_API } from "@/utilities/environtment";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { MapPin, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { Button, DateRangePicker, Input, Slider } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import RoomTraveller from "@/components/RoomTraveller";
import { RatingStars } from "@/components/RatingStars";
import ImageHotel from "@/components/ImageHotel";
import SearchSkeletonList from "@/components/HotelSkeleton";

const Page = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [name, setName] = useState(useSearchParams().get("name") || "");
  const [city, setCity] = useState(useSearchParams().get("city") || "");
  const [result, setResult] = useState([]);
  const [maxVisitor, setMaxVisitor] = useState(useSearchParams().get("minVisitor") || 1)
  const [priceRange, setPriceRange] = useState({
    min: useSearchParams().get("priceStart") || 0,
    max: 5000000,
  });

  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  const startDate = formatDate(today);
  const endDate = formatDate(nextDay);

  const [hotelDate, setHotelDate] = useState({
    start:
      parseDate(useSearchParams().get("dateStart")) || parseDate(startDate),
    end: parseDate(useSearchParams().get("dateEnd")) || parseDate(endDate),
  });

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        `${BASE_API}/hotel/search?keyword=${search}&city=${city}&dateStart=${hotelDate.start}&dateEnd=${hotelDate.end}&priceStart=${priceRange.min}&priceEnd=${priceRange.max}&minVisitor=${maxVisitor}&name=${name}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        data.data == null ? setResult([]) : setResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, city, priceRange, maxVisitor, name]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/search-result/hotel?keyword=${search}&city=${city}&dateStart=${hotelDate.start}&dateEnd=${hotelDate.end}&priceStart=${priceRange.min}&priceEnd=${priceRange.max}&minVisitor=${maxVisitor}&name=${name}`
    );
  };

  return (
    <>
      <div className="min-h-screen pt-6 pb-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <form onSubmit={handleSearch}>
              <div className="flex text-black items-center font-semibold gap-4">
                <div className="w-80">
                  <Input
                    placeholder="Where to?"
                    variant="bordered"
                    startContent={<MapPin size={20} weight="bold" />}
                    size="lg"
                    className={{
                      inputWrapper: "border border-gray-950",
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    classNames={{
                      inputWrapper: "border-2 border-gray-300",
                    }}
                  />
                </div>
                <div className="w-80">
                  <DateRangePicker
                    variant="bordered"
                    visibleMonths={2}
                    size="lg"
                    value={hotelDate}
                    onChange={setHotelDate}
                    minValue={parseDate(startDate)}
                    selectorButtonPlacement={"start"}
                    classNames={{
                      inputWrapper: "border-2 border-gray-300",
                    }}
                  />
                </div>
                <div className="w-80">
                  <RoomTraveller
                    onChange={setMaxVisitor}
                  />
                </div>
                <div className="ml-auto">
                  <Button
                    className="bg-gradient-to-r from-sky-500 to-sky-700"
                    type="submit"
                    disabled={!search || !hotelDate.start || !hotelDate.end}
                  >
                    <MagnifyingGlass size={24} color="white" />
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex gap-3">
            <div className="w-1/4">
              <div className=" bg-white rounded-xl p-2 border-2 border-slate-200 ">
                <h2 className="text-black font-bold">Price per night</h2>
                <Slider
                  className="max-w-md text-black mt-2 text-xs"
                  label="Start from"
                  defaultValue={0}
                  formatOptions={{ style: "currency", currency: "IDR" }}
                  maxValue={5000000}
                  minValue={0}
                  step={100000.0}
                  size="md"
                  value={priceRange.min}
                  onChange={(value) =>
                    setPriceRange((prev) => ({ ...prev, min: value }))
                  }
                />
              </div>
              <div className="border-t-2 border-gray p-2 mt-6">
                <form onSubmit={handleSearch}>
                  <h2 className="mt-2 mb-2 font-bold text-black">
                    Search by property name
                  </h2>
                  <div className="mb-4 text-black">
                    <Input
                      variant="bordered"
                      startContent={<MagnifyingGlass size={20} weight="bold" />}
                      placeholder="e.g. Marriot"
                      classNames={{
                        inputWrapper: "border-2 border-gray-300",
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="border-t-2 border-b-2 border-gray p-2">
                <form onSubmit={handleSearch}>
                  <h2 className="mt-2 mb-2 font-bold text-black">
                    Search by city
                  </h2>
                  <div className="mb-4 text-black">
                    <Input
                      variant="bordered"
                      startContent={<MagnifyingGlass size={20} weight="bold" />}
                      placeholder="e.g. Jakarta"
                      classNames={{
                        inputWrapper: "border-2 border-gray-300",
                      }}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="w-3/4">
              {isLoading ? (
                <SearchSkeletonList />
              ) : (
                result.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-lg hover:shadow-black/30 transition-all duration-250 border-2 border-slate-200"
                  >
                    <Link
                      href={`/detail/hotel/${item.id}`}
                      className="block w-full"
                    >
                      <div className="flex flex-row gap-1">
                        <div className="w-96 space-y-1">
                          <ImageHotel photos={item.hotel_photos} />
                        </div>
                        <div className="flex p-2 w-full">
                          <div className="space-y-0.5 w-1/2">
                            <h3 className="text-lg font-semibold text-neutral-700">
                              {item.name}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm">
                              <span>
                                {item.hotels_location.city},{" "}
                                {item.hotels_location.state}
                              </span>
                            </div>
                            <RatingStars rating={4} size={16} />
                            <div className="flex flex-wrap text-2xs text-gray-600 gap-1 ">
                              {item.hotel_facilities?.map((facility, index) => {
                                return (
                                  <h2
                                    className="flex flex-row items-center w-max px-3 py-1 mt-2  bg-gray-500 text-white rounded-xl"
                                    key={index}
                                  >
                                    {facility.facility}
                                  </h2>
                                );
                              })}
                            </div>
                          </div>

                          <div className="text-right mr-2 mb w-1/2 mt-auto">
                            <div>
                              <div className="text-lg font-bold text-black">
                                IDR {item.pricing_start.toLocaleString()}
                                <span className="text-gray-600 text-xs font-light -mt-1">
                                  /night
                                </span>
                                <div className="text-gray-600 text-xs font-light -mt-0.5">
                                  (include taxes & fees)
                                </div>
                              </div>
                            </div>
                            <Button
                              className="mt-2 text-xs w-24 bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold rounded-full"
                              size="sm"
                            >
                              Select Room
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
