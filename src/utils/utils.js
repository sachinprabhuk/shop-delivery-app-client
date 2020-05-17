import geohash from "ngeohash";
import { MAXIMUM_DELIVERY_DISTANCE_MILES } from "../constants/constants";

export const firstLetterToUpperCase = (str) => {
    if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
};

export const getLowerAndUpperGeoHashFor = (latitude, longitude) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile
    const maxDistance = MAXIMUM_DELIVERY_DISTANCE_MILES;

    const lowerLat = latitude - lat * maxDistance;
    const lowerLon = longitude - lon * maxDistance;

    const upperLat = latitude + lat * maxDistance;
    const upperLon = longitude + lon * maxDistance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);

    return {
        lower,
        upper,
    };
};

export const isUserInShopDeliverRange = (shop, latitude, longitude) => {
    const dist = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        shop.location.latitude,
        shop.location.longitude
    );
    return dist <= shop.range;
};

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
};

export const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};
