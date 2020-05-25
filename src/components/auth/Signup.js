import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { app, db } from "../../firebase";
import * as firebase from "firebase/app";

export const Signup = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [doc, setDoc] = useState("");;
    const [newpass, setNewPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(!newpass)
        {
            setError(e.message || "Different passwords used");
            return null;
        }
        else
        {
            setLoading(true);
            try 
            {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                await app.auth().createUserWithEmailAndPassword(email, password);
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        db.collection('Users').doc(user.uid).set({
                            email: email,
                            phone: phone,
                            name: name,
                            password: password,
                            address: address
                        }).catch((error)=> {
                            setError(error);
                        });
                    }
                  });

                setLoading(false);
            } 
            catch (e) 
            {
                setLoading(false);
                setError(e.message || "Error while signing up!try again in a while");
                setTimeout(() => {
                    setError(false);
                }, 12000);
            }
        
        }
    };

    return (
        <Container>
            <Row style={{ height: "100vh" }} className="align-items-center">
                <Col />
                <Col sm={10} md={6} lg={4}>
                    <h3 className="text-center">Shop delivery - Owner signup</h3>
                    <br />
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onInput={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onInput={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="number" onInput={(e) => setPhone(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" row="3" onInput={(e) => setAddress(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onInput={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                onInput={(e) => {
                                        if(password === e.target.value)
                                            setNewPassword(true);
                                        else
                                            setNewPassword(false);
                                    }
                                }
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
                                className="btn-link"
                                onClick={() => history.push("/admin/login")}
                            >
                                Sign in
                            </button>
                        </h6>
                    </Form>
                </Col>
                <Col />
            </Row>
        </Container>
    );
};
