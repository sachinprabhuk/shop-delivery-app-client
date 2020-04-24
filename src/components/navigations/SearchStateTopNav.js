import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { ArrowBack, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export const SearchStateTopNav = withRouter(({ history }) => {

    const [inSearchState, setSearchState] = useState(false);

    const onGoBackClick = () => {
        history.goBack();
    };

    return (
        <Navbar bg="primary" variant="dark" className="justify-content-between">
            <Navbar.Text onClick={onGoBackClick} >
                <ArrowBack htmlColor="white" />
            </Navbar.Text>
            <Nav>
                <Nav.Link>
                    <SearchOutlined htmlColor="white" />
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cart">
                    <ShoppingCartOutlined htmlColor="white" />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
});
