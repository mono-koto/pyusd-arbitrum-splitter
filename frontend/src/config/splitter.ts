import type { Address } from "viem";

// PYUSD token addresses
export const SPLITTER_FACTORY_ADDRESSES: Record<number, Address> = {
  // Arbitrum Sepolia (testnet)
  421614: "0x5B0aDF5b6cD6E6e7e662F5eB51e165bAE9bcD4a6",
  // Arbitrum One (mainnet) 
  42161: "0x187C8493a0b4B21b4E7DAB6c57E069dfa9785006",
} as const;

