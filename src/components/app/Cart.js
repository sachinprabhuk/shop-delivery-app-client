import React, { useContext, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { withGoBackTopNav } from "../HOC/NavHOC";
import { useAsync } from "../../hooks/useAsync";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { CART_COLLECTION } from "../../constants/constants";
import { Loader } from "../utils/Loader";

export const Cart = withGoBackTopNav(() => {
    const {
        user: { uid },
    } = useContext(AuthContext);

    const fetchCartItems = useCallback(async () => {
        const raw = await db.collection(CART_COLLECTION).where("userID", "==", uid).get();
        if (!raw || raw.docs.length === 0) {
            throw new Error();
        } else {
            const cartItems = raw.docs.map((el) => {
                const doc = el.data();
                doc.id = el.id;
                return doc;
            });
            console.log("cart items -> ", cartItems);
            return cartItems;
        }
    }, [uid]);

    const { error, data } = useAsync(fetchCartItems);

    let toRender = <Loader fullPage message="fetching cart items..." />;
    if (error) {
        toRender = <p>{error}</p>;
    } else if (data) {
        toRender = (
            <>
                <ul>
                    {data.map((el) => {
                        return (
                            <li key={el.id}>
                                {el.product.name} - {el.shop.name} - {el.price}
                            </li>
                        );
                    })}
                </ul>
                <Row>
                    <Col>
                        {data.reduce((acc, curr) => acc + Number.parseFloat(curr.price), 0)} Rs.
                    </Col>
                    <Col>
                        <Button variant="warning">Place order</Button>
                    </Col>
                </Row>
            </>
        );
    }

    return <Container>{toRender}</Container>;
});
