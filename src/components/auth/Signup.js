import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { app } from "../../firebase";
import * as firebase from "firebase/app";

export const Signup = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            await app.auth().createUserWithEmailAndPassword(email, password);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e.message || "Error while signing up!try again in a while");
            setTimeout(() => {
                setError(false);
            }, 12000);
        }
    };

    return (
        <Row style={{ height: "100vh" }} className="align-items-center">
            <Col />
            <Col sm={10} md={6} lg={4}>
                <h3 className="text-center">Shop delivery - Customer signup</h3>
                <br />
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" onInput={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onInput={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <p className="text-danger">{error}</p>

                    <Button variant="primary" type="submit" block disabled={loading}>
                        Sign up
                    </Button>
                    <br />
                    <h6 className="text-center">
                        Have an account already?{" "}
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => history.push("/login")}
                        >
                            Sign in
                        </button>
                    </h6>
                </Form>
            </Col>
            <Col />
        </Row>
    );
};
