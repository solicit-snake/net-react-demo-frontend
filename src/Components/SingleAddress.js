import React, {Component, useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export default function SingleAddress() {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const apiBaseUrl = process.env.REACT_APP_DEMO_API;

    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");
    
    useEffect(() =>{
        onLoad();
        }, []);

    function onLoad(){
        //Do something on load?
        //Get all addresses associated with this user
    }

    //Simply sets the sucess message, then unsets it after 3 seconds.
    function setSucessMessageWithFade(message){
        setSucessMessage(message);
        setTimeout(function() {
            setSucessMessage('');
        }, 3000);
    }
    
    return(
        <div>
            a single address

        </div>
    )
}