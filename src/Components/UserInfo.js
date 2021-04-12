import React, {Component, useEffect, useState} from 'react';
import { useAppContext } from "../libs/contextLib";
import {useHistory } from "react-router-dom";


export default function UserInfo() {

    const {isAuthenticated} = useAppContext();
    const history = useHistory(); 

    useEffect(() =>{
        onLoad();
        }, []);

    function onLoad(){
        console.log('onloading')
        console.log(isAuthenticated);
        if(!isAuthenticated){
            history.push('/login');
        }
    }
    
    return(
        <div className="mt-5 d-flex justify-content-left">
            This is the user info comp
        </div>
    )
}