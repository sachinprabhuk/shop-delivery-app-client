import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../../utils/utils";
import { Link } from "react-router-dom";

export const ProductCard = ({ name, image, price, details, id, unit }) => {
    return (
        <Link
            to={`/details/product/${id}`}
            className="text-dark text-decoration-none border-bottom d-block"
        >
            <Row className="py-2">
                <Col xs={4} className="row align-items-center">
                    <Image src={image} width="100px" height="100px" alt="Error" />
                </Col>
                <Col xs={4}>
                    <h5>{firstLetterToUpperCase(name)}</h5>
                    <span>
                        {details &&
                            (details.length > 30 ? `${details.substring(0, 30)}...` : details)}
                    </span>
                </Col>
                <Col xs={4} className="text-right" style={{ padding: "0px" }}>
                    <p className="font-weight-bold">
                        Rs. {price}/{unit}
                    </p>
                </Col>
            </Row>
        </Link>
    );
};
