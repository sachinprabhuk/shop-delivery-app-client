import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

// Pass only the initial latitude and longitude, rest is handled by map itself
export const Map = ({ shops, latitude, longitude }) => {
    const [viewport, setViewport] = useState({
        latitude,
        longitude,
        zoom: 10,
        width: "100%",
        height: "100%",
    });

    const [selectedShop, setSelectedShop] = useState(null);

    useEffect(() => {
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
                            <img src="/assets/marker-red.svg" alt="Here" />
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
    );
};
