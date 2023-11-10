
import contractABI from "./Todo.json"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import { ethers } from 'ethers';
import Badge from 'react-bootstrap/Badge';
import {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import "./Form.css"

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"



function HistoryPage({accounts, setAccounts}) {

    const isConnected = Boolean(accounts[0])
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);


    const getCount = async () => {
        if (window.ethereum){
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(
              contractAddress,
              contractABI.abi,
              signer,
          )
          try {
        const count = await contract.getTaskCount();
        
        setTotalTasks(parseInt(count));}
        catch (error){
          console.log(error)
        }
      }};

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
            let tasks = []
            for (let index = 0; index < totalTasks; index++) {
              const task = await contract.getMyTasks(index)
              console.log(task[0], task[1], task[2])
              let obj = {
                id: Number(task[0]),
                body: task[1],
                isCompleted: Boolean(task[2]),
              }
              tasks.push(obj)
            }
            console.log(tasks)
            setTasks(tasks);
              
          } catch (error) {
              console.log("erorr: ", error)
          }
      }
      }
      useEffect(() =>{
        getCount()
        console.log("Total Tasks", totalTasks)
      })

  return (
    <div className="form-div" >
       
    {isConnected ? (    
           <><Form style={{width: "720px"}}><Button style={{margin: "200px 0 20px 0 "}} variant="secondary" size="lg" onClick={handleGetHistory}>
                  Refresh
              </Button><ListGroup as="ol" numbered>
                      {tasks.map(({ id, body, isCompleted }) => (

                          <ListGroup.Item as="li">{body} {isCompleted ? (<Badge bg="success">Completed</Badge>) : (<Badge bg="warning">In porccess</Badge>)}</ListGroup.Item>

                      ))}
                      

                  </ListGroup></Form></>
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