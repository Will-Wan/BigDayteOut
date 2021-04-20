import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';

export function EventsPage() {
  
  var EventsList = getEventsList(-33.8943, 151.2330, 1000, 1000);
  var business1 = EventsList[0]["name"];

  // const [business1, setbusiness1] = useState(null);
  // useEffect(() => {
  //     fetch('https://murmuring-mesa-57812.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8943,151.2330&radius=1000&type=restaurant&keyword=attractions&key=AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk&maxprice=1000')
  //         .then(response => response.json())
  //         .then(data => 
  //         {
  //           setbusiness1(data.results[0].geometry.location.lat)
  //           console.log("data", data.results)
  //         });
  // }, []);

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
        {business1} asfasfa

      </div>
      <div className="DetailedDescriptionsHalfRightBlue">
        Put the events generated in here
      </div>
    </main>
  );
}

// returns list of events
// events stored as dicts in format:
// { "lat": 0, "lng" : 0, "icon": gstatic.xyz, "name": Maccas, "price_level"= 1}



function getEventsList(lat, lng, radius, maxprice) {
//google places api

  const API_KEY = "AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk";
  const KEYWORD = "attractions";
  const BASE_URL = "https://murmuring-mesa-57812.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?"

  var apiUrl = BASE_URL + "key=" + API_KEY + "&radius=" + radius + "&location=" + lat + "," + lng + "&keyword=" + KEYWORD + "&maxprice=" + maxprice;
  //console.log("XXXXXXXXX", apiUrl);

  const [unfilteredEventsList, setUnfilteredEventsList] = useState(null);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch("https://murmuring-mesa-57812.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8943,151.2330&radius=1000&type=restaurant&keyword=attractions&key=AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk&maxprice=1000")
          .then(response => response.json())
          .then(data => 
            setUnfilteredEventsList(data.results)
          });
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  var filteredEventsList = [];
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA", unfilteredEventsList);

  for (var i = 0; i < unfilteredEventsList.length; i++) {
      var d = {};
      d["name"] = unfilteredEventsList[i].name;
      console.log(d["name"]);
      d["icon"] = unfilteredEventsList[i].icon;
      d["price_level"] = unfilteredEventsList[i].price_level;
      d["lat"] = unfilteredEventsList[i].location.geometry.lat;
      d["lng"] = unfilteredEventsList[i].location.geometry.lng;

      filteredEventsList.push(d);
  }

  return filteredEventsList;
  
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=300&type=restaurant&keyword=cruise&key=AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk
}

