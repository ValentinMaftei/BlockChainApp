import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyTickets from './pages/MyTickets';
import Sidebar from './components/Sidebar';
import { connectToMetamask, disconnectFromMetamask, loadContract } from './MyWeb3';
import { useEffect, useState } from 'react';


function App() {

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    loadContract();
  }
  , []);

  // Get the user's account
  async function getAccount() {
    try {
        console.log("Connecting to metamask");
        await connectToMetamask();
        if (window.web3) {
            const accounts = await window.web3.eth.getAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                const userBalance = await window.web3.eth.getBalance(accounts[0]);
                setBalance(window.web3.utils.fromWei(userBalance, 'ether'));
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

  async function deleteAccount() {
    await disconnectFromMetamask();
    setAccount(null);
    setBalance(null);
  }


  return (
    <div className=" background relative w-screen h-screen overflow-x-hidden">
      <Router>
        <Sidebar balance={balance} />
        <Routes>
          <Route path="/" element={<Home account={account} onPressConnect={getAccount} onPressDisconnect={deleteAccount} />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/my-tickets" element={<MyTickets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;