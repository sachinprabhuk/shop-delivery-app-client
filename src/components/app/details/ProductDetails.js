import React, { useState, useContext, useCallback, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import {
    ITEMS_COLLECTION,
    CART_COLLECTION,
    CLICKS_COLLECTION,
    USER_COLLECTION,
    ML_COLLECTION,
    PRODUCT_VIEWED,
} from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";
import { useFetchFirestoreDoc } from "../../../hooks/useFetchFirestoreDoc";
import { ShopListModal } from "./utils/ShopListModal";
import { db } from "../../../firebase";
import { AuthContext } from "../../../contexts/AuthContext";

const getCurrentClicksForProduct = (doc, prodID) => {
    // we return 1 in not seen case, because log10(1) === 0
    if (!doc) {
        return 1;
    } else {
        const seenBefore = doc.hasOwnProperty(prodID);
        if (seenBefore) {
            return Number.parseInt(doc[prodID]);
        } else {
            return 1;
        }
    }
};

const doesFirestoreDocExists = (doc) => {
    return doc && doc.data();
};

export const ProductDetails = ({ history }) => {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const { id } = useParams();
    const [fetching, error, product] = useFetchFirestoreDoc(`${ITEMS_COLLECTION}/${id}`);
    const [showModal, setShowModal] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

    let toRender = <Loader fullPage message="loading..." />;

    useEffect(() => {
        const updater = async () => {
            localStorage.setItem(PRODUCT_VIEWED, "true");

            const clicksDocRaw = await db.doc(`${USER_COLLECTION}/${uid}/ML/Clicks`).get();
            const clicksDoc = doesFirestoreDocExists(clicksDocRaw) ? clicksDocRaw.data() : {};
            const currentClicks = getCurrentClicksForProduct(clicksDoc, id);
            clicksDoc[id] = currentClicks + 1;

            let updateProductClickCount = Promise.resolve();
            if (doesFirestoreDocExists(clicksDocRaw)) {
                updateProductClickCount = db.doc(`${USER_COLLECTION}/${uid}/ML/Clicks`).update({
                    ...clicksDoc,
                });
            } else {
                updateProductClickCount = db
                    .collection(USER_COLLECTION)
                    .doc(uid)
                    .collection(ML_COLLECTION)
                    .doc("Clicks")
                    .set({
                        ...clicksDoc,
                    });
            }

            const updateLogOfClickCount = async () => {
                const rawDoc = await db
                    .collection(CLICKS_COLLECTION)
                    .where("user", "==", uid)
                    .get();
                if (rawDoc.docs.length > 0) {
                    const doc = rawDoc.docs[0].data();
                    doc[id] = 10 * Math.log10(currentClicks + 1);
                    await db.doc(`${CLICKS_COLLECTION}/${rawDoc.docs[0].id}`).update({ ...doc });
                } else {
                    const doc = {
                        [id]: 10 * Math.log10(currentClicks + 1),
                        user: uid,
                    };
                    await db.collection(CLICKS_COLLECTION).add(doc);
                }
            };

            await Promise.all([updateProductClickCount, updateLogOfClickCount()]);
        };
        updater();
    }, [id, uid]);

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
                    history.push("/search/products");
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
