import React, {Component, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Cookies2 from 'js-cookie';
import { useAppContext } from "../libs/contextLib";
import {useHistory } from "react-router-dom";
import bcrypt from 'bcryptjs';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {userHasAuthenticated} = useAppContext(); 
    const history = useHistory();
    const apiBaseUrl = process.env.REACT_APP_DEMO_API;
    
    // const apiToucher = new ApiToucher(process.env.NET_REACT_DEMO_API);

    function validateForm(){
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();

        try{
            axios.get(apiBaseUrl+'user/get-by-email/'+email).then( res =>{
                //If the email doesn't exist in DB:
                if(typeof res.data === 'string'){
                    setErrorMessage("Details Incorrect");
                } else{ 
                    //Email exists
                    console.log(res.data);
                    //If password is correct
                    //If password.bcrypt == res.data.pw
                    if(bcrypt.compareSync(password, res.data[0].Password)){
                        console.log('RIGHT PASSWORD!');
                        setErrorMessage("");
                        //Save the user ID item to local storage, as well as a cookie that epires in 15 mins.
                        var in15Mins = 1/96;
                        Cookies2.set('loggedIn', 'true', {expires: in15Mins})
                        console.log(Cookies2.get('loggedIn'));

                        userHasAuthenticated(true);
                        localStorage.setItem('loggedInUser', JSON.stringify(res.data[0]));
                        history.push('/')
                    }
                    //Password was incorrect
                    else{
                        setErrorMessage("Details Incorrect");
                        console.log("WRONG PASSWORD!");
                    }
                }
                
            })
        } catch(e){

        }
    }
    
    return(
            <div className="Login">
                <Form onSubmit = {handleSubmit}>
                 <Form.Group size ='lg' controlId='email'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                 </Form.Group>
                 <Form.Group size="lg" controlId="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                 </Form.Group>
                 <div class='errorMessage'>{errorMessage}</div>
                 <Button block size="lg" type="submit" disabled={!validateForm()}>
                     Login
                 </Button>
                </Form>
            </div>
        )
}