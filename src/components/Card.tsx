import Image from 'next/image'
import React from 'react'

const Card = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl mx-auto">
    {/* Image Section */}
    <div className="sm:w-1/3 h-48 sm:h-auto bg-gray-300">
    <div className="w-full h-full">
  <Image
    src="" // Replace with your image URL
    alt="Doctor"
    layout="fill" // Ensures the image fills the container
    objectFit="cover" // Ensures the image scales properly
    className="rounded-md" // Optional: Add rounded corners if needed
  />
</div>
    </div>
  
    {/* Content Section */}
    <div className="flex flex-col justify-between p-6 sm:w-2/3">
      {/* Doctor Name */}
      <h2 className="text-xl font-semibold text-gray-800">Dr. John Doe</h2>
      
      {/* Doctor Specialty */}
      <p className="text-gray-600 text-sm mt-2">Specialist in Cardiology</p>
      
      {/* Consultation Fee */}
      <p className="text-gray-800 text-base font-medium mt-4">
        Consultation Fee: <span className="text-blue-600">$150</span>
      </p>
  
      {/* Book Appointment Button */}
      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
        Book Appointment
      </button>
    </div>
  </div>
  
  )
}

export default Card