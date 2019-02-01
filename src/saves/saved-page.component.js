import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap'

export default class Saved extends React.Component {

  handleX = (event) => {
    const key = event.target.parentElement.getAttribute('datakey')
    this.props.handleDelete(key)
  }

  render () {
    return (
       <Container style={{padding: "70px 0px 50px"}}>
        <Row>
          <Col sm="1"></Col>
          <Col sm="10">
            <h1>Saved Items</h1>
            <ListGroup>
              {this.props.urls.map((url, index) => (<ListGroupItem key={index}>{url} <Button datakey={index} close onClick={this.handleX} /></ListGroupItem>))}
            </ListGroup>
          </Col>
          <Col sm="1"></Col>
        </Row>
      </Container>
    )
  }
}
