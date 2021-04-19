
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


export default PassThrough;