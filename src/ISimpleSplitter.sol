// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title ISimpleSplitter
 * @notice Interface for the SimpleSplitter contract
 * @dev This interface allows other contracts to interact with SimpleSplitter
 *      without importing the full implementation, reducing contract size
 * @author Mono Koto (mono-koto.eth / https://mono-koto.com)
 */
interface ISimpleSplitter {
    /* //////////////////////////////////////////////////////////////////////// 
                                       Events
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Emitted when tokens are distributed to all recipients.
     * @param totalAmount The total amount of tokens distributed.
     */
    event TokensDistributed(uint256 totalAmount);

    /**
     * @notice Emitted when tokens are sent to a specific recipient.
     * @param recipient The address of the recipient.
     * @param amount The amount of tokens sent to the recipient.
     */
    event RecipientPaid(address indexed recipient, uint256 amount);

    /* //////////////////////////////////////////////////////////////////////// 
                                       Errors
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @dev Error thrown when no tokens are available for distribution.
     */
    error NoTokensToDistribute();

    /**
     * @dev Error thrown when an account has zero shares.
     */
    error RecipientHasZeroShares(address recipient);

    /**
     * @dev Error thrown when a recipient address is zero.
     */
    error ZeroAddressRecipient();

    /**
     * @dev Error thrown when the length of recipients and shares arrays don't match.
     */
    error RecipientShareLengthMismatch();

    /**
     * @dev Error thrown when there are no recipients.
     */
    error NoRecipients();

    /* //////////////////////////////////////////////////////////////////////// 
                                   Core Functions
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Distributes the current token balance among all recipients based on their shares.
     * @dev This function distributes the entire current balance of the contract.
     *      Any remainder due to rounding is left in the contract.
     */
    function distribute() external;

    /* //////////////////////////////////////////////////////////////////////// 
                                   View Functions
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Returns the ERC20 token being distributed.
     * @return The token contract interface.
     */
    function token() external view returns (IERC20);

    /**
     * @notice Returns the recipient address at the specified index.
     * @param index The index of the recipient.
     * @return The recipient address.
     */
    function recipients(uint256 index) external view returns (address);

    /**
     * @notice Returns the share amount for the recipient at the specified index.
     * @param index The index of the recipient.
     * @return The share amount.
     */
    function shares(uint256 index) external view returns (uint256);

    /**
     * @notice Returns the total shares across all recipients.
     * @return The total shares.
     */
    function totalShares() external view returns (uint256);

    /**
     * @notice Returns the number of recipients.
     * @return The number of recipients.
     */
    function recipientCount() external view returns (uint256);

    /**
     * @notice Calculates how much a specific recipient would receive from the current balance.
     * @param recipientIndex The index of the recipient in the recipients array.
     * @return The amount the recipient would receive.
     */
    function calculateRecipientAmount(uint256 recipientIndex) external view returns (uint256);
}
