import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { Cart } from "./app/Cart";
import { Home } from "./app/Home";
import { Map as GeoMap } from "./app/Map";
import { Profile } from "./app/Profile";
import { SearchMain } from "./app/search/SearchMain";
import { SearchPage } from "./app/SearchPage";

export const App = () => {
    return (
        <Switch>
            <Route exact path="/map" component={(props) => <GeoMap {...props} title="Map" />} />
            <Route
                exact
                path="/cart"
                component={(props) => <Cart {...props} title="Your cart" />}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/search" component={SearchMain} />
            <Route exact path="/searchpage" component={SearchPage} />
            <Route exact path="/404" render={() => <h1>404 :(</h1>} />
            <Redirect to="/" />
        </Switch>
    );
};