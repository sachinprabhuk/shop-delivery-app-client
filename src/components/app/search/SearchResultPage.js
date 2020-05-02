import React, { useState, useEffect } from 'react';
import { SearchResTopNav } from '../../navigations/SearchResTopNav';
import { Loader } from '../../utils/Loader';

// this component is rendered only if query and queryType are correct.
export const SearchResultPage = ({ query, searchType, onSearchClick, onBackClicked }) => {
    const [fetching, setFetching] = useState(true);
    const [results, setResults] = useState(null);

    useEffect(() => {
        // query here using query & searchType
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

                <SearchResTopNav
                    searchClicked={onSearchClick}
                    backClicked={onBackClicked}
                />
                
                {data}
            </>
        );
    }

    return toRender;
};