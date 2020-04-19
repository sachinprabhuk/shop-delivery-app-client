import React, { useEffect } from "react";
import { SearchNav } from "../navigations/SearchNav";
import { Route } from "react-router";
import { ShopSearch } from "./ShopSearch";
import { ProductSearch } from "./ProductSearch";
import { Container } from "react-bootstrap";
import { withStdTopNav, withStdBottomNav } from "../HOC/NavHOC";

export const Search = withStdBottomNav(withStdTopNav(({ history }) => {
    // useEffect(() => {
    //     history.push("/search/product");
    // }, [history]);

    return (
        <>
            {/* <SearchNav /> */}
            <Container>
                <p>Search ui is to be decided</p>
                {/* <Route exact path="/search/product" component={ProductSearch} />
                <Route exact path="/search/shop" component={ShopSearch} /> */}
            </Container>
        </>
    );
}));
