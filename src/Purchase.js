import './App.css';
import NavBar from './NavBar';
import { useState } from "react";
import PurchasePage from './PurchasePage';

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="overlay">
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts}/>
      <PurchasePage accounts={accounts} setAccounts={setAccounts}/>
    </div>
    <div className="moving-background"></div>
    </div>
  );
}

export default App;