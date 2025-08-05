'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MyCardsPage() {
  const [claimedCards, setClaimedCards] = useState([])
  const [openedCards, setOpenedCards] = useState([])
  const [activeTab, setActiveTab] = useState('claimed')

  useEffect(() => {
    // Load cards from localStorage
    const storedClaimed = JSON.parse(localStorage.getItem('claimedCards') || '[]')
    const storedOpened = JSON.parse(localStorage.getItem('openedCards') || '[]')
    
    setClaimedCards(storedClaimed)
    setOpenedCards(storedOpened)
  }, [])

  const claimCard = (card) => {
    const newClaimed = [...claimedCards, card]
    const newOpened = openedCards.filter(c => c.id !== card.id)
    
    setClaimedCards(newClaimed)
    setOpenedCards(newOpened)
    
    localStorage.setItem('claimedCards', JSON.stringify(newClaimed))
    localStorage.setItem('openedCards', JSON.stringify(newOpened))
  }

  const unclaimCard = (card) => {
    const newOpened = [...openedCards, card]
    const newClaimed = claimedCards.filter(c => c.id !== card.id)
    
    setClaimedCards(newClaimed)
    setOpenedCards(newOpened)
    
    localStorage.setItem('claimedCards', JSON.stringify(newClaimed))
    localStorage.setItem('openedCards', JSON.stringify(newOpened))
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">My Pokémon Cards</h1>
          <p className="text-xl text-white drop-shadow-lg">Manage your collection of caught Pokémon!</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center space-x-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{openedCards.length}</div>
              <div className="text-gray-300 text-sm">Unclaimed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{claimedCards.length}</div>
              <div className="text-gray-300 text-sm">Claimed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{openedCards.length + claimedCards.length}</div>
              <div className="text-gray-300 text-sm">Total</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setActiveTab('claimed')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'claimed'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Claimed Cards ({claimedCards.length})
            </button>
            <button
              onClick={() => setActiveTab('unclaimed')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'unclaimed'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Unclaimed Cards ({openedCards.length})
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(activeTab === 'claimed' ? claimedCards : openedCards).map((card, index) => (
            <div key={`${card.id}-${index}`} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <img
                  src={card.sprite}
                  alt={card.name}
                  className="w-24 h-24 mx-auto mb-4 rounded-lg bg-white/10 p-2"
                />
                <h3 className="text-xl font-bold text-white mb-2 capitalize">{card.name}</h3>
                <p className="text-gray-300 mb-4">ID: #{card.id}</p>
                
                {activeTab === 'unclaimed' ? (
                  <button
                    onClick={() => claimCard(card)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                  >
                    Claim Card
                  </button>
                ) : (
                  <button
                    onClick={() => unclaimCard(card)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Unclaim Card
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {(activeTab === 'claimed' ? claimedCards : openedCards).length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {activeTab === 'claimed' ? 'No Claimed Cards' : 'No Unclaimed Cards'}
            </h3>
            <p className="text-gray-300">
              {activeTab === 'claimed' 
                ? 'You haven\'t claimed any cards yet. Open some cases to get started!'
                : 'All your cards have been claimed!'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
