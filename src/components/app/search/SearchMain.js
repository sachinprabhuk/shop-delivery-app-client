import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { SearchInput } from "./SearchInput";
import { SearchResultPage } from "./SearchResultPage";
import {
    SEARCH_STATE_CHECKING,
    SEARCH_STATE_INPUT,
    SEARCH_STATE_INVALID,
    SEARCH_STATE_RESULT,
    SEARCH_TYPE_PRODUCT,
    SEARCH_TYPE_SHOP
} from "../../../constants/constants";

const isValidSearchType = (type) => {
    const searchTypes = [SEARCH_TYPE_PRODUCT, SEARCH_TYPE_SHOP];
    if (searchTypes.indexOf(type) !== -1) {
        return true;
    }
    return false;
};

const isValidQuery = (query) => {
    return query && typeof query === "string" && query.length > 0;
};

export const SearchMain = ({ history, location }) => {
    const [searchState, setSearchState] = useState(SEARCH_STATE_CHECKING);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchType = searchParams.get("type");
        const query = searchParams.get("query");
        if (isValidSearchType(searchType) && isValidQuery(query)) {
            setSearchState(SEARCH_STATE_RESULT);
        } else if (isValidSearchType(searchType)) {
            setSearchState(SEARCH_STATE_INPUT);
        } else {
            setSearchState(SEARCH_STATE_INVALID);
        }
    }, [location.search]);

    const onSearchSubmit = (query) => {
        const searchParams = new URLSearchParams(location.search);
        const searchType = searchParams.get("type");
        history.replace(`/search?type=${searchType}&query=${query}`);
    };

    const onBackClicked = () => {
        history.goBack();
    };

    const onNewSearchClick = () => {
        const searchParams = new URLSearchParams(location.search);
        const searchType = searchParams.get("type");
        history.replace(`/search?type=${searchType}`);
    };

    let toRender = null;
    if (searchState === SEARCH_STATE_INPUT) {
        toRender = <SearchInput onSubmit={onSearchSubmit} onBackClicked={onBackClicked} />;
    } else if (searchState === SEARCH_STATE_RESULT) {
        toRender = (
            <SearchResultPage onSearchClick={onNewSearchClick} onBackClicked={onBackClicked} />
        );
    } else if (searchState === SEARCH_STATE_CHECKING) {
        toRender = null;
    } else {
        toRender = <Redirect to="/404" />;
    }
    return toRender;
};
