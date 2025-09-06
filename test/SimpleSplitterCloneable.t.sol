// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {SimpleSplitterTest} from "./SimpleSplitter.t.sol";
import {SimpleSplitterFactory} from "../src/SimpleSplitterFactory.sol";
import {SimpleSplitterCloneable} from "../src/SimpleSplitterCloneable.sol";
import {ISimpleSplitter} from "../src/ISimpleSplitter.sol";
import {MockToken} from "../src/MockToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title SimpleSplitterCloneableTest
 * @notice Test suite for SimpleSplitterCloneable using factory pattern
 * @dev Inherits from SimpleSplitterTest to reuse all existing test logic,
 *      only overriding setUp to use the factory pattern.
 */
contract SimpleSplitterCloneableTest is SimpleSplitterTest {
    SimpleSplitterFactory public factory;
    SimpleSplitterCloneable public implementation;

    event SplitterCreated(
        address indexed splitter,
        address indexed creator,
        address[] recipients,
        uint256[] shares
    );

    function setUp() public override {
        // Deploy MockToken (same as parent)
        token = new MockToken("Mock PYUSD", "MPYUSD");

        // Setup recipients and shares (50%, 30%, 20%) (same as parent)
        recipients.push(alice);
        recipients.push(bob);
        recipients.push(charlie);

        shares.push(50);
        shares.push(30);
        shares.push(20);

        // Deploy implementation first
        implementation = new SimpleSplitterCloneable(IERC20(token));
        
        // Deploy factory with implementation address
        factory = new SimpleSplitterFactory(address(implementation));

        // Create splitter clone via factory (this replaces the parent's splitter creation)
        address splitterAddress = factory.createSplitter(recipients, shares);
        splitter = ISimpleSplitter(splitterAddress);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Factory-Specific Tests
    //////////////////////////////////////////////////////////////////////// */

    function test_factory_constructor() public view {
        assertEq(factory.implementation(), address(implementation));
        assertEq(address(implementation.token()), address(token));
    }

    function test_factory_createSplitter_success() public {
        address[] memory newRecipients = new address[](2);
        uint256[] memory newShares = new uint256[](2);
        
        newRecipients[0] = alice;
        newRecipients[1] = bob;
        newShares[0] = 60;
        newShares[1] = 40;

        // Expect the SplitterCreated event
        vm.expectEmit(false, true, false, false);
        emit SplitterCreated(address(0), address(this), newRecipients, newShares);

        address newSplitter = factory.createSplitter(newRecipients, newShares);
        
        ISimpleSplitter splitterInstance = ISimpleSplitter(newSplitter);
        
        assertEq(address(splitterInstance.token()), address(token));
        assertEq(splitterInstance.totalShares(), 100);
        assertEq(splitterInstance.recipientCount(), 2);
        assertEq(splitterInstance.recipients(0), alice);
        assertEq(splitterInstance.recipients(1), bob);
        assertEq(splitterInstance.shares(0), 60);
        assertEq(splitterInstance.shares(1), 40);
    }

    function test_factory_createSplitter_multipleClones() public {
        // Create first clone
        address[] memory recipients1 = new address[](2);
        uint256[] memory shares1 = new uint256[](2);
        recipients1[0] = alice;
        recipients1[1] = bob;
        shares1[0] = 70;
        shares1[1] = 30;

        address splitter1 = factory.createSplitter(recipients1, shares1);

        // Create second clone with different configuration
        address[] memory recipients2 = new address[](3);
        uint256[] memory shares2 = new uint256[](3);
        recipients2[0] = alice;
        recipients2[1] = bob;
        recipients2[2] = charlie;
        shares2[0] = 40;
        shares2[1] = 40;
        shares2[2] = 20;

        address splitter2 = factory.createSplitter(recipients2, shares2);

        // Verify both splitters are different addresses
        assertTrue(splitter1 != splitter2);

        // Verify both splitters work independently
        ISimpleSplitter s1 = ISimpleSplitter(splitter1);
        ISimpleSplitter s2 = ISimpleSplitter(splitter2);

        assertEq(s1.recipientCount(), 2);
        assertEq(s2.recipientCount(), 3);
        assertEq(s1.totalShares(), 100);
        assertEq(s2.totalShares(), 100);
    }

    function test_factory_createSplitter_validationErrors() public {
        // Test empty recipients
        address[] memory emptyRecipients = new address[](0);
        uint256[] memory emptyShares = new uint256[](0);
        
        vm.expectRevert(ISimpleSplitter.NoRecipients.selector);
        factory.createSplitter(emptyRecipients, emptyShares);

        // Test length mismatch
        address[] memory recipients1 = new address[](2);
        uint256[] memory shares1 = new uint256[](3);
        recipients1[0] = alice;
        recipients1[1] = bob;
        shares1[0] = 50;
        shares1[1] = 30;
        shares1[2] = 20;

        vm.expectRevert(ISimpleSplitter.RecipientShareLengthMismatch.selector);
        factory.createSplitter(recipients1, shares1);

        // Test zero address recipient
        address[] memory recipients2 = new address[](2);
        uint256[] memory shares2 = new uint256[](2);
        recipients2[0] = address(0);
        recipients2[1] = bob;
        shares2[0] = 50;
        shares2[1] = 50;

        vm.expectRevert(ISimpleSplitter.ZeroAddressRecipient.selector);
        factory.createSplitter(recipients2, shares2);

        // Test zero shares
        address[] memory recipients3 = new address[](2);
        uint256[] memory shares3 = new uint256[](2);
        recipients3[0] = alice;
        recipients3[1] = bob;
        shares3[0] = 0;
        shares3[1] = 100;

        vm.expectRevert(abi.encodeWithSelector(ISimpleSplitter.RecipientHasZeroShares.selector, alice));
        factory.createSplitter(recipients3, shares3);
    }

    function test_implementation_cannotBeInitializedTwice() public {
        // Try to initialize the implementation directly (should fail)
        vm.expectRevert();
        implementation.initialize(recipients, shares);
    }

    function test_clone_cannotBeInitializedTwice() public {
        // Try to initialize our existing clone again (should fail)
        SimpleSplitterCloneable cloneInstance = SimpleSplitterCloneable(address(splitter));
        
        vm.expectRevert();
        cloneInstance.initialize(recipients, shares);
    }

    function test_clones_shareImplementation() public {
        // Create two clones
        address splitter1 = factory.createSplitter(recipients, shares);
        address splitter2 = factory.createSplitter(recipients, shares);
        
        // Both should have the same implementation
        SimpleSplitterCloneable clone1 = SimpleSplitterCloneable(splitter1);
        SimpleSplitterCloneable clone2 = SimpleSplitterCloneable(splitter2);
        
        assertEq(address(clone1.token()), address(clone2.token()));
        assertTrue(splitter1 != splitter2); // Different addresses
        
        // But same implementation logic (both should work identically)
        token.mint(splitter1, 1000e6);
        token.mint(splitter2, 2000e6);
        
        clone1.distribute();
        clone2.distribute();
        
        // Verify proportional distribution worked for both
        assertEq(token.balanceOf(alice), 500e6 + 1000e6); // 50% of each
        assertEq(token.balanceOf(bob), 300e6 + 600e6);     // 30% of each
        assertEq(token.balanceOf(charlie), 200e6 + 400e6); // 20% of each
    }

    /* //////////////////////////////////////////////////////////////////////// 
                             All parent tests run automatically
         The setUp override means all inherited tests now use the cloneable pattern!
    //////////////////////////////////////////////////////////////////////// */
}