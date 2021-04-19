import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';

export function EventsPage() {
  useEffect(() => {
      fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8943,151.2330&radius=3000&type=restaurant&keyword=attractions&key=AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk&maxprice=400')
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

      <div className="DetailedDescriptionsHalfLeft">
        agenda planner will be here 

      </div>
      <div className="DetailedDescriptionsHalfRightBlue">
        Put the events generated in here
      </div>

{/* 
      <div className="eventContainer">




      
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
      */} 
    </main>
  );
}

function getEventsList(lat, lng, radius, maxprice) {
//google places api

  const API_KEY = "AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk";
  const KEYWORD = "attractions";
  const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"

  apiUrl = BASE_URL + "key=" + API_KEY + "&radius=" + radius + "&location=" + lat + "," + lng + "&keyword=" + KEYWORD + "&maxprice=" + maxprice;

  const [unfilteredEventsList, setUnfilteredEventsList] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => console.log(data));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=300&type=restaurant&keyword=cruise&key=AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk
}