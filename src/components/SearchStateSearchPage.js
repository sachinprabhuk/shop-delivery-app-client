import React, { useState } from "react";
import { Redirect } from "react-router";
import { Navbar, Nav, FormControl, InputGroup } from "react-bootstrap";
import { SearchOutlined, ArrowBack } from "@material-ui/icons";

export const SearchStateSearchPage = ({ history, location }) => {

    const [query, setQuery] = useState("");

    const searchType = new URLSearchParams(location.search).get("type");
    const placeHolder = `search ${searchType}...`;
    let toRender = <Redirect to="/404" />;
    if (searchType === "products" || searchType === "shops") {
        toRender = (
            <Navbar bg="primary" variant="dark px-1">
                <Nav className="mr-2">
                    <Nav.Item onClick={() => history.goBack()}>
                        <ArrowBack htmlColor="white" />
                    </Nav.Item>
                </Nav>
                <InputGroup>
                    <FormControl
                        placeholder={placeHolder}
                        autoFocus
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text onClick={() => {
                            history.push(`/searchresults?type=${searchType}&query=${query}`)
                        }}>
                            <SearchOutlined />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Navbar>
        );
    }

    return toRender;
};
