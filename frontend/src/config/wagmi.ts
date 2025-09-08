import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { arbitrumSepolia, arbitrum } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { http } from 'viem'

// 1. Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your-project-id'

// 2. Set the networks with proper typing
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [arbitrumSepolia, arbitrum]

// 3. Create a metadata object - optional
const metadata = {
  name: 'PYUSD SimpleSplitter',
  description: 'Create and use PYUSD token splitters on Arbitrum',
  url: 'https://mono-koto.github.com/pyusd-simple-splitter', // origin must match your domain & subdomain
  icons: ['https://reown.com/reown-logo.png']
}

// 4. Create Wagmi Adapter with custom transports
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false, // For static deployment
  transports: {
    [arbitrum.id]: http('https://arb1.arbitrum.io/rpc'),
    [arbitrumSepolia.id]: http('https://sepolia-rollup.arbitrum.io/rpc'),
  }
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    swaps: false,
    onramp: false 
  }
})

export { wagmiAdapter }

// 6. Export query client for React Query
export const queryClient = new QueryClient()

// 7. Export wagmi config
export const wagmiConfig = wagmiAdapter.wagmiConfig