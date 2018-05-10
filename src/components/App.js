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
import Events from './Events';
import CreateEvent from './CreateEvent';
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
      isloggedIn: false
    }; // <- set up react state
    fire.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.setState({ isloggedIn: true });
        } else {
          this.setState({ isloggedIn: false });
        }
      }.bind(this)
    );
  }
  // componentWillMount() {
  //   /* Create reference to messages in Firebase Database */

  //   let messagesRef = fire
  //     .database()
  //     .ref('messages')
  //     .orderByKey()
  //     .limitToLast(100);
  //   messagesRef.on('child_added', snapshot => {
  //     /* Update React state when message is added at Firebase Database */
  //     let message = { text: snapshot.val(), id: snapshot.key };
  //     this.setState({ messages: [message].concat(this.state.messages) });
  //   });
  // }
  // addMessage(e) {
  //   e.preventDefault(); // <- prevent form submit from reloading the page
  //   /* Send the message to Firebase */
  //   fire
  //     .database()
  //     .ref('messages')
  //     .push(this.inputEl.value);
  //   this.inputEl.value = ''; // <- clear the input
  // }
  render() {
    console.log('Is logged in: ' + this.state.isloggedIn);
    return (
      <Router>
        <div>
          <Navbar
            color="light"
            light
            expand="md"
            style={{ boxShadow: '1px 1px 1px 1px' }}
          >
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
                <NavItem>
                  <NavLink href="/events">Events</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/CreateEvent">CreateEvent</DropdownItem>

                    <DropdownItem divider />
                    <DropdownItem>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              path="/login"
              component={Login}
              isloggedIn={this.state.isloggedIn}
            />
            <Route path="/cal_unprotected" component={Calendar} />
            <Route path="/events" component={Events} />
            <Route path="/CreateEvent" component={CreateEvent} />

            <ProtectedRoute
              path="/dashboard"
              isloggedIn={this.state.isloggedIn}
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
