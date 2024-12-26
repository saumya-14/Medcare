'use client'
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { getdata } from "@/helper/getdata";
type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  consultation_fee: number;
  wallet_balance: number;
  createdAt: string;
  updatedAt: string;
};

type CardProps = {
  doctor: Doctor;
};

const Card: React.FC<CardProps> = ({ doctor }) => {
  const [isdiscounted,setIsdiscounted]=useState(false);
  const [isBooking, setIsBooking] = useState(false);


  

  const handleBookAppointment=async()=>{
    if (isBooking) return; // Prevent multiple clicks
    setIsBooking(true);
    try{
        const res=await axios.get("/api/token");
        const patientid=res.data.id;
      console.log(patientid);
      console.log(doctor._id)
      const response = await axios.post("/api/transaction", {
        patientid,
        doctorid: doctor._id,
      });
      if (response.data.ok) {
        toast.success("Transaction successful");
        setTimeout(() => {
          window.location.reload(); // Reload the page after successful transaction
        }, 5000); // Wait for toast to show before reload
      } else {
        toast.error(response.data.msg || "Transaction failed");
      }
    }catch (error) {
      toast.error("An error occurred while booking the appointment.");
      console.error(error);
    } finally {
      setIsBooking(false);
    }
  };
  
  useEffect(()=>{
    const checkTransaction=async()=>{
      try{
        const res=await axios.post("/api/checktran",{
          
          doctorId:doctor._id
  
        });
        setIsdiscounted(!res.data.exists);
      }catch(error){
        console.log(error);
      }
    }
    checkTransaction();

  },[doctor._id]);
  const discountedFee = isdiscounted ? doctor.consultation_fee - 100 : doctor.consultation_fee;
  
  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl mx-auto">
    {/* Image Section */}
    <ToastContainer/>
    <div className="sm:w-1/3 h-48 sm:h-auto flex justify-center items-center">
      <Image
        src="/doctor.png"
        alt={doctor.name}
        width={100}
        height={100}
        objectFit="cover"
        className="rounded-md"
      />
    </div>

    {/* Content Section */}
    <div className="flex flex-col justify-between p-6 sm:w-2/3">
      <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
      <p className="text-gray-600 text-sm mt-2">{doctor.specialization}</p>

      {/* Consultation Fee */}
      <p className="text-gray-800 text-base font-medium mt-4">
        Consultation Fee:{" "}
        {isdiscounted ? (
          <>
            <span className="line-through text-red-500">${doctor.consultation_fee}</span>{" "}
            <span className="text-blue-600">${discountedFee}</span>
          </>
        ) : (
          <span className="text-blue-600">${doctor.consultation_fee}</span>
        )}
      </p>

      <button
          onClick={handleBookAppointment}
          disabled={isBooking} // Disable button while booking
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
        >
          {isBooking ? "Booking..." : "Book Appointment"}
        </button>
    </div>
  </div>
);
};

export default Card;
