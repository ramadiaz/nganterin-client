"use client";

import withLogin from "./withLogin";

const Layout = ({ children }) => {
  return <div className="">{children}</div>;
};

export default withLogin(Layout);
