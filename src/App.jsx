
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './map.css'
import GoogleMapReact from 'google-map-react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { Slider } from '@material-ui/core';

import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import axios from "axios";
import moment from 'moment'
// import AddBoxIcon from '@material-ui/icons/AddBox';
// import { AddBox } from '@material-ui/icons';
//location pin
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import { LandingPage, RegisterPage, ResetPass } from './Landing';
import { Map } from './Map';


function PassThrough () {
  return (
    <Router>
        <Switch>
          <Route path="/register">
            <RegisterPage />
          </Route> 
          <Route path="/resetpass">
            <ResetPass />
          </Route> 
          <Route path="/map/weather">
            <Map />
          </Route> 
          <Route path="/">
            <LandingPage />
          </Route> 
        </Switch>
    </Router>
  );
}

function getEventsList(lat, lng, radius, maxprice) {
//google places api

  const API_KEY = "AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk";
  const KEYWORD = "attractions";
  const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"

  apiUrl = BASE_URL + "key=" + API_KEY + "&radius=" + radius + "&location" + lat + "," + lng + "&keyword=" + KEYWORD + "&maxprice=" + maxprice;

  const [unfilteredEventsList, setUnfilteredEventsList] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => console.log(data));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  
}


export default PassThrough;