
import contractABI from "./Todo.json"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import { ethers } from 'ethers';

import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import "./Form.css"


const contractAddress = "0x0921030BEa8F8217C72daB4cE9dedE67713005F8"




function HistoryPage({accounts, setAccounts}) {

    const isConnected = Boolean(accounts[0])
    const [tasks, setTasks] = useState([]);


    async function handleGetHistory(){
        if (window.ethereum){
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(
              contractAddress,
              contractABI.abi,
              signer,
          )
  
          try {
            console.log("Call get task")
           
            const tasks = await contract.getMyTasks()
            console.log(...tasks)
            setTasks(tasks);
              
          } catch (error) {
              console.log("erorr: ", error)
          }
      }
      }


  return (
    <div className="form-div" >
       
    {isConnected ? (    
           <><Form style={{width: "720px"}}><Button style={{margin: "200px 0 20px 0 "}} variant="secondary" size="lg" onClick={handleGetHistory}>
                  Refresh
              </Button>
              <Table striped bordered hover>
              <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th>Stage</th>
        </tr>
      </thead>
                      {tasks.map(({ id, body, completed}) => (
                            <><tbody>
                              <tr>
                                  <td>{Number(id)}</td>
                                  <td>{body}</td>
                                  <td>{completed ? (<Badge bg="success">Completed</Badge>) : (<Badge bg="warning">In porccess</Badge>)}</td>
                              </tr>
                          </tbody></>

                      ))}
                      

                  </Table></Form></>
  ) 
  : 
  (<Alert variant="danger"  dismissible>
  <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
  <p>
    You must be connected through your Metamask wallet
  </p>
</Alert>)}
</div>
    
  );
}

export default HistoryPage;