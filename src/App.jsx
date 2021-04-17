
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './map.css'
import GoogleMapReact from 'google-map-react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { Slider } from '@material-ui/core';

import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import axios from "axios";

// import AddBoxIcon from '@material-ui/icons/AddBox';
// import { AddBox } from '@material-ui/icons';

//location pin
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

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

function Map() {
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
      <p className="pin-text">{text}</p>
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
            Events
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

function LandingPage() {
  return (
    <main>
      <div className="box">
        <div className="box1Text">
          <h3>
          New user?
          </h3>
          
          Ready to start
          planning your
          Big Dayte Out?

          <Link to="/register">
            <div className="register">
            REGISTER
            </div>
          </Link>
        </div>
        <div className="box2">
          <div style={{marginBottom:'8vh'}}>
          Welcome back!
          </div>

          <div className="entryBox">
            <input
              type="text" placeholder="Email@Email.com" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <div className="entryBox">
            <input
              type="text" placeholder="Password" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <Link to="/map/weather">
            <div className="login">
              LOGIN
            </div>
          </Link>

          <Link to="/resetpass">
            <div className="forgotPass">
              Forgot password
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

function RegisterPage() {
  return (
    <main>
      <div className="box">
        <div className="box2">
          <div style={{marginBottom:'8vh'}}>
          Create Account!
          </div>

          <div className="entryBox">
            <input
              type="text" placeholder="Email@Email.com" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <div className="entryBox">
            <input
              type="text" placeholder="Password" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <div className="entryBox">
            <input
              type="text" placeholder="Password" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <Link to="/">
            <div className="login">
              REGISTER
            </div>
          </Link>

        </div>
        <div className="box1Text">
          <h3>
          Welcome back!
          </h3>
          
          Ready to start
          planning your
          Big Dayte Out?

          <Link to="/">
            <div className="register">
            LOGIN
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

function ResetPass() {
  
    return (
    <main>
      <div className="box">
        <div className="box2">
          <div style={{marginBottom:'8vh'}}>
          Reset Password
          </div>

          <div className="entryBox">
            <input
              type="text" placeholder="Email@Email.com" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <div className="entryBox">
            <input
              type="text" placeholder="Password" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <div className="entryBox">
             <input
              type="text" placeholder="Password" style={{height: "40vh",width:"100vh",fontSize: "1.6vw",color: "rgba(128,128,128,1)",fontWeight: "Bold",border:"none"}}
            />
          </div>

          <Link to="/">
            <div className="login">
              SUBMIT
            </div>
          </Link>

        </div>
        <div className="box1Text">
          <h3>
          Welcome back!
          </h3>
          
          Ready to start
          planning your
          Big Dayte Out?

          <Link to="/">
            <div className="register">
            LOGIN
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}


function WeatherPage() {
//WEATHER API OPEN WEATHER

  const [totalTemp, setTotalTemp] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setTotalTemp((((data.main.temp) - 273.15).toFixed(2))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const [TotalIcon, setTotalIcon] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setTotalIcon(((data.weather[0].icon))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);


  const [WeatherDescription, setWeatherDescription] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setWeatherDescription(((data.weather[0].description))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const [SunRiseTime, setSunRiseTime] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setSunRiseTime(((data.sys.sunrise))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
const date = new Date(SunRiseTime * 1000);
// Hours part from the timestamp
const hours = date.getHours();
// Minutes part from the timestamp
const minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
const seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  const [SunSetTime, setSunSetTime] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setSunSetTime(((data.sys.sunset))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

const date1 = new Date(SunSetTime * 1000);
// Hours part from the timestamp
const hours1 = date1.getHours();
// Minutes part from the timestamp
const minutes1 = "0" + date1.getMinutes();
// Seconds part from the timestamp
const seconds1 = "0" + date1.getSeconds();

// Will display time in 10:30:23 format
const formattedTime1 = hours1 + ':' + minutes1.substr(-2) + ':' + seconds1.substr(-2);



/*
  const [TheCountry, setTheCountry] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setTheCountry(((data.sys.country))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const [TheState, setTheState] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
  //  let unix_timestamp = SunSetTime
  }, []);
*/


const [weather0, setweather0] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setweather0(data.hourly[0].weather[0].description));
  }, []);
const [icon0, seticon0] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => seticon0(data.hourly[0].weather[0].icon));
  }, []);
const [temp0, settemp0] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => settemp0((((data.hourly[0].temp) - 273.15).toFixed(2))));
          
  }, []);
const [pop0, setpop0] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setpop0(data.hourly[0].pop));
  }, []);


const [weather1, setweather1] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setweather1(data.hourly[1].weather[0].description));
  }, []);
const [icon1, seticon1] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => seticon1(data.hourly[1].weather[0].icon));
  }, []);
const [temp1, settemp1] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => settemp1((((data.hourly[1].temp) - 273.15).toFixed(2))));
  }, []);
const [pop1, setpop1] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setpop1(data.hourly[1].pop));
  }, []);


const [weather2, setweather2] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setweather2(data.hourly[2].weather[0].description));
  }, []);
const [icon2, seticon2] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => seticon2(data.hourly[2].weather[0].icon));
  }, []);
const [temp2, settemp2] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => settemp2((((data.hourly[2].temp) - 273.15).toFixed(2))));
  }, []);
const [pop2, setpop2] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setpop2(data.hourly[2].pop));
  }, []);


const [weather3, setweather3] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setweather3(data.hourly[3].weather[0].description));
  }, []);
const [icon3, seticon3] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => seticon3(data.hourly[3].weather[0].icon));
  }, []);
const [temp3, settemp3] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => settemp3((((data.hourly[3].temp) - 273.15).toFixed(2))));
  }, []);
const [pop3, setpop3] = useState(null);
  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setpop3(data.hourly[3].pop));
  }, []);


const d = new Date();
const dt0 = d.getHours();
const dt11 = new Date(d.setHours(d.getHours() + 1));
const dt1 = dt11.getHours();
const dt22 = new Date(d.setHours(d.getHours() + 1));
const dt2 = dt22.getHours();
const dt33 = new Date(d.setHours(d.getHours() + 1));
const dt3 = dt33.getHours();






//
  return (
    <main>
      <div className="tabDescriptions">
      <h2>
      Feels Like: {setTotalIcon} {totalTemp} °C
        - {WeatherDescription}    
      </h2>
        <img 
          src={`http://openweathermap.org/img/wn/${TotalIcon}@2x.png`}
          />   

      </div>

      <div className="EventPreview">
        <h3>
          Sydney Tower Eye 10min
        </h3>
      </div>

      <div className="DetailedDescriptionsHalfRight">
        <div className="DescriptionsSplitter" style={{marginBottom:'63vh', justifyContent: "center", paddingLeft: "0px"}}>
          <h1>
            Hourly Forecast
          </h1>
        </div>
        <div className="DescriptionsSplitter" style={{marginTop:'-20vh'}}>
          <h2>
            {dt0}:00
          </h2>
          

          <img 
            src={`http://openweathermap.org/img/wn/${icon0}@2x.png`}
            />  
          <h2>
            {weather0}&nbsp; {temp0}°C
          </h2>
          &nbsp;
          &nbsp;    
          &nbsp; 
        <img 
          src={`../images/raindrop.png`} style={{width: "2.5vw"}}
          />   
        <h2>
           {pop0}%
        </h2>     
        </div>





        <div className="DescriptionsSplitter" style={{marginTop:'10vh'}}>
          <h2>
            {dt1}:00
          </h2>
          <img 
            src={`http://openweathermap.org/img/wn/${icon1}@2x.png`}
            />  

          <h2>
            {weather1}&nbsp; {temp1}°C
          </h2>  
          &nbsp;
          &nbsp;
          &nbsp;
        <img 
          src={`../images/raindrop.png`} style={{width: "2.5vw"}}
          />   
        <h2>
           {pop1}%
        </h2>
        </div>





        <div className="DescriptionsSplitter" style={{marginTop:'40vh'}}>
          <h2>
            {dt2}:00
          </h2>

          <img 
            src={`http://openweathermap.org/img/wn/${icon2}@2x.png`}
            />  
          <h2>
            {weather2}&nbsp; {temp2}°C
          </h2>  
          &nbsp;
          &nbsp;
          &nbsp;
        <img 
          src={`../images/raindrop.png`} style={{width: "2.5vw"}}
          />   
        <h2>
           {pop2}%
        </h2>
        </div>





        <div className="DescriptionsSplitter" style={{marginTop:'70vh'}}>
          <h2>
            {dt3}:00
          </h2>

          <img 
            src={`http://openweathermap.org/img/wn/${icon3}@2x.png`}
            />  

          <h2>
            {weather3}&nbsp; {temp3}°C
          </h2> 
          &nbsp;
          &nbsp;
          &nbsp; 
        <img 
          src={`../images/raindrop.png`} style={{width: "2.5vw"}}
          />   
        <h2>
           {pop3}%
        </h2>
        </div>

      </div>

      <div className="DetailedDescriptionsHalfLeft">
        <div className="WeatherImageContainer">
          <img 
            src={`http://openweathermap.org/img/wn/${TotalIcon}@4x.png`} style={{width: "100vw"}}
            />  
        </div>

      <div className="WeatherCurrentTempContainer">
        {totalTemp} °C
        <div className="WeatherCurrentContainerSmaller">
          {WeatherDescription}
          
        </div>        
      </div>

      <div className="WeatherExtraInfoContainer">
        
        Sydney, Australia
        
      </div>

      <div className="WeatherExtraInfoContainer" style={{marginTop:'45vh'}}>
        Sunrise: {formattedTime}
      </div>

      <div className="WeatherExtraInfoContainer" style={{marginTop:'74vh'}}>
        Sunset: {formattedTime1}
      </div>
      </div>


    </main>
  );


}


function TransportPage() {

  var current = new Date();
  var twentyMinutesLater = new Date();
  twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
  return (
    <main>
      <div className="tabDescriptions">
      <h2>
      BUS 399
      &nbsp;
      &nbsp;
      &nbsp;
        {current.toLocaleTimeString()} --> 20min --> {twentyMinutesLater.toLocaleTimeString()}
      </h2>
        
      </div>

      <div className="EventPreview">
        <h3>
          Sydney Tower Eye 10min
        </h3>
      </div>

      <div className="DetailedDescriptionsHalfLeft"
          style={{height: "40vh"}}>


        <div className="TimeStartCoverTEMP">
          <h2>
             {current.toLocaleTimeString()}
          </h2>
        </div>        

        <div className="TimeStartCoverTEMP2" style={{margintop: "30vh"}}>
          <h2>
              {twentyMinutesLater.toLocaleTimeString()}
          </h2>
        </div>   

        <img 
          src="../images/DirectionPlaceholder.PNG" style={{width: "100vw"}}
          />   
      </div>

      <div className="DetailedDescriptionsHalfRight" style={{height: "40vh"}}>
        <img 
          src={`https://www.google.com/maps/vt/data=TxDIJIHXabw6rftxglubOyPk8jUqCXV6iB_Soz3Os_Y12kM6aw2GxM7CuFFotyPblqo64GKWKwnBl_wBSW8QiTaYf8hGDz1hBmoIWOOcfw4O7JRryUYWvVZ0TxgrisiE9xfRKBVDxDUno0q_dcXuengCqr4bTjFJ9D3S3ASlrUTVLUDoS-O4TybJ7WZQ,rGHV_hSRzXYuJ6-VytwEI1wRl5qVRyQZBgufPYLy3eLw6VDbcsKGMEu_7vUlwMtoZQJq7Zljtn4v8sI4__3EwzHQWs3p41vME5FGN7qIDlBcMCZ6xew6D7yT_LgHgt5OMH9Uk-1a3IxUhVoYK2Nhi6O1dVkatq0Lm2mugu6iLD4MN0mQXdrMbxb0qrrIYYb9TmxMgpoJFGiLVDX2E8S5zXI69lm6VKDMwmcv3BJnH1OZvXj1KwKO9_RtAv-Jdhe91KBnRrVK0mgfB9L0mAVF-PGjT9sjBLBk16xlk74h1Q5BD6PRPLSO53rUGqugch2PuutiSFZ-CqjjdU7RPPUagoandawWRcosDhh-BdfLjHOFLeok5bzqO0jcrC6agCdbiaYs3feFQThWSwAoPcg?scale=1&h=500&w=1000`} style={{width: "100vw"}}
          />   
      </div>

    </main>
  );
}


function EventsPage() {
  const [eventOne, setEventOne] = useState("-");
  const [eventTwo, setEventTwo] = useState("+");
  const [eventThree, setEventThree] = useState("+");
  const [eventFour, setEventFour] = useState("+");
  const [eventFive, setEventFive] = useState("+");

  return (
    <main>
      <div className="tabDescriptions">
        Sydney Tower Eye is the tallest building in Sydney. It has a 360-degree view of the city.
      </div>

      <div className="EventPreview">
        <h3>
          Sydney Tower Eye 10min
        </h3>
      </div>
      <div className="eventContainer"
      >
        <div className="eventEntry">
          <div className="eventText">
            10min Sydney Tower Eye - Sydney Tower Eye is the tallest building in Sydney. It has a 360-degree view of the city.
          </div>
          <div className="eventButton" onClick={() => {
            setEventOne(eventOne == "+" ? "-" : "+");
          }}>
          {eventOne}
          </div>
        </div>

        <div className="eventEntry">
          <div className="eventText">
            52min Sydney Opera House - The Sydney Opera House is a multi-venue performing arts centre at Sydney Harbour.
          </div>
          <div className="eventButton" onClick={() => {
            setEventTwo(eventTwo == "+" ? "-" : "+");
          }}>
          {eventTwo}
          </div>
        </div>
        
        <div className="eventEntry">
          <div className="eventText">
            1hr 13min Paddy's Market - Paddy's Market have a wide variety of stalls; food, fashion, gifts and gadgets!
          </div>
          <div className="eventButton" onClick={() => {
            setEventThree(eventThree == "+" ? "-" : "+");
          }}>
          {eventThree}
          </div>
        </div>
        
        <div className="eventEntry">
          <div className="eventText">
            1hr 43min Royal Botanic Garden - The Royal Botanic Garden, Sydney is a heritage-listed major 30-hectare garden.
          </div>
          <div className="eventButton" onClick={() => {
            setEventFour(eventFour == "+" ? "-" : "+");
          }}>
          {eventFour}
          </div>
        </div>


        <div className="eventEntry">
          <div className="eventText">
            1hr 53min Bondi Beach - One of Australia's most iconic beaches. Big waves and busy street stalls draw visitors year round!
          </div>
          <div className="eventButton" onClick={() => {
            setEventFive(eventFive == "+" ? "-" : "+");
          }}>
          {eventFive}
          </div>
        </div>



      </div>
    </main>
  );
}

window.radiusRange = [500, 2000];
window.budgetRange = [0, 200];

function SettingsPage() {
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


export default PassThrough;