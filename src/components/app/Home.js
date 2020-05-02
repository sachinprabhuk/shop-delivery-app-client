import React from "react";
import { Container } from "react-bootstrap";
import { withStdTopNav, withStdBottomNav } from "../HOC/NavHOC";

export const Home = withStdBottomNav(withStdTopNav(() => {
    return (
        <Container>
            <p>Recommendations will be here</p>
        </Container>
    );
}));
