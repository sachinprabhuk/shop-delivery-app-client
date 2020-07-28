import React, { useState } from "react";
import { Navbar, Nav, FormControl, InputGroup, Form, Button } from "react-bootstrap";
import { SearchOutlined, ArrowBack } from "@material-ui/icons";
import { useParams, Redirect } from "react-router";
import { SEARCH_TYPE_SHOP, SEARCH_TYPE_PRODUCT } from "../../../constants/constants";
import { Suggestion } from "./Suggestion";
import { shopIndex, productIndex } from "../../../utils/utils";

const isValidSearchType = (type) => {
    return type === SEARCH_TYPE_SHOP || type === SEARCH_TYPE_PRODUCT;
};

export const SearchInput = ({ history }) => {
    const { type } = useParams();

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isTouched, setIsTouched] = useState(false);

    const onQueryChange = async (e) => {
        const queryString = e.target.value;
        setQuery(queryString);
        setIsTouched(true);
        if (queryString == null || queryString.length === 0) {
            setSuggestions([]);
        } else {
            const index = type === SEARCH_TYPE_SHOP ? shopIndex : productIndex;
            const res = await index.search(queryString);
            setSuggestions(res.hits);
        }
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.replace(`/search/${type}/${query.toLowerCase()}`);
    };

    if (isValidSearchType(type)) {
        const suggestedItems =
            suggestions && suggestions.length > 0 ? (
                suggestions.map((suggestion) => {
                    return <Suggestion suggestion={suggestion} key={suggestion.id} />;
                })
            ) : isTouched ? (
                <p className="text-center p-2">No results</p>
            ) : (
                <p className="text-center p-2">Start searching</p>
            );
        return (
            <>
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
                                onChange={onQueryChange}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text as={Button} type="submit">
                                    <SearchOutlined />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                    <br />
                </Navbar>
                {suggestedItems}
            </>
        );
    } else {
        return <Redirect to="/404" />;
    }
};
