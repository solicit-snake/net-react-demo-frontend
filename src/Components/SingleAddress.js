import React, {Component, useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Col, Row} from 'react-bootstrap';

const SingleAddress = (props) =>{
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const apiBaseUrl = process.env.REACT_APP_DEMO_API;

    const [street, setStreet] = useState(props.addressData.Street);
    const [suburb, setSuburb] = useState(props.addressData.Suburb);
    const [state, setState] = useState(props.addressData.State);
    const [postcode, setPostcode] = useState(props.addressData.Postcode);
    const [country, setCountry] = useState(props.addressData.Country);
    const [addressId, setAddressId] = useState(props.addressData.AddressId);

    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");
    
    useEffect(() =>{
        onLoad();
        }, []);

    function onLoad(){
        //Do something on load?
        //Get all addresses associated with this user
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
        console.log('WOW!')

        axios.put(apiBaseUrl+'address/put', {
            "AddressId" : addressId,
            "Street" : street,
            "Suburb" : suburb,
            "State" : state,
            "Postcode" : postcode,
            "Country" : country
        }).then(res=>{
            setSucessMessageWithFade("Update Sucessful");
        });
    }

    async function deleteAddress(){
        axios.delete(apiBaseUrl+'address/delete-by-address-id/'+addressId).then(res=>{
            props.refreshUsersAddresses();
        })
    }
    
    return(
        <div>
            <Form className="addressDisplayForm" onSubmit = {handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group size ='sm' controlId='street'>
                                <Form.Label>Street *</Form.Label>
                                <Form.Control
                                    autoFocus
                                    as="textarea"
                                    rows={1}
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group size ='sm' controlId='suburb'>
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
                            <Form.Group size ='sm' controlId='state'>
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
                            <Form.Group size ='sm' controlId='postcode'>
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
                            <Form.Group size ='sm' controlId='country'>
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
                    <div className='successMessage'>{sucessMessage}</div>
                    <Button className="singleAddressButtons" size="sm" type="submit" disabled={!validateForm()}>
                        Update
                    </Button>
                    <Button className="singleAddressButtons btn-danger" onClick={()=>deleteAddress()} size="sm" disabled={!validateForm()}>
                        Delete
                    </Button>
                    </Form>

        </div>
    )
}

export default SingleAddress;