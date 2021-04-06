
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import GoogleMapReact from 'google-map-react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import axios from "axios";

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
        <Route path="/map">
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
      center: {
        lat: 0.0,
        lng: 0.0
      },
      zoom: 1,
      zoomControl: false
  };

function Map() {
  var location = useLocation();
  console.log(location);

  var unselectedColour = {};
  var selectedColour = {background: "white"};

  var weatherColour = location.pathname == '/map/weather' || location.pathname == "/map" ? selectedColour : unselectedColour;
  var transportColour = location.pathname == '/map/transport' ? selectedColour : unselectedColour;
  var eventsColour = location.pathname == '/map/events' ? selectedColour : unselectedColour;
  var settingsColour = location.pathname == '/map/settings' ? selectedColour : unselectedColour;

  return (
    <Router>
      <div className="mapContainer" >
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAKAb78UDIOoadxVvXW9oE7RNNAnJS8Du4" }}
            defaultCenter={defaultMapProps.center}
            defaultZoom={defaultMapProps.zoom}
            zoomControl={defaultMapProps.zoomControl}
           />
      </div>
      <div className="belowMap">
        <Link to="/map/weather">
          <div className="tabLeft" style={weatherColour}>
            <div className="tabButton" style={{background: "rgb(241, 141, 0)"}}>
            Weather
            </div>
          </div>
        </Link>
        <Link to="/map/transport">
          <div className="tabCentre" style={transportColour}>
            <div className="tabButton" style={{background: "rgb(234, 67, 53)"}}>
            Transport
            </div>
          </div>
        </Link>
        <Link to="/map/events">
          <div className="tabCentre" style={eventsColour}>
            <div className="tabButton" style={{background: "rgb(52, 168, 83)"}}>
            Events
            </div>
          </div>
        </Link>
        <Link to="/map/settings">
          <div className="tabRight" style={settingsColour}>
            <div className="tabButton" style={{background: "rgb(26, 115, 232)"}}>
            Settings
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
            <Route path="/map/settings">
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
            Email@Email.com
          </div>

          <div className="entryBox">
            *****************
          </div>

          <Link to="/map">
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
            Email@Email.com
          </div>

          <div className="entryBox">
            *****************
          </div>

          <div className="entryBox">
            *****************
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
            Email@Email.com
          </div>

          <div className="entryBox">
            *****************
          </div>

          <div className="entryBox">
            *****************
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

  const [TotalWeather, setTotalWeather] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setTotalWeather(((data.weather[0].main))));
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


  const [SunSetTime, setSunSetTime] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setSunSetTime(((data.sys.sunset))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

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
          .then(data => setTheState(((data.name))));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  let unix_timestamp1 = SunRiseTime
  var date1 = new Date(unix_timestamp1 * 1000);
  var hours1 = date1.getHours();
  var minutes1 = "0" + date1.getMinutes();
  var seconds1 = "0" + date1.getSeconds();
  var formattedTime1 = hours1 + ':' + minutes1.substr(-2);

  let unix_timestamp = SunSetTime
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2);

  //Forecast code
//TIME
const [ForecastFind, setForecastFind] = useState(null);
  useEffect(() => {
      var choose = 0;
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => setForecastFind(data.hourly));

  }, []);

const getForecastTime = (choose) => {
    var unix_time_change = ((ForecastFind || {})[choose] || {}).dt || null;
    var date = new Date(unix_time_change * 1000);
    return date.getHours();
}

const getForecastIcon = (choose) => {
    return ((ForecastFind || {})[choose] || {}).weather[0].icon || null;
}

const getForecastDescription = (choose) => {
    return ((ForecastFind || {})[choose] || {}).weather[0].description || null;
}

const getForecastTemp = (choose) => {
    return ((ForecastFind || {})[choose] || {}).weather[0].temp || null;
}

const baseTime = getForecastTime(0);
//
  return (
    <main>
      <div className="tabDescriptions">
      <h2>
      Feels Like: {setTotalIcon} {totalTemp} °C
        - {TotalWeather}     
      </h2>
 

      </div>

      <div className="EventPreview">
        EventPreview
      </div>

      <div className="DetailedDescriptionsHalfRight">
        
        <div className="DescriptionsSplitter" style={{marginBottom:'63vh'}}>
          <h1>
            Hourly Forecast
          </h1>
        </div>
        <div className="DescriptionsSplitter" style={{marginTop:'-20vh'}}>
          <h2>
            {baseTime}:00 
          </h2>  
          <img 
            src={`http://openweathermap.org/img/wn/${TotalIcon}@2x.png`}
            />  
          <h2>
              {getForecastDescription(0)}
          </h2>
          <h2>
             {getForecastTemp(0)}
          </h2>
        </div>

        <div className="DescriptionsSplitter" style={{marginTop:'10vh'}}>
          <h2>
           
          </h2>
        </div>

        <div className="DescriptionsSplitter" style={{marginTop:'40vh'}}>
          <h2>
          
   
          
          </h2>
        </div>

        <div className="DescriptionsSplitter" style={{marginTop:'70vh'}}>
          <h2>
         

 
          </h2>
        </div>

      </div>

      <div className="DetailedDescriptionsHalfLeft">
        <div className="WeatherImageContainer">
          <img 
            src={`http://openweathermap.org/img/wn/${TotalIcon}@4x.png`}
            
            />  
        </div>

      <div className="WeatherCurrentTempContainer">
        {totalTemp} °C
        <div className="WeatherCurrentContainerSmaller">
          {WeatherDescription}
          
        </div>        
      </div>

      <div className="WeatherExtraInfoContainer">
        {TheState}, {TheCountry}
        
      </div>

      <div className="WeatherExtraInfoContainer" style={{marginTop:'45vh'}}>
        Sunrise:{formattedTime1}
      </div>

      <div className="WeatherExtraInfoContainer" style={{marginTop:'74vh'}}>
        Sunset:{formattedTime}
      </div>
      </div>


    </main>
  );


}


function TransportPage() {
  return (
    <main>
      <div className="tabDescriptions">
        Transport preview
      </div>

      <div className="EventPreview">
        EventPreview
      </div>

      <div className="DetailedDescriptionsHalfLeft">
        All transport functionality
      </div>

      <div className="DetailedDescriptionsHalfRight">
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAKAb78UDIOoadxVvXW9oE7RNNAnJS8Du4" }}
            defaultCenter={defaultMapProps.center}
            defaultZoom={defaultMapProps.zoom}
            zoomControl={defaultMapProps.zoomControl}
           />
      </div>

    </main>
  );
}


function EventsPage() {
  return (
    <main>
      <div className="tabDescriptions">
        Events preview
      </div>

      <div className="EventPreview">
        EventPreview
      </div>
      <div className="DetailedDescriptions">
        All event functionality
      </div>
    </main>
  );
}


function SettingsPage() {
  return (
    <main>
      <div className="tabDescriptions">
        Settings preview
      </div>

      <div className="EventPreview">
        EventPreview
      </div>
      <div className="DetailedDescriptions">
        All Settings functionality
      </div>
    </main>
  );
}


export default PassThrough;