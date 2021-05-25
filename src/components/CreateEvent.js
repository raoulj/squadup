import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from 'reactstrap';
import '../index.css';

import { db, storageKey } from '../fire.js';

class CreateEvent extends React.Component {
  constructor({ component: Component, ...rest }) {
    super();
    this.state = {
      title: '',
      date: '',
      location: '',
      eventDescription: '',
      successMessage: ''
    };

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
    console.log('here');
    const uid = window.localStorage.getItem(storageKey);
    db.ref('user-events/' + uid).push({
      title: this.state.title,
      date: this.state.date,
      location: this.state.location,
      eventDescription: this.state.eventDescription
    });

    db
      .ref('all-events')
      .push({
        creator: uid,
        title: this.state.title,
        date: this.state.date,
        location: this.state.location,
        eventDescription: this.state.eventDescription
      })
      .then(
        function(response) {
          this.setState({ successMessage: 'Event successfully created.' });
        }.bind(this)
      );
  }

  render() {
    return (
      <div id="landingPage">
        <Alert color="success" hidden={this.state.successMessage === ''}>
          {this.state.successMessage}
        </Alert>
        <div style={{ margin: '10px' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label id="header">Title</Label>
              <Input
                onChange={this.handleChange}
                type="text"
                name="title"
                id="Date"
                placeholder="The best event ever!"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label id="header">Date</Label>
              <Input
                onChange={this.handleChange}
                type="date"
                name="date"
                id="Date"
                placeholder="date placeholder"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label id="header">Select Venue</Label>
              <Input
                type="select"
                name="location"
                id="venue"
                onChange={this.handleChange}
                required
              >
                <option />
                <option>Denunzio Pool</option>
                <option>Poe Field</option>
                <option>Frist Campus Center</option>
                <option>Friend Center</option>
                <option>Cloister Inn</option>
                <option>Tiger Inn</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label id="header">Event Description</Label>
              <Input
                onChange={this.handleChange}
                type="textarea"
                name="eventDescription"
                id="description"
                placeholder="Why should people come to your event?"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label id="header">Import Photo</Label>
              <Input type="file" name="eventPicture" id="photo" />
              <FormText
                color="muted"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                Group's default picture will be used if none uploaded.
              </FormText>
            </FormGroup>
            <FormGroup id="opponent" style={{ display: 'none' }}>
              <Label for="opponent">Oppenent</Label>
              <Input type="textarea" name="text" placeholder="Enter Opponent" />
            </FormGroup>
            <Button id="button">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }

  addOpponent() {
    var check = document.getElementById('sportingEvent');
    var formGroup = document.getElementById('opponent');
    if (check.checked === true) {
      formGroup.style.display = 'inline';
    } else {
      formGroup.style.display = 'none';
    }
  }
}

export default CreateEvent;
