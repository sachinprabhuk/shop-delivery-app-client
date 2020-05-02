import React from "react";
import { Spinner, Container, Row } from "react-bootstrap";

export const Loader = ({ fullPage }) => {
    let loader = <InnerLoader />;
    if (fullPage) {
        loader = (
            <FullPageWrapper>
                <InnerLoader />
            </FullPageWrapper>
        );
    }
    return loader;
};

const InnerLoader = () => {
    return (
        <Spinner animation="border" role="status">
            <div className="sr-only">Loading...</div>
        </Spinner>
    );
};

const FullPageWrapper = ({ children }) => {
    return (
        <Container style={{ height: "100vh" }}>
            <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
                {children}
            </Row>
        </Container>
    );
};
