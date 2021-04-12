import React, {Component, useEffect, useState} from 'react';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import {useHistory } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import Cookies2 from 'js-cookie';
require('dotenv').config();

// import Nav from "react-bootstrap/Nav";

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  function handleLogout(){
    userHasAuthenticated(false);
    Cookies2.remove('loggedIn');
    history.push('/login');
    localStorage.removeItem('loggedInUserId');
  }

  useEffect(() =>{
    onLoad();
  }, []);

  async function onLoad(){
    if(Cookies2.get("loggedIn")){
      userHasAuthenticated(true);
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&( 
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        
        {/* link to dif thing in this button depending on if they are logged in or not */}
        <LinkContainer to={isAuthenticated ? ("/login") : ("/login")}>
          <Navbar.Brand className="font-weight-bold text-muted">
            Kyles .net and react demo
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
              <LinkContainer to="/signup"> 
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
        <Routes />
      </AppContext.Provider>
      
    </div>
    )
  );
}

export default App;
