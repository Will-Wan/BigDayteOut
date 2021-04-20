import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

function WeatherCell(hour, icon, weather, temp, pop, top) {
  return (<div className="DescriptionsSplitter" style={{marginTop: top}}>
            <h2>
              {hour % 24}:00
            </h2>

            <img 
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              />  
            <h2>
              {weather}&nbsp; {temp}°C
            </h2>  
            &nbsp;
            &nbsp;
            &nbsp;
          <img 
            src={`../images/raindrop.png`} style={{width: "2.5vw"}}
            />   
          <h2>
            {pop}%
          </h2>
          </div>);
}


export function WeatherPage() {
//WEATHER API OPEN WEATHER

  // Get current time data and constant data
  const [totalTemp, setTotalTemp] = useState(null);
  const [TotalIcon, setTotalIcon] = useState(null);
  const [WeatherDescription, setWeatherDescription] = useState(null);
  const [SunRiseTime, setSunRiseTime] = useState(null);
  const [SunSetTime, setSunSetTime] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => {
            setTotalTemp((((data.main.temp) - 273.15).toFixed(2)))
            setTotalIcon(((data.weather[0].icon)))
            setWeatherDescription(((data.weather[0].description)))
            setSunRiseTime(((data.sys.sunrise)))
            setSunSetTime(((data.sys.sunset)))
          })
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);


  // Get strings for constant sunrise, sunset
  const sunrise = new Date(SunRiseTime * 1000);
  const sunset = new Date(SunSetTime * 1000);

  // Will display time in 10:30:23 format
  const fmtSunrise = sunrise.toLocaleTimeString('en-GB');
  const fmtSunset = sunset.toLocaleTimeString('en-GB');

  const [icon_h0, seticon_h0] = useState(null);
  const [weather_h0, setweather_h0] = useState(null);
  const [temp_h0, settemp_h0] = useState(null);
  const [pop_h0, setpop_h0] = useState(null);

  const [icon_h1, seticon_h1] = useState(null);
  const [weather_h1, setweather_h1] = useState(null);
  const [pop_h1, setpop_h1] = useState(null);
  const [temp_h1, settemp_h1] = useState(null);

  const [icon_h2, seticon_h2] = useState(null);
  const [weather_h2, setweather_h2] = useState(null);
  const [temp_h2, settemp_h2] = useState(null);
  const [pop_h2, setpop_h2] = useState(null);

  const [icon_h3, seticon_h3] = useState(null);
  const [weather_h3, setweather_h3] = useState(null);
  const [temp_h3, settemp_h3] = useState(null);
  const [pop_h3, setpop_h3] = useState(null);

  useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=22&lon=151&exclude=current,minutely,daily&APPID=bb53d6f630ec369b97d9bf3e5bfc8621')
          .then(response => response.json())
          .then(data => 
          {
            seticon_h0(data.hourly[0].weather[0].icon)
            setweather_h0(data.hourly[0].weather[0].description)
            settemp_h0((((data.hourly[0].temp) - 273.15).toFixed(2)))
            setpop_h0(data.hourly[0].pop)

            seticon_h1(data.hourly[1].weather[0].icon)
            setweather_h1(data.hourly[1].weather[0].description)
            settemp_h1((((data.hourly[1].temp) - 273.15).toFixed(2)))
            setpop_h1(data.hourly[1].pop)

            seticon_h2(data.hourly[2].weather[0].icon)
            setweather_h2(data.hourly[2].weather[0].description)
            settemp_h2((((data.hourly[2].temp) - 273.15).toFixed(2)))
            setpop_h2(data.hourly[2].pop)

            seticon_h3(data.hourly[3].weather[0].icon)
            setweather_h3(data.hourly[3].weather[0].description)
            settemp_h3((((data.hourly[3].temp) - 273.15).toFixed(2)))
            setpop_h3(data.hourly[3].pop)
          });
  }, []);

const curHour = new Date().getHours();

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

          {WeatherCell(curHour+1, icon_h0, weather_h0, temp_h0, pop_h0, '-20vh')}

          {WeatherCell(curHour+2, icon_h1, weather_h1, temp_h1, pop_h1, '10vh')}

          {WeatherCell(curHour+3, icon_h2, weather_h2, temp_h2, pop_h2, '40vh')}

          {WeatherCell(curHour+4, icon_h3, weather_h3, temp_h3, pop_h3, '70vh')}

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
          Sunrise: {fmtSunrise}
        </div>

        <div className="WeatherExtraInfoContainer" style={{marginTop:'74vh'}}>
          Sunset: {fmtSunset}
        </div>
      </div>
    </main>
  );


}