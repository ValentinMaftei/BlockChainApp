import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
const { abi } = require('./build/contracts/Ticket.json');

export async function connectToMetamask() {
    try {
        if (window.ethereum) {
            await window.ethereum.enable();
            window.web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
    }
}

export async function disconnectFromMetamask() {
    if (window.ethereum) {
        window.ethereum.removeAllListeners();
        window.web3 = null;
    } else if (window.web3) {
        window.web3.currentProvider.disconnect();
        window.web3 = null;
    } else {
        console.log('No Ethereum connection detected.');
    }
}

export async function loadContract() {
    try {
        const response = await fetch('Ticket.json');
        console.log("Contract loaded", response);
    } catch (error) {
        console.error("Error loading contract:", error);
    }
}