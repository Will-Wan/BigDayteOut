import './App.css';
import './map.css'
import GoogleMapReact from 'google-map-react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';

import { WeatherPage } from './Weather';
import { TransportPage } from './Transport';
import { EventsPage } from './Events';
import { SettingsPage } from './Settings';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const defaultMapProps = { 
      center: {   //centennial park
        lat: -33.8943,
        lng: 151.2330
      },
      zoom: 13.5,
      zoomControl: false
  };

const unselectedColour = {};
const selectedColour = {background: "white"};

function GetStyleForID(id, gid) {
  if (id == gid) {
    return selectedColour;
  }

  return unselectedColour;
}

export function Map() {
  const location = useLocation(); 

  const [pageID, setPageID] = useState(
    0 // Default, weather
    + (location.pathname == "/map/transport") * 1
    + (location.pathname == "/map/events") * 2
    + (location.pathname == "/map/filter") * 3
  );



  const unselectedColour = {};
  const selectedColour = {background: "white"};

  const weatherColour = pageID == 0 ? selectedColour : unselectedColour;
  const transportColour = pageID == 1 ? selectedColour : unselectedColour;
  const eventsColour = pageID == 2 ? selectedColour : unselectedColour;
  const settingsColour = pageID == 3 ? selectedColour : unselectedColour;

//location pin
  const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <div className="pin-text">{text}</div>
    </div>
  )


  /*var weatherColour = GetStyleForID(0, pageID);
  var transportColour = GetStyleForID(1, pageID);
  var eventsColour = GetStyleForID(2, pageID);
  var settingsColour = GetStyleForID(3, pageID);*/

  return (
    <Router>
      <div className="mapContainer" >
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAKAb78UDIOoadxVvXW9oE7RNNAnJS8Du4" }}
            defaultCenter={defaultMapProps.center}
            defaultZoom={defaultMapProps.zoom}
            zoomControl={defaultMapProps.zoomControl}
           >
        
        <LocationPin
          lat={-33.9173}
          lng={151.2313}
          text={"UNSW"}
        />


        <LocationPin
          lat={-33.870453}
          lng={151.208755}
          text={"Sydney Tower Eye"}
        />

        <LocationPin
          lat={-33.856159}
          lng={151.215256}
          text={"Sydney Opera House"}
        />

        <LocationPin
          lat={-33.8800}
          lng={151.2036}
          text={"Paddy's Market"}
        />

        <LocationPin
          lat={-33.8642}
          lng={151.2166}
          text={"Royal Botanic Garden"}
        />

        <LocationPin
          lat={-33.8915}
          lng={151.2767}
          text={"Bondi Beach"}
        />


      </GoogleMapReact>

      </div>
      <div className="belowMap">
        <Link to="/map/weather" onClick={() => {setPageID(0)}}>
          <div className="tabLeft" style={weatherColour}>
            <div className="tabButton" style={{background: "rgb(241, 141, 0)"}}>
            Weather
            </div>
          </div>
        </Link>
        <Link to="/map/transport" onClick={() => {setPageID(1)}}>
          <div className="tabCentre" style={transportColour}>
            <div className="tabButton" style={{background: "rgb(234, 67, 53)"}}>
            Transport
            </div>
          </div>
        </Link>
        <Link to="/map/events" onClick={() => {setPageID(2)}}>
          <div className="tabCentre" style={eventsColour}>
            <div className="tabButton" style={{background: "rgb(52, 168, 83)"}}>
            Attractions
            </div>
          </div>
        </Link>
        <Link to="/map/filter" onClick={() => {setPageID(3)}}>
          <div className="tabRight" style={settingsColour}>
            <div className="tabButton" style={{background: "rgb(26, 115, 232)"}}>
            Filter
            </div>
          </div>
        </Link>
        <div className="mainMapPage">
          <Switch>
            <Route path="/map/weather">
              <WeatherPage />
            </Route> 
            <Route path="/map/events">
              <EventsPage />
            </Route> 
            <Route path="/map/filter">
              <SettingsPage />
            </Route> 
            <Route path="/map/transport">
              <TransportPage />
            </Route> 
          </Switch>
        </div>  
      </div>
    </Router>
  );
}