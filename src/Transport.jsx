import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker} from 'react-google-maps';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import { compose, withProps, withStateHandlers, lifecycle } from 'recompose';
import ReactHtmlParser from 'react-html-parser'
import Select from 'react-select';

//sets the default values of the map used in the transport
const defaultMapProps = { 
      center: {   //centennial park
        lat: -33.8943,
        lng: 151.2330
      },
      zoom: 13.5,
      zoomControl: false,
  };
//creates the default map object, and sets its zoom/other settings
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
//function that takes an "id" and returns the google API true value for mode of transport 
function getTravelModeForID(google, id)
{
  switch(id)
  {
    default:
    case 0:
      return google.maps.TravelMode.DRIVING;
    case 1:
      return google.maps.TravelMode.WALKING;
    case 2:
      return google.maps.TravelMode.BICYCLING;
    case 3:
      return google.maps.TravelMode.TRANSIT;
  }
}
//function that takes an "id" and returns the string representing mode of transport 
function getTravelStringForID(id)
{
  switch(id)
  {
    default:
    case 0:
      return "driving";
    case 1:
      return "walking";
    case 2:
      return "bicycling";
    case 3:
      return "transit";
  }
}
//creates a map along with directions api
const MapWithADirectionsRenderer = compose(
  //setup props with containers 
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpYkA5JspuuGVdgRs4amuYKmvzhEdS4lk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `40vh`, width: `100%` }} />,
    mapElement: <div style={{ height: `40vh`, width: `100%` }} />,
  }),
  //imports scriptjs and googlemap 
  withScriptjs,
  withGoogleMap,
  //import lifecycle
  lifecycle({
      //first iteration to mount the component
    componentDidMount() {
        //creates the directionservice object
      const DirectionsService = new google.maps.DirectionsService();
      console.log(getTravelModeForID(google, this.props.mode));
      //routing information from inserted origin and destination with travelmode sourced from above
      DirectionsService.route({
        origin: new google.maps.LatLng(-33.8943, 151.2330),
        destination: new google.maps.LatLng(-33.9173, 151.2313),
        travelMode: getTravelModeForID(google, this.props.mode), //BICYCLING DRIVING TRANSIT WALKING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        }else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
    //reruns as above to update the component
    componentDidUpdate(prevProps) {
      if (this.props.mode !== prevProps.mode) {
        const DirectionsService = new google.maps.DirectionsService();
        console.log(getTravelModeForID(google, this.props.mode));
        DirectionsService.route({
          origin: new google.maps.LatLng(-33.8943, 151.2330),
          destination: new google.maps.LatLng(-33.9173, 151.2313),
          travelMode: getTravelModeForID(google, this.props.mode), //BICYCLING DRIVING TRANSIT WALKING
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
//gets the individual legs of the route 
function getSteps(arr) {
  var daSteps = [];
  for (var i = 0; i < arr.length; i++) {
      daSteps.push(arr[i].html_instructions);
  }
  return daSteps;
}
//creates the ui for the transport page 
export function TransportPage() {
  const [mode, setMode] = useState(0);
  var travelString = getTravelStringForID(mode);
  const [trip, settrip] = useState(null);  //BICYCLING DRIVING TRANSIT WALKING
  useEffect(() => { //dynamic, change start, end and mode of transport from button
      fetch('https://murmuring-mesa-57812.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=-33.8943,%20151.2330&destination=-33.9173,%20151.2313&key=AIzaSyDpYkA5JspuuGVdgRs4amuYKmvzhEdS4lk&mode=' + travelString)
          .then(response => response.json())
          .then(data => 
          {
            settrip(getSteps(data.routes[0].legs[0].steps))
            console.log(data.routes[0].legs[0].steps);
          });
  }, [mode]);

  var stringData = "";
  var nextLocation = "";

  if (trip)
  {
    stringData = trip.reduce((result, item) => {
    return `${result}<p>${item}</p>`
    }, "");

    nextLocation = trip[0];
  }

  const mapWithDirections = <MapWithADirectionsRenderer mode={mode}/>;

//driving, walking, cycling,transiting
  const transitOptions = [
    {value: 0, label: "driving"},
    {value: 1, label: "walking"},
    {value: 2, label: "cycling"},
    {value: 3, label: "transiting"}
  ];

const customStyles = {
  option: provided => ({
    ...provided,
    color: 'black',
  }),
  control: provided => ({
    ...provided,
    color: 'black',
  }),
  valueContainer: (provided) => ({
      ...provided,
      width:"10vw",
    }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black'
  })
}
//sets the default selected events to no events 
  var mostRecentEventString = "No Events!";
  if (window.agenda.length > 0)
  {
    mostRecentEventString = window.agenda[0].param;
  }

  var current = new Date();
  var twentyMinutesLater = new Date();
  twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
  return (
    <main>
      <div className="tabDescriptionsleft">
      <div id="floating-panel" style={{display: "flex", flexDirection: "row"}}>
      {/*Prints the next step in travelling to the next event and the transit mode */}
        <b style={{paddingRight: "10px"}}>The next step in your </b>
          <Select options={transitOptions} id = "TransitMode" styles={customStyles} value={{value: mode, label:transitOptions[mode].label}} 
          onChange={
            (e) => {
              setMode(e.value);
            }
          }
          />
        <b style={{paddingLeft: "10px"}}> trip is: {ReactHtmlParser(nextLocation)}</b>
      </div>
        
      </div>
    {/*displays the next step in the events page*/}
      <div className="EventPreview">
        <h3>
          {mostRecentEventString}
        </h3>
      </div>
     {/*Prints a list of available events*/}
      <div className="DetailedDescriptionsHalfLeftTop"
          style={{height: "40vh", display: "flex", flexDirection: "column"}}>
         
          {ReactHtmlParser(stringData)}
    
         
      </div>
       {/*Prints the agenda */}
      <div className="DetailedDescriptionsHalfRight" style={{height: "40vh", width: "66vw", marginRight: "10vw", marginLeft: "32vw"}}>
          {mapWithDirections}
      </div>

    </main>
  );
}