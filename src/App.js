import './App.css';
import { Routes, Route, BrowserRouter as Router,  } from 'react-router-dom';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import SendTokens from './components/SendToken';
import Transactions from './components/Transactions';
// import WalletView from './components/WalletView';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path='/send-token' element={<SendTokens />} />
        {/* <Route path='/send_token' element={<WalletView />} /> */}
        <Route path='/transactions' element={<Transactions />}/>
      </Routes>
    </div>
  );
}

export default App;
