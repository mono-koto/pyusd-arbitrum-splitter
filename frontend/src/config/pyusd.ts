import type { Address } from "viem";

// PYUSD token addresses
export const PYUSD_ADDRESSES: Record<number, Address> = {
  // Arbitrum Sepolia (testnet)
  421614: "0x637a1259c6afd7e3adf63993ca7e58bb438ab1b1",
  // Arbitrum One (mainnet) 
  42161: "0x46850aD61C2B7d64d08c9C754F45254596696984",
} as const;