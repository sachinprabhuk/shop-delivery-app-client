import React from "react";
import { BottomNav } from "./components/navigations/BottomNav";
import { Route } from "react-router";
import { Home } from "./components/Home";
import { Search } from "./components/search/Search";
import { Profile } from "./components/Profile";
import { Container } from "react-bootstrap";

// const shops = [
//     { id: 1, name: "shop 1", location: { latitude: 13.3294, longitude: 74.7579 } },
//     { id: 2, name: "shop 2", location: { latitude: 13.391, longitude: 74.712 } },
// ];

function App() {
    return (
        <>
            <Container>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route exact path="/profile" component={Profile} />
            </Container>
            <BottomNav />
        </>
    );
}

export default App;
