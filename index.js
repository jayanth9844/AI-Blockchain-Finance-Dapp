// index.js
require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const LendingPoolABI = require("./LendingPool.json");

const app = express();
const PORT = 3000;

// Connect to Ethereum Network
const provider = new ethers.providers.InfuraProvider(
    process.env.NETWORK,
    process.env.INFURA_API_KEY
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, LendingPoolABI.abi, wallet);

app.use(express.json());

// Deposit Endpoint
app.post("/deposit", async (req, res) => {
    try {
        const { amount } = req.body;
        const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        res.json({ status: "Deposit successful", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Borrow Endpoint
app.post("/borrow", async (req, res) => {
    try {
        const { amount } = req.body;
        const collateral = (amount * 1.5).toString(); // 150% collateral
        const tx = await contract.borrow(ethers.utils.parseEther(amount), {
            value: ethers.utils.parseEther(collateral),
        });
        await tx.wait();
        res.json({ status: "Borrow successful", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Repay Endpoint
app.post("/repay", async (req, res) => {
    try {
        const { amount } = req.body;
        const tx = await contract.repay({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        res.json({ status: "Repayment successful", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Withdraw Endpoint
app.post("/withdraw", async (req, res) => {
    try {
        const { amount } = req.body;
        const tx = await contract.withdraw(ethers.utils.parseEther(amount));
        await tx.wait();
        res.json({ status: "Withdraw successful", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

