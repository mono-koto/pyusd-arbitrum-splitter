// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test, console} from "forge-std/Test.sol";
import {SimpleSplitter} from "../src/SimpleSplitter.sol";
import {ISimpleSplitter} from "../src/ISimpleSplitter.sol";
import {MockToken} from "../src/MockToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleSplitterTest is Test {
    SimpleSplitter public splitter;
    MockToken public token;

    address public alice = address(0x1);
    address public bob = address(0x2);
    address public charlie = address(0x3);

    address[] public recipients;
    uint256[] public shares;

    event TokensDistributed(uint256 totalAmount);
    event RecipientPaid(address indexed recipient, uint256 amount);

    function setUp() public {
        // Deploy MockToken
        token = new MockToken("Mock PYUSD", "MPYUSD");

        // Setup recipients and shares (50%, 30%, 20%)
        recipients.push(alice);
        recipients.push(bob);
        recipients.push(charlie);

        shares.push(50);
        shares.push(30);
        shares.push(20);

        // Deploy SimpleSplitter
        splitter = new SimpleSplitter(IERC20(token), recipients, shares);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Constructor Tests
    //////////////////////////////////////////////////////////////////////// */

    function test_constructor_success() public view {
        assertEq(address(splitter.token()), address(token));
        assertEq(splitter.totalShares(), 100);
        assertEq(splitter.recipientCount(), 3);

        assertEq(splitter.recipients(0), alice);
        assertEq(splitter.recipients(1), bob);
        assertEq(splitter.recipients(2), charlie);

        assertEq(splitter.shares(0), 50);
        assertEq(splitter.shares(1), 30);
        assertEq(splitter.shares(2), 20);
    }

    function test_constructor_revert_zeroTokenAddress() public {
        vm.expectRevert(ISimpleSplitter.ZeroAddressRecipient.selector);
        new SimpleSplitter(IERC20(address(0)), recipients, shares);
    }

    function test_constructor_revert_lengthMismatch() public {
        uint256[] memory wrongShares = new uint256[](2);
        wrongShares[0] = 50;
        wrongShares[1] = 50;

        vm.expectRevert(ISimpleSplitter.RecipientShareLengthMismatch.selector);
        new SimpleSplitter(IERC20(token), recipients, wrongShares);
    }

    function test_constructor_revert_noRecipients() public {
        address[] memory emptyRecipients = new address[](0);
        uint256[] memory emptyShares = new uint256[](0);

        vm.expectRevert(ISimpleSplitter.NoRecipients.selector);
        new SimpleSplitter(IERC20(token), emptyRecipients, emptyShares);
    }

    function test_constructor_revert_zeroAddressRecipient() public {
        recipients[1] = address(0);

        vm.expectRevert(ISimpleSplitter.ZeroAddressRecipient.selector);
        new SimpleSplitter(IERC20(token), recipients, shares);
    }

    function test_constructor_revert_zeroShares() public {
        shares[1] = 0;

        vm.expectRevert(abi.encodeWithSelector(ISimpleSplitter.RecipientHasZeroShares.selector, bob));
        new SimpleSplitter(IERC20(token), recipients, shares);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Distribution Tests
    //////////////////////////////////////////////////////////////////////// */

    function test_distribute_success() public {
        uint256 amount = 1000 * 10 ** 6; // 1000 tokens with 6 decimals
        token.transfer(address(splitter), amount);

        vm.expectEmit(true, false, false, true);
        emit RecipientPaid(alice, 500 * 10 ** 6);
        vm.expectEmit(true, false, false, true);
        emit RecipientPaid(bob, 300 * 10 ** 6);
        vm.expectEmit(true, false, false, true);
        emit RecipientPaid(charlie, 200 * 10 ** 6);
        vm.expectEmit(false, false, false, true);
        emit TokensDistributed(amount);

        splitter.distribute();

        assertEq(token.balanceOf(alice), 500 * 10 ** 6);
        assertEq(token.balanceOf(bob), 300 * 10 ** 6);
        assertEq(token.balanceOf(charlie), 200 * 10 ** 6);
        assertEq(token.balanceOf(address(splitter)), 0);
    }

    function test_distribute_revert_noTokens() public {
        vm.expectRevert(ISimpleSplitter.NoTokensToDistribute.selector);
        splitter.distribute();
    }

    function test_distribute_withRemainder() public {
        uint256 amount = 1001 * 10 ** 6; // Amount that doesn't divide evenly
        token.transfer(address(splitter), amount);

        splitter.distribute();

        // With shares 50, 30, 20 and total 100:
        // alice gets 1001M * 50 / 100 = 500.5M = 500500000 (integer division)
        // bob gets 1001M * 30 / 100 = 300.3M = 300300000
        // charlie gets 1001M * 20 / 100 = 200.2M = 200200000
        // Total distributed: 1001M, no remainder
        assertEq(token.balanceOf(alice), 500500000);
        assertEq(token.balanceOf(bob), 300300000);
        assertEq(token.balanceOf(charlie), 200200000);
        assertEq(token.balanceOf(address(splitter)), 0); // No remainder in this case
    }

    function test_distribute_multipleRounds() public {
        // First distribution
        uint256 amount1 = 1000 * 10 ** 6;
        token.transfer(address(splitter), amount1);
        splitter.distribute();

        // Second distribution
        uint256 amount2 = 500 * 10 ** 6;
        token.transfer(address(splitter), amount2);
        splitter.distribute();

        // Total distributed: 1500 tokens
        assertEq(token.balanceOf(alice), 750 * 10 ** 6); // 50% of 1500
        assertEq(token.balanceOf(bob), 450 * 10 ** 6); // 30% of 1500
        assertEq(token.balanceOf(charlie), 300 * 10 ** 6); // 20% of 1500
    }

    function test_distribute_smallAmount() public {
        uint256 amount = 1; // 1 wei
        token.transfer(address(splitter), amount);

        splitter.distribute();

        // With shares 50, 30, 20 and total 100:
        // alice gets 1 * 50 / 100 = 0 (integer division)
        // bob gets 1 * 30 / 100 = 0
        // charlie gets 1 * 20 / 100 = 0
        // All tokens remain in contract
        assertEq(token.balanceOf(alice), 0);
        assertEq(token.balanceOf(bob), 0);
        assertEq(token.balanceOf(charlie), 0);
        assertEq(token.balanceOf(address(splitter)), 1);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                View Function Tests
    //////////////////////////////////////////////////////////////////////// */

    function test_recipientCount() public view {
        assertEq(splitter.recipientCount(), 3);
    }

    function test_distributableBalance() public {
        assertEq(token.balanceOf(address(splitter)), 0);

        uint256 amount = 1000 * 10 ** 6;
        token.transfer(address(splitter), amount);
        assertEq(token.balanceOf(address(splitter)), amount);
    }

    function test_calculateRecipientAmount() public {
        uint256 amount = 1000 * 10 ** 6;
        token.transfer(address(splitter), amount);

        assertEq(splitter.calculateRecipientAmount(0), 500 * 10 ** 6); // alice: 50%
        assertEq(splitter.calculateRecipientAmount(1), 300 * 10 ** 6); // bob: 30%
        assertEq(splitter.calculateRecipientAmount(2), 200 * 10 ** 6); // charlie: 20%
        assertEq(splitter.calculateRecipientAmount(3), 0); // out of bounds
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Fuzz Tests
    //////////////////////////////////////////////////////////////////////// */

    function testFuzz_distribute(uint256 amount) public {
        vm.assume(amount > 0 && amount <= token.totalSupply());

        token.transfer(address(splitter), amount);

        uint256 aliceExpected = (amount * 50) / 100;
        uint256 bobExpected = (amount * 30) / 100;
        uint256 charlieExpected = (amount * 20) / 100;

        splitter.distribute();

        assertEq(token.balanceOf(alice), aliceExpected);
        assertEq(token.balanceOf(bob), bobExpected);
        assertEq(token.balanceOf(charlie), charlieExpected);

        // Check that total distributed + remainder equals original amount
        uint256 totalDistributed = aliceExpected + bobExpected + charlieExpected;
        uint256 remainder = token.balanceOf(address(splitter));
        assertEq(totalDistributed + remainder, amount);
    }

    function testFuzz_constructor_validShares(uint256 share1, uint256 share2, uint256 share3) public {
        vm.assume(share1 > 0 && share2 > 0 && share3 > 0);
        vm.assume(share1 <= type(uint256).max / 3); // Prevent overflow
        vm.assume(share2 <= type(uint256).max / 3);
        vm.assume(share3 <= type(uint256).max / 3);

        address[] memory testRecipients = new address[](3);
        testRecipients[0] = address(0x10);
        testRecipients[1] = address(0x20);
        testRecipients[2] = address(0x30);

        uint256[] memory testShares = new uint256[](3);
        testShares[0] = share1;
        testShares[1] = share2;
        testShares[2] = share3;

        SimpleSplitter testSplitter = new SimpleSplitter(IERC20(token), testRecipients, testShares);

        assertEq(testSplitter.totalShares(), share1 + share2 + share3);
        assertEq(testSplitter.shares(0), share1);
        assertEq(testSplitter.shares(1), share2);
        assertEq(testSplitter.shares(2), share3);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Edge Case Tests
    //////////////////////////////////////////////////////////////////////// */

    function test_singleRecipient() public {
        address[] memory singleRecipient = new address[](1);
        singleRecipient[0] = alice;

        uint256[] memory singleShare = new uint256[](1);
        singleShare[0] = 100;

        SimpleSplitter singleSplitter = new SimpleSplitter(IERC20(token), singleRecipient, singleShare);

        uint256 amount = 1000 * 10 ** 6;
        token.transfer(address(singleSplitter), amount);

        singleSplitter.distribute();

        assertEq(token.balanceOf(alice), amount);
        assertEq(token.balanceOf(address(singleSplitter)), 0);
    }

    function test_unequalShares() public {
        address[] memory testRecipients = new address[](2);
        testRecipients[0] = alice;
        testRecipients[1] = bob;

        uint256[] memory testShares = new uint256[](2);
        testShares[0] = 1;
        testShares[1] = 999;

        SimpleSplitter testSplitter = new SimpleSplitter(IERC20(token), testRecipients, testShares);

        uint256 amount = 1000 * 10 ** 6;
        token.transfer(address(testSplitter), amount);

        testSplitter.distribute();

        assertEq(token.balanceOf(alice), 1 * 10 ** 6); // 1/1000 of amount
        assertEq(token.balanceOf(bob), 999 * 10 ** 6); // 999/1000 of amount
    }
}
