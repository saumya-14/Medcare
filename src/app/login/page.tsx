'use client'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('/api/login', {
        number,
        password
      });
      if (response.data.ok) {
        toast.success("Logged in successfully redirecting to home..");
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-row">
      {/* Left Section */}
      <ToastContainer />
      <div className="h-full w-1/2 bg-[#2C73EB] flex items-center justify-center hidden sm:flex">
        <Image src="/3.svg" alt="image" width={400} height={400} />
      </div>

      {/* Right Section */}
      <div className="h-full w-full sm:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="p-8 w-full max-w-md">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-2">Account Login</h1>
          <p className="text-sm text-gray-500 mb-6">
            If you are already a member, you can login with your phone number and password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="text"
                id="number"
                className="mt-1 block w-full h-12 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="+91 ********"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full h-12 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit" // Trigger form submission
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
