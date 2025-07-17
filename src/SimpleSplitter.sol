// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuardTransient} from "@openzeppelin/contracts/utils/ReentrancyGuardTransient.sol";
import {ISimpleSplitter} from "./ISimpleSplitter.sol";

/**
 * @title SimpleSplitter
 * @notice A simplified token splitter contract for proportional distribution of ERC20 tokens
 * @dev This contract splits a single ERC20 token among predefined recipients based on their shares.
 *      All configuration is immutable and set at deployment time.
 * @author Mono Koto (mono-koto.eth / https://mono-koto.com)
 */
contract SimpleSplitter is ISimpleSplitter, ReentrancyGuardTransient {
    using SafeERC20 for IERC20;

    /* ////////////////////////////////////////////////////////////////////////
                                    Immutable State
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice The ERC20 token to be distributed.
     */
    IERC20 public immutable token;

    /**
     * @notice The total number of shares across all recipients.
     */
    uint256 public immutable totalShares;

    /* ////////////////////////////////////////////////////////////////////////
                                       Storage
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Array of recipient addresses.
     */
    address[] public recipients;

    /**
     * @notice Array of shares corresponding to each recipient.
     */
    uint256[] public shares;

    /* //////////////////////////////////////////////////////////////////////// 
                                    Constructor
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Initializes the SimpleSplitter with token, recipients, and shares.
     * @param _token The ERC20 token contract address to be distributed.
     * @param _recipients The addresses of the recipients.
     * @param _shares The corresponding shares of each recipient.
     */
    constructor(IERC20 _token, address[] memory _recipients, uint256[] memory _shares) {
        if (address(_token) == address(0)) {
            revert ZeroAddressRecipient();
        }
        if (_recipients.length != _shares.length) {
            revert RecipientShareLengthMismatch();
        }
        if (_recipients.length == 0) {
            revert NoRecipients();
        }

        token = _token;

        uint256 _totalShares = 0;
        for (uint256 i = 0; i < _recipients.length; i++) {
            address recipient = _recipients[i];
            uint256 share = _shares[i];

            if (recipient == address(0)) {
                revert ZeroAddressRecipient();
            }
            if (share == 0) {
                revert RecipientHasZeroShares(recipient);
            }

            _totalShares += share;
        }

        recipients = _recipients;
        shares = _shares;
        totalShares = _totalShares;
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                   Distribution
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Distributes the current token balance among all recipients based on their shares.
     * @dev This function distributes the entire current balance of the contract.
     *      Any remainder due to rounding is left in the contract.
     */
    function distribute() external nonReentrant {
        uint256 balance = token.balanceOf(address(this));
        if (balance == 0) {
            revert NoTokensToDistribute();
        }

        uint256 distributed = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 amount = (balance * shares[i]) / totalShares;
            if (amount > 0) {
                address recipient = recipients[i];
                distributed += amount;
                token.safeTransfer(recipient, amount);
                emit RecipientPaid(recipient, amount);
            }
        }

        emit TokensDistributed(distributed);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                      Views
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Returns the number of recipients.
     * @return The number of recipients.
     */
    function recipientCount() external view returns (uint256) {
        return recipients.length;
    }

    /**
     * @notice Calculates how much a specific recipient would receive from the current balance.
     * @param recipientIndex The index of the recipient in the recipients array.
     * @return The amount the recipient would receive.
     */
    function calculateRecipientAmount(uint256 recipientIndex) external view returns (uint256) {
        if (recipientIndex >= recipients.length) {
            return 0;
        }

        uint256 balance = token.balanceOf(address(this));
        return (balance * shares[recipientIndex]) / totalShares;
    }
}
