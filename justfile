# SimpleSplitter Project Commands
# Use `just <command>` to run these commands

# Load environment variables from .env file
set dotenv-load

# Default RPC endpoint - defaults to Arbitrum Sepolia
rpc := "arbitrum_sepolia"

# Default address - defaults to Arbitrum Sepolia PYUSD
pyusd_sepolia := "0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1"

# Show help
help:
    @just --list

# Default recipe - run tests
default:
    forge test

# Build contracts
build:
    forge build

# Run all tests
test:
    forge test

# Run tests with verbose output
test-verbose:
    forge test -vvv

# Run only unit tests
test-unit:
    forge test --match-contract SimpleSplitterTest

# Run cloneable tests
test-cloneable:
    forge test --match-contract SimpleSplitterCloneableTest

# Run only fork tests
test-fork:
    forge test --match-contract SimpleSplitterForkTest

# Format code
format:
    forge fmt

# Clean build artifacts
clean:
    forge clean

# Deploy MockToken to Arbitrum testnet
mock-token-deploy name symbol:
    forge create src/MockToken.sol:MockToken \
        --broadcast \
        --verify \
        --verifier etherscan \
        --rpc-url {{rpc}} \
        --private-key "$PRIVATE_KEY" \
        --constructor-args "{{name}}" "{{symbol}}"

# Mint MockToken to a recipient on Arbitrum testnet
mock-token-mint token recipient amount:
    cast send {{token}} "mint(address,uint256)" {{recipient}} {{amount}} \
        --rpc-url {{rpc}} \
        --private-key "$PRIVATE_KEY"

# Deploy SimpleSplitter to Arbitrum testnet
splitter-deploy recipients shares token=pyusd_sepolia:
    forge create src/SimpleSplitter.sol:SimpleSplitter \
        --broadcast \
        --verify \
        --verifier etherscan \
        --rpc-url {{rpc}} \
        --private-key "$PRIVATE_KEY" \
        --constructor-args "{{token}}" "[{{recipients}}]" "[{{shares}}]"

splitter-distribute splitter_address:
    cast send {{splitter_address}} "distribute()" \
        --rpc-url {{rpc}} \
        --private-key "$PRIVATE_KEY" 

# Deploy factory pattern (implementation + factory) - auto-detects PYUSD based on network
factory-deploy:
    forge script script/DeployFactory.s.sol \
        --broadcast \
        --verify \
        --verifier etherscan \
        --rpc-url {{rpc}} \
        --private-key "$PRIVATE_KEY"

# Create a new splitter via factory
factory-create-splitter factory_address recipients shares:
    cast send {{factory_address}} "createSplitter(address[],uint256[])" "[{{recipients}}]" "[{{shares}}]" \
        --rpc-url {{rpc}} \
        --private-key "$PRIVATE_KEY"


# Generate a new wallet for deployment
generate-wallet:
    cast wallet new

# Get wallet address of $PRIVATE_KEY
wallet-address:
    cast wallet address --private-key "$PRIVATE_KEY"

# Check ETH balance on Arbitrum testnet
eth-balance address:
    #!/usr/bin/env sh
    cast balance {{address}} --rpc-url {{rpc}}
    numeric_balance=$(cast balance {{address}} --rpc-url {{rpc}})
    formatted=$(cast format-units "$numeric_balance" 18)
    echo "ETH balance: $formatted ETH"

# Check PYUSD balance on Arbitrum testnet
balance address token=pyusd_sepolia:
    #!/usr/bin/env sh
    raw_balance=$(cast call {{token}} "balanceOf(address)(uint256)" {{address}} --rpc-url {{rpc}})
    numeric_balance=$(echo $raw_balance | cut -d' ' -f1)
    formatted=$(cast format-units "$numeric_balance" 6)
    echo "PYUSD balance: $formatted PYUSD"
