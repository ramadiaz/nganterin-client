"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { GetUserData } from "@/utilities/getUserData";

export default function NavbarComponent() {
  const [isBlurred, setIsBlurred] = useState(false);
  const pathName = usePathname();
  const [userData, setUserData] = useState({})
  const router = useRouter()

  useEffect(() => {
    const user_data = GetUserData()
    setUserData(user_data)

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("user_id");
    Cookies.remove("user_jwt");
    Cookies.remove("user_token");
    Cookies.remove("user_partner_id");

    location.replace("/");
  };

  return (
    <>
      <Navbar
        isBlurred={false}
        className={
          pathName.endsWith("/") || pathName.endsWith("/about")
            ? `bg-opacity-0 transition-all duration-500 ${isBlurred ? "backdrop-blur-md bg-opacity-50 bg-blue-950/30" : ""
            }`
            : `bg-sky-700 border-b-2 border-gray-900`
        }
      >
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link href="/">
              <p className="hidden sm:block font-bold text-inherit text-2xl text-white">
                Nganterin
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem isActive={pathName.endsWith("/")}>
              <Link className="text-white" href="/">
                Discover
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName.endsWith("/about")}>
              <Link href="/about" aria-current="page" className="text-white">
                Why Nganterin
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName.endsWith("/faq")}>
              <Link className="text-white" href="/faq">
                FAQ
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          {userData.id ?
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={userData.name}
                  size="sm"
                  src={userData.picture}
                />
              </DropdownTrigger>
              <DropdownMenu className="text-black">
                <DropdownItem as={Link} href="/order/history/hotel">
                  My Order
                </DropdownItem>
                <DropdownItem onClick={handleLogout} color="danger">
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            :
            <div className="flex flex-row gap-2">
              <Button variant="flat" className="bg-white text-sky-700" onClick={() => router.push("/auth/login")}>
                Sign in
              </Button>
              <Button variant="flat" className="bg-sky-600 text-white" onClick={() => router.push("/auth/register")}>
                Sign up
              </Button>
            </div>
          }
        </NavbarContent>
      </Navbar>
    </>
  );
}
