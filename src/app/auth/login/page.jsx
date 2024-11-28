"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const isButtonDisabled = !email || !password;

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          <form className="space-y-4 text-black">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                required
                name="email"
                variant="bordered"
                placeholder="Enter your email"
                type="email"
                className="w-full mt-1.5 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                required
                name="password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Eye size={20} color="gray" />
                    ) : (
                      <EyeSlash size={20} color="gray" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full mt-1.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="justify-center flex">
              <Button
                color="primary"
                size="lg"
                className="w-full bg-sky-700"
                isDisabled={isButtonDisabled}
              >
                Login
              </Button>
            </div>
            <h5 className="flex text-sm text-gray-500 gap-1 justify-center">
              Don't have an account? 
              <Link href="/auth/register" className="text-black hover:underline">
                Register Now
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;