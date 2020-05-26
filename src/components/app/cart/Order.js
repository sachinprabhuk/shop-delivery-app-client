import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
// import { useAsync } from "../../../hooks/useAsync";
// import { db } from "../../../firebase";
// import { ORDERS_COLLECTIONS } from "../../../constants/constants";
// import { v4 as uuidv4 } from "uuid";

export const Order = ({ cartItems }) => {
    return (
        <Container>
            <Row>
                <Col>
                    {cartItems.reduce((acc, curr) => acc + Number.parseFloat(curr.price), 0)} Rs.
                </Col>

                <Col>
                    <Button variant="warning">Place order</Button>
                </Col>
            </Row>
        </Container>
    );
};
