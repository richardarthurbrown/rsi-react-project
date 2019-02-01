import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap'
import { withRouter } from 'react-router-dom'


class SearchInputComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      query: this.parseQueryString(),
      searchType: "0",
    }
  }
  parseQueryString() {
    const splits = this.props.location.search.split('=')
    return splits[1] ? splits[1] : ''
  }

  changeHandler = (event) =>{
    this.setState({query: event.target.value})
  }

  selectHandler = () => {
    let sel = document.getElementById('selector')
    this.setState({searchType: sel.options[sel.selectedIndex].value})
  }

  onSubmitHandler = (event) => {
    this.props.getQuery(this.state.query)
    this.props.getValue(this.state.searchType)
    this.props.history.push(`/?query=${this.state.query}`)
    event.preventDefault();
  }

  componentDidMount(){
    if (this.state.query){
      this.props.getQuery(this.state.query)
    }
  }

  render(){
    return(
      <Form onSubmit={this.onSubmitHandler} > 
        <FormGroup className="d-flex justify-content-between">
          <Input type="text" placeholder="I Want To Learn..." onChange={this.changeHandler} value={this.state.query}></Input>
          <Input type="select" id="selector" onChange={this.selectHandler}>
            <option value="0">Search By Relevance</option>
            <option value="1">Search By Date</option>
          </Input>
          <div>
            <Button type="submit">Search</Button>
          </div>
        </FormGroup>
      </Form>
    )
  }
}

export const SearchInput = withRouter(SearchInputComponent)