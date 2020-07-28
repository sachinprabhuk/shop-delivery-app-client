import React, { useState, useEffect, useCallback } from "react";
import { SearchResTopNav } from "../../navigations/SearchResTopNav";
import { Loader } from "../../utils/Loader";
import { useParams } from "react-router";
import { SEARCH_TYPE_PRODUCT } from "../../../constants/constants";
import { ProductCard } from "./resultCards/ProductCard";
import { ShopCard } from "./resultCards/ShopCard";

export const SearchResultPage = ({ location, history }) => {
    const [fetching, setFetching] = useState(true);
    const [results, setResults] = useState(null);
    const [resultType, setResultType] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const { type: searchType, query, id } = useParams();

    useEffect(() => {
        const fetchOperation = async () => {
            try {
                let queryParams = `type=${searchType}&query=${query}`;
                if (id) {
                    queryParams += `&id=${id}`;
                }
                const url = `https://us-central1-shopdeliverymanagement.cloudfunctions.net/searchDB?${queryParams}`;
                const rawData = await fetch(url);
                const data = await rawData.json();

                if (!data || data.length === 0) {
                    console.log("No data found");
                    setResults(null);
                    setFetchError("Ooops! No results found!!!");
                } else {
                    setResultType(searchType);
                    setResults(data);
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
    }, [query, searchType, id]);

    const searchClicked = useCallback(() => {
        history.push(`/search/${searchType}`);
    }, [searchType, history]);

    const backClicked = useCallback(() => {
        history.goBack();
    }, [history]);

    let toRender = <Loader fullPage />;

    if (fetching === false) {
        if (fetchError) {
            toRender = (
                <>
                    <SearchResTopNav searchClicked={searchClicked} backClicked={backClicked} />
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
                    <SearchResTopNav searchClicked={searchClicked} backClicked={backClicked} />
                    {data}
                </>
            );
        }
    }

    return toRender;
};
