'use client'
import { useState, useEffect } from 'react'
import CaseCard from './components/CaseCard'
import Link from 'next/link'
import { cases } from './data/cases'
import { useWallet } from './context/WalletContext'

export default function StorePage() {
  const [stats, setStats] = useState({ opened: 0, claimed: 0, total: 0 })
  const [localError, setLocalError] = useState(null)
  const { wallet, connect, disconnect, formatAddress, error } = useWallet()

  // Handle wallet errors
  useEffect(() => {
    if (error) {
      setLocalError(error)
      // Auto-clear error after 5 seconds
      setTimeout(() => setLocalError(null), 5000)
    }
  }, [error])

  useEffect(() => {
    // Load stats from localStorage
    const opened = JSON.parse(localStorage.getItem('openedCards') || '[]')
    const claimed = JSON.parse(localStorage.getItem('claimedCards') || '[]')
    
    setStats({
      opened: opened.length,
      claimed: claimed.length,
      total: opened.length + claimed.length
    })
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Top Navigation Bar */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
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

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link href="/" className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                <span className="mr-2">🏠</span>
                Home
              </Link>
              <Link href="/" className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <span className="mr-2">🛍️</span>
                Store
              </Link>
              <Link href="/mycards" className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <span className="mr-2">📚</span>
                My Cards
              </Link>
              <Link href="/delivery" className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <span className="mr-2">📦</span>
                Delivery
              </Link>
              <Link href="/animation" className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <span className="mr-2">🎬</span>
                Animation
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <span className="mr-2">⚙️</span>
                Settings
              </button>
              
              {/* Wallet Connection */}
              {wallet.connected ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-white/10 rounded-lg px-3 py-2 text-white text-sm">
                    <div className="font-semibold">{formatAddress}</div>
                    <div className="text-gray-300">{wallet.balance} ETH</div>
                  </div>
                  <button 
                    onClick={disconnect}
                    className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-2">🔌</span>
                    Disconnect
                  </button>
                </div>
              ) : (
                <button 
                  onClick={connect}
                  disabled={wallet.loading}
                  className="flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="mr-2">💼</span>
                  {wallet.loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
              
              <button className="flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="mr-2">🔐</span>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-white rounded-full flex items-center justify-center mr-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
              PokéCase
            </h1>
          </div>
          <p className="text-2xl text-white font-medium drop-shadow-lg mb-8">Open Cases, Catch Pokémon</p>
          
          {/* Quick Stats */}
          <div className="inline-flex items-center space-x-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.opened}</div>
              <div className="text-gray-300 text-sm">Unclaimed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.claimed}</div>
              <div className="text-gray-300 text-sm">Claimed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.total}</div>
              <div className="text-gray-300 text-sm">Total Cards</div>
            </div>
          </div>
        </div>

        {/* Cases Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Available Cases</h2>
          <p className="text-white text-lg drop-shadow-lg">Choose your case and discover rare Pokémon!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cases.map(c => (
            <Link key={c.id} href={`/cases/${c.id}`} className="group">
              <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                <CaseCard case={c} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Error Notification */}
      {localError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span className="text-sm">{localError}</span>
            </div>
            <button 
              onClick={() => setLocalError(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
