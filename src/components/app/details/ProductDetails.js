import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import { db } from "../../../firebase";
import { ITEMS_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";

export const ProductDetails = ({ history }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await db.collection(ITEMS_COLLECTION).doc(id).get();
                setProduct(data.data());
            } catch (e) {
                setError("Error while fetching product!!");
            }
            setFetching(false);
        };
        fetchData();
    }, [id]);

    let toRender = <Loader fullPage message="loading..." />;
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
                            <Button>Add to Cart</Button>
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
        </>
    );
};
