'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Automatically hide the sidebar when resizing to a larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* Navbar Container */}
      <div className="mt-4 mx-4 h-[80px] w-[calc(100%-2rem)] rounded-xl flex items-center bg-[#E1E1E1] relative">
        {/* Left Content */}
        <div className="ml-8 text-[#252B61] text-2xl font-semibold">
          Medcare
        </div>

        {/* Divider */}
        <div className="h-10 ml-10 w-[2px] bg-[#CCCCCC] mx-4"></div>

        {/* Desktop Right-Side Content */}
        <div className="hidden md:flex ml-auto mr-8 text-[#252B61] text-lg flex-row gap-10">
          <div className="text-base">HealthCare Services</div>
          <div className="text-base">
            <div className="flex flex-row items-center">
              Offers
              <Image src="/offers.svg" alt="off" width={20} height={20} />
            </div>
          </div>
          <div className="text-base">
            <div className="flex flex-row items-center">
              Cart
              <Image src="/cart.svg" alt="cart" width={20} height={20} />
            </div>
          </div>
          <div className="text-base">
            <div className="flex flex-row items-center">
              Login
              <Image src="/login.svg" alt="login" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setSidebarVisible(!isSidebarVisible)}
          className="md:hidden ml-auto mr-4 focus:outline-none z-30"
        >
          <Image
            src={isSidebarVisible ? "/hamburger.svg" : "/hamburger.svg"}
            alt="toggle"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setSidebarVisible(false)}
          ></div>

          {/* Sidebar Content */}
          <div className="fixed top-0 right-0 w-3/4 h-full bg-white z-20 shadow-lg p-6 flex flex-col gap-6">
            <div className="text-[#252B61] text-lg">
              HealthCare Services
            </div>
            <div className="flex flex-row items-center text-[#252B61] text-lg">
              Offers
              <Image src="/offers.svg" alt="off" width={20} height={20} />
            </div>
            <div className="flex flex-row items-center text-[#252B61] text-lg">
              Cart
              <Image src="/cart.svg" alt="cart" width={20} height={20} />
            </div>
            <div className="flex flex-row items-center text-[#252B61] text-lg">
              Login
              <Image src="/login.svg" alt="login" width={20} height={20} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
