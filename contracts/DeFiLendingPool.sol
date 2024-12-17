// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract DeFiLendingPool {
    address public owner;
    uint256 public constant INTEREST_RATE_LENDER = 5; 
    uint256 public constant INTEREST_RATE_BORROWER = 7;
    uint256 public constant SECONDS_IN_YEAR = 365 days;

    struct Deposit {
        uint256 amount;
        uint256 depositTime;
    }

    struct Loan {
        uint256 amount;
        uint256 borrowTime;
        uint256 interestRate;
    }

    mapping(address => Deposit) public deposits;
    mapping(address => Loan) public loans;
    
    uint256 public totalLiquidity;
    uint256 public totalBorrowed;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event LoanRequested(address indexed user, uint256 amount);
    event LoanRepaid(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function depositETH() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        
        Deposit storage deposit = deposits[msg.sender];
        deposit.amount += msg.value;
        deposit.depositTime = block.timestamp;

        totalLiquidity += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function calculateLenderInterest(address depositor) public view returns (uint256) {
        Deposit memory deposit = deposits[depositor];
        if (deposit.amount == 0) return 0;

        uint256 depositDuration = block.timestamp - deposit.depositTime;
        uint256 interest = (deposit.amount * INTEREST_RATE_LENDER * depositDuration) / (SECONDS_IN_YEAR * 100);
        return interest;
    }

    function calculateTotalEarned(address depositor) public view returns (uint256) {
        Deposit memory deposit = deposits[depositor];
        if (deposit.amount == 0) return 0;

        uint256 depositDuration = block.timestamp - deposit.depositTime;
        uint256 interest = (deposit.amount * INTEREST_RATE_LENDER * depositDuration) / (SECONDS_IN_YEAR * 100);
        uint256 totalEarned = deposit.amount + interest;
        return totalEarned;
    }

    function calculateTotalRepayment(address borrower) public view returns (uint256) {
        Loan memory loan = loans[borrower];
        if (loan.amount == 0) return 0;

        uint256 borrowDuration = block.timestamp - loan.borrowTime;
        uint256 interest = (loan.amount * loan.interestRate * borrowDuration) / (SECONDS_IN_YEAR * 100);
        uint256 totalRepayment = loan.amount + interest;
        return totalRepayment;
    }

    function withdrawETH(uint256 amount) public {
        Deposit storage deposit = deposits[msg.sender];
        uint256 interest = calculateLenderInterest(msg.sender);
        
        require(deposit.amount >= amount, "Insufficient deposit balance");
        
        uint256 totalWithdrawal = amount + interest;
        require(address(this).balance >= totalWithdrawal, "Insufficient liquidity in pool");

        deposit.amount -= amount;
        totalLiquidity -= amount;

        payable(msg.sender).transfer(totalWithdrawal);
        emit Withdrawn(msg.sender, totalWithdrawal);
    }

    function requestLoan(uint256 amount) public {
        require(amount > 0, "Loan amount must be greater than 0");
        require(totalLiquidity >= amount, "Not enough liquidity in the pool");
        require(loans[msg.sender].amount == 0, "Existing loan must be repaid first");

        loans[msg.sender] = Loan({
            amount: amount,
            borrowTime: block.timestamp,
            interestRate: INTEREST_RATE_BORROWER
        });

        totalBorrowed += amount;
        totalLiquidity -= amount;

        payable(msg.sender).transfer(amount);
        emit LoanRequested(msg.sender, amount);
    }

    function calculateBorrowerInterest(address borrower) public view returns (uint256) {
        Loan memory loan = loans[borrower];
        if (loan.amount == 0) return 0;

        uint256 borrowDuration = block.timestamp - loan.borrowTime;
        uint256 interest = (loan.amount * loan.interestRate * borrowDuration) / (SECONDS_IN_YEAR * 100);
        return interest;
    }

    function repayLoan() public payable {
    Loan storage loan = loans[msg.sender];
    
    require(loan.amount > 0, "No active loan");

    uint256 interest = calculateBorrowerInterest(msg.sender);
    
    uint256 totalRepayment = loan.amount + interest;
    
    require(msg.value >= totalRepayment, "Insufficient repayment amount");
    
    totalBorrowed -= loan.amount;
    totalLiquidity += totalRepayment;


    delete loans[msg.sender];
    

    if (msg.value > totalRepayment) {
        uint256 excessAmount = msg.value - totalRepayment;
        payable(msg.sender).transfer(excessAmount);
    }
    

    emit LoanRepaid(msg.sender, loan.amount);
    }

    fallback() external payable {
        revert("Invalid operation. Please use the correct function.");
    }


    receive() external payable {
        totalLiquidity += msg.value;
    }

    function getUserDeposit(address user) public view returns (uint256) {
        return deposits[user].amount;
    }

    function getUserLoan(address user) public view returns (uint256) {
        return loans[user].amount;
    }

    function getTotalLiquidity() public view returns (uint256) {
        return totalLiquidity;
    }
}
