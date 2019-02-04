import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import { SearchInput } from './search-input.component'
import SearchResults from './hn-search-results.component'

// The Search Container holds state and passes queries from the input to the results components.
// In future versions it may also provide functionality for switching between search APIs but 
// that isn't built out right now.


export default class SearchContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      query: null,
      value: null,
    }
  }
  // These lifecycle methods check if the user has already searched for a query. If they have it saves the query on unmount and 
  // reloads it when the component is mounted again.
  
  componentDidMount(){
    if (this.props.lastquery){
      this.setState({query: this.props.lastquery})
    }
  }

  componentWillUnmount(){
    let state = this.state
    this.props.handleState(state)
  }


  getQuery = (query) => {
    this.setState({query: query})
  }

  getValue = (value) =>{
    this.setState({value: value})
  }



  render(){
    return(
      <Container style={{padding: "70px 0px 50px"}}>
        <Row>
          <Col xs='2'></Col>
          <Col md='8'><SearchInput getQuery={this.getQuery} getValue={this.getValue}/></Col>
          <Col xs='2'></Col>
        </Row>
        <Row>
          <Col md='1'></Col>
          <Col md='10'><SearchResults query={this.state.query} value={this.state.value} handleSave={this.props.handleSave}/></Col>
          <Col md='1'></Col>
        </Row>
      </Container>
    )
  }
}