import React, {Component, useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Col, Row} from 'react-bootstrap';

const NewAddress = (props) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const apiBaseUrl = process.env.REACT_APP_DEMO_API;
    const [street, setStreet] = useState("");
    const [suburb, setSuburb] = useState("");
    const [state, setState] = useState("");
    const [postcode, setPostcode] = useState("");
    const [country, setCountry] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");
    
    useEffect(() =>{
        onLoad();
        }, []);

    function onLoad(){
        //Do something on load?
        
    }

    function validateForm(){
        return street.length > 0 && suburb.length > 0 && state.length > 0 && postcode.length > 0 && country.length > 0;
    }

    //Simply sets the sucess message, then unsets it after 3 seconds.
    function setSucessMessageWithFade(message){
        setSucessMessage(message);
        setTimeout(function() {
            setSucessMessage('');
        }, 3000);
    }

    async function handleSubmit(event){
        event.preventDefault();

        axios.post(apiBaseUrl+'address/post', {
            "UserId" : loggedInUserId,
            "Street" : street,
            "Suburb" : suburb,
            "State" : state,
            "Postcode" : postcode,
            "Country" : country
        }).then(res=>{
            props.refreshUsersAddresses();
        });

        //On sucessfull post, reset fields and add sucess message.
        setStreet("");
        setSuburb("");
        setState("");
        setPostcode("");
        setCountry("");
        setSucessMessageWithFade("Added New Address");
    }
    
    return(
        <div>
            <h3 className="newAddressTitle">New address:</h3>
                <Form onSubmit = {handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group size ='lg' controlId='street'>
                                <Form.Label>Street *</Form.Label>
                                <Form.Control
                                    autoFocus
                                    as="textarea"
                                    rows={2}
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group size ='lg' controlId='suburb'>
                                    <Form.Label>Suburb *</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={suburb}
                                        onChange={(e) => setSuburb(e.target.value)}
                                    />
                                </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group size ='lg' controlId='state'>
                                    <Form.Label>State *</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                            <Form.Group size ='lg' controlId='postcode'>
                                    <Form.Label>Postcode *</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={postcode}
                                        onChange={(e) => setPostcode(e.target.value)}
                                    />
                                </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group size ='lg' controlId='country'>
                                    <Form.Label>Country *</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </Form.Group>
                        </Col>
                    </Row>
                    <div className='errorMessage'>{errorMessage}</div>
                    <Button id="submitAddressButton" size="md" type="submit" disabled={!validateForm()}>
                        Submit
                    </Button>
                    <div className='successMessage'>{sucessMessage}</div>
                    </Form>

        </div>
    )
}

export default NewAddress;