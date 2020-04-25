import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { ArrowBack, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export const SearchResTopNav = ({ searchClicked, backClicked }) => {
    return (
        <Navbar bg="primary" variant="dark" className="justify-content-between">
            <Navbar.Text onClick={backClicked}>
                <ArrowBack htmlColor="white" />
            </Navbar.Text>
            <Nav>
                <Nav.Link onClick={searchClicked}>
                    <SearchOutlined htmlColor="white" />
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cart">
                    <ShoppingCartOutlined htmlColor="white" />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
