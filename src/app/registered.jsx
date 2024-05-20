"use client";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const registered = (WrappedComponent) => {
  const AuthRoute = (props) => {
    const { push } = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        setIsAuthenticating(true);
        const token = Cookies.get("user_token");

        if (!token) {
          return;
        }

        try {
          const response = await fetch(`${BASE_API}/profile`, {
            headers: {
              "X-Authorization": API_KEY,
              Authorization: `Bearer ${token}`,
            },
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
            push("/register");
          }
        } catch (err) {
          console.error(err);
          return;
        }

        setIsAuthenticating(false);
      };

      checkAuthentication();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthRoute;
};

export default registered;
