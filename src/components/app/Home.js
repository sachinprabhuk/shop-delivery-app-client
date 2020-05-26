import React, { useContext, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { withStdTopNav, withStdBottomNav } from "../HOC/NavHOC";
import { AuthContext } from "../../contexts/AuthContext";
import { useAsync } from "../../hooks/useAsync";
import { USER_COLLECTION, ITEMS_COLLECTION, PRODUCT_VIEWED } from "../../constants/constants";
import { db } from "../../firebase";
import { Loader } from "../utils/Loader";

export const Home = withStdBottomNav(
    withStdTopNav(() => {
        const {
            user: { uid },
        } = useContext(AuthContext);

        const fetchRecommendations = useCallback(async () => {
            const rawRecommendationDoc = await db.doc(`${USER_COLLECTION}/${uid}/ML/Items`).get();
            if (!rawRecommendationDoc || !rawRecommendationDoc.data()) {
                return [];
            }
            const recommendationDoc = rawRecommendationDoc.data();
            const sortedData = Object.entries(recommendationDoc).sort((a, b) => b[1] - a[1]);
            const recommendationPromises = sortedData.map(([itemID]) => {
                return db.doc(`${ITEMS_COLLECTION}/${itemID}`).get();
            });
            const recommendationsRaw = await Promise.all(recommendationPromises);
            const recommendations = recommendationsRaw.map((el) => {
                const doc = el.data();
                doc.id = el.id;
                return doc;
            });
            console.log("Recommendations -> ", recommendations);
            return recommendations;
        }, [uid]);

        const { data, error } = useAsync(fetchRecommendations);

        useEffect(() => {
            if (localStorage.getItem(PRODUCT_VIEWED) !== null) {
                const options = {
                    method: "post",
                    body: JSON.stringify({ id: uid }),
                    headers: new Headers({ "content-type": "application/json" }),
                };
                fetch(
                    "https://us-central1-shopdeliverymanagement.cloudfunctions.net/doMachineLearning",
                    options
                );
                localStorage.removeItem(PRODUCT_VIEWED);
            }
        }, [uid]);

        let toRender = <Loader fullPage message="loading recommendations..." />;
        if (error) {
            toRender = <p>{error}</p>;
        } else if (data) {
            if (data.length === 0) {
                toRender = (
                    <>
                        <br />
                        <br />
                        <br />
                        <p style={{ textAlign: "center" }}>
                            No recommendations. Please start browsing to see recommendations
                        </p>
                    </>
                );
            } else {
                toRender = (
                    <ul>
                        {data.map((el) => {
                            return (
                                <li key={el.id}>
                                    {el.name} - {el.price}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }

        return <Container>{toRender}</Container>;
    })
);
