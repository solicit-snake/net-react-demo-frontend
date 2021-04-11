import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";

export default function Routes(){
    return(
        <Switch>
            {/* Home/Default Page Router, TODO: add a check to see if they are logged in. */}
            <Route exact path = "/">
                <Login/>
            </Route>
            {/* Route to the login page */}
            <Route exact path = "/login">
                <Login/>
            </Route>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}