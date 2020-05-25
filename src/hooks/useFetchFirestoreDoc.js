import { useEffect, useReducer, useCallback } from "react";
import { db } from "../firebase";
import { FAILURE_FETCH, SUCCESS_FETCH } from "../constants/constants";

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

export const useFetchFirestoreDoc = (path, fetchImmediately = true) => {
    const [{ fetching, error, data }, dispatch] = useReducer(reducer, {
        data: null,
        fetching: true,
        error: null,
    });

    const fetchData = useCallback(async () => {
        console.log(`fetching data for docid: ${path}`);
        try {
            let data = await db.doc(path).get();
            data = processDocument(data);

            if (!data) {
                dispatch({
                    type: FAILURE_FETCH,
                    payload: "Oops! something went wrong",
                });
            } else {
                dispatch({
                    type: SUCCESS_FETCH,
                    payload: data,
                });
            }
        } catch (e) {
            dispatch({
                type: FAILURE_FETCH,
                payload: "Error while fetching data...",
            });
        }
    }, [path]);

    useEffect(() => {
        if (fetchImmediately) {
            fetchData();
        }
    }, [path, fetchImmediately, fetchData]);

    return [fetching, error, data, fetchData];
};

const processDocument = (docData) => {
    if (!docData || !docData.data()) {
        return null;
    }
    const el = docData.data();
    el.id = docData.id;
    return el;
};
