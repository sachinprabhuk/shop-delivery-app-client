import React from "react";
import { Map } from "./components/Map";

const locations = [
    { latitude: 13.3294, longitude: 74.7579 },
    { latitude: 13.391, longitude: 74.712 },
];

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Map latitude={13.3363} longitude={74.7464} locations={locations} />
        </div>
    );
}

export default App;
