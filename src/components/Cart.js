import React from "react";
import { Container } from "react-bootstrap";
import { withGoBackTopNav, withStdBottomNav, withStdTopNav } from "./HOC/NavHOC";

export const Cart = withGoBackTopNav(() => {
    return (
        <Container>
            <p>Cart items will be displayed here</p>
        </Container>
    );
});
