import React from 'react'
import { ListGroupItem, Button } from 'reactstrap'

export default class ModalListItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      saved: false
    }
  }

  handleClick = (event) => {
    this.props.handleSave(event)
    this.setState({saved: true})
  }
  // 

  

  render(){
    return(
      <>
      <ListGroupItem key={this.props.index}>
        <span className="d-flex justify-content-between">
          <a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.url}</a>
            {this.state.saved ? 
              <Button size="sm" color="success" disabled>Saved!</Button> :
              <Button size="sm" onClick={this.handleClick}>Save Link</Button>
            }
        </span>
      </ListGroupItem></>
    )
  }
  
}