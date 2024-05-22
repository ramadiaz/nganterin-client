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
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function NavbarComponent() {
  const [isBlurred, setIsBlurred] = useState(false);
  const pathName = usePathname();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userData, setUserData] = useState("");

  const { push } = useRouter();
  const isPartner = Cookies.get("user_partner_id");

  useEffect(() => {
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
      } finally {
        setIsAuthenticating(false);
      }
    },
  });

  const pushLogin = async (data) => {
    const formData = new FormData();
    console.log({ data });
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("profile_picture", data.picture);

    try {
      const res = await fetch(`${BASE_API}/auth/login/oauth/google`, {
        headers: {
          "X-Authorization": API_KEY,
        },
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();

        Cookies.remove("user_token");
        Cookies.set("user_token", data.token, { expires: 3 });

        Cookies.remove("user_partner_id");
        Cookies.set("user_partner_id", data.data.partner_id, { expires: 3 });

        const response = await fetch(`${BASE_API}/profile`, {
          headers: {
            "X-Authorization": API_KEY,
            Authorization: `Bearer ${data.token}`,
          },
        });
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
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    Cookies.remove("user_id");
    Cookies.remove("user_jwt");
    Cookies.remove("user_token");
    Cookies.remove("user_partner_id");

    setUserData("");

    push("/");
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

  return (
    <>
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
              {userData ? (
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src={userData.picture}
                />
              ) : (
                <Button variant="flat" className="bg-white text-sky-700">
                  Sign in
                </Button>
              )}
            </DropdownTrigger>
            {userData ? (
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="text-black"
              >
                <DropdownItem key="profile" className="h-14 gap-2" disabled>
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userData.email}</p>
                </DropdownItem>
                <DropdownItem key="settings" as={Link} href="/profile">
                  My Profile
                </DropdownItem>
                {isPartner != "null" ? (
                  <DropdownItem key="team_settings" as={Link} href="/partner/hotel-register">New Hotels</DropdownItem>
                ) : (
                  <DropdownItem key="team_settings" as={Link} href="/register/partner">
                    Become Our Partner
                  </DropdownItem>
                )}
                {/* <DropdownItem key="team_settings">Order History</DropdownItem> */}
                <DropdownItem key="help_and_feedback" as={Link} href="/help">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  as={Button}
                  onClick={() => {
                    googleLogout();
                    handleLogout();
                  }}
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
    </>
  );
}
