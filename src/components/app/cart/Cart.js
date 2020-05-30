import React, { useContext, useCallback } from "react";
import { Container } from "react-bootstrap";
import { withGoBackTopNav } from "../../HOC/NavHOC";
import { useAsync } from "../../../hooks/useAsync";
import { db } from "../../../firebase";
import { AuthContext } from "../../../contexts/AuthContext";
import { CART_COLLECTION, ORDERS_COLLECTIONS } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { Order } from "./Order";
import { CartCard } from "./CartCard";

export const Cart = withGoBackTopNav(({ history }) => {
    const {
        user: { uid },
    } = useContext(AuthContext);

    const fetchCartItems = useCallback(async () => {
        const raw = await db.collection(CART_COLLECTION).where("userID", "==", uid).get();
        if (!raw || raw.docs.length === 0) {
            return [];
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

    const { error, data, updateData } = useAsync(fetchCartItems);

    const removeCartItem = useCallback(
        async (id) => {
            const updatedData = data.filter((item) => item.id !== id);
            try {
                await db.collection(CART_COLLECTION).doc(id).delete();
            } catch (e) {
                console.log("error while deleting", e);
            }
            updateData(updatedData);
        },
        [data, updateData]
    );

    const orderAllCartItems = async () => {
        const result = await Promise.allSettled(
            data.map(async ({ id, ...cartItem }) => {
                try {
                    const newOrdertItemRef = db.collection(ORDERS_COLLECTIONS).doc();
                    const cartItemRef = db.collection(CART_COLLECTION).doc(id);
                    db.runTransaction(async (transaction) => {
                        await transaction.set(newOrdertItemRef, cartItem);
                        await transaction.delete(cartItemRef);
                    });
                } catch (e) {
                    throw new Error(id);
                }
            })
        );
        const rejectedIDs = result
            .filter((el) => el.status !== "fulfilled")
            .map((el) => el.reason.message);
        const rejectIdsSet = new Set(rejectedIDs);
        console.log("reject ids -> ", rejectIdsSet);
        updateData(data.filter((el) => rejectIdsSet.has(el.id)));
        if (rejectIdsSet.size > 0) {
            alert("Some items were not ordered!! please try again later");
        }
    };

    let toRender = <Loader fullPage message="fetching cart items..." />;
    if (error) {
        toRender = <p>{error}</p>;
    } else if (data) {
        if (data && data.length > 0) {
            toRender = (
                <>
                    <Order cartItems={data} orderClicked={orderAllCartItems} />
                    {data.map((el) => (
                        <CartCard
                            cartItem={el}
                            key={el.id}
                            history={history}
                            removeCartItem={removeCartItem}
                        />
                    ))}
                </>
            );
        } else {
            toRender = <p>No cart items</p>;
        }
    }

    return <Container>{toRender}</Container>;
});
