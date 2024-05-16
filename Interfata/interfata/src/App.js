import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyTickets from './pages/MyTickets';
import Sidebar from './components/Sidebar';
import Auctions from './pages/Auctions';
import MyIncomes from './pages/MyIncomes';
import { getAccount, deleteAccount, loadContract, renderTickets, getTotalValuePendingReturns, getAccountTickets, createTicket, getAccountBalance, placeTicketForSale, revokeTicketForSale, buyTicket, renderAuctions, startAuction } from './MyWeb3';
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
  const [auctions, setAuctions] = useState(null);
  const [totalMoney, setTotalMoney] = useState(null);

  const initializeContracts = async () => {
    console.log("Initializing contracts");
    await loadContract();
    setArrayTickets(await renderTickets());
    setAuctions(await renderAuctions());
  }

  const getAccountBalanceAfter = async () => {
    await getAccountBalance(dispatch, setBalance);
  }
  
  const handleTotalValue = async () => {
    setTotalMoney(await getTotalValuePendingReturns(account));
  }

  useEffect(() => {
    initializeContracts().then((response) => {
      if (account) {
        handleGetAccountTickets();
        getAccountBalanceAfter();
        handleTotalValue();
      }
    });

  }, [account, changes]);

  const handleGetAccountTickets = async () => {
    setAccountArrayTickets(await getAccountTickets(account));
  }

  return (
    <div className=" background relative w-screen h-screen overflow-x-hidden">
      <Router>
        <Sidebar balance={balance} account={account} totalMoney={totalMoney} />
        <Routes>
          <Route path="/" element={<Home account={account} onPressConnect={() => getAccount(dispatch, login, setBalance)} onPressDisconnect={() => deleteAccount(dispatch, logout, setBalance)} />} />
          <Route path="/marketplace" element={<Marketplace arrayTickets={arrayTickets} buyTicket={buyTicket} />} />
          <Route path="/my-tickets" element={<MyTickets accountArrayTickets={accountArrayTickets} createTicket={createTicket} placeTicketForSale={placeTicketForSale} revokeTicketForSale={revokeTicketForSale} startAuction={startAuction} />} />
          <Route path="/auctions" element={<Auctions auctions={auctions} />} />
          <Route path="/my-incomes" element={<MyIncomes totalMoney={totalMoney}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;