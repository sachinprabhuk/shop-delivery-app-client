import React, { useState } from "react";
import { Container, InputGroup, FormControl, Col, Button, Row } from "react-bootstrap";
import { withStdBottomNav, withStdTopNav } from "./HOC/NavHOC";
import { SearchOutlined } from "@material-ui/icons";

const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
const SEARCH_SHOPS = "SEARCH_SHOPS";

export const SearchPage = withStdTopNav(
    withStdBottomNav(({ history }) => {
        const [searchType, setSearchType] = useState(SEARCH_PRODUCTS);
        const [query, setQuery] = useState("");

        const onSearch = () => {
            const typeForURL = searchType === SEARCH_PRODUCTS ? "product" : "shop";
            const url = `/search?type=${typeForURL}&query=${query}`;
            history.push(url);
        }

        return (
            <Container>
                <InputGroup className="my-3">
                    <FormControl placeholder="Search here..." value={query} onChange={e => setQuery(e.target.value)} />
                    <InputGroup.Append>
                        <InputGroup.Text onClick={onSearch}>
                            <SearchOutlined size="small" />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <p>Search categories</p>
                <Row>
                    <Col>
                        <Button
                            type="button"
                            block
                            active={searchType === SEARCH_PRODUCTS}
                            variant="outline-primary"
                            onClick={() => setSearchType(SEARCH_PRODUCTS)}
                        >
                            Products
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="button"
                            block
                            active={searchType === SEARCH_SHOPS}
                            variant="outline-primary"
                            onClick={() => setSearchType(SEARCH_SHOPS)}
                        >
                            Shops
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    })
);
