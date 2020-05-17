import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { NavLink, Link } from "react-router-dom";

export const DetailPageTopbar = ({ searchClicked }) => {
    return (
        <Navbar bg="primary" variant="dark" className="justify-content-between">
            <Navbar.Brand as={Link} to="/">
                Logo
            </Navbar.Brand>
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
