import React, { useState, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { app } from "../../firebase";
import * as firebase from "firebase/app";
import { AuthContext } from "../../contexts/AuthContext";

export const Login = ({ history }) => {
    const { authError, setAuthError } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        setError(null);
        setAuthError(null);
        setLoading(true);
        e.preventDefault();
        try {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            await app.auth().signInWithEmailAndPassword(email, password);

            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e.message);
            setTimeout(() => {
                setError(false);
            }, 12000);
        }
    };

    return (
        <Row style={{ height: "100vh" }} className="align-items-center">
            <Col />
            <Col sm={10} md={6} lg={4}>
                <h3 className="text-center">Shop delivery - Customer login</h3>
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

                    <p className="text-danger">{error || authError}</p>

                    <Button variant="primary" type="submit" block disabled={loading}>
                        Sign in
                    </Button>
                    <br />
                    <h6 className="text-center">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => history.push("/signup")}
                        >
                            Sign up
                        </button>
                    </h6>
                </Form>
            </Col>
            <Col />
        </Row>
    );
};
