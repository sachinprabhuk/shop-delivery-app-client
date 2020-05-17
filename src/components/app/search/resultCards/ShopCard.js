import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../../utils/utils";
import { Link } from "react-router-dom";

export const ShopCard = ({ name, image, address, phone, id }) => {
    return (
        <Link
            to={`/details/shop/${id}`}
            className="text-dark text-decoration-none border-bottom d-block"
        >
            <Row className="py-2">
                <Col xs={4} className="row align-items-center">
                    <Image src={image} width="100%" alt="Error" />
                </Col>
                <Col xs={1}></Col>
                <Col xs={7} className="row text-align-center flex-column">
                    <h5 className="m-0">{firstLetterToUpperCase(name)}</h5>
                    <p className="text-secondary m-0">{address}</p>
                    <p className="m-0">
                        Phone: <span>{phone}</span>
                    </p>
                </Col>
            </Row>
        </Link>
    );
};
