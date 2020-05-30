import React, { useContext, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { withStdTopNav, withStdBottomNav } from "../HOC/NavHOC";
import { AuthContext } from "../../contexts/AuthContext";
import { useAsync } from "../../hooks/useAsync";
import { USER_COLLECTION, ITEMS_COLLECTION, PRODUCT_VIEWED } from "../../constants/constants";
import { db } from "../../firebase";
import { Loader } from "../utils/Loader";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        display: "flex",
        marginBottom: "10px",
        borderRadius: "0px",
        boxShadow:
            "0px 2px 9px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
    },
    cover: {
        margin: 20,
        width: 82,
        height: 80,
    },
});

export const Home = withStdBottomNav(
    withStdTopNav(({ history }) => {
        const {
            user: { uid },
        } = useContext(AuthContext);
        const classes = useStyles();
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
                console.log("calling ml...");
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
                    <div>
                        <br />
                        <h5>Recommendations</h5>

                        {data.map((el) => {
                            return (
                                // <li key={el.id}>
                                //     {el.name} - {el.price}
                                // </li>
                                <Card
                                    className={classes.root}
                                    key={el.id}
                                    onClick={() => history.push(`/details/product/${el.id}`)}
                                >
                                    <CardActionArea>
                                        <div className={classes.details}>
                                            <CardContent className={classes.content}>
                                                <h5>{el.name}</h5>
                                                <Typography
                                                    variant="body1"
                                                    color="textSecondary"
                                                    component="p"
                                                >
                                                    {el.company} <br />
                                                    {el.origin} <br />
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    component="p"
                                                >
                                                    {el.details} <br />
                                                </Typography>
                                            </CardContent>
                                        </div>
                                    </CardActionArea>
                                    <div style={{ textAlign: "center" }}>
                                        <CardMedia
                                            className={classes.cover}
                                            image={el.image}
                                            component="img"
                                            title="Live from space album cover"
                                        />
                                        <h5 style={{ fontSize: "17px" }}>
                                            ₹ {el.price}/{el.unit}{" "}
                                        </h5>
                                    </div>
                                </Card>
                            );
                        })}
                        <br />
                        <br />
                        <br />
                    </div>
                );
            }
        }

        return <Container>{toRender}</Container>;
    })
);
