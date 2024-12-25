'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <div className="h-screen w-full flex flex-row">
    {/* Left Section */}
    <div className="h-full w-1/2 bg-[#2C73EB] flex items-center justify-center hidden sm:flex">
      <Image src="/2.svg" alt="image" width={400} height={400} />
    </div>
  
    {/* Right Section */}
    <div className="h-full w-full sm:w-1/2 flex items-center justify-center bg-gray-100">
      <div className="p-8 w-full max-w-md">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-2">Account Sign</h1>
        <p className="text-sm text-gray-500 mb-6">
          If you are already a member, you can login with your phone number and password.
        </p>
        {/* name  */}
        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="Name"
            className="mt-1 block w-full h-12 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="abcdefff"
          />
        </div>
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
          />
        </div>
  
       
       
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register Account
        </button>
  
        {/* Footer */}
        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page