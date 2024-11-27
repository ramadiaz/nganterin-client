import Cookies from "js-cookie";

const fetchWithAuth = async (url, options = {}) => {
  const token = Cookies.get("token");

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  options.headers = {
    ...options.headers,
    cache: "no-store",
  };    

  const response = await fetch(url, options);
  return response;
};

export default fetchWithAuth;