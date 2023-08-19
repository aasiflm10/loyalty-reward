// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LoyaltyPoints is ERC20 {
    address public owner;
    mapping(address => uint256) public earnedPoints;

    constructor() ERC20("LoyaltyPoints", "LP") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
        earnedPoints[account] += amount;
    }

    function redeemPoints(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        earnedPoints[msg.sender] -= amount;
    }
}
