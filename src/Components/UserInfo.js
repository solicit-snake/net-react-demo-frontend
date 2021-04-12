import React, {Component, useEffect, useState} from 'react';
import { useAppContext } from "../libs/contextLib";
import {useHistory } from "react-router-dom";
import UpdateUser from './UpdateUser';
import AddressView from './AddressView';


export default function UserInfo() {

    
    const {isAuthenticated} = useAppContext();
    const history = useHistory(); 

    useEffect(() =>{
        onLoad();
        }, []);

    function onLoad(){
        //If not authed -push to login
        if(!isAuthenticated){
            history.push('/login');
        }
    }
    
    return(
        <div className="userInfoContainer">
            <UpdateUser/>
            <AddressView/>
        </div>
    )
}