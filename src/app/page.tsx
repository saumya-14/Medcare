import Herosection from "@/components/Herosection";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
   <div className="h-screen">
    <Navbar/>
    <Herosection/>
   </div>
  );
}
