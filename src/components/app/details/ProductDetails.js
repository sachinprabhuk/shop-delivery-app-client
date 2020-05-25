import React, { useState, useContext, useCallback } from "react";
import { Container, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import { ITEMS_COLLECTION, CART_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";
import { useFetchFirestoreDoc } from "../../../hooks/useFetchFirestoreDoc";
import { ShopListModal } from "./utils/ShopListModal";
import { db } from "../../../firebase";
import { AuthContext } from "../../../contexts/AuthContext";

export const ProductDetails = ({ history }) => {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const { id } = useParams();
    const [fetching, error, product] = useFetchFirestoreDoc(`${ITEMS_COLLECTION}/${id}`);
    const [showModal, setShowModal] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

    let toRender = <Loader fullPage message="loading..." />;

    // useEffect(() => {
    //     const updater = async () => {
    //         const clicksDoc = await db.doc(`${USER_COLLECTION}/${uid}/ML/Clicks`).get();
    //         const clicks = clicksDoc.data();
    //         let updatedClicks = null;
    //         if (!clicks) {
    //             updatedClicks = {
    //                 [id]: 1,
    //             };
    //         } else {
    //             const seenBefore = clicks.hasOwnProperty(id);
    //             if (seenBefore) {
    //                 const clickForCurrProduct = Number.parseInt(clicks[id]);
    //                 clicks[id] = clickForCurrProduct + 1;
    //             } else {
    //                 clicks[id] = 1;
    //             }
    //             updatedClicks = clicks;
    //         }
    //         await db.doc(`${USER_COLLECTION}/${uid}/ML/Clicks`).update({
    //             ...updatedClicks,
    //         });
    //     };
    //     updater();
    // }, [id, uid]);

    const selectShop = useCallback(
        async ({ id: shopID, name, price }, quantity) => {
            try {
                setAddingToCart(true);
                await db.collection(CART_COLLECTION).add({
                    userID: uid,
                    price: Number.parseFloat(price),
                    quantity: Number.parseInt(quantity),
                    shop: {
                        id: shopID,
                        name,
                    },
                    product: {
                        id: product.id,
                        name: product.name,
                        image: product.image,
                    },
                });
            } catch (e) {
                // not handling this case
            }
            setAddingToCart(false);
            setShowModal(false);
        },
        [product, uid]
    );

    if (!fetching) {
        if (error) {
            toRender = (
                <>
                    <br />
                    <br />
                    <p>{error}</p>
                </>
            );
        } else {
            toRender = (
                <Container>
                    <div>
                        <br />
                        <h3>{firstLetterToUpperCase(product.name)}</h3>
                        <div>
                            <Image src={product.image} width="100%" alt="Error" />
                        </div>
                        <div>
                            <p className="font-weight-bold">
                                From {product.place} | {product.company}
                            </p>
                            <p className="font-weight-bold">
                                Rs. {product.price} per {product.unit}
                            </p>
                            <Button onClick={() => setShowModal(true)}>Add to Cart</Button>
                            <p>{product.details}</p>
                        </div>
                    </div>
                </Container>
            );
        }
    }
    return (
        <>
            <DetailPageTopbar
                searchClicked={() => {
                    history.push("/search?type=products");
                }}
            />
            {toRender}
            <ShopListModal
                show={showModal}
                setShow={setShowModal}
                selectShop={selectShop}
                addingToCart={addingToCart}
                product={product}
            />
        </>
    );
};
