import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Login } from "./auth/Login";
import { Signup } from "./auth/Signup";

export const Auth = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/login" />
        </Switch>
    );
};
