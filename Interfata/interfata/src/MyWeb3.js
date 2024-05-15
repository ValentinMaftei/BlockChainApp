import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import Ticket from 'contracts/Ticket.json';
import TicketAuction from 'contracts/TicketAuction.json';
import Withdrawable from 'contracts/Withdrawable.json';
import { logout } from './features/UserSlice';

let account;

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

export async function getAccount(dispatch, setAccount, setBalance) {
    try {
        console.log("Connecting to metamask");
        await connectToMetamask();
        if (window.web3) {
            const accounts = await window.web3.eth.getAccounts();
            if (accounts.length > 0) {
                dispatch(setAccount(accounts[0]));
                account = accounts[0];
                const userBalance = await window.web3.eth.getBalance(accounts[0]);
                dispatch(setBalance(window.web3.utils.fromWei(userBalance, 'ether')));
                console.log("Account is set ", accounts[0], userBalance);
            } else {
                console.log("No accounts found");
            }
        } else {
            console.log("Failed to connect to MetaMask");
        }
    } catch (error) {
        console.error("Error getting account:", error);
    }
}


export async function getAccountBalance(dispatch, setBalance) {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        if (window.web3 && window.web3.eth) {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const account = accounts[0];
            const userBalance = await window.web3.eth.getBalance(account);
            dispatch(setBalance(window.web3.utils.fromWei(userBalance, 'ether')));
        }
    }
}


export async function deleteAccount(dispatch, logout) {
    await disconnectFromMetamask();
    dispatch(logout());
    window.location.reload();
}

let ticketContract, ticketAuctionContract, withdrawableContract;

export async function loadContract() {
    const web3 = new Web3(window.ethereum);

    const network = await web3.eth.net.getId();

    ticketContract = new web3.eth.Contract(
        Ticket.abi,
        Ticket.networks[network].address
    );

    ticketAuctionContract = new web3.eth.Contract(
        TicketAuction.abi,
        TicketAuction.networks[network].address
    );

    withdrawableContract = new web3.eth.Contract(
        Withdrawable.abi,
        Withdrawable.networks[network].address
    );
}

export const renderTickets = async () => {
    const ticketsCount = await ticketContract.methods.ticketCount().call();
    const arrayTickets = [];

    for (let i = 1; i <= ticketsCount; i++) {
        const ticket = await ticketContract.methods.tickets(i).call();
        arrayTickets.push(ticket);
    }

    return arrayTickets;
}

export const getAccountTickets = async (account) => {
    const ticketIds = await ticketContract.methods.getAccountTickets(account).call();
    const tickets = [];

    for (let i = 0; i < ticketIds.length; i++) {
        const ticket = await ticketContract.methods.tickets(ticketIds[i]).call();
        tickets.push(ticket);
    }

    return tickets;
}


export const createTicket = async (name, description, price) => {
    try {
        await ticketContract.methods.createTicket(name, description, price).send({ from: account });
    } catch (error) {
        console.error("Error creating ticket:", error);
    }
}


export const placeTicketForSale = async (id, price) => {
    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const newPrice = web3.utils.toWei(price, 'ether');
            await ticketContract.methods.placeTicketOnSale(parseInt(id), newPrice).send({ from: account });
        }
    } catch (error) {
        console.error("Error placing ticket on sale:", error);
    }
}


export const revokeTicketForSale = async (id) => {
    try {
        await ticketContract.methods.revokeTicketFromSale(parseInt(id)).send({ from: account });
    } catch (error) {
        console.error("Error revoking ticket for sale:", error);
    }
}


export const convertWeiToEther = (price) => {
    return Web3.utils.fromWei(price, 'ether');
}


export const convertEtherToWei = (price) => {
    return Web3.utils.toWei(price, 'ether');
}


export const buyTicket = async (id, price) => {
    try {
        await ticketContract.methods.buyTicket(id).send({ from: account, value: parseFloat(price) });
    } catch (error) {
        console.error("Error buying ticket:", error);
    }
}


export const renderAuctions = async () => {
    const auctionsCount = await ticketAuctionContract.methods.auctionCount().call();
    const arrayAuctions = [];

    for (let i = 1; i <= auctionsCount; i++) {
        const auction = await ticketAuctionContract.methods.auctions(i).call();
        if (auction.active)
            arrayAuctions.push(auction);
    }

    return arrayAuctions;
}


export const getTicket = async (id) => {
    return await ticketContract.methods.tickets(id).call();
}


export const startAuction = async (ticketId, price) => {
    try {
        await ticketAuctionContract.methods.startAuction(parseInt(ticketId), parseInt(price)).send({ from: account });
    } catch (error) {
        console.error("Error starting auction:", error);
    }
}

export const getAuctionByTicketId = async (id) => {
    return await ticketAuctionContract.methods.getAuctionByTicketId(parseInt(id)).call();
}

export const endAuction = async (id) => {
    try {
        await ticketAuctionContract.methods.endAuction(id).send({ from: account });
    } catch (error) {
        console.error("Error ending auction:", error);
    }
}

export const placeBid = async (id, price) => {
    try {
        const priceInWei = Web3.utils.toWei(Number(price).toFixed(18), 'ether');
        await ticketAuctionContract.methods.placeBid(parseInt(id)).send({ from: account, value: priceInWei });
    } catch (error) {
        console.error("Error placing bid:", error);
    }
}

export const getBidsByAuctionId = async (id) => {
    const result = await ticketAuctionContract.methods.getBidsByAuctionId(id).call();
    const bidsToGet = result[0].map((price, index) => {
        return {
            bidder: result[1][index],
            price: Web3.utils.fromWei(price.toString(), 'ether')
        }
    });
    bidsToGet.sort((a, b) => b.price - a.price);
    return bidsToGet;
}