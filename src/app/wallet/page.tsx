'use client'
import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [walletBalance, setWalletBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchBalance = async () => {
            try {
                const response=await axios.get('/api/wallet');
                if (response.data.ok) {
                    setWalletBalance(response.data.wallet_balance);
                  } else {
                    setError(response.data.msg || 'Failed to fetch wallet balance');
                  }
            }catch(error:any){
                setError(error.message);
            } finally {
                setLoading(false);
              }
        };
        fetchBalance();
    },[])
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {loading ? (
          <div className="text-lg font-medium text-blue-500">Loading...</div>
        ) : error ? (
          <div className="text-lg font-medium text-red-500">{error}</div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Balance</h2>
            <p className="text-lg text-gray-600">
              Your wallet balance is:
              <span className="text-blue-500 font-semibold ml-2">
                ₹{walletBalance}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
  

export default page