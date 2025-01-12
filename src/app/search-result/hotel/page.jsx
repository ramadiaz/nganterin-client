"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_API } from "@/utilities/environtment";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { MapPin, MagnifyingGlass, Funnel } from "@phosphor-icons/react";
import Link from "next/link";
import { Button, DateRangePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, useDisclosure } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import RoomTraveller from "@/components/RoomTraveller";
import { RatingStars } from "@/components/RatingStars";
import ImageHotel from "@/components/ImageHotel";
import SearchSkeletonList from "@/components/HotelSkeleton";

const Page = () => {
  const router = useRouter();
  const mobileFilter = useDisclosure()

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(useSearchParams().get("keyword") || "");
  const [name, setName] = useState(useSearchParams().get("name") || "");
  const [city, setCity] = useState(useSearchParams().get("city") || "");
  const [result, setResult] = useState([]);
  const [maxVisitor, setMaxVisitor] = useState(useSearchParams().get("minVisitor") || 1)
  const [priceRange, setPriceRange] = useState({
    min: useSearchParams().get("priceStart") || 0,
    max: 64000000,
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
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <form onSubmit={handleSearch}>
              <div className="flex text-black items-center font-semibold gap-4">
                <div className="w-full max-w-80">
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
                <div className="w-80 hidden sm:block">
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
                <div className="w-80 hidden sm:block">
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
              <div className="">
                <button onClick={() => mobileFilter.onOpen()} className="w-full mt-2 cursor-pointer flex flex-row gap-1 justify-end items-center text-sky-700 sm:hidden text-sm" >Filters <Funnel size={24} color="#0369a1" /></button>
              </div>
            </form>
          </div>

          <div className="flex gap-3">
            <div className="hidden sm:block sm:w-1/4">
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

            <div className="w-full sm:w-3/4 space-y-4">
              {isLoading ? (
                <SearchSkeletonList />
              ) : (
                result.map((item, index) => (
                  <div
                    key={index}
                    className="w-full rounded-xl shadow-lg hover:shadow-lg hover:shadow-black/30 transition-all duration-250 border-2 border-slate-200"
                  >
                    <Link
                      href={`/detail/hotel/${item.id}`}
                      target="_blank"
                      className="block w-full"
                    >
                      <div className="w-full flex flex-row gap-1">
                        <div className="w-64 max-w-96 space-y-1">
                          <ImageHotel photos={item.hotel_photos} />
                        </div>
                        <div className="flex flex-wrap gap-4 justify-between p-2 w-full">
                          <div className="space-y-0.5">
                            <h3 className="text-lg font-semibold text-neutral-700">
                              {item.name}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm">
                              <span>
                                {item.hotels_location.city},{" "}
                                {item.hotels_location.state}
                              </span>
                            </div>
                            <RatingStars size={16} color="#2e2e2e" count={5} value={item.rating.rating} />
                            <div className="hidden sm:flex flex-wrap text-2xs text-gray-600 gap-1 ">
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

                          <div className="hidden sm:block w-full text-right mr-2 mb mt-auto">
                            <div>
                              <div className="text-lg font-bold text-black whitespace-nowrap">
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
                      <div className="sm:hidden p-2 space-y-2">
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
                        <div className="w-full text-right mr-2 mb mt-auto">
                          <div>
                            <div className="text-lg font-bold text-black whitespace-nowrap">
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
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={mobileFilter.isOpen} onOpenChange={mobileFilter.onOpenChange} backdrop="blur" radius="sm">
        <ModalContent className="text-slate-900">
          {(onClose) => (
            <>
              <ModalBody className="pt-8">
                <h2 className="text-black font-semibold">Vacation time</h2>
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
                <h2 className="text-black font-semibold">Vacation time</h2>
                <RoomTraveller
                  onChange={setMaxVisitor}
                />
                <h2 className="text-black font-semibold">Price per night</h2>
                <div className=" bg-white rounded-xl p-2 border-2 border-slate-200 ">
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
                <form onSubmit={handleSearch}>
                  <h2 className="mt-2 mb-2 font-bold text-black">
                    Search by property name
                  </h2>
                  <div className="text-black">
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
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} className="bg-gradient-to-r from-sky-500 to-sky-700 text-white">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Page;
