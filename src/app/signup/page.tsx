'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/signup', {
        name,
        number,
        password,
      });
      if (res.data.ok) {
        toast.success('Account created successfully! Redirecting to home...');
        setName('');
        setNumber('');
        setPassword('');
        router.push('/');
      } else {
        setError(res.data.message || 'Failed to create account.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-row">
      <ToastContainer position="top-right" /> {/* Toast container */}

      {/* Left Section */}
      <div className="h-full w-1/2 bg-[#2C73EB] flex items-center justify-center hidden sm:flex">
        <Image src="/2.svg" alt="image" width={400} height={400} />
      </div>

      {/* Right Section */}
      <div className="h-full w-full sm:w-1/2 flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="p-8 w-full max-w-md">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-2">Account Sign Up</h1>
          <p className="text-sm text-gray-500 mb-6">
            If you are already a member, you can login with your phone number and password.
          </p>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full h-12 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mt-1 block w-full h-12 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="+91 ********"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full h-12 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>

          {/* Footer */}
          <div className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
