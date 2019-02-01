import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import { SearchInput } from './search-input.component'
import SearchResults from './hn-search-results.component'




export default class SearchContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      query: null,
      value: null,
    }
  }

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