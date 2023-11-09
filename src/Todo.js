import ListGroup from 'react-bootstrap/ListGroup';

const Todo = (props) => {
    return (
      <div >
       
        { <h3>{props.id}</h3>}
        
        <ListGroup.Item>{props.body}</ListGroup.Item>
        
      </div>
    );
  };
  
export default Todo;