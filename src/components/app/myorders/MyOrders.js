import React, { useCallback, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { ORDERS_COLLECTIONS } from "../../../constants/constants";
import { useAsync } from "../../../hooks/useAsync";
import { Loader } from "../../utils/Loader";
import { withGoBackTopNav } from "../../HOC/NavHOC";
import { Container } from "react-bootstrap";

import {
    CardActions,
    CardContent,
    Typography,
    makeStyles,
    Card,
    CardMedia,
} from "@material-ui/core";
import { Button } from "react-bootstrap";

const useStyles = makeStyles({
    main: {
        boxShadow:
            "0px 2px 9px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        margin: "10px 0px",
    },
    root: {
        display: "flex",
        borderRadius: "0px",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
    },
    cover: {
        minWidth: 111,
        maxWidth: 111,
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
                    // <div
                    //     key={el.id}
                    //     onClick={() => history.push(`/details/product/${el.product.id}`)}
                    // >
                    //     <p>
                    //         {el.product.name} - {el.shop.name} - {el.price}
                    //     </p>
                    // </div>
                    <Card className={classes.main}>
            <div
                className={classes.root}
                onClick={() => history.push(`/details/product/${el.product.id}`)}
            >
                <CardMedia className={classes.cover} image={el.product.image} />

                <CardActions>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {/* <div className="float-right d-flex">
                                <Button
                                    style={{
                                        border: "none",
                                        marginLeft: "3px",
                                    }}
                                    variant="light"
                                >
                                    -
                                </Button>

                                <label
                                    style={{
                                        width: "30px",
                                        textAlign: "center",
                                        marginTop: "4px",
                                    }}
                                >
                                    {cartItem.quantity}
                                </label>
                                <Button
                                    style={{
                                        border: "none",
                                        marginRight: "3px",
                                    }}
                                    variant="light"
                                >
                                    +
                                </Button>
                            </div> */}
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

                            <Typography variant="body1" color="textSecondary" component="p">
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
