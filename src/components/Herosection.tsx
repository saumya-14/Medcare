import Image from "next/image"


const Herosection = () => {
  return (
    <div className="h-[550px] w-full  flex flex-col mt-8 lg:flex-row justify-center items-center">
       
       <div className="h-full w-1/2 flex flex-col items-center justify-center gap-6">
  {/* Heading Section */}
  <div className="font-medium text-4xl sm:text-5xl leading-tight text-center lg:text-left">
  Virtual healthcare
  <br />
  for you
</div>

{/* Description Section */}
<div className="text-sm sm:text-base leading-relaxed text-[#7D7987] text-center lg:text-left">
  Medcare provides progressive, and affordable
  <br />
  healthcare, accessible on mobile and online
  <br />
  for everyone
</div>

  {/* Consult Today Button */}
  <button className="bg-[#458FF6] text-white font-medium text-sm sm:text-base py-3 px-8 rounded-full hover:bg-blue-500 transition-all">
    Consult Today
  </button>
</div>
       <div className="h-full w-1/2 mt-10">
             <Image src='/1.svg' alt="image" width={550} height={550} />
         </div>
    </div>
  )
}

export default Herosection