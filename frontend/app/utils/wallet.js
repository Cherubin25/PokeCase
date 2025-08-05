// Wallet utility functions for MetaMask integration

export const connectWallet = async () => {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed. Please install MetaMask to use this feature.');
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const account = accounts[0];
    
    // Get account balance
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest']
    });

    // Convert balance from wei to ETH
    const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);

    return {
      address: account,
      balance: ethBalance.toFixed(4),
      connected: true
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const disconnectWallet = () => {
  return {
    address: null,
    balance: 0,
    connected: false
  };
};

export const getWalletStatus = async () => {
  try {
    if (typeof window.ethereum === 'undefined') {
      return { connected: false, message: 'MetaMask not installed' };
    }

    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    });

    if (accounts.length === 0) {
      return { connected: false, message: 'No accounts found' };
    }

    const account = accounts[0];
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest']
    });

    const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);

    return {
      address: account,
      balance: ethBalance.toFixed(4),
      connected: true
    };
  } catch (error) {
    console.error('Error getting wallet status:', error);
    return { connected: false, message: 'Error checking wallet status' };
  }
};

export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Listen for account changes
export const setupWalletListeners = (onAccountChange, onChainChange) => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', onAccountChange);
    window.ethereum.on('chainChanged', onChainChange);
  }
};

// Remove wallet listeners
export const removeWalletListeners = () => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.removeAllListeners();
  }
}; 