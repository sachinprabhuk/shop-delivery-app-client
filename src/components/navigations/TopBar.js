import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { MyLocation, ShoppingCartOutlined } from "@material-ui/icons";

export const TopBar = () => {
    return (
        <Navbar bg="primary" variant="dark" className="justify-content-between">
            <Navbar.Brand as={Link} to="/">
                <Image src="/images/logo.png" width="60px" />
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={NavLink} to="/cart">
                    <ShoppingCartOutlined htmlColor="white" />
                </Nav.Link>
                <Nav.Link as={NavLink} to="/map">
                    <MyLocation htmlColor="white" />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
