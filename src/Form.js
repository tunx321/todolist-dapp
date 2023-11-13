import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import "./Form.css"
import Button from 'react-bootstrap/esm/Button';
import contractABI from "./Todo.json"
import { ethers } from 'ethers';
import Table from 'react-bootstrap/Table';



const contractAddress = "0x0921030BEa8F8217C72daB4cE9dedE67713005F8"


export const TodoForm = ({accounts, setAccounts}) => {
  const isConnected = Boolean(accounts[0])
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);
  const [customError, setCustomError] = useState('');


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
          console.log("id",taskID)
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
            const decodedError = contract.interface.parseError(error.data)
            setCustomError(decodedError.args[0])
            console.log("custom erorr : ", error)
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
          
          const tasks = await contract.getMyTasks()
          console.log(...tasks)
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
    <Button style={{margin:"0px 0px 10px 0px", backgroundColor:"#ca3260"}} variant='danger' onClick={handleGetTasks}>Refresh</Button>
   
    {
      <Table style={{width: "720px", margin: "15px"}} striped bordered hover>
              <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th></th>
        </tr>
      </thead>
      {tasks.map(({ id, body, completed }) => (
                        completed ? null : (
                            <><tbody>
                              <tr>
                                  <td>{Number(id)}</td>
                                  <td>{body}</td>
                                  <td><Button onClick={() => handleCompleteTask(id)}>Done</Button></td>
                              </tr>
                          </tbody></>
                        )
                      ))}
                      

                  </Table>
      }
      {customError ? (<Alert key="danger" variant="danger">
          {customError}
        </Alert>):null
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