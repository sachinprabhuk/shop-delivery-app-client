import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const BottomNav = () => {
    return (
        <Navbar bg="primary" variant="dark" fixed="bottom">
            <Nav className="justify-content-between w-100" fill>
                <Nav.Link exact as={NavLink} to="/">
                    Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/search">
                    Search
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
