import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CreateEvent extends React.Component {
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <Form>
          <FormGroup>
            <Label for="Date">Date</Label>
            <Input
              type="date"
              name="date"
              id="Date"
              placeholder="date placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Label for="venue">Select Venue</Label>
            <Input type="select" name="select" id="venue">
              <option />
              <option>Denunzio Pool</option>
              <option>Poe Field</option>
              <option>Frist Campus Center</option>
              <option>Friend Center</option>
              <option>Cloister Inn</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="description">Event Description</Label>
            <Input
              type="textarea"
              name="text"
              id="description"
              placeholder="Why should people come to your event?"
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Import Photo</Label>
            <Input type="file" name="file" id="photo" />
            <FormText color="muted">
              Group's default picture will be used if none uploaded.
            </FormText>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="sportingEvent" onlick="addOpponent" />{' '}
              Sporting Event?
            </Label>
          </FormGroup>
          <FormGroup id="opponent" style={{ display: 'none' }}>
            <Label for="opponent">Oppenent</Label>
            <Input type="textarea" name="text" placeholder="Enter Opponent" />
          </FormGroup>
          <Button style={{ marginTop: '20px' }}>Submit</Button>
        </Form>
      </div>
    );
  }

  addOpponent() {
    var check = document.getElementById('sportingEvent');
    var formGroup = document.getElementById('opponent');
    if (check.checked == true) {
      formGroup.style.display = 'inline';
    } else {
      formGroup.style.display = 'none';
    }
  }
}

export default CreateEvent;
