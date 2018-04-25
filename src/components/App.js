import React, { Component } from 'react';
import fire from './../fire';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  NavItem,
  Collapse,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Calendar from './Calendar';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import NoMatch from './NoMatch';
import LandingPage from './LandingPage';
import logo from './../assets/logo.png';

import 'bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */

    let messagesRef = fire
      .database()
      .ref('messages')
      .orderByKey()
      .limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire
      .database()
      .ref('messages')
      .push(this.inputEl.value);
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
              <img src={logo} height="50vh" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/dashboard">My Calendar</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/cal_unprotected">All Calendars</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/cal_unprotected" component={Calendar} />
            <ProtectedRoute
              path="/dashboard"
              component={Calendar}
              redirectPath="/"
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
