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
  CarouselCaption
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
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    /* this.state = {
      childComponent: (
        <Route
          {...rest}
          render={props =>
            fire.isLoggedIn() ? (
              <Redirect
                to={{
                  pathname: '/dashboard',
                  state: { from: props.location }
                }}
              />
            ) : (
              <div>This is the landing page</div>
            )
          }
        />
      )
    }; */
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
    //return this.state.childComponent;
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

    return (
      <div id="landingPage">
        <center>
          <h1 id="header">SIGN UP</h1>
        </center>
        <div id="signUp">
          <center>
            <form>
              <div id="signForm">
                <input
                  type="text"
                  ref="firstName"
                  placeholder="First Name"
                  id="input1"
                />
                <input
                  type="text"
                  ref="lastName"
                  placeholder="Last Name"
                  id="input2"
                />
                <br />
                <input
                  type="text"
                  ref="email"
                  placeholder="Email"
                  id="input3"
                />
                <br />
                <input
                  type="text"
                  ref="username"
                  placeholder="Username"
                  id="input3"
                />
                <br />
                <input
                  type="password"
                  ref="password"
                  placeholder="Password"
                  id="input1"
                />
                <br />
                <input
                  type="password"
                  ref="passwordValidate"
                  placeholder="Validate Password"
                  id="input2"
                />
                <br />
                <input
                  type="text"
                  ref="affiliations"
                  placeholder="Enter Affiliations"
                  id="input3"
                />
                <br />
                <input type="submit" value="SquadUp" id="button" />
              </div>
            </form>
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

export default LandingPage;
