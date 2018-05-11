import React, { Component } from 'react';
import { auth, storageKey, isAuthenticated } from './../fire';
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
      uid: null
    }; // <- set up react state
    auth.onAuthStateChanged(
      function(user) {
        if (user) {
          window.localStorage.setItem(storageKey, user.uid);
          this.setState({ uid: user.uid });
        } else {
          window.localStorage.removeItem(storageKey);
          this.setState({ uid: null });
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
  logout(e) {
    e.preventDefault();
    auth.signOut().then(
      function() {
        console.log('signed out');
      },
      function(error) {
        console.log('error on sign out:');
        console.log(error);
      }
    );
  }

  render() {
    console.log('Is logged in: ' + isAuthenticated());
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
                <NavItem hidden={!isAuthenticated()}>
                  <NavLink href="/my-calendar">My Calendar</NavLink>
                </NavItem>
                <NavItem hidden={!isAuthenticated()}>
                  <NavLink href="/all-calendar">All Calendars</NavLink>
                </NavItem>
                <NavItem hidden={!isAuthenticated()}>
                  <NavLink href="/events">Events</NavLink>
                </NavItem>
                <NavItem hidden={isAuthenticated()}>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem hidden={isAuthenticated()}>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar hidden={!isAuthenticated()}>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/CreateEvent">CreateEvent</DropdownItem>

                    <DropdownItem divider />
                    <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/events" component={Events} />
            <ProtectedRoute path="/CreateEvent" component={CreateEvent} />
            <ProtectedRoute path="/all-calendar" component={Calendar} />
            <ProtectedRoute path="/my-calendar" component={Calendar} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
