
import Card from "@/components/Card";
import Herosection from "@/components/Herosection";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
     <Navbar/>
    <Herosection />
    

  </div>
  );
}
