import React from "react";
import { Spinner, Container, Row } from "react-bootstrap";

export const Loader = ({ fullPage, message }) => {
    let loader = <InnerLoader />;
    if (fullPage) {
        loader = (
            <FullPageWrapper>
                <InnerLoader message={message} />
            </FullPageWrapper>
        );
    }
    return loader;
};

const InnerLoader = ({ message }) => {
    return (
        <>
            <Spinner animation="border" role="status">
                <div className="sr-only">Loading...</div>
            </Spinner>
            <p>{message}</p>
        </>
    );
};

const FullPageWrapper = ({ children }) => {
    return (
        <Container style={{ height: "100vh" }}>
            <Row className="justify-content-center align-items-center flex-column" style={{ height: "100vh" }}>
                {children}
            </Row>
        </Container>
    );
};
