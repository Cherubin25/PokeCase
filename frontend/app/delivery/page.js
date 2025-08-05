'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function DeliveryPage() {
  const [location, setLocation] = useState('')
  const [quotation, setQuotation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateQuotation = () => {
    if (!location.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const basePrice = 10
      const distanceMultiplier = Math.random() * 2 + 0.5 // Random distance factor
      const totalPrice = Math.round(basePrice * distanceMultiplier)
      
      setQuotation({
        location,
        basePrice,
        distanceFee: Math.round(basePrice * (distanceMultiplier - 0.5)),
        totalPrice,
        estimatedDelivery: '2-3 business days'
      })
      setIsLoading(false)
    }, 1000)
  }

  const handlePayment = () => {
    // Simulate payment process
    alert('Payment processing... Redirecting to payment gateway')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Top Navigation Bar */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-white rounded-full flex items-center justify-center mr-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                PokéCase
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Delivery Service</h1>
          <p className="text-xl text-white drop-shadow-lg">Get your Pokémon cards delivered to your doorstep!</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 border border-white/30">
          <div className="mb-8">
            <label className="block text-white font-semibold mb-4 text-lg">Enter Your Location</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your address or location..."
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={generateQuotation}
                disabled={!location.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Get Quote'}
              </button>
            </div>
          </div>

          {quotation && (
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Delivery Quotation</h3>
              <div className="space-y-3 text-white">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-semibold">{quotation.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${quotation.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance Fee:</span>
                  <span>${quotation.distanceFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-white/20 pt-3">
                  <span>Total Price:</span>
                  <span className="text-yellow-400">${quotation.totalPrice}</span>
                </div>
                <div className="text-sm text-gray-300 mt-2">
                  Estimated Delivery: {quotation.estimatedDelivery}
                </div>
              </div>
              
              <button
                onClick={handlePayment}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-lg"
              >
                Pay & Confirm Delivery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
