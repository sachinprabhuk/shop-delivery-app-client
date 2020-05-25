import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import { SHOPS_COLLECTION, ITEMS_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";
import { useFetchFirestoreDoc } from "../../../hooks/useFetchFirestoreDoc";
import { useAsync } from "../../../hooks/useAsync";
import { db } from "../../../firebase";

export const ShopDetails = ({ history }) => {
    const { id } = useParams();
    const [fetching, error, shop] = useFetchFirestoreDoc(`${SHOPS_COLLECTION}/${id}`);
    const [viewProdsClicked, setViewProdsClicked] = useState(false);

    const { error: itemFetchError, data: itemList, fetchFn } = useAsync(async () => {
        const raw = await db
            .collection(SHOPS_COLLECTION)
            .doc(id)
            .collection(ITEMS_COLLECTION)
            .get();
        return raw.docs.map((el) => {
            const doc = el.data();
            doc.id = el.id;
            return doc;
        });
    }, false);

    let toRenderCore = <Loader fullPage message="Loading..." />;
    if (!fetching) {
        if (!shop) {
            toRenderCore = (
                <>
                    <br />
                    <br />
                    <p className="text-center text-danger font-weight-bold">{error}</p>
                </>
            );
        } else {
            toRenderCore = (
                <div>
                    <h2>{firstLetterToUpperCase(shop.name)}</h2>
                    <span>
                        <Image src={shop.image} width="100%" alt="Error" />
                    </span>
                    <div>
                        <p></p>
                        <p>Contact: {shop.phone}</p>
                        <p>Email: {shop.email}</p>
                        <p>Address: {shop.address}</p>
                        <p className="font-weight-bold">
                            {shop.delivery ? "We Offer Delivery!" : "We don't Offer Delivery yet"}
                        </p>
                    </div>
                </div>
            );
        }
    }

    let ownedProductView = (
        <Button
            onClick={() => {
                setViewProdsClicked(true);
                fetchFn();
            }}
        >
            See our products
        </Button>
    );
    if (viewProdsClicked) {
        ownedProductView = <Loader />;
        if (itemFetchError) {
            ownedProductView = <p>{itemFetchError}</p>;
        } else if (itemList) {
            if (itemList.length === 0) {
                ownedProductView = <p>We don't own any items yet, please come back later.</p>;
            } else {
                ownedProductView = itemList.map((el) => {
                    return (
                        <p key={el.id}>
                            {el.name} - {el.price}
                        </p>
                    );
                });
            }
        }
    }

    return (
        <>
            <DetailPageTopbar
                searchClicked={() => {
                    history.push("/search?type=shops");
                }}
            />
            <Container>
                {toRenderCore}
                {ownedProductView}
            </Container>
        </>
    );
};
