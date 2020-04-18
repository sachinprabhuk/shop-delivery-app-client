import React, { useEffect } from "react";
import { SearchNav } from "../navigations/SearchNav";
import { Route } from "react-router";
import { ShopSearch } from "./ShopSearch";
import { ProductSearch } from "./ProductSearch";

export const Search = ({ history }) => {
    useEffect(() => {
        history.push("/search/product");
    }, [history]);

    return (
        <>
            <SearchNav />
            <div style={{ marginTop: "65px" }}>
                <Route exact path="/search/product" component={ProductSearch} />
                <Route exact path="/search/shop" component={ShopSearch} />
            </div>
        </>
    );
};
