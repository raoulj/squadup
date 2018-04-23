import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Dayz from 'dayz';
// could also import the sass if you have a loader at dayz/dayz.scss
import moment from 'moment';
import 'dayz/dist/dayz.css';

// would come from a network request in a "real" app
// var a = moment('2018-04-18');
// var b = moment('2018-04-22');
// var c = moment('2018-04-04');

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.date, // <- set up react state

      EVENTS: new Dayz.EventsCollection([
        {
          content: 'A short event',
          range: moment.range(
            this.props.date.clone(),
            this.props.date.clone(1, 'day')
          )
        },
        {
          content: 'Two Hours ~ 8-10',
          range: moment.range(
            this.props.date.clone().hour(8),
            this.props.date.clone().hour(10)
          )
        },
        {
          content: 'A Longer Event',
          range: moment.range(
            this.props.date.clone().subtract(2, 'days'),
            this.props.date.clone().add(8, 'days')
          )
        }
      ])
    };
  }

  render() {
    return (
      <Dayz
        display="month"
        date={this.state.startDate}
        events={this.state.EVENTS}
      />
    );
  }
}
export default Calendar;
