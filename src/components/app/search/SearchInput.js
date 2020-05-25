import React, { useState } from "react";
import { Navbar, Nav, FormControl, InputGroup, Form, Button } from "react-bootstrap";
import { SearchOutlined, ArrowBack } from "@material-ui/icons";
import { useParams, Redirect } from "react-router";
import { SEARCH_TYPE_SHOP, SEARCH_TYPE_PRODUCT } from "../../../constants/constants";

const isValidSearchType = (type) => {
    return type === SEARCH_TYPE_SHOP || type === SEARCH_TYPE_PRODUCT;
};

export const SearchInput = ({ history }) => {
    const { type } = useParams();

    const [query, setQuery] = useState("");

    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.replace(`/search/${type}/${query.toLowerCase()}`);
    };

    if (isValidSearchType(type)) {
        return (
            <Navbar bg="primary" variant="dark px-1">
                <Nav className="mr-2">
                    <Nav.Item onClick={() => history.goBack()}>
                        <ArrowBack htmlColor="white" />
                    </Nav.Item>
                </Nav>
                <Form onSubmit={onSearchSubmit} className="w-100">
                    <InputGroup>
                        <FormControl
                            placeholder={`Search ${type}`}
                            autoFocus
                            value={query}
                            required
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text as={Button} type="submit">
                                <SearchOutlined />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Navbar>
        );
    } else {
        return <Redirect to="/404" />;
    }
};
