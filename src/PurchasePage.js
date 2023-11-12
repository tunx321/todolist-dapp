
import contractABI from "./Todo.json"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { ethers } from 'ethers';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert'
import "./Form.css"



const contractAddress = "0x0921030BEa8F8217C72daB4cE9dedE67713005F8"



function PurchasePage({accounts, setAccounts}) {

    const isConnected = Boolean(accounts[0])



    const handlePurchase = async (status) => {
        if (window.ethereum){
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(
              contractAddress,
              contractABI.abi,
              signer,
          )
  
          try {
                let value = ""
                if (status === 1) {
                    value = "100000000000000000"
                }else{
                    value = "300000000000000000"
                }
              const response = await contract.purchaseStatus(status,{value: value})
              console.log("response: ", response)
              
          } catch (error) {
              console.log("erorr: ", error)
          }
      }
      }

  return (
    <div className="form-div" >
       
    {isConnected ? (    
        <><CardGroup style={{margin: "10%"}}>
        <Card
        bg="secondary"
        key="secondary"
        text='white'
        style={{ width: '20rem', margin: "50px" }}
        className="mb-2"
      >
        <Card.Header>Free user</Card.Header>
        <Card.Body>
          <Card.Title> Free </Card.Title>
          <Card.Text>
            As a free user you can create only 3 tasks, try to buy vip or premium to get more advantages
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
    
            <ListGroup.Item variant="dark">3 tasks per todo</ListGroup.Item>
          </ListGroup>
      </Card>
      <Card
        bg="info"
        key="info"
        text='white'
        style={{ width: '20rem', margin: "50px" }}
        className="mb-2"
      >
        <Card.Header>Vip user</Card.Header>
        <Card.Body>
          <Card.Title> VIP </Card.Title>
          <Card.Text>
            As a VIP user you are able to create up to 5 tasks, you can buy premuim and create 5 task per todo
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item variant="dark">5 tasks per todo</ListGroup.Item>
            <ListGroup.Item variant="dark"><Button style={{backgroundColor:"#ca3260"}} variant='danger' onClick={() => handlePurchase(1)}>Buy for 0.1 ETH</Button></ListGroup.Item>
          </ListGroup>
          
      </Card>
      <Card
        bg="warning"
        key="warning"
        text='white'
        style={{ width: '20rem', margin: "50px" }}
        className="mb-2"
      >
        <Card.Header>Premium user</Card.Header>
        <Card.Body>
          <Card.Title> Premium </Card.Title>
          <Card.Text>
            You have a maximum advatages for this to do dApp. So you are cool
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item variant="dark">7 tasks per todo</ListGroup.Item>
            <ListGroup.Item variant="dark"><Button style={{backgroundColor:"#ca3260"}} variant='danger' onClick={() => handlePurchase(2)}>Buy for 0.3 ETH</Button></ListGroup.Item>
          </ListGroup>
      </Card></CardGroup></>
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

export default PurchasePage;