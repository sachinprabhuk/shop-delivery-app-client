import React, { useState } from "react";
import { Navbar, Nav, FormControl, InputGroup, Form, Button } from "react-bootstrap";
import { SearchOutlined, ArrowBack } from "@material-ui/icons";

export const SearchInput = ({ onSubmit, onBackClicked, placeHolder }) => {
    const [query, setQuery] = useState("");

    const onSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(query);
    };

    return (
        <Navbar bg="primary" variant="dark px-1">
            <Nav className="mr-2">
                <Nav.Item onClick={onBackClicked}>
                    <ArrowBack htmlColor="white" />
                </Nav.Item>
            </Nav>
            <Form onSubmit={onSearchSubmit} className="w-100">
                <InputGroup>
                    <FormControl
                        placeholder={placeHolder}
                        autoFocus
                        value={query}
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
};
