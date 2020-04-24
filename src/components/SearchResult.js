import React, { useEffect } from 'react';
import { withSearchStateTopNav } from './HOC/NavHOC';

export const SearchResult = withSearchStateTopNav(({ location }) => {

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const queryType = queryParams.get("type");
        const query = queryParams.get("query");
        console.log("Query using..");
        console.log(queryType, query);

    }, [location])

    return (
        <p>search result</p>
    )
});