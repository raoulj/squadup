import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
// could also import the sass if you have a loader at dayz/dayz.scss
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, 'days')),
          title: 'Some title'
        },
        {
          start: new Date(),
          end: new Date(moment().add(1, 'week')),
          title: "Raoul's Big Break"
        },
        {
          start: new Date(),
          end: new Date(moment().add(1, 'day')),
          title: 'a third event'
        }
      ]
    };
  }

  render() {
    console.log(this.props);
    return (
      <BigCalendar
        defaultDate={new Date()}
        defaultView="month"
        views={['month', 'week', 'day']}
        popup={true}
        events={this.state.events}
        style={{ height: '85vh', marginTop: '10px' }}
      />
    );
  }
}
export default Calendar;
