# SimpleSplitter - PYUSD Token Splitter for Arbitrum

A simplified smart contract for splitting ERC20 tokens (like PYUSD) among multiple recipients based on predefined shares. This project demonstrates smart contract development practices and provides a clean educational example for PYUSD integration on Arbitrum.

**✨ NEW: Factory Pattern for Frontend Integration** - The repo now includes `SimpleSplitterCloneable` and `SimpleSplitterFactory` contracts that enable cheap, gas-efficient deployment of splitters via a factory pattern, perfect for frontend applications.

## What Does SimpleSplitter Do? 🤔

Think of SimpleSplitter like an automated accountant for splitting money:

**Real-world example**: You and two friends start a pizza delivery business. You agree that:

- You (the founder) get 50% of profits
- Friend A gets 30% of profits
- Friend B gets 20% of profits

Instead of manually calculating splits every day, SimpleSplitter:

1. **Stores** your business income when tokens are sent to it
2. **Calculates** each person's share based on your predefined agreement
3. **Distributes** the tokens to everyone's wallet when someone calls the `distribute()` function

**Why use smart contracts?** No arguments about math, no manual calculations, no trust issues - the code handles the splitting logic transparently and immutably on the blockchain.

**Educational Note**: This project is designed for learning smart contract development. It's not intended for production use without proper security audits.

## Before You Dig In 📚

**Time Expectation**: About 60 minutes to go from no smart contract knowledge to a deployed PYUSD splitter you can test on Arbitrum Sepolia.

### You Should Be Comfortable With:

- **Programming concepts** (variables, functions, if/else statements)
- **Command line/terminal usage** (running commands, navigating directories)
- **Git and GitHub basics** (cloning repositories, basic version control)

### What This Repo Demonstrates:

- A practical smart contract example with real-world use case
- Development workflow with Foundry
- Testing (unit tests and fork tests)
- Deployment to Arbitrum testnet (sepoloia) and mainnet (one)
- Security patterns for token handling
- Factory pattern for cheap contract cloning (perfect for frontends)
- A working, deployed frontend

### What This Repo Does Not Cover:

- Solidity concepts (inheritance, libraries, etc.)
- Full PYUSD token standards or implementation details
- Production-grade security practices (this is a simplified example)

## Smart Contract Basics 🧠

Before diving in, here are key concepts you'll encounter:

### Ethereum and Arbitrum

**Smart Contract**: A program that runs on the blockchain. Once deployed, it executes automatically according to its code - no human intervention needed. [Learn more about smart contracts](https://ethereum.org/en/smart-contracts/)

**ERC20 Token**: A standard for digital tokens (like digital coins). PYUSD is an ERC20 token representing US dollars on the blockchain. [ERC20 Standard (EIP-20)](https://eips.ethereum.org/EIPS/eip-20) | [Ethereum.org Token Guide](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)

**Immutable**: Once set during deployment, these values can never be changed. This provides security and predictability - no one can alter the rules later. [Solidity Immutable Documentation](https://docs.soliditylang.org/en/latest/contracts.html#immutable)

**Gas**: The fee paid to run operations on the blockchain. Think of it like postage for sending transactions. [Ethereum.org Gas Guide](https://ethereum.org/en/developers/docs/gas/)

### Networks & Testing

**Arbitrum**: A "Layer 2" network that is built on top of Ethereum, but is faster and cheaper to use. [Arbitrum Documentation](https://docs.arbitrum.io/) | [Arbitrum Portal](https://arbitrum.io/)

**Testnet**: A practice version of the blockchain where you can experiment without real money. Perfect for learning! [Ethereum.org Testnets Guide](https://ethereum.org/en/developers/docs/networks/#testnets)

**Mainnet**: The real blockchain where actual money is involved. We won't touch this in this tutorial, but with a few config changes, you could deploy to mainnet just as easily as testnet.

### Security Additions

**Reentrancy**: A type of attack where your contract calls a function of another contract that maliciously tries to call back into your contract before the first call finishes. SimpleSplitter uses OpenZeppelin's ReentrancyGuard to prevent this. [OpenZeppelin ReentrancyGuard](https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuardTransient) | [Consensys Reentrancy Guide](https://blog.chain.link/reentrancy-attacks-and-the-dao-hack/)

**SafeERC20**: A library that adds extra safety checks when transferring tokens, preventing common mistakes. [OpenZeppelin SafeERC20 Documentation](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#SafeERC20)

### Development Tools

**Foundry**: Your smart contract development toolkit - compiles, tests, and deploys contracts. [Foundry Docs](https://getfoundry.sh/)

**Solidity**: The programming language for Ethereum smart contracts (similar to JavaScript or C++). [Solidity Documentation](https://docs.soliditylang.org/) | [Solidity by Example](https://solidity-by-example.org/)

**Arbiscan**: A block explorer for Arbitrum, like Etherscan for Ethereum. It lets you view transactions, contracts, and balances on the Arbitrum network. [Arbiscan](https://arbiscan.io/) | [Arbitrum Sepolia Testnet Explorer](https://sepolia.arbiscan.io/)

## Quick Start

### Prerequisites

You'll need these tools installed on your computer:

#### Required Tools

**Foundry** - Your smart contract development toolkit

- **What it does**: Compiles Solidity code, runs tests, and deploys contracts
- **Install**: Follow the [official installation guide](https://getfoundry.sh/introduction/installation)
- **Verify installation**: Run `forge --version` (should show version number like `forge 1.2.3`)

**just** - Command runner (makes complex commands simple)

- **What it does**: Turns long, complex commands into short, memorable ones like `just test`
- **Install**: Follow the [installation guide](https://github.com/casey/just#installation)
- **Verify installation**: Run `just --version` (should show version number like `just 1.42.0`)

#### Alternative Installation (Optional)

You can use [mise-en-place](https://mise.jdx.dev/) to install both tools automatically if you prefer such an approach. There's already a `mise.toml` file in this repository.

#### Verify Your Setup

Run these commands to make sure everything is installed correctly:

```bash
# Check if tools are installed
forge --version    # Should show: forge 0.2.0 (or similar)
just --version     # Should show: just 1.42.0 (or similar)
git --version      # Should show: git version 2.x.x
```

If any command shows "command not found", revisit the installation guides above.

### Installation

```bash
git clone https://github.com/mono-koto/pyusd-simple-splitter.git
cd pyusd-simple-splitter
forge install
```

## Setup

### 1. Generate a Deployment Wallet

If you don't have a wallet yet, you can generate a new one using the `just` command:

```bash
# Generate a new wallet
just generate-wallet

# This will output something like:
# Successfully created new keypair.
# Address: 0x1234567890123456789012345678901234567890
# Private key: 0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

### 2. Set Environment Variables

Create a `.env` file based on `.env.example` and fill in your details:

```bash
PYUSD_ARB_SEPOLIA=0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1
ARBITRUM_SEPOLIA_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
ETHERSCAN_API_KEY=
PRIVATE_KEY=
```

Get an Etherscan API key at https://etherscan.io/apidashboard. You'll need to create a (free) account.

Use your generated wallet's private key in the `PRIVATE_KEY` field.

> 🧐 **Security Note:** See how we put the private key in a `.env` file like that? Don't do that with keys you'll use in production or with mainnet. Use a more secure approach like a [keystore with secret](https://getfoundry.sh/cast/reference/cast-wallet-import/), [hardware wallet](https://getfoundry.sh/reference/common/multi-wallet-options-hardware), or a secrets manager.

### 3. Get Arbitrum Testnet ETH and PYUSD

- Arbitrum Sepolia ETH:

  - https://arbitrum.faucet.dev/ArbSepolia
  - https://cloud.google.com/application/web3/faucet

- PYUSD on Arbitrum Sepolia:
  - https://faucet.paxos.com/
  - https://cloud.google.com/application/web3/faucet

You can check your balances with:

```bash
just eth-balance 0xYourWalletAddress
just pyusd-balance 0xYourWalletAddress
```

## Deployment Guide

We've prepared deployment and operational processes using `just` commands. You can examine the `justfile` to see exactly how we're using Foundry to deploy and interact with the contracts.

### Deploy MockToken (optional)

If you don't have testnet PYUSD or if you just want to test with a mock token, you can deploy our mock PYUSD-like token using the following command:

```bash
# Deploy a mock PYUSD-like token
just mock-token-deploy "Mock PYUSD" "MYPYUSD"
```

This will output the deployed contract address. Save this address for the next step.

#### Minting Mock Tokens

You can also mint some tokens to your wallet or your deployed splitter for testing:

```bash
# Mint 1000 Mock PYUSD tokens to your wallet
just mock-token-mint "0xYourMockTokenAddress" "0xYourWalletAddress" 1000
```

### Deploy SimpleSplitter

To deploy the SimpleSplitter contract, you need to provide the recipient addresses, and their corresponding shares.

```bash
# Deploy SimpleSplitter with PYUSD token and recipients
just splitter-deploy \
  "0xRecipient1,0xRecipient2,0xRecipient3" \
  "50,30,20"
```

#### Example:

```bash
just splitter-deploy \
  "0xAlice123...,0xBob456...,0xCharlie789..." \
  "40,35,25"
```

This creates a splitter where:

- Alice receives 40% of distributed tokens
- Bob receives 35% of distributed tokens
- Charlie receives 25% of distributed tokens

#### Custom Token

To use a token other than testnet PYUSD, you can specify the token address as follows:

```bash
# Deploy SimpleSplitter with your own token address
just splitter-deploy \
  "0xRecipient1,0xRecipient2,0xRecipient3" \
  "50,30,20" \
  "0xYourTokenAddress"
```

#### Distribution

To distribute tokens, we use the `distribute()` function on the splitter.

```bash
# Distribute tokens to all recipients
just splitter-distribute "0xSplitterAddress"
```

## Contract Architecture

### SimpleSplitter.sol

The main contract with the following key features:

**Constructor Parameters:**

- `token`: ERC20 token contract address
- `recipients`: Array of recipient addresses
- `shares`: Array of corresponding share weights

**Main Functions:**

- `distribute()`: Distributes current token balance among recipients
- `calculateRecipientAmount(index)`: Calculates amount for a specific recipient

**View Functions:**

- `token()`: Returns the configured token address
- `recipients(index)`: Returns recipient at index
- `shares(index)`: Returns shares at index
- `totalShares()`: Returns total shares
- `recipientCount()`: Returns number of recipients

### MockToken.sol

A 6-decimal ERC20 token for testing that mimics PYUSD characteristics:

- 6 decimal places (like PYUSD)
- Initial supply of 1M tokens
- Mintable for testing purposes

### ISimpleSplitter.sol

An interface that defines the SimpleSplitter contract's public API. This interface provides several benefits:

#### Contract Size

When other contracts need to interact with SimpleSplitter, they can import this interface instead of the implementation. Since the interface is only a type declaration, it does not contribute to the bytecode size of the contract that imports it. This helps keep the contract size smaller.

#### Usage

```solidity
import {ISimpleSplitter} from "./ISimpleSplitter.sol";

contract MyContract {
    ISimpleSplitter public splitter;

    constructor(address splitterAddress) {
        splitter = ISimpleSplitter(splitterAddress);
    }

    function triggerDistribution() external {
        // Use the interface to interact with SimpleSplitter
        uint256 balance = splitter.token().balanceOf(address(splitter));
        if (balance > 0) {
            splitter.distribute();
        }
    }
}
```

#### Interface Functions

- All view functions from SimpleSplitter
- `distribute()` function for triggering distributions
- Events: `TokensDistributed`, `RecipientPaid`
- Custom errors for better error handling

## Usage Examples

### Basic Distribution

```solidity
// Assume SimpleSplitter is deployed at splitterAddress
// and has been sent 1000 PYUSD tokens

SimpleSplitter splitter = SimpleSplitter(splitterAddress);

// Check distributable balance
uint256 balance = splitter.getDistributableBalance(); // Returns 1000 * 10^6

// Distribute tokens to all recipients
splitter.distribute();

// Recipients now have tokens according to their shares
```

### Integration Example

```solidity
contract MyContract {
    ISimpleSplitter public splitter;
    IERC20 public token;

    constructor(address _splitter, address _token) {
        splitter = ISimpleSplitter(_splitter);
        token = IERC20(_token);
    }

    function distributeRevenue(uint256 amount) external {
        // Transfer tokens to splitter
        token.transfer(address(splitter), amount);

        // Trigger distribution
        splitter.distribute();
    }
}
```

## Testing

The project includes test coverage:

### Unit Tests (`test/SimpleSplitter.t.sol`)

- Constructor validation
- Distribution logic
- Edge cases and error conditions
- Fuzz testing for various amounts and configurations

### Fork Tests (`test/SimpleSplitter.fork.t.sol`)

- Integration testing against Arbitrum testnet
- Real ERC20 token interaction
- Gas usage validation
- End-to-end distribution scenarios

## Security Considerations

- **Immutable**: Recipients and shares cannot be changed after deployment
- **Reentrancy**: Uses OpenZeppelin's ReentrancyGuard
- **Safe Transfers**: Uses SafeERC20 for all token operations
- **Input Validation**: Validation in constructor
- **Integer Division**: Remainder tokens stay in contract (can be distributed in future calls)

## Development Commands

We've added a `justfile` for easy command execution.

```bash
# Run all tests
just test

# Run with verbose output
just test-verbose

# Run only unit tests
just test-unit

# Run only fork tests (requires RPC access)
just test-fork

# Get all available commands
just help
```

### Network Configuration

By default, all commands use Arbitrum Sepolia testnet. To switch networks:

```bash
# Use default (Arbitrum Sepolia)
just splitter-deploy "0xAddr1,0xAddr2" "50,50"

# Use Arbitrum mainnet
just rpc=arbitrum splitter-deploy "0xAddr1,0xAddr2" "50,50"
```

The `rpc` variable can be set to any RPC endpoint defined in `foundry.toml`:
- `arbitrum_sepolia` (default)
- `arbitrum`

## Next Steps

You can go deeper with Foundry and smart contract development. Explore Foundry's other features such as
- [Scripting](https://getfoundry.sh/guides/scripting-with-solidity) (which allows you to write scripts in Solidity to automate tasks)
- [Running a local dev node with Anvil](https://getfoundry.sh/guides/forking-mainnet-with-cast-anvil)
- [Tracking gas usage](https://getfoundry.sh/forge/gas-tracking/overview)
 


## License

MIT License - see LICENSE file for details.
