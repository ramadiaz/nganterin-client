"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchWithAuth from "@/utilities/fetchWIthAuth";
import { BASE_API } from "@/utilities/environtment";
import { Input, Button, Textarea } from "@nextui-org/react";
import { Eye, EyeSlash, Link as LinkIcon } from "@phosphor-icons/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(false);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    country: "",
    province: "",
    city: "",
    zip_code: "",
    complete_address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await fetchWithAuth(`${BASE_API}/auth/register`, {
        method: "POST",
        body: JSON.stringify(inputData),
      });

      const userInfo = await response.json();

      if (response.ok) {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/auth/login");
      } else {
        toast.error(userInfo || "Registration failed.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inputData) {
      const checkIfAnyFieldIsEmpty = () => {
        return Object.values(inputData).some(
          (value) => value === "" || value === null
        );
      };
      setIsAnyFieldEmpty(checkIfAnyFieldIsEmpty());
    }
  }, [inputData]);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <ToastContainer /> {/* Tambahkan ToastContainer */}
      <div
        className="w-3/5 mx-auto text-neutral-700 pt-12 pb-20"
        data-aos="fade-up"
      >
        <div className="flex flex-row gap-4 items-center justify-center">
          <h1 className="text-4xl font-semibold">Your journey starts here!</h1>
          <LinkIcon size={64} className="animate-pulse" />
        </div>
        <div className="mt-10 p-8 bg-white rounded-lg shadow-lg shadow-neutral-600/50">
          <div>
            <h2 className="text-lg">Let's Register Now</h2>
          </div>
          <form onSubmit={registerUser} className="flex flex-col gap-8 mt-4">
            <div>
              <Input
                name="name"
                value={inputData.name}
                onChange={handleInputChange}
                required
                type="text"
                variant="bordered"
                label="Full Name"
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2 flex flex-row gap-4">
                <Input
                  name="email"
                  value={inputData.email}
                  onChange={handleInputChange}
                  required
                  type="email"
                  variant="bordered"
                  label="Email"
                />
              </div>
              <div className="basis-1/2 relative">
                <Input
                  name="password"
                  value={inputData.password}
                  onChange={handleInputChange}
                  required
                  variant="bordered"
                  label="Password"
                  type={isVisible ? "text" : "password"}
                  endContent={
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {isVisible ? (
                        <Eye size={20} color="gray-500" />
                      ) : (
                        <EyeSlash size={20} color="gray-500" />
                      )}
                    </button>
                  }
                />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2 flex flex-row gap-4">
                <Input
                  name="country"
                  value={inputData.country}
                  onChange={handleInputChange}
                  required
                  type="text"
                  variant="bordered"
                  label="Country"
                />
                <Input
                  name="province"
                  value={inputData.province}
                  onChange={handleInputChange}
                  required
                  type="text"
                  variant="bordered"
                  label="Province"
                />
              </div>
              <div className="basis-1/2 flex flex-row gap-4">
                <Input
                  name="city"
                  value={inputData.city}
                  onChange={handleInputChange}
                  required
                  type="text"
                  variant="bordered"
                  label="City"
                />
                <Input
                  name="zip_code"
                  value={inputData.zip_code}
                  onChange={handleInputChange}
                  required
                  type="text"
                  variant="bordered"
                  label="Zip Code"
                  className="-pr-10"
                />
              </div>
            </div>
            <div>
              <Input
                name="phone_number"
                value={inputData.phone_number}
                onChange={handleInputChange}
                required
                type="number"
                variant="bordered"
                label="Phone Number"
              />
            </div>
            <div>
              <Textarea
                name="complete_address"
                value={inputData.complete_address}
                onChange={handleInputChange}
                required
                variant="bordered"
                type="text"
                label="Your Address"
                disableAutosize
                classNames={{
                  input: "resize-y min-h-[40px]",
                }}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                isDisabled={isAnyFieldEmpty || isLoading}
                className={`bg-sky-700 text-white w-40 text-base p-4 ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
