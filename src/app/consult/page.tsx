'use client'
import Card from '@/components/Card'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  consultation_fee: number;
  wallet_balance: number;
  createdAt: string;
  updatedAt: string;
};

const page = () => {
  const [doccollection, setDoccollection] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchdoc = async () => {
      try {
        const res = await axios.get('/api/fetchdoct');
        console.log("Fetched doctors:", res.data);
        setDoccollection(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchdoc();
  }, []);

  
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
      {doccollection.map((doctor) => (
        <Card key={doctor._id} doctor={doctor} />
      ))}
      </div>
    </div>
  )
}

export default page
