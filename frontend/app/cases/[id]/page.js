'use client'
import { useState, useEffect } from 'react'
import { use } from 'react'
import { cases } from '../../data/cases'
import OpenCaseModal from '../../components/OpenCaseModal'
import PokemonCard from '../../components/PokemonCard'
import Link from 'next/link'
import { useWallet } from '../../context/WalletContext'

// Pokemon Details Component
function PokemonDetails({ pokemonIds, caseRarity }) {
  const [pokemonDetails, setPokemonDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true)
        const pokemonPromises = pokemonIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          if (!response.ok) throw new Error(`Failed to fetch Pokemon ${id}`)
          return await response.json()
        })
        
        const pokemonData = await Promise.all(pokemonPromises)
        setPokemonDetails(pokemonData)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching Pokemon details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (pokemonIds && pokemonIds.length > 0) {
      fetchPokemonDetails()
    }
  }, [pokemonIds])

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-blue-400 to-cyan-400'
      case 'uncommon': return 'from-green-400 to-emerald-400'
      case 'rare': return 'from-purple-400 to-violet-400'
      case 'epic': return 'from-orange-400 to-red-400'
      case 'legendary': return 'from-red-400 to-pink-400'
      case 'mythical': return 'from-pink-400 to-rose-400'
      case 'shiny': return 'from-yellow-400 to-amber-400'
      case 'master': return 'from-purple-400 via-pink-400 to-red-400'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    }
    return typeColors[type] || 'bg-gray-400'
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Loading Pokemon details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-300">Error loading Pokemon: {error}</p>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white text-center mb-6">Possible Pokemon in this Case</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemonDetails.map((pokemon) => (
          <div key={pokemon.id} className={`bg-gradient-to-br ${getRarityColor(caseRarity)} p-1 rounded-lg`}>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 h-full">
              <div className="text-center">
                <img 
                  src={pokemon.sprites.front_default} 
                  alt={pokemon.name}
                  className="w-20 h-20 mx-auto mb-2"
                />
                <h4 className="text-white font-bold capitalize text-sm mb-2">{pokemon.name}</h4>
                
                {/* Types */}
                <div className="flex justify-center gap-1 mb-2">
                  {pokemon.types.map((type) => (
                    <span 
                      key={type.type.name}
                      className={`${getTypeColor(type.type.name)} text-white text-xs px-2 py-1 rounded-full`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>HP:</span>
                    <span className="text-green-400">{pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ATK:</span>
                    <span className="text-red-400">{pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DEF:</span>
                    <span className="text-blue-400">{pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat}</span>
                  </div>
                </div>

                {/* Abilities */}
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Abilities:</p>
                  {pokemon.abilities.slice(0, 2).map((ability) => (
                    <span 
                      key={ability.ability.name}
                      className="text-xs bg-white/10 text-white px-2 py-1 rounded mr-1 capitalize"
                    >
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

      <div className="max-w-6xl mx-auto px-6 py-12">
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

        {/* Pokemon Details Gallery */}
        <PokemonDetails pokemonIds={caseConfig.pokemonIds} caseRarity={caseConfig.rarity} />

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