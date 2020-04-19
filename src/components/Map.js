import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { withGoBackTopNav } from "./HOC/NavHOC";
import { LocationOn } from "@material-ui/icons";

const shops = [
    { id: 1, name: "shop 1", location: { latitude: 13.3294, longitude: 74.7579 } },
    { id: 2, name: "shop 2", location: { latitude: 13.391, longitude: 74.712 } },
];

// Pass only the initial latitude and longitude, rest is handled by map itself
export const Map = withGoBackTopNav(() => {
    const [viewport, setViewport] = useState({
        latitude: 13.3294,
        longitude: 74.7579,
        zoom: 10,
        width: "100%",
        height: "100%",
    });

    const [selectedShop, setSelectedShop] = useState(null);

    useEffect(() => {
        console.log("hey");

        const keyDownListener = (e) => {
            if (e.key === "Escape") {
                setSelectedShop(null);
            }
        };

        window.addEventListener("keydown", keyDownListener);

        return () => {
            window.removeEventListener("keydown", keyDownListener);
        };
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
                onViewportChange={(viewport) => setViewport(viewport)}
                mapStyle="mapbox://styles/sachin-prabhu-k/ck92le4qq29x91iocvve280t5"
            >
                {shops.map((shop) => {
                    const location = shop.location;
                    return (
                        <Marker key={shop.id} {...location}>
                            <button className="marker-btn" onClick={() => setSelectedShop(shop)}>
                                <LocationOn style={{ color: 'red'}} fontSize="large" />
                            </button>
                        </Marker>
                    );
                })}
                {selectedShop && (
                    <Popup {...selectedShop.location} onClose={() => setSelectedShop(null)}>
                        <div>
                            <h3>name : {selectedShop.name}</h3>
                            <p>more info...</p>
                            <p>{"url here to redirect to that shop"}</p>
                        </div>
                    </Popup>
                )}
            </ReactMapGL>
        </div>
    );
});
