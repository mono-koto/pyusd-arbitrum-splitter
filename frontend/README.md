# PYUSD SimpleSplitter Frontend

A modern React frontend for creating and managing PYUSD token splitters on Arbitrum.

## 🚀 Features

- React 18 + TypeScript + Vite
- Wagmi v2 + Viem + Reown AppKit
- Mantine v7 + Tabler Icons
- React Router v6
- TanStack Query
- GitHub Pages via GitHub Actions

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- A [Reown (WalletConnect) Project ID](https://cloud.reown.com)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Reown Project ID:
   ```
   VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🌐 Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - GitHub Actions will automatically build and deploy
2. **Set up secrets** - Add `VITE_WALLET_CONNECT_PROJECT_ID` to your GitHub repository secrets
3. **Enable GitHub Pages** - Go to Settings > Pages > Source: GitHub Actions

### Manual Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔧 Configuration

### Networks

The app supports:
- Arbitrum One (Chain ID: 42161) - Mainnet
- Arbitrum Sepolia (Chain ID: 421614) - Testnet

### Contract Addresses

- Factory: `0x5B0aDF5b6cD6E6e7e662F5eB51e165bAE9bcD4a6` (Arbitrum Sepolia)
- PYUSD Arbitrum One: `0x46850aD61C2B7d64d08c9C754F45254596696984`
- PYUSD Arbitrum Sepolia: `0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1`

## 📱 Usage

1. Connect Wallet: Click "Connect Wallet" and choose your preferred wallet
2. Switch Network: Ensure you're on Arbitrum One or Arbitrum Sepolia
3. Create Splitter: Navigate to "Create Splitter" and set up recipients and shares
4. Deploy: Submit the transaction to deploy your splitter contract
5. Use Splitter: Send PYUSD to your splitter address for automatic distribution

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Header.tsx      # Navigation header with wallet connection
├── contracts/          # Contract ABIs and addresses
│   ├── SimpleSplitterFactory.ts
│   └── ERC20.ts
├── config/             # App configuration
│   └── wagmi.ts        # Wagmi + Reown AppKit setup
├── pages/              # Route components
│   ├── HomePage.tsx    # Landing page
│   └── CreateSplitterPage.tsx  # Splitter creation form
├── App.tsx             # Main app component with routing
└── main.tsx            # App entry point with providers
```

## 📄 License

This project is licensed under the MIT License - see the parent repository's LICENSE file for details.

## 🔗 Related

- [SimpleSplitter Contracts](../) - The Solidity smart contracts
- [PYUSD Documentation](https://paxos.com/pyusd/) - Official PYUSD documentation
- [Arbitrum Documentation](https://docs.arbitrum.io/) - Learn about Arbitrum
