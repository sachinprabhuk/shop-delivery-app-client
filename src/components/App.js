import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { Cart } from "./app/cart/Cart";
import { Home } from "./app/Home";
import { Map as GeoMap } from "./app/map/Map";
import { Profile } from "./app/Profile";
import { SearchPage } from "./app/SearchPage";
import { ShopDetails } from "./app/details/ShopDetails";
import { ProductDetails } from "./app/details/ProductDetails";
import { SearchInput } from "./app/search/SearchInput";
import { SearchResultPage } from "./app/search/SearchResultPage";
import { MyOrders } from "./app/myorders/MyOrders";

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
            <Route exact path="/search/:type/:query" component={SearchResultPage} />
            <Route exact path="/search/:type" component={SearchInput} />
            <Route exact path="/searchpage" component={SearchPage} />
            <Route exact path="/details/shop/:id" component={ShopDetails} />
            <Route exact path="/details/product/:id" component={ProductDetails} />
            <Route
                exact
                path="/orders"
                component={(props) => <MyOrders title="Your orders" {...props} />}
            />
            <Route exact path="/404" render={() => <h1>404 :(</h1>} />
            <Redirect to="/" />
        </Switch>
    );
};
