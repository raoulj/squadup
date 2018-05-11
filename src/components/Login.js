import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Button,
  Card,
  Container,
  Alert,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { Route, Redirect } from 'react-router-dom';

import { auth } from './../fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isLoggedIn: false
    };

    auth.onAuthStateChanged(
      function(user) {
        if (user) {
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ isLoggedIn: false });
        }
      }.bind(this)
    );

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(
        function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            errorMessage = 'Password too weak';
          } else if (errorCode == 'auth/user-not-found') {
            errorMessage = 'Provided email does not correspond to an account.';
          }
          this.setState({ errorMessage: errorMessage });
        }.bind(this)
      )
      .then(
        function(response) {
          this.setState({ errorMessage: '' });
        }.bind(this)
      );
  }

  render() {
    if (this.state.isLoggedIn) {
      // if we just happen upon the login extension instead of being redirected
      if (this.props.location.state) {
        var redirect_location = this.props.location.state.from.pathname;
      } else {
        var redirect_location = 'my-calendar';
      }
      return (
        <Redirect
          to={{
            pathname: redirect_location
          }}
        />
      );
    } else {
      return (
        <div className="row justify-content-center">
          <div className="col-4">
            <br />
            <Alert color="danger" hidden={this.state.errorMessage === ''}>
              {this.state.errorMessage}
            </Alert>
            <Container>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                    <Input
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Your email"
                      required
                    />
                  </InputGroup>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      Password
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="Your secure password"
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <Button style={{ marginTop: '20px' }}>Submit</Button>
              </Form>
            </Container>
          </div>
        </div>
      );
    }
  }
}

export default Login;
