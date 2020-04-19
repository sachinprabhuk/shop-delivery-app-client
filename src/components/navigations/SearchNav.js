import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";


export const SearchNav = () => {
    return (
        <Navbar bg="primary" variant="dark" >
            <Nav className="justify-content-around w-100" fill>
                <Nav.Link as={NavLink} to="/search/product">
                    Products
                </Nav.Link>
                <Nav.Link as={NavLink} to="/search/shop">
                    Shops
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
