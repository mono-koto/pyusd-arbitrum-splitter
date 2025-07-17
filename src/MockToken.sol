// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockToken
 * @notice A simple ERC20 token with 6 decimals that mimics PYUSD characteristics
 * @dev This contract is for demonstration and testing purposes only
 * @author Mono Koto (mono-koto.eth / https://mono-koto.com)
 */
contract MockToken is ERC20 {
    uint8 private immutable DECIMALS = 6;
    uint256 private immutable INITIAL_SUPPLY = 1_000_000 * 10 ** DECIMALS; // 1M tokens

    /**
     * @notice Deploys the MockToken with initial supply to deployer
     * @param name The name of the token (e.g., "Mock PYUSD")
     * @param symbol The symbol of the token (e.g., "MOCKPYUSD")
     */
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @notice Returns the number of decimals used to get its user representation
     * @return The number of decimals (6, matching PYUSD)
     */
    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }

    /**
     * @notice Mints additional tokens to a specified address
     * @dev This function is included for testing purposes
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
