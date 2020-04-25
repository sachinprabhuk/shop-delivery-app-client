import React from "react";
import { TopBar } from "../navigations/TopBar";
import { BottomNav } from "../navigations/BottomNav";
import { TopNavGoBack } from "../navigations/TopNavGoBack";
import { SearchResTopNav } from "../navigations/SearchResTopNav";

export const withStdTopNav = (WrappedComponent) => {
    return (props) => (
        <>
            <TopBar />
            <WrappedComponent {...props} />
        </>
    );
};

export const withStdBottomNav = (WrappedComponent) => {
    return (props) => (
        <>
            <WrappedComponent {...props} />
            <BottomNav />
        </>
    );
};

export const withGoBackTopNav = (WrappedComponent) => {
    return ({ title, ...rest }) => (
        <>
            <TopNavGoBack title={title} />
            <WrappedComponent {...rest} />
        </>
    );
};

export const withSearchStateTopNav = (WrappedComponent) => {
    console.log(WrappedComponent);
    return (props) => (
        <>
            <SearchResTopNav />
            <WrappedComponent {...props} />
        </>
    );
};
