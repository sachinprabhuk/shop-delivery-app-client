import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
    MyLocation,
    AddShoppingCartOutlined,
    ShoppingCartOutlined,
    SearchOutlined,
} from "@material-ui/icons";

export const TopBar = () => {
    return (
        <Navbar bg="primary" variant="dark" className="justify-content-between">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
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
