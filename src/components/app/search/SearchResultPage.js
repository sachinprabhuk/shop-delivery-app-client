import React, { useState, useEffect } from "react";
import { SearchResTopNav } from "../../navigations/SearchResTopNav";
import { Loader } from "../../utils/Loader";
import { withRouter } from "react-router";
import { app } from "../../../firebase";
import { PRODUCT_COLLECTION } from "../../../constants/constants";

export const SearchResultPage = withRouter(({ location, onSearchClick, onBackClicked }) => {
    const [fetching, setFetching] = useState(true);
    const [results, setResults] = useState(null);

    useEffect(async () => {
        // query here using query & searchType
        // const searchParams = new URLSearchParams(location.search);
        // const searchType = searchParams.get("type");
        // const query = searchParams.get("query");


        setFetching(true);
        setTimeout(() => {
            setResults([1, 2, 3]);
            setFetching(false);
        }, 2000);
    }, []);

    let toRender = <Loader fullPage />;

    if (fetching === false && results && Array.isArray(results)) {
        const data = results.map((el, index) => <p key={index}>{el}</p>);
        toRender = (
            <>
                <SearchResTopNav searchClicked={onSearchClick} backClicked={onBackClicked} />

                {data}
            </>
        );
    }

    return toRender;
});
