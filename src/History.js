import './App.css';
import HistoryPage from './HistoryPage';
import NavBar from './NavBar';
import { useState } from "react";

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="overlay">
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts}/>
      <HistoryPage accounts={accounts} setAccounts={setAccounts}/>
    </div>
    <div className="moving-background"></div>
    </div>
  );
}

export default App;