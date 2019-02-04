import React from 'react'
import ModalListItem from './modal-list.component'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap'

const regrep = /(&#x2F;)/g
const urlreg = /href="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)"/g
const hrefreg = /(href=")|"$/g
const URL = "https://hacker-news.firebaseio.com/v0/item/"
const storyURL = "https://news.ycombinator.com/item?id="

export default class ModalResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      storytext: '',
      urls: [],
      
    };
  }
  // This toggles whether the modal is open or closed.
  toggle = (event) => {
    this.setState({
      modal: !this.state.modal
    });
  }

  fetcher = (ID)=> {
    fetch(URL + ID + ".json")
      .then(response => response.json())
      .then(myJson => this.responseParser(myJson))
  }

  // This is the core bit of logic for scraping the comments in the returned HackerNews threads and pulling out URLs. It processes
  // the entire text of every comment looking for regex matches and pushes them to an array. Then, if the comment has child comments
  // it recursively fetches the children and performs the scraping operation again.
  responseParser = (json) => {
    let urlarr = []
    if(json.text){
      let cleanstr = json.text.replace(regrep, "/")
      if (cleanstr) {
        let matched = cleanstr.match(urlreg)
        if (matched){
          for (let item of matched){
            item = item.replace(hrefreg, "")
            urlarr.push(item)
          }
        }
      }
    } 
    let joined = this.state.urls.concat(urlarr)
    this.setState({urls: joined})

    if (json.kids){
      for (let id of json.kids){
        this.fetcher(id)
      }
    }
  }

  renderUrls = (url, index) => {
    return(
      <ModalListItem handleSave={this.props.handleSave} url={url} key={index}/>
    )
  }

  // This searches for unescaped hex characters and HTML tags in the "story" text and replaces them with 
  // the correct values. If there's a cleaner function or library for doing this I'd love to know.
  storyParser = (story) =>{
    if (story){
    let cleanStory = story.replace(/(&#x2F;)/g, '/')
                      .replace(/(&#x27;)/g, `'`)
                      .replace(/(<p>)/g, '\n')
                      .replace(/(&gt;)/g, '>')
                      .replace(/(&lt;)/g, '<')
    return (cleanStory)
    }
  }
  // This lifecycle method performs the initial fetch based on the objectID passed in from props. Subsequent fetches are 
  // part of the recursive action of the responseParser function. This also passes the uncleaned story text to the parser 
  // function from props.
  componentDidMount(){
    this.fetcher(this.props.object.objectID)
    this.setState({storytext: this.storyParser(this.props.object.story_text)})
  }

  render() {
    return (
      <div style={{paddingLeft: "50px"}}>
        <Button style={{maxHeight: "30px", minWidth: "85px", whiteSpace: "nowrap"}} color="primary" size="sm" onClick={this.toggle}>Read More</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size='lg'>
          <ModalHeader toggle={this.toggle}>{this.props.object.title}</ModalHeader>
          <ModalBody>
            <p>{this.state.storytext}</p>
            <p><a href={storyURL + this.props.object.objectID} target="_blank" rel="noopener noreferrer">Read on HN</a></p>
            <ListGroup >
              {this.state.urls.map(this.renderUrls)}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}