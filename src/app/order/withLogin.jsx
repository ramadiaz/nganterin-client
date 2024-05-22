"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Authenticating from "../authenticating";

const withLogin = (WrappedComponent) => {
  const AuthRoute = (props) => {
    const { push } = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const checkAuthentication = async () => {
      setIsAuthenticating(true);
      const token = Cookies.get("user_jwt");
      
      if (!token) {
        push("/");
        setIsAuthenticating(false);
        return;
      }

      setIsAuthenticating(false);
    };

    useEffect(() => {
      checkAuthentication();
    }, []);

    return isAuthenticating ? <Authenticating /> : <WrappedComponent {...props} />;
  };

  return AuthRoute;
};

export default withLogin;
