import React, { useCallback, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { ORDERS_COLLECTIONS } from "../../../constants/constants";
import { useAsync } from "../../../hooks/useAsync";
import { Loader } from "../../utils/Loader";
import { withGoBackTopNav } from "../../HOC/NavHOC";
import { Container } from "react-bootstrap";

export const MyOrders = withGoBackTopNav(({ history }) => {
    const {
        user: { uid },
    } = useContext(AuthContext);

    const fetchOrders = useCallback(async () => {
        const raw = await db.collection(ORDERS_COLLECTIONS).where("userID", "==", uid).get();
        return raw.docs.map((el) => {
            const doc = el.data();
            doc.id = el.id;
            return doc;
        });
    }, [uid]);

    const { data, fetching, error } = useAsync(fetchOrders);

    if (fetching) {
        return <Loader fullPage message="fetching orders..." />;
    } else if (error) {
        return (
            <>
                <br />
                <br />
                <p>{error}</p>
            </>
        );
    }
    return (
        <Container>
            {data.map((el) => {
                return (
                    <div
                        key={el.id}
                        onClick={() => history.push(`/details/product/${el.product.id}`)}
                    >
                        <p>
                            {el.product.name} - {el.shop.name} - {el.price}
                        </p>
                    </div>
                );
            })}
        </Container>
    );
});
