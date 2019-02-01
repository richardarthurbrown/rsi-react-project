import React, { Component } from 'react';
import './App.css'
import Navigation from './navigation.component'
import SearchContainer from './search/search-container.component'
import Saved from './saves/saved-page.component'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      urls: [],
      lastquery: null,
    }
  }

  handleState = (state) => {
    this.setState({lastquery: state.query})
  }


  handleSave = (event) => {
    const target = event.currentTarget.parentElement.firstChild.textContent
    
    if (this.state.urls.includes(target)){
      alert("You already saved this!")
      return
      }
    let joined = this.state.urls.concat(target)
    this.setState({urls: joined})
  }

  handleDelete = (index) => {
    let urlArr = this.state.urls
    urlArr.splice(index, 1)
    this.setState({urls: urlArr})
  }



  render() {
    return (
      <BrowserRouter> 
        <div>
          <Navigation />
          <Route exact path ="/" render={() => (
            <SearchContainer
              handleSave={this.handleSave} 
              handleState={this.handleState} 
              lastquery={this.state.lastquery}
            />
          )}/>
          <Route path ="/saved" render={() => (<Saved urls={this.state.urls} handleDelete={this.handleDelete}/>)}/>
          <footer className="footer">
            <p className="text-muted" style={{textAlign: "right", paddingRight: '20px'}}>Powered By React & Coffee</p>
          </footer> 
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
