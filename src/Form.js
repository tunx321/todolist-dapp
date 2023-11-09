import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import "./Form.css"
import Button from 'react-bootstrap/esm/Button';

export const TodoForm = ({accounts, setAccounts}) => {
  const isConnected = Boolean(accounts[0])
    const [value, setValue] = useState('');

    async function handleSubmit(){
      console.log(value)
      setValue('')
    }
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
    </Form><ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup></></>) : (      <Alert variant="danger"  dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          You must be connected through your Metamask wallet
        </p>
      </Alert>)}
      </div>

  )
}