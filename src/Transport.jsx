import './App.css';
import './map.css'
import React, { useState, useEffect } from 'react';

export function TransportPage() {

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