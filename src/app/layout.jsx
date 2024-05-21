import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavbarComponent from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nganterin",
  description: "Flight and Hotel Reservations Services",
};

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}, text-white bg-orange-50 min-h-screen`}
      >
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <Providers>
            <div className="sticky top-0 w-full z-50">
              <NavbarComponent />
            </div>
            <div className="min-h-screen">{children}</div>
            <Footer />
            <ToastContainer />
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
