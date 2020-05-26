import { useEffect, useReducer, useCallback } from "react";
import { START_FETCH, FAILURE_FETCH, SUCCESS_FETCH } from "../constants/constants";

const reducer = (state, action) => {
    switch (action.type) {
        case START_FETCH:
            return { ...state, data: null, fetching: true, error: null, started: true };
        case SUCCESS_FETCH:
            return { ...state, data: action.payload, error: null, fetching: false, started: false };
        case FAILURE_FETCH:
            return { ...state, data: null, error: action.payload, fetching: false, started: false };
        default:
            throw new Error("Invalid action type");
    }
};

export const useAsync = (cb, fetchImmediate = true) => {
    const [{ data, fetching, error, started }, dispatch] = useReducer(reducer, {
        data: null,
        fetching: true,
        error: null,
        started: fetchImmediate,
    });

    const fetchFn = useCallback(async () => {
        try {
            console.log("calling useAsync fetch....");
            dispatch({ type: START_FETCH });
            const data = await cb();
            console.log("data -> ", data);
            dispatch({ type: SUCCESS_FETCH, payload: data });
        } catch (e) {
            dispatch({ type: FAILURE_FETCH, payload: "error while fetching data" });
        }
    }, [cb]);

    useEffect(() => {
        if (fetchImmediate) {
            fetchFn();
        }
    }, [cb, fetchFn, fetchImmediate]);

    return { fetching, error, data, fetchFn, started };
};
