import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

// Pass only the initial latitude and longitude, rest is handled by map itself
export const Map = ({ latitude, longitude, locations }) => {
    const [viewport, setViewport] = useState({
        latitude,
        longitude,
        zoom: 10,
        width: "100%",
        height: "100%",
    });

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapStyle="mapbox://styles/sachin-prabhu-k/ck92le4qq29x91iocvve280t5"
        >
            {locations.map((location, index) => {
                return (
                    <Marker key={index} {...location}>
                        <button className="marker-btn">
                            <img src="/assets/marker-red.svg" alt="Here" />
                        </button>
                    </Marker>
                );
            })}
        </ReactMapGL>
    );
};
