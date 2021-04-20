import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker} from 'react-google-maps';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import { compose, withProps,withState, withHandlers, lifecycle } from 'recompose';
import ReactHtmlParser from 'react-html-parser'


const defaultMapProps = { 
      center: {   //centennial park
        lat: -33.8943,
        lng: 151.2330
      },
      zoom: 13.5,
      zoomControl: false,
  };

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={defaultMapProps.zoom}
    defaultCenter={defaultMapProps.center}
    zoomControl={defaultMapProps.zoomControl}
    disableDefaultUI={true}

    defaultOptions={{disableDefaultUI: true}}
  >
    {props.isMarkerShown && <Marker position={{ lat: -33.8943, lng: 151.2330 }} />}
  </GoogleMap>
))

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpYkA5JspuuGVdgRs4amuYKmvzhEdS4lk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `40vh`, width: `100%` }} />,
    mapElement: <div style={{ height: `40vh`, width: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(-33.8943, 151.2330),
        destination: new google.maps.LatLng(-33.9173, 151.2313),
        travelMode: google.maps.TravelMode.DRIVING, //BICYCLING DRIVING TRANSIT WALKING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        }else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={30}
    defaultCenter={new google.maps.LatLng(-33.8943, 151.2330)} //change this to the starting coord
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

function getSteps(arr) {
  var daSteps = [];
  for (var i = 0; i < arr.length; i++) {
      daSteps.push(arr[i].html_instructions.replace(/ /g, "&nbsp;"));
  }
  return daSteps;
}

export function TransportPage() {

  const [trip, settrip] = useState(null);  //BICYCLING DRIVING TRANSIT WALKING
  useEffect(() => { //make this dynamic, change start, end and mode of transport from button
      fetch('https://murmuring-mesa-57812.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=-33.8943,%20151.2330&destination=-33.9173,%20151.2313&mode=driving&key=AIzaSyDpYkA5JspuuGVdgRs4amuYKmvzhEdS4lk')
          .then(response => response.json())
          .then(data => 
          {
            settrip(getSteps(data.routes[0].legs[0].steps))
          });
  }, []);

  var stringData = "";
  var nextLocation = "";

  if (trip)
  {
    stringData = trip.reduce((result, item) => {
    return `${result}<p>${item}</p>`
    }, "");

    nextLocation = trip[0];
  }

  

  console.log(stringData);
  

  var current = new Date();
  var twentyMinutesLater = new Date();
  twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
  return (
    <main>
      <div className="tabDescriptionsleft">

      <div id="floating-panel">
        <b>The next step in your </b>
          <select id="transitOption" className = "dropbtn" >
            <option value = "DRIVING">driving</option>
            <option value = "BICYCLING">cycling</option>
            <option value = "WALKING">walking</option>
            <option value = "TRANSIT">transiting </option>
          </select>
        <b> trip is: {ReactHtmlParser(nextLocation)}</b>
      </div>
        
      </div>

      <div className="EventPreview">
        <h3>
          Sydney Tower Eye 10min
        </h3>
      </div>

      <div className="DetailedDescriptionsHalfLeftTop"
          style={{height: "40vh", display: "flex", flexDirection: "column", lineHeight: "1pt"}}>
         
          {ReactHtmlParser(stringData)}
    
         
      </div>
      
      <div className="DetailedDescriptionsHalfRight" style={{height: "40vh", width: "66vw", marginRight: "10vw", marginLeft: "32vw"}}>
          <MapWithADirectionsRenderer 
          />
      </div>

    </main>
  );
}