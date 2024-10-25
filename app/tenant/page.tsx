"use client";

<<<<<<< HEAD
import checkUser from "@/api/common/checkUser";
import { useEffect, useState } from "react";
import UserScreen from "./User";

export default function TenantPage() {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("user_id")!);

    const checkOwnership = async () => {
      await checkUser().then((isOwner) => {
        if (isOwner) {
          window.location.href = "/login";
        }
      });
    };
=======
import { useState, useEffect } from 'react'
import { ChevronLeft, Home, DollarSign, Phone } from 'lucide-react'

export default function Component() {
  const [isPaying, setIsPaying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePay = () => {
    setIsPaying(true)
    setTimeout(() => {
      setIsPaying(false)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    }, 2000)
  }

  useEffect(() => {
    const cards = document.querySelectorAll('.animate-card')
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('opacity-100','translate-y-0')
      }, index * 200)
    })
  }, [])
>>>>>>> c35cf962790299c42e43fd76276ee02c04b171d1

  return (
<<<<<<< HEAD
    <div>
      

     {user&& <UserScreen userId={user} />}
=======
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <ChevronLeft className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-semibold">RH</h1>
        </div>

        <div className="mb-6 animate-card opacity-0 translate-y-4 transition-all duration-500 ease-out">
          <h1 className="text-3xl font-extrabold" > WELCOME,</h1>
          <h2 className="text-2xl font-bold mb-2"> Anshdeep Singh to TEST HOUSE</h2>
          <p className="text-gray-400 mb-4">123 St. Ludhiana, Punjab</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden p-4 mb-6 shadow-lg animate-card opacity-0 translate-y-4 transition-all duration-500 ease-out" style={{height: '40vh'}}>
          <img src="/placeholder.svg?height=200&width=400" alt="Property" className="w-full h-32 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-bold mb-2">Property Details</h3>
          <p className="text-sm mb-1"><strong>Owner:</strong> John Doe</p>
          <p className="text-sm mb-1"><strong>Contact:</strong> +1 234 567 890</p>
          <p className="text-sm"><strong>Address:</strong> 123 St. Ludhiana, Punjab</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden p-4 mb-6 shadow-lg animate-card opacity-0 translate-y-4 transition-all duration-500 ease-out">
          <h3 className="text-xl font-bold mb-4">Payment</h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-300">Rent</p>
              <p className="text-2xl font-bold">1500 USD</p>
              <p className="text-xs text-gray-300">Per month</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Pending Amount</p>
              <p className="text-2xl font-bold">1500</p>
            </div>
          </div>
          <button 
            className={`w-full bg-white text-blue-600 py-3 rounded-lg text-lg font-semibold ${isPaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            onClick={handlePay}
            disabled={isPaying}
          >
            {isPaying ? 'Processing...' : 'Pay Now'}
          </button>
        </div>

        <div className="mb-6 animate-card opacity-0 translate-y-4 transition-all duration-500 ease-out">
          <h3 className="text-xl font-bold mb-4">History</h3>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span>2024-09-07</span>
              <span>15000 USD</span>
            </div>
          </div>
        </div>

        <div className="animate-card opacity-0 translate-y-4 transition-all duration-500 ease-out">
          <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>Electricity</span>
              <span>123456789</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Plumber</span>
              <span>883040056</span>
            </div>
          </div>
        </div>

        {isSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
            <div className="bg-white text-blue-600 rounded-lg p-8 text-center animate-scale">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600">Your transaction has been processed.</p>
            </div>
          </div>
        )}
      </div>
>>>>>>> c35cf962790299c42e43fd76276ee02c04b171d1
    </div>
  )
}