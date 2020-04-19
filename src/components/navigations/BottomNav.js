import React from "react";
import { Nav, Navbar, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HomeOutlined, PersonOutlined, SearchOutlined } from "@material-ui/icons";

export const BottomNav = () => {
    return (
        <Navbar bg="light" variant="primary" fixed="bottom" className="p-0">
            <Nav className="justify-content-stretch w-100 " fill>
                <Nav.Link
                    exact
                    as={NavLink}
                    to="/"
                    className="flex-grow-1 text-center"
                    activeClassName="border-top border-primary"
                >
                    <HomeOutlined></HomeOutlined>
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/search"
                    className="flex-grow-1 text-center"
                    activeClassName="border-top border-primary"
                >
                    <SearchOutlined />
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/profile"
                    className="flex-grow-1 text-center"
                    activeClassName="border-top border-primary"
                >
                    <PersonOutlined />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
