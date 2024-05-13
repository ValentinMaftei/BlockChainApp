import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyTickets from './pages/MyTickets';
import Sidebar from './components/Sidebar';
import { getAccount, deleteAccount, loadContract, renderTickets, getAccountTickets } from './MyWeb3';
import { useEffect, useState } from 'react';


function App() {

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(null);
  const [arrayTickets, setArrayTickets] = useState(null);
  const [accountArrayTickets, setAccountArrayTickets] = useState(null);

  const initializeContracts = async () => {
    await loadContract();
    setArrayTickets(await renderTickets());
  }

  useEffect(() => {
    initializeContracts();
  }
  , []);

  const handleGetAccountTickets = async () => {
    setAccountArrayTickets(await getAccountTickets(account));
  }

  useEffect(() => {
    if (account) {
      handleGetAccountTickets();
    }
  }, [account]);
    
  return (
    <div className=" background relative w-screen h-screen overflow-x-hidden">
      <Router>
        <Sidebar balance={balance} account={account} />
        <Routes>
          <Route path="/" element={<Home account={account} onPressConnect={() => getAccount(setAccount, setBalance)} onPressDisconnect={() => deleteAccount(setAccount, setBalance)} />} />
          <Route path="/marketplace" element={<Marketplace arrayTickets={arrayTickets}/>}/>
          <Route path="/my-tickets" element={<MyTickets accountArrayTickets={accountArrayTickets}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;