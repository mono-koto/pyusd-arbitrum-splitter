// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test, console} from "forge-std/Test.sol";
import {SimpleSplitter} from "../src/SimpleSplitter.sol";
import {ISimpleSplitter} from "../src/ISimpleSplitter.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

/**
 * @title SimpleSplitterForkTest
 * @notice Fork tests for SimpleSplitter using real PYUSD on Arbitrum testnet
 * @dev These tests fork Arbitrum testnet and use the actual PYUSD contract
 */
contract SimpleSplitterForkTest is Test {
    SimpleSplitter public splitter;
    IERC20Metadata public pyusd;

    address pyusdAddress = vm.envAddress("PYUSD_ARB_SEPOLIA");

    address alice = address(0x1);
    address bob = address(0x2);
    address charlie = address(0x3);

    address[] recipients;
    uint256[] shares;

    event TokensDistributed(uint256 totalAmount);
    event RecipientPaid(address indexed recipient, uint256 amount);

    function setUp() public {
        // Fork Arbitrum testnet
        vm.createSelectFork("arbitrum_sepolia");

        // Get PYUSD contract
        pyusd = IERC20Metadata(pyusdAddress);

        // Setup recipients and shares (40%, 35%, 25%)
        recipients.push(alice);
        recipients.push(bob);
        recipients.push(charlie);

        shares.push(40);
        shares.push(35);
        shares.push(25);

        // Deploy SimpleSplitter with real PYUSD
        splitter = new SimpleSplitter(pyusd, recipients, shares);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Fork Integration Tests
    //////////////////////////////////////////////////////////////////////// */

    function test_fork_pyusdProperties() public view {
        // Verify token contract properties (Note: This appears to be Flux USD, not PYUSD)
        assertEq(pyusd.decimals(), 6, "Token should have 6 decimals");
        assertEq(pyusd.symbol(), "PYUSD", "Token symbol should be PYUSD");
        assertEq(pyusd.name(), "PayPal USD", "Token name should be PayPal USD");
    }

    function test_fork_splitterConfiguration() public view {
        // Verify splitter is configured correctly with PYUSD
        assertEq(address(splitter.token()), pyusdAddress);
        assertEq(splitter.totalShares(), 100);
        assertEq(splitter.recipientCount(), 3);

        assertEq(splitter.recipients(0), alice);
        assertEq(splitter.recipients(1), bob);
        assertEq(splitter.recipients(2), charlie);

        assertEq(splitter.shares(0), 40);
        assertEq(splitter.shares(1), 35);
        assertEq(splitter.shares(2), 25);
    }

    function test_fork_distribute_realPYUSD() public {
        uint256 amount = 1000 * 10 ** 6; // 1000 PYUSD (6 decimals)

        // Use Foundry's deal to give PYUSD to the splitter
        deal(pyusdAddress, address(splitter), amount);

        // Verify the deal worked
        assertEq(pyusd.balanceOf(address(splitter)), amount);

        // Record initial balances
        uint256 aliceInitial = pyusd.balanceOf(alice);
        uint256 bobInitial = pyusd.balanceOf(bob);
        uint256 charlieInitial = pyusd.balanceOf(charlie);

        // Expect events
        vm.expectEmit(true, false, false, true);
        emit RecipientPaid(alice, 400 * 10 ** 6);
        vm.expectEmit(true, false, false, true);
        emit RecipientPaid(bob, 350 * 10 ** 6);
        vm.expectEmit(true, false, false, true);
        emit RecipientPaid(charlie, 250 * 10 ** 6);
        vm.expectEmit(false, false, false, true);
        emit TokensDistributed(amount);

        // Distribute tokens
        splitter.distribute();

        // Verify distributions
        assertEq(pyusd.balanceOf(alice), aliceInitial + 400 * 10 ** 6);
        assertEq(pyusd.balanceOf(bob), bobInitial + 350 * 10 ** 6);
        assertEq(pyusd.balanceOf(charlie), charlieInitial + 250 * 10 ** 6);
        assertEq(pyusd.balanceOf(address(splitter)), 0);
    }

    function test_fork_distribute_smallAmount() public {
        uint256 amount = 100; // 100 micro-PYUSD (smallest unit)

        // Deal small amount to splitter
        deal(pyusdAddress, address(splitter), amount);

        splitter.distribute();

        // With shares 40, 35, 25 and total 100:
        // alice gets 100 * 40 / 100 = 40
        // bob gets 100 * 35 / 100 = 35
        // charlie gets 100 * 25 / 100 = 25
        assertEq(pyusd.balanceOf(alice), 40);
        assertEq(pyusd.balanceOf(bob), 35);
        assertEq(pyusd.balanceOf(charlie), 25);
        assertEq(pyusd.balanceOf(address(splitter)), 0);
    }

    function test_fork_distribute_withRemainder() public {
        uint256 amount = 103; // Amount that creates remainder

        deal(pyusdAddress, address(splitter), amount);

        splitter.distribute();

        assertEq(pyusd.balanceOf(alice), 41);
        assertEq(pyusd.balanceOf(bob), 36);
        assertEq(pyusd.balanceOf(charlie), 25);
        assertEq(pyusd.balanceOf(address(splitter)), 1); // Remainder
    }

    function test_fork_multipleDistributions() public {
        // First distribution
        uint256 amount1 = 500 * 10 ** 6;
        deal(pyusdAddress, address(splitter), amount1);
        splitter.distribute();

        uint256 aliceAfterFirst = pyusd.balanceOf(alice);
        uint256 bobAfterFirst = pyusd.balanceOf(bob);
        uint256 charlieAfterFirst = pyusd.balanceOf(charlie);

        // Second distribution
        uint256 amount2 = 300 * 10 ** 6;
        deal(pyusdAddress, address(splitter), amount2);
        splitter.distribute();

        // Verify cumulative distributions
        assertEq(pyusd.balanceOf(alice), aliceAfterFirst + 120 * 10 ** 6); // 40% of 300M
        assertEq(pyusd.balanceOf(bob), bobAfterFirst + 105 * 10 ** 6); // 35% of 300M
        assertEq(pyusd.balanceOf(charlie), charlieAfterFirst + 75 * 10 ** 6); // 25% of 300M
    }

    function test_fork_calculateRecipientAmount() public {
        uint256 amount = 1000 * 10 ** 6;
        deal(pyusdAddress, address(splitter), amount);

        assertEq(splitter.calculateRecipientAmount(0), 400 * 10 ** 6); // alice: 40%
        assertEq(splitter.calculateRecipientAmount(1), 350 * 10 ** 6); // bob: 35%
        assertEq(splitter.calculateRecipientAmount(2), 250 * 10 ** 6); // charlie: 25%
        assertEq(splitter.calculateRecipientAmount(3), 0); // out of bounds
    }

    function test_fork_distributableBalance() public {
        assertEq(IERC20(pyusdAddress).balanceOf(address(splitter)), 0);

        uint256 amount = 1000 * 10 ** 6;
        deal(pyusdAddress, address(splitter), amount);
        assertEq(IERC20(pyusdAddress).balanceOf(address(splitter)), amount);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Fuzz Tests with Real PYUSD
    //////////////////////////////////////////////////////////////////////// */

    function testFuzz_fork_distribute(uint256 amount) public {
        // Bound amount to reasonable range (1 micro-PYUSD to 1M PYUSD)
        amount = bound(amount, 1, 1_000_000 * 10 ** 6);

        deal(pyusdAddress, address(splitter), amount);

        uint256 aliceExpected = (amount * 40) / 100;
        uint256 bobExpected = (amount * 35) / 100;
        uint256 charlieExpected = (amount * 25) / 100;

        splitter.distribute();

        assertEq(pyusd.balanceOf(alice), aliceExpected);
        assertEq(pyusd.balanceOf(bob), bobExpected);
        assertEq(pyusd.balanceOf(charlie), charlieExpected);

        // Check that total distributed + remainder equals original amount
        uint256 totalDistributed = aliceExpected + bobExpected + charlieExpected;
        uint256 remainder = pyusd.balanceOf(address(splitter));
        assertEq(totalDistributed + remainder, amount);
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Error Cases
    //////////////////////////////////////////////////////////////////////// */

    function test_fork_revert_noTokens() public {
        // Ensure splitter has no PYUSD
        assertEq(pyusd.balanceOf(address(splitter)), 0);

        vm.expectRevert(ISimpleSplitter.NoTokensToDistribute.selector);
        splitter.distribute();
    }

    /* //////////////////////////////////////////////////////////////////////// 
                                Gas Optimization Tests
    //////////////////////////////////////////////////////////////////////// */

    function test_fork_gasUsage_distribute() public {
        uint256 amount = 1000 * 10 ** 6;
        deal(pyusdAddress, address(splitter), amount);

        uint256 gasBefore = gasleft();
        splitter.distribute();
        uint256 gasUsed = gasBefore - gasleft();

        console.log("Gas used for distribution:", gasUsed);

        // Ensure gas usage is reasonable (should be well under 200k gas)
        assertLt(gasUsed, 200_000, "Distribution should use less than 200k gas");
    }
}
