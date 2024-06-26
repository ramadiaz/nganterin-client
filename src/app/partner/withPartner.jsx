"use client";

import Cookies from "js-cookie";
import Authenticating from "../authenticating";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const user_token = Cookies.get("user_token");
const user_jwt = Cookies.get("user_jwt");

const withPartner = (WrappedComponent) => {

  const AuthRoute = (props) => {
    const { push } = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const checkAuthentication = async () => {
      var decoded = jwt.verify(user_jwt, SECRET_KEY);
      console.log({ decoded });
      setIsAuthenticating(true);
      try {
        const formData = new FormData();
        formData.append("name", decoded.name);
        formData.append("email", decoded.email);
        formData.append("profile_picture", decoded.picture);
        const response = await fetch(`${BASE_API}/auth/login/oauth/google`, {
          method: "POST",
          headers: {
            "X-Authorization": API_KEY,
            Authorization: `Bearer ${user_token}`,
          },
          cache: "no-store",
          body: formData,
        });
        const data = await response.json();
        if (data.data.partner_id == null) {
          push("/register/partner");
        }
        console.log("partner_id: ", data.data.partner_id);
      } catch (err) {
        push("/register/partner");
        console.error(err);
      }

      setIsAuthenticating(false);
    };

    useEffect(() => {
      if (!user_jwt) {
        push("/");
      } else {
        checkAuthentication();
      }
    }, []);
    return isAuthenticating ? (
      <Authenticating />
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return AuthRoute;
};
export default withPartner;
