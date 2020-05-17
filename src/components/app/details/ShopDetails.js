import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { db } from "../../../firebase";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import { SHOPS_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";

export const ShopDetails = ({ history }) => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await db.collection(SHOPS_COLLECTION).doc(id).get();
                if (!data || !data.data()) {
                    setError("No shops found!!");
                } else {
                    setShop(data.data());
                }
            } catch (e) {
                setError("Error while fetching product!!");
            }
            setFetching(false);
        };
        fetchData();
    }, [id]);

    let toRender = <Loader fullPage message="Loading..." />;
    if (!fetching) {
        if (!shop) {
            toRender = (
                <>
                    <br />
                    <br />
                    <p className="text-center text-danger font-weight-bold">{error}</p>
                </>
            );
        } else {
            toRender = (
                <Container>
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
                                {shop.delivery
                                    ? "We Offer Delivery!"
                                    : "We don't Offer Delivery yet"}
                            </p>
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
                    history.push("/search?type=shops");
                }}
            />
            {toRender}
        </>
    );
};
