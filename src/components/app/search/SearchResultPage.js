import React, { useState, useEffect } from "react";
import { SearchResTopNav } from "../../navigations/SearchResTopNav";
import { Loader } from "../../utils/Loader";
import { withRouter } from "react-router";
import { db } from "../../../firebase";
import {
    SEARCH_TYPE_PRODUCT,
    ITEMS_COLLECTION,
    SHOPS_COLLECTION,
} from "../../../constants/constants";
import { ProductCard } from "./resultCards/ProductCard";
import { ShopCard } from "./resultCards/ShopCard";

export const SearchResultPage = withRouter(({ location, onSearchClick, onBackClicked }) => {
    const [fetching, setFetching] = useState(true);
    const [results, setResults] = useState(null);
    const [resultType, setResultType] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchOperation = async () => {
            // query here using query & searchType
            const searchParams = new URLSearchParams(location.search);
            const searchType = searchParams.get("type");
            const query = searchParams.get("query");

            try {
                const endQuery =
                    query.slice(0, query.length - 1) +
                    String.fromCharCode(query[query.length - 1].charCodeAt(0) + 1);
                const collection =
                    searchType === SEARCH_TYPE_PRODUCT ? ITEMS_COLLECTION : SHOPS_COLLECTION;
                const data = await db
                    .collection(collection)
                    .where("name", ">=", query)
                    .where("name", "<", endQuery)
                    .get();
                if (!data || data.docs.length === 0) {
                    console.log("No data found");
                    setResults(null);
                    setFetchError("Ooops! No results found!!!");
                } else {
                    const processedData = data.docs.map((el) => {
                        const data = el.data();
                        data.id = el.id;
                        return data;
                    });
                    setResultType(searchType);
                    setResults(processedData);
                    setFetchError(null);
                }
                setFetching(false);
            } catch (e) {
                setFetchError("Error while fetching results!!!");
                setFetching(false);
                console.log(e);
            }
        };
        fetchOperation();
    }, [location.search]);

    let toRender = <Loader fullPage />;

    if (fetching === false) {
        if (fetchError) {
            toRender = (
                <>
                    <SearchResTopNav searchClicked={onSearchClick} backClicked={onBackClicked} />
                    <br />
                    <br />
                    <p className="text-center">{fetchError}</p>
                </>
            );
        } else {
            const CardComponent = resultType === SEARCH_TYPE_PRODUCT ? ProductCard : ShopCard;
            const data = results.map((data) => <CardComponent key={data.id} {...data} />);
            toRender = (
                <>
                    <SearchResTopNav searchClicked={onSearchClick} backClicked={onBackClicked} />
                    {data}
                </>
            );
        }
    }

    return toRender;
});
