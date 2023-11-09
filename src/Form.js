import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add todo
          addTodo(value);
          // clear form after submission
          setValue('');
        }
      };
  return (
    <>
    <br/><br/><Form>
          <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>What's plan for Today?</Form.Label>
              <Form.Control type="email" />
          </Form.Group>
      </Form><ListGroup>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup></>
  )
}