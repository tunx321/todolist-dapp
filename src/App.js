import './App.css';
import { TodoForm } from './Form';
import NavBar from './NavBar';
import { useState } from "react";

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className='overlay'>
    <div className="App">

      <NavBar accounts={accounts} setAccounts={setAccounts}/>
      <TodoForm accounts={accounts} setAccounts={setAccounts}/>
    </div>
    <div className="moving-background"></div>
    </div>
  );
}

export default App;
