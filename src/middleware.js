import { NextResponse } from "next/server";
import { parse } from "cookie";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function middleware(request) {
  const cookies = parse(request.headers.get("cookie") || "");
  const token = cookies.user_token;

  const loginPath = new URL("/register", request.url);
  const currentPath = new URL(request.url);

  console.log(currentPath.pathname);

  if (token && currentPath.pathname !== loginPath.pathname) {
    console.log({ token });
    try {
      const response = await fetch(`${BASE_API}/profile`, {
        headers: {
          "X-Authorization": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      if (
        !data.data.gender ||
        !data.data.phone_number ||
        !data.data.country ||
        !data.data.province ||
        !data.data.city ||
        !data.data.zip_code ||
        !data.data.complete_address
      ) {
        return NextResponse.redirect(loginPath);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/order', '/hotel', '/help', '/flight', '/faq', '/about'],
};
