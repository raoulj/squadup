import React, { Component } from 'react';
// could also import the sass if you have a loader at dayz/dayz.scss
import moment from 'moment';
import { Jumbotron, Button, Fade } from 'reactstrap';
import raoul from './../assets/raoul.jpg';
import '../index.css';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { fadeIn: true };
    this.toggle = this.toggle.bind(this);
  }

  render() {
    return (
      <div style={{ height: '100%', margin: '10px 20%' }}>
        <Fade in={this.state.fadeIn}>
          <Jumbotron>
            <center>
              <img src={raoul} height="200px" />

              <p className="team">Men's Swimming and Diving Team</p>
            </center>
            <hr className="my-2" />
            <p className="date"> Tuesday, 05/22/18 </p>
            <p className="venue">Denunzio Pool (vs Columbia)</p>
            <p className="description">
              Come support your tigers as we look to take down our rivals, the
              Columbia Lions. We are undefeated so far this season and hope to
              continue this trend, but we need your support.
            </p>
            <hr className="my-2" />
          </Jumbotron>
        </Fade>

        <center>
          <p className="lead">
            <Button
              color="danger"
              size="lg"
              style={{ marginRight: '20%' }}
              onClick={this.toggle}
            >
              Nah
            </Button>
            <Button outline color="secondary">
              Skip
            </Button>
            <Button
              color="primary"
              size="lg"
              style={{ marginLeft: '20%' }}
              onClick={this.toggle}
            >
              SquadUp
            </Button>
          </p>
        </center>
      </div>
    );
  }

  toggle() {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }
}
export default Events;
