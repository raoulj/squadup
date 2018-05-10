import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../fire';
import page1 from './../assets/landingImage1.png';
import page2 from './../assets/landingImage2.png';
import raoul from './../assets/raoul.jpg';
import '../index.css';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Alert,
  Input,
  Form
} from 'reactstrap';

const items = [
  {
    src: page1
  },
  {
    src: page2
  },
  {
    src: raoul
  }
];

class LandingPage extends Component {
  constructor({ component: Component, ...rest }) {
    super();
    this.state = {
      activeIndex: 0,
      errorMessage: '',
      fname: '',
      lname: '',
      password1: '',
      password2: '',
      affiliations: '',
      isLoggedIn: fire.auth().currentUser !== null
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

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

    var password = '';
    if (this.state.password1 === this.state.password2) {
      password = this.state.password1;
    } else {
      this.setState({ errorMessage: 'Passwords do not match' });
      return;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, password)
      .then(
        function(response) {
          this.setState({ errorMessage: '' });
          this.setState({ isLoggedIn: fire.auth().currentUser !== null });
          console.log('account created');
          console.log(response);
        }.bind(this)
      )
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
      );
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <center>
            <img src={item.src} />
          </center>
        </CarouselItem>
      );
    });
    if (this.state.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard'
          }}
        />
      );
    } else {
      return (
        <div id="landingPage">
          <Alert color="danger" hidden={this.state.errorMessage === ''}>
            {this.state.errorMessage}
          </Alert>
          <center>
            <h1 id="header">SIGN UP to SQUAD UP</h1>
          </center>
          <div id="signUp">
            <center>
              <Form onSubmit={this.handleSubmit}>
                <div id="signForm">
                  <Input
                    id="input1"
                    type="text"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.handleChange}
                    placeholder="First Name"
                    required
                  />
                  <Input
                    id="input2"
                    type="text"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.handleChange}
                    placeholder="Last Name"
                    required
                  />
                  <br />
                  <Input
                    id="input3"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email"
                    required
                  />
                  <br />
                  <Input
                    id="input1"
                    type="password"
                    name="password1"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    required
                  />
                  <br />
                  <Input
                    id="input2"
                    type="password"
                    name="password2"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Validate Password"
                    required
                  />
                  <br />
                  <Input
                    id="input3"
                    type="text"
                    name="affiliations"
                    value={this.state.affiliations}
                    onChange={this.handleChange}
                    placeholder="Affiliations"
                    required
                  />
                  <br />
                  <input type="submit" value="SquadUp" id="button" />
                </div>
              </Form>
            </center>
          </div>
          <hr id="midLine" />
          <center>
            <h1 id="header"> ABOUT US </h1>
          </center>
          <div id="slides" style={{}}>
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
          </div>
        </div>
      );
    }
  }
}

export default LandingPage;
