import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../../utils/utils";

export const ShopCard = ({ name, image, address, phone }) => {
    return (
        <Card style={{ padding: "10px 12px", margin: "10px 0px" }}>
            <Row>
                <Col xs={4} className="row align-items-center">
                    <Image src={image} width="100%" alt="Error" />
                </Col>
                <Col xs={1}></Col>
                <Col xs={7}>
                    <h5>{firstLetterToUpperCase(name)}</h5>
                    <span className="text-secondary">{address}</span>
                    <p>
                        Phone: <span>{phone}</span>
                    </p>
                </Col>
            </Row>
        </Card>
    );
};
