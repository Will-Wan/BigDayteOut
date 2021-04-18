import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './map.css'
import { Slider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

window.radiusRange = [500, 2000];
window.budgetRange = [0, 200];

export function SettingsPage() {
  const [renderVar, rerender] = useState(0);

  return (
    <main>
      <div className="tabDescriptions">
      <h2>
        Budget: ${window.budgetRange[0]} - ${window.budgetRange[1]}
        &nbsp;
        &nbsp;
        Radius: {window.radiusRange[0]}m - {window.radiusRange[1]}m
      </h2>
      </div>


      <div className="EventPreview">
        <h3>
          Sydney Tower Eye 10min
        </h3>
      </div>
      <div className="settingDescription"
          style={{height: "37vh", display: "flex", justifyContent: "space-between", padding: "1%"}}>
        <div className="settingEntry">
          Radius (m)
          <div style={{width: "80vw"}}>
            <Slider 
              key={`slider-${window.radiusRange}`}
              defaultValue={window.radiusRange}
              onChangeCommitted={(e, val) => {window.radiusRange = val; rerender(1 - renderVar)}}
              valueLabelDisplay="auto"
              min={10}
              max={5000} />
          </div>
        </div>

        <div className="settingEntry">
          Budget ($)
          <div style={{width: "80vw"}}>
            <Slider 
              key={`slider-${window.budgetRange}`}
              defaultValue={window.budgetRange}
              onChangeCommitted={(e, val) => {window.budgetRange = val; rerender(1 - renderVar)}}
              valueLabelDisplay="auto"
              min={0}
              max={500} />
          </div>
        </div>


        <div>
        Share your event plan:&nbsp;


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