import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function NavBar({accounts, setAccounts}) {

    const isConnected = Boolean(accounts[0])

    async function connectAccount(){
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(accounts)
        }
    }


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
          </Nav>
        </Navbar.Collapse>
        {isConnected ? (<Nav.Link style={{color:"white"}} href="#" disabled>Connected</Nav.Link>) : (<Button variant="outline-success" onClick={connectAccount}>Connect</Button>)}
      </Container>
    </Navbar>

    
  );
}

export default NavBar;