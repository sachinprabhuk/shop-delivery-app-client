import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import geohash from "ngeohash";
import { withGoBackTopNav } from "../../HOC/NavHOC";
import { LocationOn } from "@material-ui/icons";
import { db } from "../../../firebase";
import { SHOPS_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { getLowerAndUpperGeoHashFor } from "../../../utils/utils";
import { MapPopup } from "./MapPopup";
import { Snackbar } from "@material-ui/core";

// Pass only the initial latitude and longitude, rest is handled by map itself
export const Map = withGoBackTopNav(() => {
    const [viewport, setViewport] = useState({
        latitude: 13.3294,
        longitude: 74.7579,
        zoom: 10,
        width: "100%",
        height: "100%",
    });
    const [searchingShops, setSearchingShops] = useState(true);
    const [selectedShop, setSelectedShop] = useState(null);
    const [shops, setShops] = useState(null);

    const [error, setError] = useState(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    useEffect(() => {
        const keyDownListener = (e) => {
            if (e.key === "Escape") {
                setSelectedShop(null);
            }
        };
        window.geohash = geohash;

        const getShopsNearUserLocation = async ({ coords: { latitude, longitude } }) => {
            const { lower, upper } = getLowerAndUpperGeoHashFor(latitude, longitude);
            try {
                const rawData = await db
                    .collection(SHOPS_COLLECTION)
                    .where("geohash", ">=", lower)
                    .where("geohash", "<=", upper)
                    .get();

                if (rawData && rawData.docs.length !== 0) {
                    const data = rawData.docs.map((rdata) => {
                        const el = rdata.data();
                        return {
                            id: rdata.id,
                            name: el.name,
                            address: el.address,
                            location: {
                                latitude: el.coordinates.Pc,
                                longitude: el.coordinates.Vc,
                            },
                        };
                    });
                    setShops(data);
                } else {
                    setError("No shops found around your location!!");
                    setSnackBarOpen(true);
                }
            } catch (e) {
                console.log(e);
                setError("Ooops!! something went wrong!!");
                setSnackBarOpen(true);
            }
            setSearchingShops(false);
        };

        window.addEventListener("keydown", keyDownListener);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getShopsNearUserLocation);
        } else {
            setSearchingShops(false);
        }

        return () => {
            window.removeEventListener("keydown", keyDownListener);
        };
    }, []);

    let toRender = <Loader fullPage message="Searching shops near you..." />;
    if (!searchingShops) {
        toRender = (
            <div style={{ width: "100vw", height: "100vh" }}>
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
                    onViewportChange={(viewport) => setViewport(viewport)}
                    mapStyle="mapbox://styles/sachin-prabhu-k/ck92le4qq29x91iocvve280t5"
                >
                    {shops &&
                        shops.map((shop) => {
                            const location = shop.location;
                            return (
                                <Marker key={shop.id} {...location}>
                                    <button
                                        className="marker-btn"
                                        onClick={() => setSelectedShop(shop)}
                                    >
                                        <LocationOn style={{ color: "red" }} fontSize="large" />
                                    </button>
                                </Marker>
                            );
                        })}
                    {selectedShop && (
                        <MapPopup
                            selectedShop={selectedShop}
                            closeClicked={() => {
                                console.log("close called");
                                setSelectedShop(null);
                            }}
                        />
                    )}
                </ReactMapGL>
            </div>
        );
    }

    return (
        <>
            {toRender}
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={snackBarOpen}
                onClose={() => {
                    setSnackBarOpen(false);
                    setError(null);
                }}
                autoHideDuration={5000}
                message={error}
            />
        </>
    );
});
