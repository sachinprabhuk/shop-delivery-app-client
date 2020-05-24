import { useEffect, useState, useReducer } from "react";

const STARTED_FETCHING = "STARTED_FETCHING";
const SUCCESS_FETCH = "SUCCESS_FETCH";
const FAILURE_FETCH = "FAILURE_FETCH";

const reducer = (state, action) => {
    switch (action.type) {
        case SUCCESS_FETCH:
            return { ...state, fetching: false, data: action.payload, error: null };
        case FAILURE_FETCH:
            return { ...state, fetching: false, data: null, error: action.payload };
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};

export const useFetch = (url, errorMessage = "Error while fetching data...") => {
    const [{ fetching, error, data }, dispatch] = useReducer(reducer, {
        data: null,
        fetching: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await fetch(url);
                const textData = await rawData.text();
                dispatch({
                    type: SUCCESS_FETCH,
                    payload: textData,
                });
            } catch (e) {
                dispatch({
                    type: FAILURE_FETCH,
                    payload: errorMessage,
                });
            }
        };
        fetchData();
    }, [url, errorMessage]);
    return [fetching, error, data];
};
