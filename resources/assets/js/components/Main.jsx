import React, { Component } from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';


injectGlobal`
  .box {
    padding: 2em 0;
    position: relative;
  }

  pre {
    margin: 0;
  }

  .ribbon-wrap {
    position: relative;
    width: 70%;
    margin-bottom: 20px;
    margin-left: -15px;
    font-size: 18px;
    line-height: 18px;
    transition: width 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    &:hover {
      a {
        background-color: rgb(3,120,160);
        &:before {
          border-top-color: rgb(3,120,160);
          border-bottom-color: rgb(3,120,160);
        }
      }
    }
    .ribbon {
      position: relative;
      
      &:before {
        content: "";
        height: 0;
        width: 0;
        display: block;
        position: absolute;
        top: 3px;
        right: 0;
      
        border-top: 29px solid rgba(0, 0, 0, .3);
        border-bottom: 29px solid rgba(0, 0, 0, .3);
        border-left: 29px solid rgba(0, 0, 0, .3);
        border-right: 29px solid transparent;
      }
    
      &:after {
        content: "";
        height: 3px;
        background: rgba(0, 0, 0, .3);
        display: block;
        position: absolute;
        bottom: -3px;
        left: 15px;
        right: 58px;
      }
    }

    &:hover,
    &.open {
      width: 90%;
      transition: width 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }

  .ribbon a {
    display: block;
    padding: 20px;
    position: relative; 
    background: rgb(3, 170, 196);
    height: 58px;
    margin-right: 29px;
    text-decoration: none;

    pre {
      color: #fff;
    }
    
    &:after {
      content: "";
      height: 0;
      width: 0;
      display: block;
      position: absolute;
      bottom: -15px;
      left: 0;
      border-top: 15px solid #004a70;
      border-left: 15px solid transparent;
    }
    
    &:before {
      content: "";
      height: 0;
      width: 0;
      display: block;
      position: absolute;
      top: 0;
      right: -29px;
      border-top: 29px solid rgb(3, 170, 196);
      border-bottom: 29px solid rgb(3, 170, 196);
      border-right: 29px solid transparent;
      border-left: 29px solid transparent;
    }
  }

  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .box {
    width: 70%;
    background: #FFF;
    margin: 40px auto;
  }

  .box-shadow {
    position: relative;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    
    &:before,
    &:after {
      content:"";
      position:absolute; 
      z-index:-1;
      box-shadow:0 0 20px rgba(0,0,0,0.8);
      top:0;
      bottom:0;
      left:10px;
      right:10px;
      border-radius:100px / 10px;
    }
    
    &:after {
      right:10px; 
      left:auto; 
      transform:skew(8deg) rotate(3deg);
    }
  }
  .content {
    background-color: #fff;
    margin-top: 3px;
    margin-right: 40px;
    margin-left: 40px;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    border: 1px solid #efefef;
  }
`

const Content = styled.div`
  display: ${props => props.isActive ? 'block' : 'none'};
  height: ${props => props.isActive ? 'auto' : 0};
  background-color: #fff;
  margin-top: 3px;
  margin-right: 40px;
  margin-left: 40px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  border: 1px solid #efefef;
  >div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: solid;
    border-color: grey;
  }
  >div:last-child {
    border: none;
  }
  >button {
    width: 100%;
  }
  button {
    margin: 0 !important;
  }
`;

const mockTrips = [
  { id: 1, itinerary: 23423423 },
  { id: 2, itinerary: 33423424 },
  { id: 3, itinerary: 43423425 },
]

const mockFlights = [
  { id: 1, from: 'Montreal', to: 'Beijing' },
  { id: 2, from: 'Toronto', to: 'Shanghai' },
]

export const DeleteButton = styled.span`
  >a {
    color: #6CC5D4;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
  }
  span {
    margin-left: 6px;
    color: #fb7b74;
  }
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTrip: null,
    }
  }
  render() {
    return (
      <div className="box box-shadow">
        {mockTrips.map(trip =>
          <div key={trip.id} className="ribbon-wrap">
            <div className="ribbon">
              <a
                href="#"
                onClick={() => this.setState((state) => ({ activeTrip: state.activeTrip === trip.id ? null : trip.id }))}
              >
                <pre>Trip#{trip.id}   Itinerary#:{trip.itinerary}</pre>
              </a>
            </div>
            <Content isActive={this.state.activeTrip === trip.id} className="box-shadow">
              <button className="btn btn-success mb-1">Add</button>
              {mockFlights.map((flight, index) => (
                <div key={flight.id}>
                  <pre>Flight#{index + 1}  From: {flight.from}  To: {flight.to}</pre>
                  <button className="btn btn-danger mb-1">Delete</button>
                </div>
              ))}
            </Content>
          </div>
        )}
      </div>);
  }
}

export default Main;
