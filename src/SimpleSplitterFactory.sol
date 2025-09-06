// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SimpleSplitterCloneable} from "./SimpleSplitterCloneable.sol";

/**
 * @title SimpleSplitterFactory
 * @notice Factory contract for creating SimpleSplitter clones
 * @dev This factory deploys minimal proxy clones of the SimpleSplitterCloneable implementation.
 *      Each clone shares the same PYUSD token but has its own recipients and shares.
 * @author Mono Koto (mono-koto.eth / https://mono-koto.com)
 */
contract SimpleSplitterFactory {
    using Clones for address;

    /* ////////////////////////////////////////////////////////////////////////
                                       Events
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Emitted when a new SimpleSplitter clone is created.
     * @param splitter The address of the newly created splitter clone.
     * @param creator The address that created the splitter.
     * @param recipients The array of recipient addresses.
     * @param shares The array of corresponding shares.
     */
    event SplitterCreated(
        address indexed splitter,
        address indexed creator,
        address[] recipients,
        uint256[] shares
    );

    /* ////////////////////////////////////////////////////////////////////////
                                    Immutable State
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice The address of the SimpleSplitterCloneable implementation contract.
     */
    address public immutable implementation;


    /* //////////////////////////////////////////////////////////////////////// 
                                    Constructor
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Deploys the factory with a pre-deployed implementation contract.
     * @param _implementation The address of the SimpleSplitterCloneable implementation contract.
     */
    constructor(address _implementation) {
        implementation = _implementation;
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                   Core Functions
    //////////////////////////////////////////////////////////////////////// */

    /**
     * @notice Creates a new SimpleSplitter clone with the specified recipients and shares.
     * @dev All validation is handled by the clone's initialize function.
     * @param _recipients The addresses of the recipients.
     * @param _shares The corresponding shares of each recipient.
     * @return splitter The address of the newly created splitter clone.
     */
    function createSplitter(
        address[] calldata _recipients,
        uint256[] calldata _shares
    ) external returns (address splitter) {
        // Create the clone
        splitter = implementation.clone();
        
        // Initialize the clone (this will revert with appropriate errors if validation fails)
        SimpleSplitterCloneable(splitter).initialize(_recipients, _shares);

        // Emit event
        emit SplitterCreated(splitter, msg.sender, _recipients, _shares);
    }

}