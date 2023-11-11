import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import contractABI from "./Todo.json"
import Badge from 'react-bootstrap/Badge';


const contractAddress = "0x0921030BEa8F8217C72daB4cE9dedE67713005F8"


function NavBar({accounts, setAccounts}) {

    const isConnected = Boolean(accounts[0])
    const [userStatus, setUserStatus] = useState(0)
    async function connectAccount(){
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(accounts)
        }
    }

    const handleStatus = async () => {
        if (window.ethereum){
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(
              contractAddress,
              contractABI.abi,
              signer,
          )
  
          try {
              const status = Number(await contract.getStatus())
              console.log(Number(status))
              setUserStatus(Number(status))
              
          } catch (error) {
              console.log("erorr: ", error)
          }
      }
      }

      useEffect(() =>{
        handleStatus()
      })
  return (
<Navbar  data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">ToDoList </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/history">History</Nav.Link>
        <Nav.Link href="/purchase">Purchase</Nav.Link>
        <Nav.Link href="/team">Team</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button style={{textDecoration: "none"}} variant="link" onClick={handleStatus}>Status:</Button> 
        
              {userStatus === Number(1) ? 
                (<Badge  bg="info" text="dark">VIP</Badge>)
                :(Number(userStatus) === Number(2)) ? 
                (<Badge  bg="warning" text="dark">Premium</Badge>)
                :(<Badge  bg="secondary" text="dark">Free</Badge>)}


<div style={{  borderLeft: "6px solid white",
  height: "35px", margin:"5px"}}></div> 
                
        {isConnected ? (<Nav.Link style={{color:"white"}} href="#" disabled>Connected</Nav.Link>) : (<Button variant="outline-success" onClick={connectAccount}>Connect</Button>)}
      </Container>
    </Navbar>

    
  );
}

export default NavBar;