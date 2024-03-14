'use client'

import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function NavbarComponent() {
  const [isBlurred, setIsBlurred] = useState(false);
  const pathName = usePathname()

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

  return (
    <Navbar isBlurred={false} className={`bg-opacity-0 transition-all duration-500 ${isBlurred ? 'backdrop-blur-md bg-opacity-50 bg-blue-950/30' : ''}`}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit text-2xl">
            Nganterin
          </p>
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
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="/avatar/default.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" className="text-black">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
