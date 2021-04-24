import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';
import $ from 'jquery'; 

window.agenda = [];

// The agenda displays the events selected by the user

function deleteAgendaItem(val) {
    $("#delete" + val.data.parameter).remove();

    var nameIndex = -1;
    for (var agendaInd in window.agenda)
    {
      if (window.agenda[agendaInd].param === val.data.name)
      {
        nameIndex = agendaInd;
        break;
      }
    }

    if (nameIndex != -1)
      window.agenda.splice(nameIndex, 1);

    var mostRecentEventString = "No Events!";
    var typeString = "";
    if (window.agenda.length > 0)
    {
      mostRecentEventString = window.agenda[0].param;
      typeString = window.agenda[0].types;
    }

    $('.EventPreview').html('<div> <h3>' + mostRecentEventString + '</h3> </div>');
    $('.tabDescriptions').html('<div> <h3>' + typeString + '</h3> </div>');
}


function addToAgendaNonEvent(number, types, param)
{
  $('.DetailedDescriptionsHalfLeft').append('<button class = "buttonsblue" id = delete'+ number + '>'+ param + '</button>');
  $('.tabDescriptions').html('<div> <h3>' + types+ '</h3> </div>');
  $('.EventPreview').html('<div> <h3>' + param + '</h3> </div>');
  $("#delete" + number).click({parameter: number, name: param}, deleteAgendaItem);
}

function addToAgenda(val) {
  if ( $( "#delete" + val.data.number ).length ) { return; }
  
  addToAgendaNonEvent(val.data.number, val.data.types, val.data.param);

  window.agenda.unshift({number: val.data.number, types: val.data.types, param: val.data.param});
}

// function to manage the events page
export function EventsPage() {
  
  // Repopulate agenda with state
  for (var agendaInd in window.agenda)
  {
    const i = window.agenda.length - agendaInd - 1; // Go backwards
    addToAgendaNonEvent(window.agenda[i].number, window.agenda[i].types, window.agenda[i].param);
  }

  var EventsList = getEventsList(window.markerPos.lat, window.markerPos.lng, window.radiusRange, window.budgetRange);
  $('.DetailedDescriptionsHalfRightBlue').html('');
  for (var i = 0; i < EventsList.length; i++) {
    var unique_id = i.toString();
        $('.DetailedDescriptionsHalfRightBlue').append('<button class = "buttonsblue" id ='+ unique_id + '>' + EventsList[i]["name"] + '</button>');
    
    
    var tagList = [];
    for (var tagInd in EventsList[i]["types"]) {
      tagList.push(" " + EventsList[i]["types"][tagInd].replace(/_/g, " ")); 
    }
    // cleans up the list of types returned from the google places api call associated with each event
    
    $("#" + unique_id).click({param:EventsList[i]["name"], number:unique_id, types: tagList },addToAgenda)
 
  }

  var mostRecentEventString = "No Events!";
  // variable keeping track of the most recently added event to agenda - used for routing
  var typeString = "";
  if (window.agenda.length > 0)
  {
    mostRecentEventString = window.agenda[0].param;
    typeString = window.agenda[0].types;
  }

  return (
    <main id = "eventsPage">
      <div className="tabDescriptions">
        <h3>
          {typeString}
        </h3>
      </div>

      <div className="EventPreview">
        <h3>
          {mostRecentEventString}
        </h3>
      </div>

      <div className="DetailedDescriptionsHalfLeft" style={{flexDirection: "column", overflowY: "scroll"}}>
        
      </div>

      <div className="DetailedDescriptionsHalfRightBlue" style={{overflowY: "scroll"}}>
      <div></div>
      </div>
    </main>
            
  );
}
// returns list of events
// events stored as dicts in format:
// { "lat": 0, 
//   "lng" : 0, 
//   "icon": gstatic.xyz, 
//   "name": "Maccas", 
//   "price_level"= 1, 
//   types: ["point_of_interest", "restaurant"] }

function getEventsList(lat, lng, radius, maxprice) {
//google places api

  const API_KEY = "AIzaSyCZcwH-NnFyNQfcwmvo7pMJR0whYgB3vqk";
  const TYPE = "point_of_interest";
  // use point_of_interest as the event to fiter events
  const BASE_URL = "https://murmuring-mesa-57812.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  // murmuring-mesa used for CORS proxying

  var apiUrl = BASE_URL + "key=" + API_KEY + "&radius=" + radius + "&location=" + lat + "," + lng + "&type=" + TYPE + "&maxprice=" + maxprice;

  const [unfilteredEventsList, setUnfilteredEventsList] = useState([]);
  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => setUnfilteredEventsList(data.results));
          // fulfill the promise!
  }, []);
  console.log(unfilteredEventsList);

  var filteredEventsList = [];

  for (var i = 0; i < unfilteredEventsList.length; i++) {
      var d = {};
      d["name"] = unfilteredEventsList[i].name;
      d["icon"] = unfilteredEventsList[i].icon;
      d["price_level"] = unfilteredEventsList[i].price_level;
      d["lat"] = unfilteredEventsList[i].geometry.location.lat;
      d["lng"] = unfilteredEventsList[i].geometry.location.lng;
      d["types"] = unfilteredEventsList[i].types;

      filteredEventsList.push(d);
  }

  return filteredEventsList;

}

