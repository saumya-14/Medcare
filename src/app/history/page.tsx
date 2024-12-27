'use client';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type transaction = {
  _id: string;
  patient_id: string;
  patient_name: string;
  patient_number: number;
  doctor_id: string;
  doctor_name: string;
  discount_applied: boolean;
  discounted_amount: number;
  consultation_fee: number;
  doctor_balance: number;
  patient_balance: number;
  createdAt: string; // Ensure createdAt exists in the API response
};

interface ApiResponse {
  ok: boolean;
  transactions: transaction[];
  msg?: string;
}

const Page = () => {
  const [transactions, setTransactions] = useState<transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<ApiResponse>('/api/history');
        if (response.data.ok) {
          const sortedTransactions = response.data.transactions.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setTransactions(sortedTransactions);
        } else {
          setError(response.data.msg || 'Failed to fetch transactions');
        }
      } catch (error) {
        setError('An error occurred while fetching transactions');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Transaction Details</h1>

        {loading ? (
          <div className="text-lg font-medium text-blue-500">Loading...</div>
        ) : error ? (
          <div className="text-lg font-medium text-red-500">{error}</div>
        ) : transactions.length === 0 ? (
          <div className="text-lg font-medium text-gray-500">No transactions found.</div>
        ) : (
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 overflow-auto space-y-6">
            {transactions.map((transaction, index) => (
              <div
                key={transaction._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {index === 0 ? 'Current Transaction' : `Transaction #${index + 1}`}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-700">
                    <p>
                      <span className="font-medium">Patient Name:</span>{' '}
                      {transaction.patient_name}
                    </p>
                    <p>
                      <span className="font-medium">Patient Number:</span>{' '}
                      {transaction.patient_number}
                    </p>
                  </div>
                  <div className="text-gray-700">
                    <p>
                      <span className="font-medium">Doctor Name:</span>{' '}
                      {transaction.doctor_name}
                    </p>
                    <p>
                      <span className="font-medium">Consultation Fee:</span>{' '}
                      ₹{transaction.consultation_fee}
                    </p>
                  </div>
                  <div className="text-gray-700 col-span-2">
                    <p>
                      <span className="font-medium">Discount Applied:</span>{' '}
                      {transaction.discount_applied ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <span className="font-medium">Discounted Amount:</span>{' '}
                      ₹{transaction.discounted_amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
