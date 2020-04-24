import React from "react";
import { withRouter } from "react-router";
import { Navbar } from "react-bootstrap";
import { ArrowBack } from "@material-ui/icons";

export const TopNavGoBack = withRouter(({ title, history }) => {
    const handleClick = () => {
        history.goBack();
    };
    return (
        <Navbar bg="primary" variant="dark" className="justify-content-between">
            <Navbar.Brand onClick={handleClick}>
                <ArrowBack />
            </Navbar.Brand>
            <Navbar.Text className="text-white">{title}</Navbar.Text>
        </Navbar>
    );
});
