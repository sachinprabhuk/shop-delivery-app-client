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
        lower, upper
    }
}