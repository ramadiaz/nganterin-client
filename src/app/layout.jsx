import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavbarComponent from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaintenanceModal from "@/components/MaintenanceModal";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nganterin",
  description: "Flight and Hotel Reservations Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}, text-white bg-slate-50 min-h-screen`}
      >
        <Providers>
          <div className="sticky top-0 w-full z-50">
            <NavbarComponent />
          </div>
          <div className="min-h-screen">
            {children}
            <MaintenanceModal />
            <Toaster position="bottom-right" richColors />
          </div>
          <div className="h-40"></div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
