"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Authenticating from "../authenticating";
import { GetUserData } from "@/utilities/getUserData";

const withLogin = (WrappedComponent) => {
  const AuthRoute = (props) => {
    const { push } = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const checkAuthentication = async () => {
      setIsAuthenticating(true);
      const user_data = GetUserData()
      
      if (!user_data.id) {
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
