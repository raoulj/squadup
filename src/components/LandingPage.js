import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../fire';

class LandingPage extends Component {
  constructor({ component: Component, ...rest }) {
    super();
    this.state = {
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
    };
  }
  render() {
    return this.state.childComponent;
  }
}

export default LandingPage;
