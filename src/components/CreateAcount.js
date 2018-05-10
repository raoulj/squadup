import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Button,
  Card,
  Container
} from 'reactstrap';

import fire from './../fire';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '' };

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
    fire.auth.Auth.signInWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  render() {
    return (
      <div style={{ margin: '10px' }}>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>
                Username:
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Your username"
                  required
                />
              </Label>
              <br />
              {/* TODO: Hide input text */}
              <Label for="password-textinput">
                Password
                <Input
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Your secure password"
                  required
                />
              </Label>
            </FormGroup>
            <Button style={{ marginTop: '20px' }}>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
