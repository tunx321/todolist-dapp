import './App.css';
import { TodoForm } from './Form';
import NavBar from './NavBar';
import { useState } from "react";

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts}/>
      <TodoForm accounts={accounts} setAccounts={setAccounts}/>
    </div>
  );
}

export default App;
