'use client'
import { motion } from 'framer-motion'

export default function PokemonAnimation({ pokemon, animationType, size = 'w-16 h-16' }) {
  const getAnimation = (type) => {
    switch (type) {
      case 'floating':
        return {
          animate: {
            y: [-5, 5, -5],
            rotate: [0, 2, -2, 0]
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'electric':
        return {
          animate: {
            scale: [1, 1.1, 1],
            filter: [
              'brightness(1)',
              'brightness(1.3) drop-shadow(0 0 10px #ffff00)',
              'brightness(1)'
            ]
          },
          transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'fire':
        return {
          animate: {
            scale: [1, 1.05, 1],
            filter: [
              'brightness(1)',
              'brightness(1.2) drop-shadow(0 0 15px #ff4400)',
              'brightness(1)'
            ]
          },
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'psychic':
        return {
          animate: {
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            filter: [
              'brightness(1)',
              'brightness(1.4) drop-shadow(0 0 20px #ff00ff)',
              'brightness(1)'
            ]
          },
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }
        }
      
      case 'dragon':
        return {
          animate: {
            y: [-3, 3, -3],
            x: [-2, 2, -2],
            scale: [1, 1.08, 1],
            filter: [
              'brightness(1)',
              'brightness(1.3) drop-shadow(0 0 25px #00ffff)',
              'brightness(1)'
            ]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'mystical':
        return {
          animate: {
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
            filter: [
              'brightness(1)',
              'brightness(1.5) drop-shadow(0 0 30px #ff69b4)',
              'brightness(1)'
            ]
          },
          transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'shiny':
        return {
          animate: {
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            filter: [
              'brightness(1)',
              'brightness(1.6) drop-shadow(0 0 35px #ffd700)',
              'brightness(1)'
            ]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'master':
        return {
          animate: {
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            filter: [
              'brightness(1)',
              'brightness(1.8) drop-shadow(0 0 40px #ff1493)',
              'brightness(1)'
            ]
          },
          transition: {
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      default:
        return {
          animate: {
            y: [-3, 3, -3]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
    }
  }

  const animationProps = getAnimation(animationType)

  return (
    <motion.div
      className={`${size} relative`}
      {...animationProps}
    >
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-full h-full object-contain"
      />
      
      {/* Additional glow effect based on animation type */}
      {animationType === 'electric' && (
        <motion.div
          className="absolute inset-0 bg-yellow-400 rounded-full opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {animationType === 'fire' && (
        <motion.div
          className="absolute inset-0 bg-red-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {animationType === 'psychic' && (
        <motion.div
          className="absolute inset-0 bg-pink-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
      
      {animationType === 'dragon' && (
        <motion.div
          className="absolute inset-0 bg-cyan-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {animationType === 'mystical' && (
        <motion.div
          className="absolute inset-0 bg-pink-400 rounded-full opacity-20"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {animationType === 'shiny' && (
        <motion.div
          className="absolute inset-0 bg-yellow-300 rounded-full opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {animationType === 'master' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.2, 0.9, 0.2]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  )
} 