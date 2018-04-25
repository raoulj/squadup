import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../fire';

class ProtectedRoute extends Component {
  constructor({ component: Component, ...rest }) {
    super();
    this.state = {
      childComponent: (
        <Route
          {...rest}
          render={props =>
            fire.isLoggedIn() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
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

export default ProtectedRoute;
