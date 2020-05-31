import React, { useCallback, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { ORDERS_COLLECTIONS, THUMBNAIL_SIZE } from "../../constants/constants";
import { useAsync } from "../../hooks/useAsync";
import { Loader } from "../utils/Loader";
import { withGoBackTopNav } from "../HOC/NavHOC";
import { Container } from "react-bootstrap";

import { CardActions, CardContent, Typography, makeStyles, Card } from "@material-ui/core";
import { Thumbnail } from "../utils/Thumbnail";

const useStyles = makeStyles({
    main: {
        boxShadow:
            "0px 2px 9px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        margin: "10px 0px",
    },
    root: {
        display: "flex",
        borderRadius: "0px",
        alignItems: "center",
        margin: "0px",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
        padding: "0px",
    },
    cover: {
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
        margin: "10px",
    },
});

export const MyOrders = withGoBackTopNav(({ history }) => {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const classes = useStyles();
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
            <br />
            {data.map((el) => {
                return (
                    <Card className={classes.main} key={el.id}>
                        <div
                            className={classes.root}
                            onClick={() => history.push(`/details/product/${el.product.id}`)}
                        >
                            <div className={classes.cover}>
                                <Thumbnail
                                    src={el.product.image}
                                    alt="error"
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </div>

                            <CardActions>
                                <div className={classes.details}>
                                    <CardContent className={`${classes.content} my-0 py-2`}>
                                        <h5>
                                            {el.product.name}
                                            {"   "}
                                            <span
                                                className="text-secondary text-decoration-none font-weight-light"
                                                style={{ fontSize: "14px" }}
                                            >
                                                ({el.quantity})
                                            </span>
                                        </h5>

                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Price : ₹{el.price} <br />
                                            {el.shop.name}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </CardActions>
                            <br />
                        </div>
                    </Card>
                );
            })}
            <br />
            <br />
        </Container>
    );
});
