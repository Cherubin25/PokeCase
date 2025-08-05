'use client'
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import confetti from 'canvas-confetti'
import Lottie from 'lottie-react'
import useSound from 'use-sound'

import pokeballAnimation from '../animation/pokeball.json'
import { fetchPokemon } from '../utils/Pokeapi'

export default function OpenCaseModal({ caseConfig, onClose, quantity = 1 }) {
  const [reel, setReel] = useState([])
  const [pokemons, setPokemons] = useState({})
  const [results, setResults] = useState([])
  const [currentResult, setCurrentResult] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [openedCount, setOpenedCount] = useState(0)
  const controls = useAnimation()
  const [playCatch] = useSound('/sounds/pokeball-catch.mp3')

  useEffect(() => {
    // build & shuffle weighted reel
    const temp = []
    caseConfig.pokemonIds.forEach((id, i) => {
      const count = Math.round(caseConfig.dropRates[i] * 100)
      for (let j = 0; j < count; j++) temp.push(id)
    })
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[temp[i], temp[j]] = [temp[j], temp[i]]
    }
    setReel(temp)

    // fetch sprites
    Promise.all(caseConfig.pokemonIds.map(id => fetchPokemon(id)))
      .then(list => setPokemons(Object.fromEntries(list.map(p => [p.id, p]))))
  }, [caseConfig])

  const spin = async () => {
    if (isSpinning) return
    setIsSpinning(true)

    // figure out final offset so that the winner sits in the center
    const winnerId = reel[Math.floor(Math.random() * reel.length)]
    const winnerIndex = reel.findIndex(id => id === winnerId)
    const singleWidth = 64  // px per image
    const visibleCount = 5
    const containerWidth = singleWidth * visibleCount
    const offset = winnerIndex * singleWidth - (containerWidth / 2 - singleWidth / 2)

    // animate the reel slide
    await controls.start({
      x: -offset,
      transition: { duration: 2, ease: 'easeOut' }
    })

    // show Pokéball open
    const newResult = pokemons[winnerId]
    setCurrentResult(newResult)
    setResults(prev => [...prev, newResult])
    playCatch()

    // confetti burst
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.4 }
    })
    setShowConfetti(true)

    // store result in localStorage
    const opened = JSON.parse(localStorage.getItem('openedCards')||'[]')
    const newCard = {
      ...newResult,
      obtainedAt: new Date().toISOString(),
      caseId: caseConfig.id
    }
    localStorage.setItem(
      'openedCards',
      JSON.stringify([...opened, newCard])
    )

    setOpenedCount(prev => prev + 1)
    setIsSpinning(false)

    // Auto-close if all cases opened
    if (openedCount + 1 >= quantity) {
      setTimeout(() => {
        onClose()
      }, 3000)
    }
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 relative w-full max-w-2xl">
        <button 
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl" 
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
            {caseConfig.name}
          </h2>
          <p className="text-gray-300">
            Opening {openedCount + 1} of {quantity} case{quantity > 1 ? 's' : ''}
          </p>
        </div>

        {openedCount < quantity ? (
          <>
            {/* Spinning Reel */}
            <div className="overflow-hidden h-24 mb-8 border-2 border-white/20 rounded-lg bg-black/40">
              <motion.div
                className="flex"
                animate={controls}
                initial={{ x: 0 }}
              >
                {reel.map((id, i) => (
                  <img
                    key={i}
                    src={pokemons[id]?.sprite}
                    className="w-24 h-24 p-2"
                    alt=""
                  />
                ))}
              </motion.div>
            </div>

            {/* Spin Button */}
            <div className="text-center">
              <button
                onClick={spin}
                disabled={isSpinning}
                className={`px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-all duration-300 ${
                  isSpinning
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${getRarityColor(caseConfig.rarity)} text-white hover:scale-105 shadow-2xl hover:shadow-3xl`
                }`}
              >
                {isSpinning ? 'Opening...' : 'Open Case!'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">All Cases Opened!</h3>
            
            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {results.map((result, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <img
                    src={result.sprite}
                    alt={result.name}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <p className="text-white font-semibold capitalize text-sm">{result.name}</p>
                  <p className="text-gray-300 text-xs">#{result.id}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Close
            </button>
          </div>
        )}

        {/* Current Result Display */}
        {currentResult && openedCount < quantity && (
          <div className="mt-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">You caught:</h3>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-20 h-20">
                  <Lottie animationData={pokeballAnimation} loop={false} />
                </div>
                <img
                  src={currentResult.sprite}
                  alt={currentResult.name}
                  className="w-20 h-20"
                />
              </div>
              <p className="text-white font-bold text-lg capitalize mt-2">{currentResult.name}</p>
              <p className="text-gray-300">#{currentResult.id}</p>
            </div>
          </div>
        )}

        {/* Confetti overlay */}
        {showConfetti && (
          <canvas
            className="fixed inset-0 pointer-events-none"
            id="confetti-canvas"
          />
        )}
      </div>
    </div>
  )
}
