'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { 
  connectWallet, 
  disconnectWallet, 
  getWalletStatus, 
  setupWalletListeners, 
  removeWalletListeners,
  formatAddress 
} from '../utils/wallet'

const WalletContext = createContext()

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    address: null,
    balance: 0,
    connected: false,
    loading: false
  })

  const [error, setError] = useState(null)

  // Check wallet status on mount
  useEffect(() => {
    checkWalletStatus()
    
    // Setup listeners for account and chain changes
    const handleAccountChange = (accounts) => {
      if (accounts.length === 0) {
        setWallet(disconnectWallet())
      } else {
        checkWalletStatus()
      }
    }

    const handleChainChange = () => {
      checkWalletStatus()
    }

    setupWalletListeners(handleAccountChange, handleChainChange)

    // Cleanup listeners on unmount
    return () => {
      removeWalletListeners()
    }
  }, [])

  const checkWalletStatus = async () => {
    try {
      setWallet(prev => ({ ...prev, loading: true }))
      const status = await getWalletStatus()
      setWallet({
        ...status,
        loading: false
      })
      setError(null)
    } catch (err) {
      setWallet(prev => ({ ...prev, loading: false }))
      setError(err.message)
    }
  }

  const connect = async () => {
    try {
      setWallet(prev => ({ ...prev, loading: true }))
      setError(null)
      
      const result = await connectWallet()
      setWallet({
        ...result,
        loading: false
      })
    } catch (err) {
      setWallet(prev => ({ ...prev, loading: false }))
      setError(err.message)
    }
  }

  const disconnect = () => {
    setWallet(disconnectWallet())
    setError(null)
  }

  const value = {
    wallet,
    error,
    connect,
    disconnect,
    formatAddress: formatAddress(wallet.address),
    checkWalletStatus
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
} 