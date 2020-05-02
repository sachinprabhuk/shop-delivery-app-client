import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";
import { SearchInput } from "./SearchInput";
import { SearchResTopNav } from "../navigations/SearchResTopNav";

const searchTypes = ["shops", "products"];

export const SearchView = ({ location, history }) => {
    const [currState, setCurrState] = useState({
        searchMode: true,
        searchResults: null,
        fetchingResults: false,
        query: null,
        queryType: new URLSearchParams(location.search).get("type"),
    });

    const onSearchSubmit = (query) => {
        setCurrState({
            ...currState,
            searchMode: false,
            fetchingResults: true,
            query: query,
        });

        setTimeout(() => {
            setCurrState({
                ...currState,
                searchResults: [1, 2, 3],
                fetchingResults: false,
            });
        }, 1000);
    };

    const onInputBackClicked = () => {
        if (currState.searchResults && currState.searchResults.length > 0) {
            setCurrState({
                ...currState,
                searchMode: false,
            });
        } else {
            history.goBack();
        }
    };

    let toRender = <Redirect to="/404" />;
    if (currState.searchMode) {
        toRender = <SearchInput onSubmit={onSearchSubmit} onBackClicked={onInputBackClicked} />;
    } else {
        if (searchTypes.indexOf(currState.queryType) !== -1) {
            let content = null;
            if (currState.fetchingResults) {
                content = <p>Loading....</p>;
            } else {
                content = (
                    <p>
                        search for "{currState.queryType}" with query "{currState.query}"
                    </p>
                );
            }
            toRender = (
                <>
                    <SearchResTopNav
                        searchClicked={() => {
                            console.log("heyy");
                            setCurrState({ ...currState, searchMode: true });
                        }}
                        backClicked={() => history.goBack()}
                    />
                    <Container>{content}</Container>
                </>
            );
        }
    }

    return toRender;
};
