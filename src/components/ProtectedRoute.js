import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../fire';

class ProtectedRoute extends Component {
  constructor({ component: Component, ...rest }) {
    super();
    this.state = {
      component: Component,
      props: { ...rest }
    };
  }
  render() {
    return (
      <Route
        {...this.state.props}
        render={props =>
          this.props.isLoggedIn ? (
            <this.state.component {...this.state.props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: this.state.props.location }
              }}
            />
          )
        }
      />
    );
  }
}

export default ProtectedRoute;
