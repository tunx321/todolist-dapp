import CardGroup from 'react-bootstrap/esm/CardGroup';
import './App.css';
import NavBar from './NavBar';
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Instagram from "./insta.png"
import Telegram from "./telega.jpg"
import Email from "./email.png"

function Team() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="overlay">
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts}/>
      <div className='form-div'>
            <CardGroup style={{paddingTop: "250px"}}>
            <Card bg="dark" key="dark" text='white' border="danger" style={{ width: '25rem' }}>
        <Card.Header>Almat Tungatov</Card.Header>
        <Card.Body>
          <Card.Title>CS-2111</Card.Title>
          <Card.Text>
            <br></br>
          <Row>
        <Col xs={6} md={4}>
            <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/tungatov13/'>
          <Image style={{width: "42px"}} src={Instagram} rounded /></a>
        </Col>
        <Col xs={6} md={4}>
        <a target="_blank" rel="noopener noreferrer" href="https://t.me/tung1xxx"><Image style={{width: "42px"}} src={Telegram} rounded /></a>
        </Col>
        <Col xs={6} md={4}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.gmail.com"> <Image style={{width: "42px"}} src={Email} rounded /></a>
        </Col>
      </Row>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card bg="dark" key="dark" text='white' border="danger" style={{ width: '25rem' }}>
        <Card.Header>Alizhan Umbetov</Card.Header>
        <Card.Body>
          <Card.Title>CS-2111</Card.Title>
          <Card.Text>
          <br></br>
          <Row>
        <Col xs={6} md={4}>
            <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/tungatov13/'>
          <Image style={{width: "42px"}} src={Instagram} rounded /></a>
        </Col>
        <Col xs={6} md={4}>
        <a target="_blank" rel="noopener noreferrer" href="https://t.me/tung1xxx"><Image style={{width: "42px"}} src={Telegram} rounded /></a>
        </Col>
        <Col xs={6} md={4}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.gmail.com"> <Image style={{width: "42px"}} src={Email} rounded /></a>
        </Col>
      </Row>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card bg="dark" key="dark" text='white' border="danger" style={{ width: '25rem' }}>
        <Card.Header>Amangeldiyeva Aiym</Card.Header>
        <Card.Body>
          <Card.Title>CS-2111</Card.Title>
          <Card.Text>
          <br></br>
          <Row>
        <Col xs={6} md={4}>
            <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/aiymdk/'>
          <Image style={{width: "42px"}} src={Instagram} rounded /></a>
        </Col>
        <Col xs={6} md={4}>
        <a target="_blank" rel="noopener noreferrer" href="https://t.me/aiymdk"><Image style={{width: "42px"}} src={Telegram} rounded /></a>
        </Col>
        <Col xs={6} md={4}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.gmail.com"> <Image style={{width: "42px"}} src={Email} rounded /></a>
        </Col>
      </Row>
          </Card.Text>
        </Card.Body>
      </Card>
            </CardGroup>

      </div>
    </div>
    <div className="moving-background"></div>
    </div>
  );
}

export default Team;