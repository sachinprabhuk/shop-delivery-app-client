import React from "react";
import { Container } from "react-bootstrap";
import { withStdTopNav, withStdBottomNav } from "./HOC/NavHOC";

export const Profile = withStdBottomNav(withStdTopNav(() => {
    return (
        <Container>
            <p>Profile</p>
        </Container>
    );
}));
