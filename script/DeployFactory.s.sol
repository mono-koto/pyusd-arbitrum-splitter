// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script, console} from "forge-std/Script.sol";
import {SimpleSplitterCloneable} from "../src/SimpleSplitterCloneable.sol";
import {SimpleSplitterFactory} from "../src/SimpleSplitterFactory.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title DeployFactory
 * @notice Script to deploy SimpleSplitterCloneable implementation and SimpleSplitterFactory
 * @dev This script handles the two-step deployment process:
 *      1. Deploy and verify the implementation contract
 *      2. Deploy and verify the factory contract pointing to the implementation
 */
contract DeployFactory is Script {
    function run() external returns (SimpleSplitterFactory factory) {
        uint256 chainId = block.chainid;
        (address tokenAddress, string memory networkName) = getNetworkInfo(chainId);

        console.log("Deploying SimpleSplitter Factory Pattern to network...");
        console.log("Chain ID:", chainId);
        console.log("Network:", networkName);
        console.log("PYUSD address:", tokenAddress);
        console.log("Deployer:", msg.sender);

        vm.startBroadcast();

        // Step 1: Deploy the implementation contract
        console.log("\n=== Step 1: Deploying Implementation ===");
        SimpleSplitterCloneable implementation = new SimpleSplitterCloneable(IERC20(tokenAddress));
        console.log("SimpleSplitterCloneable implementation deployed at:", address(implementation));

        // Step 2: Deploy the factory contract
        console.log("\n=== Step 2: Deploying Factory ===");
        factory = new SimpleSplitterFactory(address(implementation));
        console.log("SimpleSplitterFactory deployed at:", address(factory));

        vm.stopBroadcast();

        return factory;
    }

    /**
     * @notice Get network information for the given chain ID
     * @param chainId The chain ID to get network information for
     * @return tokenAddress The PYUSD token address for the chain
     * @return networkName The human-readable network name
     */
    function getNetworkInfo(uint256 chainId) internal pure returns (address tokenAddress, string memory networkName) {
        // Arbitrum One (mainnet)
        if (chainId == 42161) {
            return (0x46850aD61C2B7d64d08c9C754F45254596696984, "Arbitrum One");
        }
        // Arbitrum Sepolia (testnet)
        else if (chainId == 421614) {
            return (0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1, "Arbitrum Sepolia");
        }
        // Anvil/Local (for testing)
        else if (chainId == 31337) {
            return (0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1, "Local Anvil");
        } else {
            revert(string(abi.encodePacked("Unsupported chain ID: ", vm.toString(chainId))));
        }
    }
}
