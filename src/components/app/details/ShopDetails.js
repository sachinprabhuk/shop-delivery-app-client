import React from "react";
import { Container } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import { SHOPS_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";
import { useFetchFirestore } from "../../../hooks/useFetchFirestore";

export const ShopDetails = ({ history }) => {
    const { id } = useParams();
    const [fetching, error, shop] = useFetchFirestore(`${SHOPS_COLLECTION}/${id}`);

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
