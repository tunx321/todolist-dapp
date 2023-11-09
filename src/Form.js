import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import "./Form.css"
import Button from 'react-bootstrap/esm/Button';
import contractABI from "./Todo.json"
import { ethers } from 'ethers';
import Todo from './Todo';


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const TodoForm = ({accounts, setAccounts}) => {
  const isConnected = Boolean(accounts[0])
  const [tasks, setTasks] = useState([]);
    const [value, setValue] = useState('');

    async function handleSubmit(){
      if (window.ethereum){
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
            signer,
        )

        try {
            const valueStr = { value }
            setValue('')
            const response = await contract.addTask(String(valueStr))
            console.log("response: ", response)
            
        } catch (error) {
            console.log("erorr: ", error)
        }
    }
    }


    async function handleGetTasks(){
      if (window.ethereum){
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
            signer,
        )

        try {
          const data = await contract.getMyTasks()
          console.info('data', ...data)
          setTasks(data);
            
        } catch (error) {
            console.log("erorr: ", error)
        }
    }
    }

    window.onload = handleGetTasks
  return (
    <div className='form-div'>
      <br /><br />
    {isConnected ? (    
      <><><Form style={{width: "520px"}}>
      <Form.Group className="mb-3">
        <Form.Label>What's plan for Today?</Form.Label>
        <Form.Control type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleSubmit}>Add task</Button>
      </Form.Group>
    </Form>
    <ListGroup>
      {tasks.map(([item, index]) =>{
        return (<Todo key={index} id={item[0]} body={item[1]} completed={item[2]} />)
})}
        
      
  

      </ListGroup></></>) : (      <Alert variant="danger"  dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You must be connected through your Metamask wallet
        </p>
      </Alert>)}
      </div>

  )
}