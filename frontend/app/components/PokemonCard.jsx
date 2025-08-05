'use client'
import { motion } from 'framer-motion'

export default function PokemonCard({ pokemon, rarity, category, price }) {
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return { 
          border: 'border-blue-500', 
          bg: 'bg-blue-600', 
          text: 'text-blue-600', 
          energy: 'bg-blue-500',
          header: 'bg-gradient-to-r from-blue-400 to-blue-600',
          cardBg: 'bg-gradient-to-b from-blue-50 to-white'
        }
      case 'uncommon':
        return { 
          border: 'border-green-500', 
          bg: 'bg-green-600', 
          text: 'text-green-600', 
          energy: 'bg-green-500',
          header: 'bg-gradient-to-r from-green-400 to-green-600',
          cardBg: 'bg-gradient-to-b from-green-50 to-white'
        }
      case 'rare':
        return { 
          border: 'border-purple-500', 
          bg: 'bg-purple-600', 
          text: 'text-purple-600', 
          energy: 'bg-purple-500',
          header: 'bg-gradient-to-r from-purple-400 to-purple-600',
          cardBg: 'bg-gradient-to-b from-purple-50 to-white'
        }
      case 'epic':
        return { 
          border: 'border-orange-500', 
          bg: 'bg-orange-600', 
          text: 'text-orange-600', 
          energy: 'bg-orange-500',
          header: 'bg-gradient-to-r from-orange-400 to-orange-600',
          cardBg: 'bg-gradient-to-b from-orange-50 to-white'
        }
      case 'legendary':
        return { 
          border: 'border-red-500', 
          bg: 'bg-red-600', 
          text: 'text-red-600', 
          energy: 'bg-red-500',
          header: 'bg-gradient-to-r from-red-400 to-red-600',
          cardBg: 'bg-gradient-to-b from-red-50 to-white'
        }
      case 'mythical':
        return { 
          border: 'border-pink-500', 
          bg: 'bg-pink-600', 
          text: 'text-pink-600', 
          energy: 'bg-pink-500',
          header: 'bg-gradient-to-r from-pink-400 to-pink-600',
          cardBg: 'bg-gradient-to-b from-pink-50 to-white'
        }
      case 'shiny':
        return { 
          border: 'border-yellow-500', 
          bg: 'bg-yellow-600', 
          text: 'text-yellow-600', 
          energy: 'bg-yellow-500',
          header: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
          cardBg: 'bg-gradient-to-b from-yellow-50 to-white'
        }
      case 'master':
        return { 
          border: 'border-purple-500', 
          bg: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600', 
          text: 'text-purple-600', 
          energy: 'bg-gradient-to-r from-purple-500 to-red-500',
          header: 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400',
          cardBg: 'bg-gradient-to-b from-purple-50 via-pink-50 to-white'
        }
      default:
        return { 
          border: 'border-gray-500', 
          bg: 'bg-gray-600', 
          text: 'text-gray-600', 
          energy: 'bg-gray-500',
          header: 'bg-gradient-to-r from-gray-400 to-gray-600',
          cardBg: 'bg-gradient-to-b from-gray-50 to-white'
        }
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'electric':
        return '⚡'
      case 'fire':
        return '🔥'
      case 'psychic':
        return '🔮'
      case 'dragon':
        return '🐉'
      case 'mystical':
        return '✨'
      case 'shiny':
        return '⭐'
      case 'master':
        return '👑'
      default:
        return '⚪'
    }
  }

  const colors = getRarityColor(rarity)

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative w-80 h-112 ${colors.cardBg} rounded-xl border-2 ${colors.border} shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300`}
    >
      {/* Card Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 via-white to-gray-100"></div>
      </div>

      {/* Top Header - Name and HP */}
      <div className={`relative h-14 ${colors.header} flex items-center justify-between px-4 border-b-2 border-white/30`}>
        <div className="flex items-center space-x-3">
          <h3 className="text-xl font-black text-white capitalize tracking-wide drop-shadow-lg">{pokemon.name}</h3>
          <div className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold border border-white/30">
            #{pokemon.id}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-white font-bold text-lg drop-shadow-lg">HP</span>
          <span className="text-white font-black text-2xl drop-shadow-lg">230</span>
          <div className={`w-8 h-8 ${colors.energy} rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg border-2 border-white/50`}>
            {getTypeIcon(pokemon.animation)}
          </div>
        </div>
      </div>

      {/* Pokémon Image Section */}
      <div className="relative h-52 bg-gradient-to-b from-gray-50 via-white to-gray-100 flex items-center justify-center p-6 border-b-2 border-gray-200">
        <motion.img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-40 h-40 object-contain drop-shadow-lg"
          animate={{
            y: [-2, 2, -2],
            rotate: [0, 0.5, -0.5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Background glow effect */}
        <div className={`absolute inset-0 ${colors.energy} opacity-5 rounded-full blur-sm`}></div>
        
        {/* Card texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Pokémon Type Line */}
      <div className="h-10 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center border-b-2 border-gray-300">
        <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Basic Pokémon</span>
      </div>

      {/* Attacks Section */}
      <div className="p-4 space-y-4 bg-white">
        {/* First Attack */}
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-gray-800 text-lg">Case Opening</span>
            <div className="flex space-x-1">
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-white text-xs font-bold">⚪</span>
              </div>
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-white text-xs font-bold">⚪</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">Open this case to discover rare Pokémon! You may draw a card for each Pokémon you find.</p>
          <div className="text-right font-black text-gray-800 text-lg">50</div>
        </div>

        {/* Second Attack */}
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-gray-800 text-lg">Rarity Burst</span>
            <div className="flex space-x-1">
              <div className={`w-6 h-6 ${colors.energy} rounded-full flex items-center justify-center shadow-inner border border-white/50`}>
                <span className="text-white text-xs font-bold">{getTypeIcon(pokemon.animation)}</span>
              </div>
              <div className={`w-6 h-6 ${colors.energy} rounded-full flex items-center justify-center shadow-inner border border-white/50`}>
                <span className="text-white text-xs font-bold">{getTypeIcon(pokemon.animation)}</span>
              </div>
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-white text-xs font-bold">⚪</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">This attack does 50 more damage for each Prize card your opponent has taken. This Pokémon also does 20 damage to itself.</p>
          <div className="text-right font-black text-gray-800 text-lg">130+</div>
        </div>
      </div>

      {/* Bottom Section - Weakness, Resistance, Retreat */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-100 to-gray-200 p-4 border-t-2 border-gray-300">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-semibold">Weakness:</span>
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-inner border border-white/50">
              <span className="text-white text-xs font-bold">💧</span>
            </div>
            <span className="font-bold text-gray-800">×2</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-semibold">Resistance:</span>
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-inner border border-white/50">
              <span className="text-white text-xs font-bold">⚡</span>
            </div>
            <span className="font-bold text-gray-800">-20</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-semibold">Retreat:</span>
            <div className="flex space-x-1">
              <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-white text-xs font-bold">⚪</span>
              </div>
              <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-white text-xs font-bold">⚪</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 font-semibold">
        {pokemon.id.toString().padStart(3, '0')}/151
      </div>

      {/* Rarity Star */}
      <div className="absolute bottom-2 right-2">
        <div className={`w-7 h-7 ${colors.bg} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50`}>
          <span className="text-white text-sm font-bold">★</span>
        </div>
      </div>

      {/* Price Display */}
      <div className="absolute top-2 right-2">
        <div className={`px-4 py-2 rounded-full ${colors.bg} text-white text-sm font-bold shadow-lg border-2 border-white/50`}>
          €{price}
        </div>
      </div>

      {/* Rarity Badge */}
      <div className="absolute top-2 left-2">
        <div className={`px-3 py-1 rounded-full ${colors.bg} text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-white/50`}>
          {category}
        </div>
      </div>

      {/* Card Border Glow */}
      <div className={`absolute inset-0 ${colors.border} opacity-10 rounded-xl pointer-events-none`}></div>
      
      {/* Subtle card texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
    </motion.div>
  )
} 