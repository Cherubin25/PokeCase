'use client'
import { useState } from 'react'
import { use } from 'react'
import { cases } from '../../data/cases'
import { cases } from '../../data/cases'
import OpenCaseModal from '../../components/OpenCaseModal'
import PokemonCard from '../../components/PokemonCard'
import Link from 'next/link'
import { useWallet } from '../../context/WalletContext'

->

import { cases } from '../../data/cases'
import OpenCaseModal from '../../components/OpenCaseModal'
import PokemonCard from '../../components/PokemonCard'
import Link from 'next/link'
import { useWallet } from '../../context/WalletContext'
import { useWallet } from '../../context/WalletContext'

export default function CasePage({ params }) {
  const resolvedParams = use(params)
  const caseConfig = cases.find(x => x.id === resolvedParams.id)
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { wallet } = useWallet()

  if (!caseConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Case Not Found</h1>
          <Link href="/" className="text-white hover:text-yellow-300">Go back to store</Link>
        </div>
      </div>
    )
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'from-blue-400 to-cyan-400'
      case 'uncommon':
        return 'from-green-400 to-emerald-400'
      case 'rare':
        return 'from-purple-400 to-violet-400'
      case 'epic':
        return 'from-orange-400 to-red-400'
      case 'legendary':
        return 'from-red-400 to-pink-400'
      case 'mythical':
        return 'from-pink-400 to-rose-400'
      case 'shiny':
        return 'from-yellow-400 to-amber-400'
      case 'master':
        return 'from-purple-400 via-pink-400 to-red-400'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const totalPrice = caseConfig.price * quantity
  const hasEnoughBalance = wallet.connected && parseFloat(wallet.balance) >= totalPrice

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
        {/* Case Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg uppercase tracking-wider">
            {caseConfig.name}
          </h1>
          <div className="flex justify-center mb-6">
            <div className={`w-4 h-4 bg-gradient-to-br ${getRarityColor(caseConfig.rarity)} rounded-full`}></div>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-4"></div>
            <div className={`w-4 h-4 bg-gradient-to-br ${getRarityColor(caseConfig.rarity)} rounded-full`}></div>
          </div>
        </div>

                 {/* Representative Pokémon Card */}
         <div className="flex justify-center mb-8">
           <PokemonCard 
             pokemon={caseConfig.representativePokemon}
             rarity={caseConfig.rarity}
             category={caseConfig.category}
             price={caseConfig.price}
           />
         </div>

         {/* Card Gallery */}
         <CardGallery caseConfig={caseConfig} />

         {/* Case Info */}
         <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
           <div className="text-center mb-6">
             <h2 className="text-2xl font-bold text-white mb-2">{caseConfig.category}</h2>
             <p className="text-gray-300">{caseConfig.description}</p>
           </div>

          {/* Balance Check */}
          {!wallet.connected ? (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="text-red-300 text-center">
                <div className="text-lg font-semibold mb-2">⚠️ Wallet Not Connected</div>
                <div className="text-sm">Connect your MetaMask wallet to open cases</div>
              </div>
            </div>
          ) : !hasEnoughBalance ? (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="text-red-300 text-center">
                <div className="text-lg font-semibold mb-2">⚠️ Insufficient Balance</div>
                <div className="text-sm">You need €{totalPrice} but have €{wallet.balance}</div>
              </div>
            </div>
          ) : (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
              <div className="text-green-300 text-center">
                <div className="text-lg font-semibold mb-2">✅ Ready to Open</div>
                <div className="text-sm">Balance: €{wallet.balance} | Cost: €{totalPrice}</div>
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuantity(num)}
                  className={`px-4 py-2 mx-1 rounded-md transition-all duration-300 ${
                    quantity === num
                      ? `bg-gradient-to-r ${getRarityColor(caseConfig.rarity)} text-white font-bold`
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  x{num}
                </button>
              ))}
            </div>
          </div>

          {/* Open Case Button */}
          <div className="text-center">
            <button
              onClick={() => setOpen(true)}
              disabled={!wallet.connected || !hasEnoughBalance}
              className={`px-12 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-all duration-300 ${
                wallet.connected && hasEnoughBalance
                  ? `bg-gradient-to-r ${getRarityColor(caseConfig.rarity)} text-white hover:scale-105 shadow-2xl hover:shadow-3xl`
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {!wallet.connected 
                ? 'Connect Wallet to Open' 
                : !hasEnoughBalance 
                ? `Need €${totalPrice} to Open` 
                : `Open ${quantity} Case${quantity > 1 ? 's' : ''} - €${totalPrice}`
              }
            </button>
          </div>
        </div>

        {/* Back to Store */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-300"
          >
            <span className="mr-2">←</span>
            Back to Store
          </Link>
        </div>
      </div>

      {/* Open Case Modal */}
      {open && (
        <OpenCaseModal 
          caseConfig={caseConfig} 
          onClose={() => setOpen(false)}
          quantity={quantity}
        />
      )}
    </div>
  )
} 