"use client";
import { useState } from 'react'
import { ChevronLeft, ChevronDown, Check } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">
        {!isSuccess ? (
          <>
            <div className="flex items-center mb-6">
              <ChevronLeft className="w-6 h-6 mr-2" />
              <h1 className="text-xl font-semibold">Payment</h1>
            </div>

            <div className="bg-blue-600 bg-opacity-50 backdrop-filter backdrop-blur-lg mb-6 rounded-lg overflow-hidden p-4 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="text-lg font-bold">Bank of America</span>
                <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-6" />
              </div>
              <div className="mb-4">
                <span className="text-2xl tracking-wider font-bold">XXXX XXXX XXXX 7777</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm opacity-75 block font-bold">CARD HOLDER</span>
                  <span className="font-bold">DINESH DINO</span>
                </div>
                <div>
                  <span className="text-sm opacity-75 block font-bold">EXPIRES</span>
                  <span className="font-bold">MM/YY</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <select className="w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-gray-700 rounded-md py-2 px-3 appearance-none">
                  <option value="usd">🇺🇸 American Dollar</option>
                  <option value="eur">🇪🇺 Euro</option>
                  <option value="gbp">🇬🇧 British Pound</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Transaction Amount</h2>
              <span className="text-3xl font-bold">$500</span>
            </div>
            <button 
              className={`w-full bg-blue-600 bg-opacity-70 backdrop-filter backdrop-blur-lg hover:bg-opacity-80 text-white py-3 rounded-lg text-lg font-semibold ${isPaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePay}
              disabled={isPaying}
            >
              {isPaying ? 'Processing...' : 'PAY'}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8">
            <div className="w-20 h-20 bg-blue-600 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-full flex items-center justify-center mb-4 animate-scale">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-400">Your transaction has been processed.</p>
          </div>
        )}
      </div>
    </div>
  )
}