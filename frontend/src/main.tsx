import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { HashRouter } from 'react-router-dom'

import { wagmiConfig, queryClient } from './config/wagmi'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <Notifications />
            <App />
          </MantineProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </HashRouter>
  </StrictMode>,
)
