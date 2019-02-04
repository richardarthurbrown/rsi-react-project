import React from 'react'
import { ListGroup, ListGroupItem, } from 'reactstrap'
import ModalResult from '../modal/modal.component'

const URL = 'http://hn.algolia.com/api/v1/search?query=learn%20'
const dateURL = 'https://hn.algolia.com/api/v1/search_by_date?query=learn%20'
const tag = '&tags=(ask_hn)'

export default class SearchResults extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      results: [],
      urls: [],
    }
  }

  fetcher = (url, query, params) => {
    fetch(url + query + params)
          .then(response => response.json())
          .then(json => this.setState({results: json.hits}))
  }

  // This function does two things - first it makes sure that the current query and value aren't equal to the previous props to prevent
  // infinitely calling the API. Then it passes the query to fetch along with the correct URL based on the selection from the input field.

  componentDidUpdate(prevProps){
    const query = this.props.query
    const value = this.props.value
      if (query !== prevProps.query || value !== prevProps.value){
        if (value === "1"){
          this.fetcher(dateURL, query, tag)
        } else {
        this.fetcher(URL, query, tag)
      }
    }
  }
  
  // This is a callback function that handles the displayed results as rendered in the .map function used below.
  renderSearchResults = (result) => {
    return(
        <ListGroupItem key={result.objectID} className="d-flex justify-content-between">
            <div><strong>
              {result.title} </strong> 
              {result.created_at.split('T')[0]} {/*This exists because the JSON object includes a full timestamp, so this function splits the
              date off the timestamp and only displays the year, month and day. */}
            </div>
            <ModalResult object={result} handleSave={this.props.handleSave}/>
        </ListGroupItem>
    )
  }

  render(){
    return(
      <div>
        <ListGroup>
          {this.state.results.map(this.renderSearchResults)}
        </ListGroup>
      </div>
    )
  }
}

