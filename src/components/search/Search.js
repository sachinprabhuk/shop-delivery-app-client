import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, Col, Button, Row } from "react-bootstrap";
import { withStdBottomNav, withStdTopNav } from "../HOC/NavHOC";
import { SearchOutlined } from "@material-ui/icons";

const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
const SEARCH_SHOPS = "SEARCH_SHOPS";

export const Search = withStdTopNav(
    withStdBottomNav(({ history }) => {
        const [searchItem, setSearchItem] = useState(SEARCH_PRODUCTS);

        return (
            <Container>
                <InputGroup className="my-3">
                    <FormControl placeholder="Search here..." />
                    <InputGroup.Append>
                        <InputGroup.Text onClick={() => alert("searching " + searchItem)}>
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
                            active={searchItem === SEARCH_PRODUCTS}
                            variant="outline-primary"
                            onClick={() => setSearchItem(SEARCH_PRODUCTS)}
                        >
                            Products
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="button"
                            block
                            active={searchItem === SEARCH_SHOPS}
                            variant="outline-primary"
                            onClick={() => setSearchItem(SEARCH_SHOPS)}
                        >
                            Shops
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    })
);
