import Card from '@/components/Card'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />

      {/* Header Section */}
      <div className="w-full h-44 bg-[#252B61] flex justify-center items-center px-4 sm:px-8">
        <div className="font-medium text-3xl sm:text-4xl md:text-5xl text-white text-center">
          Find expert Doctors for an Online session here
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col gap-10 px-4 sm:px-8 md:px-12 lg:px-20 py-10">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default page
