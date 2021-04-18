import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import React from 'react';
import { render } from "react-dom";

export function LandingPage() {
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

export function RegisterPage() {
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

export function ResetPass() {
  
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