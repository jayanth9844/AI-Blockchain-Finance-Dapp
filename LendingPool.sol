// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendingPool {
    struct Deposit {
        uint amount;
        uint timestamp;
    }
    struct Loan {
        uint amount;
        uint collateral;
        bool active;
    }

    mapping(address => Deposit) public deposits;
    mapping(address => Loan) public loans;
    uint public interestRate = 5; // Example fixed interest rate
    uint public collateralRate = 150; // 150% collateral required

    function deposit() external payable {
        deposits[msg.sender].amount += msg.value;
        deposits[msg.sender].timestamp = block.timestamp;
    }

    function borrow(uint amount) external payable {
        require(
            msg.value >= (amount * collateralRate) / 100,
            "Insufficient collateral"
        );
        require(
            deposits[address(this)].amount >= amount,
            "Insufficient pool liquidity"
        );
        loans[msg.sender] = Loan({
            amount: amount,
            collateral: msg.value,
            active: true
        });
        payable(msg.sender).transfer(amount);
    }

    function repay() external payable {
        require(loans[msg.sender].active, "No active loan");
        uint interest = (loans[msg.sender].amount * interestRate) / 100;
        require(
            msg.value >= loans[msg.sender].amount + interest,
            "Repayment amount too low"
        );

        loans[msg.sender].active = false;
        deposits[address(this)].amount += msg.value - interest; // Update pool liquidity
        payable(msg.sender).transfer(loans[msg.sender].collateral); // Return collateral
    }
    
    function withdraw(uint amount) external {
        require(
            deposits[msg.sender].amount >= amount,
            "Insufficient deposit balance"
        );
        deposits[msg.sender].amount -= amount;
        payable(msg.sender).transfer(amount);
    }
}
