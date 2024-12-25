'use client';

import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in by verifying the token
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get("/api/token"); // Call /api/token to check if the user is logged in
      if (res.data.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false); // If error, treat as logged out (invalid or expired token)
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on component mount
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout"); // Call logout API to clear the cookie
      if (res.data.ok) {
        toast.success("Logged out successfully");
        setIsLoggedIn(false); // Update state to logged out
        setTimeout(() => {
          router.push("/login"); // Redirect to the login page after 2 seconds
        }, 2000);
         // Redirect to login page
      } else {
        toast.error(res.data.msg || "Failed to log out");
      }
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  return (
    <div className="h-[80px] px-4 sm:px-8 bg-white w-full flex items-center justify-between shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center text-white bg-[#252B61] rounded-full h-12 w-12">
          M
        </div>
        <span className="text-[#252B61] text-lg sm:text-xl md:text-2xl font-semibold">
          Medcare
        </span>
      </div>

      {/* Navigation Options */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {/* Transaction History */}
            <Link
              href="/transaction-history"
              className="text-[#252B61] font-medium text-sm sm:text-base hover:underline"
            >
              Transaction History
            </Link>
            {/* Wallet */}
            <Link
              href="/wallet"
              className="text-[#252B61] font-medium text-sm sm:text-base hover:underline"
            >
              Wallet
            </Link>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-[#252B61] text-white font-medium text-sm sm:text-base py-2 px-4 md:px-6 rounded-lg hover:bg-[#1F234F] transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-[#252B61] text-white font-medium text-sm sm:text-base py-2 px-4 md:px-6 rounded-lg hover:bg-[#1F234F] transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
