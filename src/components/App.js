import React, { Component } from 'react';
import fire from './../fire';
// import { Router, Route, Switch } from 'react-router'
import Home from './Home'
import Navbar from './Navbar'
import Picker from './Picker/Picker'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar appName="SquadUp"></Navbar>
          <Link to="/testing">Raoul is cool here</Link>
          <Picker/>
        </div>
      </Router>
    );
  }
}

export default App;