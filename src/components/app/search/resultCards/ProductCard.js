import React from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../../utils/utils";

export const ProductCard = ({ name, image, price, details }) => {
    return (
        <Card style={{ padding: "10px 12px", margin: "10px 0px" }}>
            <Row>
                <Col xs={3} className="row align-items-center">
                    <Image src={image} width="100%" alt="Error" />
                </Col>
                <Col xs={1}></Col>
                <Col xs={4}>
                    <h5>{firstLetterToUpperCase(name)}</h5>
                    <span>{details}</span>
                </Col>
                <Col xs={4} className="text-right" style={{ padding: "0px" }}>
                    <p className="font-weight-bold">Rs. {price}</p>
                </Col>
            </Row>
        </Card>
    );
};
