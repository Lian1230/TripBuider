import React, { Component } from 'react';
import { SlideDown } from 'react-slidedown'
import Edit from './EditBlock';
import { Content, SearchBox, EditBox, Flight } from './styles';
import { addFlight, getAirports, getFlights, getTrips, deleteFlight } from './request';
import Title from './Title';
import 'react-slidedown/lib/slidedown.css'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      activeTrip: null,
      trips: [],
      flights: [],
      From: '',
      To: '',
    }
    this.refreshFlight = tripId => getFlights(tripId)
      .then(res => this.setState({ flights: res.data }))
  }
  componentDidMount() {
    getAirports().then(({ airports }) => this.setState({ airports }));
    getTrips().then(({ trips }) => this.setState({ trips }));
  }
  render() {
    return (
      <section>
        <Title />
        <div className="box box-shadow">
          {this.state.trips.map(trip =>
            <div key={trip.id} className="ribbon-wrap">
              <div className="ribbon">
                <a
                  href="#"
                  onClick={() => getFlights(trip.id)
                    .then(res => this.setState(state => ({
                      activeTrip: state.activeTrip === trip.id ? null : trip.id,
                      flights: res.data,
                    })))}
                >
                  <pre>Trip#{trip.id}</pre>
                </a>
              </div>
              <SlideDown>
                {this.state.activeTrip === trip.id &&
                  <Content className="box-shadow" >
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
                          <button
                            className="btn btn-primary mb-1"
                            onClick={() => addFlight(trip.id, this.state.From, this.state.To)
                              .then(() => this.refreshFlight(trip.id))}
                          >Save</button>
                        </div>
                      </EditBox>
                      :
                      <button
                        className="btn btn-primary mb-1"
                        onClick={() => this.setState({ isEdit: true })}
                      >Add
                    </button>}
                    {this.state.flights.map((flight, index) => (
                      <Flight key={flight.refId}>
                        <div>
                          <p>Flight#{index + 1}</p>
                          <pre>From: {flight.from}</pre>
                          <pre>To:   {flight.to}</pre>
                        </div>
                        <button
                          className="btn btn-danger mb-1"
                          onClick={() => deleteFlight(trip.id, flight.refId)
                            .then(() => this.refreshFlight(trip.id))
                          }
                        >
                          Delete
                      </button>
                      </Flight>
                    ))}
                  </Content>
                }
              </SlideDown>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Main;
