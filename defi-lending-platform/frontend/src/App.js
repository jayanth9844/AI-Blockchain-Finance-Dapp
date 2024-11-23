import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DeFiLendingPoolABI from './contracts/DeFiLendingPool.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [depositAmount, setDepositAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [totalEarned, setTotalEarned] = useState('0'); // New state for total earned
  const [totalRepayment, setTotalRepayment] = useState('0'); // New state for total repayment


  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Create Web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get accounts
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Get contract instance 
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DeFiLendingPoolABI.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DeFiLendingPoolABI.abi, 
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);

          // Get account balance
          const accountBalance = await web3Instance.eth.getBalance(accounts[0]);
          setBalance(web3Instance.utils.fromWei(accountBalance, 'ether'));

          // Fetch total earned by lender and total repayment for borrower
          fetchTotalEarned();
          fetchTotalRepayment();
        } catch (error) {
          console.error("Failed to connect wallet", error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

 
  // Fetch total earned (deposit + interest) for lender
  const fetchTotalEarned = async () => {
    try {
      const earned = await contract.methods.calculateTotalEarned(account).call();
      setTotalEarned(web3.utils.fromWei(earned, 'ether'));
    } catch (error) {
      console.error('Failed to fetch total earned:', error);
    }
  };

  // Fetch total repayment (loan + interest) for borrower
  const fetchTotalRepayment = async () => {
    try {
      const repayment = await contract.methods.calculateTotalRepayment(account).call();
      setTotalRepayment(web3.utils.fromWei(repayment, 'ether'));
    } catch (error) {
      console.error('Failed to fetch total repayment:', error);
    }
  };

  const depositETH = async () => {
    try {
      await contract.methods.depositETH().send({
        from: account,
        value: web3.utils.toWei(depositAmount, 'ether')
      });
      alert('Deposit Successful!');
      setDepositAmount('');
      fetchTotalEarned(); // Fetch earned amount after deposit
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  const withdrawETH = async () => {
    try {
      await contract.methods.withdrawETH(web3.utils.toWei(depositAmount, 'ether')).send({
        from: account
      });
      alert('Withdrawal Successful!');
      setDepositAmount('');
      fetchTotalEarned(); // Fetch earned amount after withdrawal
    } catch (error) {
      console.error('Withdrawal failed:', error);
    }
  };

  const requestLoan = async () => {
    try {
      await contract.methods.requestLoan(web3.utils.toWei(loanAmount, 'ether')).send({
        from: account
      });
      alert('Loan Request Successful!');
      setLoanAmount('');
      fetchTotalRepayment(); // Fetch repayment amount after loan request
    } catch (error) {
      console.error('Loan request failed:', error);
    }
  };

  const repayLoan = async () => {
    try {
      // Get current loan amount
      const loanAmount = await contract.methods.getUserLoan(account).call();
      
      await contract.methods.repayLoan().send({
        from: account,
        value: loanAmount
      });
      alert('Loan Repayment Successful!');
      fetchTotalRepayment(); // Fetch repayment amount after loan repayment
    } catch (error) {
      console.error('Loan repayment failed:', error);
    }
  };

  return (
    <div className="App">
      <h1>DeFi Lending Pool</h1>
      <p>Connected Account: {account}</p>
      <p>Account Balance: {balance} ETH</p>

      <div>
        <h2>Deposit/Withdraw</h2>
        <input 
          type="text" 
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="Enter ETH amount"
        />
        <button onClick={depositETH}>Deposit</button>
        <button onClick={withdrawETH}>Withdraw</button>
        <p>Total Earned (Deposit + Interest): {totalEarned} ETH</p>
      </div>

      <div>
        <h2>Loan Management</h2>
        <input 
          type="text" 
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter Loan Amount"
        />
        <button onClick={requestLoan}>Request Loan</button>
        <button onClick={repayLoan}>Repay Loan</button>
        <p>Total Repayment (Loan + Interest): {totalRepayment} ETH</p>
      </div>
    </div>
  );
}

export default App;