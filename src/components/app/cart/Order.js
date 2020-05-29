import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
// import { useAsync } from "../../../hooks/useAsync";
// import { db } from "../../../firebase";
// import { ORDERS_COLLECTIONS } from "../../../constants/constants";
// import { v4 as uuidv4 } from "uuid";

export const Order = ({ cartItems }) => {
    return (
        <Container>
            <br />
            <Row>
                <Col>
                    Grand Total : ₹ {cartItems.reduce((acc, curr) => acc + Number.parseFloat(curr.price), 0)}
                </Col>

                <Col>
                    <Button className="float-right" variant="warning">Place order</Button>
                </Col>
            </Row>
            <br />
            <br />
            <br />
        </Container>
    );
};
