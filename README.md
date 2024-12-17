# 🚀 DeFi Lending Pool 🔗💸

Welcome to the **DeFi Lending Pool**! This project brings the power of blockchain to decentralized finance (DeFi), enabling users to easily lend and borrow cryptocurrency with smart contracts, MetaMask integration, and dynamic interest rates. Whether you're looking to earn interest on your ETH or borrow from the pool, our platform provides a seamless experience for all! 🌐💡

![Lending Pool](https://img.shields.io/badge/Smart-Contractor-orange) ![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-blue)

---

## 🏗️ Project Structure

**This project is designed with the following key components:**

### Architecture:
1. **Smart Contracts (Solidity)**: Handling deposit, withdrawal, loans, interest calculation, and transaction security.
2. **Frontend (React + Web3)**: User-friendly interface for interacting with the Ethereum blockchain.
3. **MetaMask Wallet Integration**: Connecting users’ Ethereum wallets for easy transaction management.

---

## 📚 Features

- **Lend and Earn** 💰: Deposit ETH and earn interest automatically.
- **Borrow and Repay** 🔄: Borrow ETH from the pool and repay with interest.
- **Interest Rate Management** 📈: 5% annual interest for lenders and 7% for borrowers.
- **Secure and Transparent** 🔐: Blockchain-based contracts for full transparency.

---

## 🧰 Tech Stack

| **Component**        | **Technology**              |
|----------------------|-----------------------------|
| Smart Contracts      | Solidity, Truffle           |
| Blockchain Interactions | Web3.js, MetaMask         |
| Frontend             | React, HTML, CSS            |
| Testing              | Ganache,                    |

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MetaMask wallet (for Ethereum transaction management)
- Ganache for local blockchain deployment

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jayanth9844/Blockchain-Finance-Dapp
   ```

2. **Backend Setup (Smart Contracts)**:
   Navigate to the contracts directory:
   ```bash
   cd contracts
   npm install
   ```

3. **Frontend Setup**:
   Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

4. **Run the DApp**:
   - Start the backend server:
     ```bash
     npx ganache-cli
     ```
   - Compile and migrate contracts:
     ```bash
     truffle compile
     truffle migrate
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

   **And voila!** Your DeFi Lending Pool is live at `http://localhost:3000`.

---

## 📜 Smart Contracts

### Features of Contracts
- **Lending**: Lenders deposit ETH into the pool to earn interest.
- **Borrowing**: Borrowers request loans, and loans are paid back with an interest charge.
- **Interest Rates**: Lenders earn 5% annually, while borrowers pay 7% annually.

### How to Deploy:
1. **Compile and Deploy**:
   - Use Truffle to compile and migrate smart contracts:
     ```bash
     truffle compile
     truffle migrate --network development
     ```

---

## 🖥️ Frontend Integration (React + Web3)

The frontend integrates Web3.js with MetaMask to allow users to:
- **Connect their wallet** 🦊
- **Lend and borrow ETH** 💸
- **Track interest earned and paid** 📈

### Key Pages:
- **Dashboard** 🏠: Connect wallet, track ETH, lending/borrowing history.
- **Transactions** 💳: See loan details, interest rates, and outstanding repayments.

---

## 📂 Project Structure

```
├── contracts             # Solidity contracts for lending and borrowing
├── frontend              # React and Web3 frontend interface
├── migrations            # Truffle migrations for smart contracts
└── README.md             # Project Documentation
```

---

## 🧑‍💻 Contributing

We welcome contributions! If you want to propose major changes or new features, please open an issue first to discuss. Pull requests are always welcome.

---

## 🏆 Contributors

- **Jayanth Raj G**: Lead Developer and Architect
- **Benita Sanjana.L**: Frontend Developer
- **Sujal Nayak**: Smart Contract Developer

---

## 🎉 License

This project is Unlicensed.

---

Thank you for checking out the **DeFi Lending Pool** project! 🚀 Start lending and borrowing ETH today! 🌐💸

---
