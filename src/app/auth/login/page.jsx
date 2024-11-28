"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

import AOS from "aos";
import "aos/dist/aos.css";
import { BASE_URL } from "@/utilities/environtment";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible);
  const isButtonDisabled = !email || !password;

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch(BASE_URL + `/auth/login`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          email,
          password
        })
      })

      if (res.ok) {
        const data = await res.json()
        Cookies.set("user_jwt", data.body)
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push('/')
      } else if (res.status == 403) {
        toast.error("Email lu belum lu verif boyy, lu bukan nabi", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.status == 404) {
        toast.error("Elu siapa ajgggg, email lu gaada", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.status == 401) {
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.status == 400) {
        toast.error("Bad Request", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong", {
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
    } catch (err) {
      console.error(err)
    }
  }

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
                onClick={handleLogin}
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