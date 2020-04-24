import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "./components/Home";
import { SearchPage } from "./components/SearchPage";
import { Profile } from "./components/Profile";
import { Map as GeoMap } from "./components/Map";
import { Cart } from "./components/Cart";
import { SearchResult } from './components/SearchResult';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/map" component={(props) => <GeoMap {...props} title="Map" />} />
                <Route exact path="/cart" component={(props) => <Cart {...props} title="Your cart" />} />
                <Route exact path="/" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/searchpage" component={SearchPage} />
                <Route path="/search" component={SearchResult} />
            </Switch>
        </>
    );
}

export default App;
