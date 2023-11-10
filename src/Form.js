import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import "./Form.css"
import Button from 'react-bootstrap/esm/Button';
import contractABI from "./Todo.json"
import { ethers } from 'ethers';
import Table from 'react-bootstrap/Table';




const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const TodoForm = ({accounts, setAccounts}) => {
  const isConnected = Boolean(accounts[0])
  const [tasks, setTasks] = useState([]);
    const [value, setValue] = useState('');
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

    const handleCompleteTask = async (taskID) => {
      if (window.ethereum){
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
            signer,
        )
        try {
          const response = await contract.completeTask(taskID);
          console.log("Completed task response handler",response)
        }
          catch (error){
            console.log(error)
      }
    }};

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
            const response = await contract.addTask(valueStr.value)
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
    <div className='form-div'>
      <br /><br />
    {isConnected ? (    
      <><><Form style={{width: "520px", padding: "125px 0 0 0 "}}>
      <Form.Group className="mb-3">
        <Form.Label style={{fontSize:"24px"}}>What's plan for Today?</Form.Label>
        <Form.Control type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleSubmit}>Add task</Button>
      </Form.Group>
    </Form>
    <Button style={{margin:"0px 0px 10px 0px"}} onClick={handleGetTasks}>Refresh</Button>
   
    {/* <ListGroup >
   
       {tasks.map(({id, body, isCompleted}) =>( 
        isCompleted ? null : (
        <ListGroup.Item style={{margin:"7px 0px"}}>{ id }{body}{isCompleted}<Button onClick={() => handleCompleteTask(id)}>Done</Button></ListGroup.Item>)
 ))} 
         
      
  

      </ListGroup> */
      <Table style={{width: "720px", margin: "15px"}} striped bordered hover>
              <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th></th>
        </tr>
      </thead>
                      {tasks.map(({ id, body, isCompleted }) => (
                        isCompleted ? null : (
                            <><tbody>
                              <tr>
                                  <td>{id}</td>
                                  <td>{body}</td>
                                  <td><Button onClick={() => handleCompleteTask(id)}>Done</Button></td>
                              </tr>
                          </tbody></>
                        )
                      ))}
                      

                  </Table>
      }
      
      </></>
      ) : (      <Alert variant="danger"  dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You must be connected through your Metamask wallet
        </p>
      </Alert>)}
      </div>

  )
}