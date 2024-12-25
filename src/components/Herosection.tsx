'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const Herosection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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

  const handleConsultClick = () => {
    if (isLoggedIn) {
      router.push("/consult"); // Navigate to the consult page
    } else {
      toast.error("You need to log in first!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Show loading state while checking token
  }

  return (
    <div className="h-[550px] w-full flex flex-col mt-8 lg:flex-row justify-center items-center">
      <ToastContainer /> {/* Toast container for notifications */}

      {/* Left Section */}
      <div className="h-full w-1/2 flex flex-col items-center justify-center gap-6">
        <div className="font-medium text-4xl sm:text-5xl leading-tight text-center lg:text-left">
          Virtual healthcare
          <br />
          for you
        </div>
        <div className="text-sm sm:text-base leading-relaxed text-[#7D7987] text-center lg:text-left">
          Medcare provides progressive, and affordable
          <br />
          healthcare, accessible on mobile and online
          <br />
          for everyone
        </div>
        <button
          className="bg-[#458FF6] text-white font-medium text-sm sm:text-base py-3 px-8 rounded-full hover:bg-blue-500 transition-all"
          onClick={handleConsultClick}
        >
          Consult Today
        </button>
      </div>

      {/* Right Section */}
      <div className="h-full w-1/2 mt-10">
        <Image src="/1.svg" alt="image" width={550} height={550} />
      </div>
    </div>
  );
};

export default Herosection;
