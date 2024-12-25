
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {


  return (
    <div className="h-[80px] px-4 sm:px-8 bg-white w-full flex items-center justify-between ">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        {/* Circle with 'M' */}
        <div className="flex items-center justify-center text-white bg-[#252B61] rounded-full h-12 w-12">
          M
        </div>
        {/* Medcare Text */}
        <span className="text-[#252B61] text-lg sm:text-xl md:text-2xl font-semibold">
          Medcare
        </span>
      </div>

      {/* Login Button */}
      <button className="bg-[#252B61] text-white font-medium text-sm sm:text-base py-2 px-4 md:px-6 rounded-lg hover:bg-[#1F234F]">
        <Link href="/login">
        Login
        </Link>
      </button>
    </div>
  );
};

export default Navbar;
