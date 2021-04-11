import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";

export default function Routes(){
    return(
        <Switch>
            <Route exact path = "/">
                <Login/>
            </Route>
            <Route exact path = "/login">
                <Login/>
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}