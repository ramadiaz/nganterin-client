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
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGoogleLogin } from "@react-oauth/google";

export default function NavbarComponent() {
  const session = "dsdfs";
  const [isBlurred, setIsBlurred] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      )
        .then(async (res) => {
          const data = await res.json()
          console.log({data})
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  // const getCookies = () => {
  //   try {
  //     const token = Cookies.get("token");
  //     if (token) {
  //       setToken(token);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getCookies();
  // }, []);

  return (
    <Navbar
      isBlurred={false}
      className={
        pathName.endsWith("/") || pathName.endsWith("/about")
          ? `bg-opacity-0 transition-all duration-500 ${
              isBlurred ? "backdrop-blur-md bg-opacity-50 bg-blue-950/30" : ""
            }`
          : `bg-sky-700`
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {session && session.user ? (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={session.user.image}
              />
            ) : (
              <Button variant="flat" className="bg-white text-sky-700">
                Sign in
              </Button>
            )}
          </DropdownTrigger>
          {session && session.user ? (
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="text-black"
            >
              <DropdownItem key="profile" className="h-14 gap-2" disabled>
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" as={Link} href="/profile">
                My Profile
              </DropdownItem>
              <DropdownItem key="team_settings">Order History</DropdownItem>
              <DropdownItem key="help_and_feedback" as={Link} href="/help">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                as={Button}
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="text-black"
            >
              <DropdownItem
                key="settings"
                as={Button}
                onClick={() => googleLogin()}
                className="font-semibold"
              >
                Sign in with Google
              </DropdownItem>
              <DropdownItem key="help_and_feedback" as={Link} href="/help">
                Help & Feedback
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
