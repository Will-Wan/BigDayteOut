import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';

export function EventsPage() {
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