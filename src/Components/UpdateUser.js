import React, {Component, useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {useHistory } from "react-router-dom";

export default function UpdateUser() {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");
    const history = useHistory();
    const apiBaseUrl = process.env.REACT_APP_DEMO_API;

    useEffect(() =>{
        onLoad();
            setBaseUserFields();
        }, []);
    
    //Simply sets the sucess message, then unsets it after 3 seconds.
    function setSucessMessageWithFade(message){
        setSucessMessage(message);
        setTimeout(function() {
            setSucessMessage('');
        }, 3000);
    }

    function onLoad(){
        //Do something on load?
    }

    async function setBaseUserFields(){
        axios.get(apiBaseUrl+'user/get-by-user-id/'+loggedInUserId).then( res =>{
            setFirstName(res.data[0].FirstName);
            setLastName(res.data[0].LastName);
            setPhone(res.data[0].Phone);
            setEmail(res.data[0].Email);
            setPassword(res.data[0].Password);
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        axios.put(apiBaseUrl+'user/put', 
            {
                "FirstName" : firstName,
                "LastName" : lastName,
                "Email" : email,
                "Phone" : phone,
                "Password" : password,
                "UserId" : loggedInUserId
            }
        ).then(res =>{ 
            setSucessMessageWithFade("Update Sucessful");
        });
    }

    function validateForm(){
        return firstName.length > 0 && lastName.length > 0;
    }
    
    return(
        <div className="UpdateUser">
            <h3>Update your basics if you want</h3>
            <Form onSubmit = {handleSubmit}>
                <Form.Group size="md" controlId="firstName">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                        autoFocus
                        type="name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="md" controlId="lastName">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                        autoFocus
                        type="name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        autoFocus
                        type="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>
                <div className='errorMessage'>{errorMessage}</div>
                <div className='errorMessage'>{errorMessage}</div>
                <Button size = "md" type="submit" disabled={!validateForm()}>
                    Update
                </Button>
                <div className='successMessage'>{sucessMessage}</div>
            </Form>
        </div>
        
    )
}