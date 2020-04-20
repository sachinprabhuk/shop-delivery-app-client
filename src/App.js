import React from "react";
import { BottomNav } from "./components/navigations/BottomNav";
import { Route, Switch } from "react-router";
import { Home } from "./components/Home";
import { Search } from "./components/search/Search";
import { Profile } from "./components/Profile";
import { TopBar } from "./components/navigations/TopBar";
import { Map as GeoMap } from "./components/Map";
import { Cart } from "./components/Cart";
import Dashboard from './components/owner/dashboard'
function App() {
    return (
        <>
            <Switch>
                <Route exact path="/map" component={(props) => <GeoMap {...props} title="Map" />} />
                <Route exact path="/cart" component={(props) => <Cart {...props} title="Your cart" />} />
                <Route exact path="/" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/search" component={Search} />
				<Route path = "/owner" component={Dashboard} />
            </Switch>
        </>
    );
}

export default App;
