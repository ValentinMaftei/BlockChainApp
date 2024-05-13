import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyTickets from './pages/MyTickets';
import Sidebar from './components/Sidebar';
import { getAccount, deleteAccount, loadContract, renderTickets, getAccountTickets, createTicket } from './MyWeb3';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setBalance } from './features/UserSlice';


function App() {
  const dispatch = useDispatch();

  const account = useSelector(state => state.user.id);
  const balance = useSelector(state => state.user.balance);
  const changes = useSelector(state => state.user.changes);

  const [arrayTickets, setArrayTickets] = useState(null);
  const [accountArrayTickets, setAccountArrayTickets] = useState(null);

  const initializeContracts = async () => {
    await loadContract();
    setArrayTickets(await renderTickets());
  }

  useEffect(() => {
    initializeContracts().then((response) => {
      if (account) {
        handleGetAccountTickets();
      }
    });

  }, [account, changes]);

  const handleGetAccountTickets = async () => {
    setAccountArrayTickets(await getAccountTickets(account));
  }

  return (
    <div className=" background relative w-screen h-screen overflow-x-hidden">
      <Router>
        <Sidebar balance={balance} account={account} />
        <Routes>
          <Route path="/" element={<Home account={account} onPressConnect={() => getAccount(dispatch, login, setBalance)} onPressDisconnect={() => deleteAccount(dispatch, logout, setBalance)} />} />
          <Route path="/marketplace" element={<Marketplace arrayTickets={arrayTickets} />} />
          <Route path="/my-tickets" element={<MyTickets accountArrayTickets={accountArrayTickets} createTicket={createTicket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;