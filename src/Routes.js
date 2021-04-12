import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Components/NotFound";
import UserInfo from "./Components/UserInfo";

export default function Routes(){
    return(
        <Switch>
            {/* Home/Default Page Router, TODO: add a check to see if they are logged in. */}
            <Route exact path = "/">
                <UserInfo/>
            </Route>
            {/* Route to the login page */}
            <Route exact path = "/login">
                <Login/>
            </Route>
            {/* Route to the login page */}
            <Route exact path = "/register">
                <Register/>
            </Route>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}