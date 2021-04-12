import React, {Component, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Cookies2 from 'js-cookie';
import bcrypt from 'bcryptjs';
import { useAppContext } from "../libs/contextLib";
import {useHistory } from "react-router-dom";

export default function Register(){
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {userHasAuthenticated} = useAppContext(); 
    const history = useHistory();
    const apiBaseUrl = process.env.REACT_APP_DEMO_API;

    async function handleSubmit(event){
        event.preventDefault();

        //First check if this email exist already
        axios.get(apiBaseUrl+'user/get-by-email/'+email).then( res =>{
            //If their email doesn't exist (there's no user result);
            if(typeof res.data === 'string'){
                setErrorMessage("");
                //Post user account.
                axios.post(apiBaseUrl+'user/post', 
                    {
                        "FirstName" : firstName,
                        "LastName" : lastName,
                        "Email" : email,
                        "Phone" : "",
                        "Password" : bcrypt.hashSync(password, 10)
                    }
                ).then(res =>{
                    //When the user has posted sucessfully to db.
                    //Get the users id and store it to local
                    axios.get(apiBaseUrl+'user/get-by-email/'+email).then( res =>{
                        var in15Mins = 1/96;
                        Cookies2.set('loggedIn', 'true', {expires: in15Mins})
                        console.log(Cookies2.get('loggedIn'));
                        
                        userHasAuthenticated(true);
                        localStorage.setItem('loggedInUser', JSON.stringify(res.data[0]));
                        history.push('/');
                    });

                    
                });

            }
            //Else, the email already exist in db 
            else{
                setErrorMessage("Account with this email already exists");
            }
        });
    }

    function validateForm(){
        return email.length > 0 && password.length > 0 && firstName.length > 0 && lastName.length > 0;
    }
    
    return(
        <div className="Login">
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
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                        autoFocus
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div class='errorMessage'>{errorMessage}</div>
                <Button block size = "lg" type="submit" disabled={!validateForm()}>
                    Register
                </Button>
            </Form>
        </div>
    )
}