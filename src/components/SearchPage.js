import React from "react";
import { Container, Card } from "react-bootstrap";
import { withStdBottomNav, withStdTopNav } from "./HOC/NavHOC";
import { ChevronRight } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export const SearchPage = withStdTopNav(
    withStdBottomNav(({ history }) => {
        return (
            <Container>
                <br />
                <Card style={{ width: "90%" }} className="m-auto">
                    <Card.Img variant="top" src="/images/items.jpg"></Card.Img>
                    <Card.Footer>
                        <Card.Link
                            as={NavLink}
                            to="/search?type=products"
                            className="d-flex justify-content-between"
                        >
                            <span>Search products</span>
                            <ChevronRight />
                        </Card.Link>
                    </Card.Footer>
                </Card>
                <br />
                <Card style={{ width: "90%" }} className="m-auto">
                    <Card.Img variant="top" src="/images/shops.jpg"></Card.Img>
                    <Card.Footer>
                        <Card.Link
                            as={NavLink}
                            to="/search?type=shops"
                            className="d-flex justify-content-between"
                        >
                            <span>Search shops</span>
                            <ChevronRight />
                        </Card.Link>
                    </Card.Footer>
                </Card>
            </Container>
        );
    })
);
