import React from "react";
import { withSearchStateTopNav } from "./HOC/NavHOC";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";

export const SearchResult = withSearchStateTopNav(({ location }) => {
    const queryParams = new URLSearchParams(location.search);
    const queryType = queryParams.get("type");
    const query = queryParams.get("query");

    let toRender = <Redirect to="/404" />;
    if (query && queryType) {
        toRender = (
            <Container>
                <p>
                    search for "{queryType}" with query "{query}"
                </p>
            </Container>
        );
    }

    return toRender;
});
