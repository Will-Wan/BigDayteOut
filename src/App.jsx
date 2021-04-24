// Route imports 
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
//CSS style import
import './App.css';
import './map.css'
//Google map import
import GoogleMapReact from 'google-map-react';
//Weather import
import ReactWeather, { useOpenWeather } from 'react-open-weather';
//Slider import for settings
import { Slider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import axios from "axios";
import moment from 'moment'
//Icon imports
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import { LandingPage, RegisterPage, ResetPass } from './Landing';
import { Map } from './Map';
//Function to route between pages
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
export default PassThrough;