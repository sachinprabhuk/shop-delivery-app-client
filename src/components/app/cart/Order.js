import React from "react";
import { Row, Button, Container } from "react-bootstrap";

export const Order = ({ cartItems }) => {
    return (
        <Container>
            <Row className="justify-content-between my-3 align-items-center">
                <span>
                    Grand Total : ₹
                    <span className="font-weight-bold">
                        {cartItems.reduce(
                            (acc, curr) =>
                                acc +
                                Number.parseFloat(curr.quantity) * Number.parseFloat(curr.price),
                            0
                        )}
                    </span>
                </span>
                <Button className="float-right" variant="warning">
                    Place order
                </Button>
            </Row>
        </Container>
    );
};
