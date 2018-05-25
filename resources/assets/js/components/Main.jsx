import React, { Component } from 'react';
import { Content, SearchBox, EditBox, Flight } from './styles';
import Select from 'react-select';
import Edit from './EditBlock';

const mockTrips = [
  { id: 1, itinerary: 23423423 },
  { id: 2, itinerary: 33423424 },
  { id: 3, itinerary: 43423425 },
]

const mockFlights = [
  { id: 1, from: 'Shanghai Pudong International', to: 'Beijing Capital International' },
  { id: 2, from: 'Toronto', to: 'Shanghai' },
]

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      activeTrip: null,
      From: '',
      To: '',
    }
  }
  componentDidMount() {
    fetch('./api/airports')
      .then(res => !console.log('airports got') && res.json())
      .then(({ airports }) => this.setState({ airports }));
  }
  render() {
    return (
      <div className="box box-shadow">
        {mockTrips.map(trip =>
          <div key={trip.id} className="ribbon-wrap">
            <div className="ribbon">
              <a
                href="#"
                onClick={() => this.setState((state) => ({
                  activeTrip: state.activeTrip === trip.id ? null : trip.id
                }))}
              >
                <pre>Trip#{trip.id}</pre>
              </a>
            </div>
            <Content isActive={this.state.activeTrip === trip.id} className="box-shadow">
              {this.state.isEdit
                ?
                <EditBox>
                  <h4>Add Flight</h4>
                  <Edit scope={this} type="From" />
                  <Edit scope={this} type="To" />
                  <div>
                    <button
                      className="btn btn-warning mb-1"
                      onClick={() => this.setState({ isEdit: false })}
                    >Cancel</button>
                    <button className="btn btn-primary mb-1">Save</button>
                  </div>
                </EditBox>
                :
                <button
                  className="btn btn-primary mb-1"
                  onClick={() => this.setState({ isEdit: true })}
                >Add
                </button>}

              {mockFlights.map((flight, index) => (
                <Flight key={flight.id}>
                  <div>
                    <p>Flight#{index + 1}</p>
                    <pre>From: {flight.from}</pre>
                    <pre>To:   {flight.to}</pre>
                  </div>
                  <button className="btn btn-danger mb-1">Delete</button>
                </Flight>
              ))}
            </Content>
          </div>
        )}
      </div>);
  }
}

export default Main;
