"use client";

import Cookies from "js-cookie";
import Authenticating from "../authenticating";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const withPartner = (WrappedComponent) => {
  const user_token = Cookies.get("user_token");
  const user_jwt = Cookies.get("user_jwt");

  const { push } = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userData, setUserData] = useState("");

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

  const AuthRoute = (props) => {
    useEffect(() => {

      const checkAuthentication = async () => {
        setIsAuthenticating(true);
        if (!userData) {
          googleLogin();
        }

        setIsAuthenticating(false);
      };

      checkAuthentication();
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
