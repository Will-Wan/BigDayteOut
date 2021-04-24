import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './map.css'
import { Slider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import $ from 'jquery'; 

// set the max range for 
window.radiusRange = 2000;
window.budgetRange = 2;

// function to manage the settings tab
export function SettingsPage() {
  const [renderVar, rerender] = useState(0);

  var mostRecentEventString = "No Events!";
  if (window.agenda.length > 0)
  {
    mostRecentEventString = window.agenda[0].param;
  }
  // if there is an item in the agenda, update the mostRecentEventString variable with the last added event 
  return (
    <main>
      <div className="tabDescriptions">
      <h2>
        Budget Level: {window.budgetRange}&nbsp;
        &nbsp;
        &nbsp;
        Radius: {window.radiusRange}m
      </h2>
      </div>


      <div className="EventPreview">
        <h3>
        {mostRecentEventString}
        </h3>
      </div>
      <div className="settingDescription"
          style={{height: "37vh", display: "flex", justifyContent: "space-between", padding: "1%"}}>
          
        {/Radius jsx, ranges from 50-5000/}
        <div className="settingEntry">
          Radius (m)
          <div style={{width: "80vw"}}>
            <Slider 
              key={`slider-${window.radiusRange}`}
              defaultValue={window.radiusRange}
              onChangeCommitted={(e, val) => {window.radiusRange = val; rerender(1 - renderVar)}}
              valueLabelDisplay="auto"
              min={50}
              max={5000} />
          </div>
        </div>

        {/Budget level jsx, ranges from 1-4/}
        <div className="settingEntry">
          Budget Level: 
          <div style={{width: "80vw"}}>
            <Slider 
              key={`slider-${window.budgetRange}`}
              defaultValue={window.budgetRange}
              onChangeCommitted={(e, val) => {window.budgetRange = val; rerender(1 - renderVar)}}
              valueLabelDisplay="auto"
              min={1}
              max={4} />
          </div>
        </div>


        <div>
        Share your event plan:&nbsp;

      {/insert logos for social medias & uber/}

        <img 
          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png`} style={{width: "2vw"}}
          />   
        &nbsp;
        <img 
          src={`../images/InstagramLogo.png`} style={{width: "2vw"}}
          />   
        &nbsp;
        <img 
          src={`../images/googleLogo.png`} style={{width: "2vw"}}
          />   
      </div>
      <div>
        Link your accounts:&nbsp;
        <img 
          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png`} style={{width: "2vw"}}
          />   
        &nbsp;
        <img 
          src={`../images/InstagramLogo.png`} style={{width: "2vw"}}
          />   
        &nbsp;
        <img 
          src={`../images/googleLogo.png`} style={{width: "2vw"}}
          />   
        &nbsp;
        <img 
          src={`https://technologymirror.com.ng/wp-content/uploads/2017/12/uber-logo-2BB8EC4342-seeklogo.com_-1.png`} style={{width: "2vw"}}
          />   
      </div>
      </div>
    </main>
  );
}