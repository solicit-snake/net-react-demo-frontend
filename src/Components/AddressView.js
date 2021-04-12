import React, {Component, useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import NewAddress from './NewAddress';
import SingleAddress from './SingleAddress';

export default function AddressView() {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const apiBaseUrl = process.env.REACT_APP_DEMO_API;

    const [loadedAddresses, setLoadedAddresses] = useState(false);
    const [userAddressArray, setUserAddressArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [sucessMessage, setSucessMessage] = useState("");
    
    useEffect(() =>{
            onLoad();
        }, []);
    
    async function getUsersAddresses(){
        axios.get(apiBaseUrl+'address/get-by-user-id/'+loggedInUserId).then(res => {
            console.log(res);
            setUserAddressArray(res.data);
            console.log("logging user addy arr");
            console.log(userAddressArray);
            console.log(res.data);
            setLoadedAddresses(true);
            console.log('this tots called');

        });
    }
    function addCallbackToSubmitAddress(){
        
            console.log(document.getElementById("submitAddressButton"));
    };
    function onLoad(){
        //Do something on load?
        //Get all addresses associated with this user
        getUsersAddresses();
        addCallbackToSubmitAddress();
    }

    //Simply sets the sucess message, then unsets it after 3 seconds.
    function setSucessMessageWithFade(message){
        setSucessMessage(message);
        setTimeout(function() {
            setSucessMessage('');
        }, 3000);
    }

    
    return(
        loadedAddresses &&(
            <div className="AddressViewContainer">
                {/* <SingleAddress value ="yeet"/>  */}
                <div className="addressDisplayFormContainer">
                    <h3> Your Existing Addresses</h3>
                    {console.log('logging address array le')}
                    {console.log(userAddressArray.length)}
                    {console.log(userAddressArray.typeof)}
                    {userAddressArray.length >= 0 && !userAddressArray.includes("Rows Affected") ? (userAddressArray.map(function(value, index) {
                        return (
                            <SingleAddress 
                            key={index}    
                            refreshUsersAddresses={getUsersAddresses}
                                addressData = {userAddressArray[index]}/>
                        )
                    })) : ( <p>0 - submitted addresses? :(</p>)}
                    
                </div>
                
                <NewAddress refreshUsersAddresses={getUsersAddresses}/>
            </div>
        )
    )
}