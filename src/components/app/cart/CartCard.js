import React from "react";
import {
    CardActions,
    CardContent,
    Typography,
    makeStyles,
    Card,
    CardMedia,
} from "@material-ui/core";
import { Button } from "react-bootstrap";
// import { Delete, DeleteOutline } from "@material-ui/icons";

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

export const CartCard = ({ cartItem, history, removeCartItem }) => {
    const classes = useStyles();

    return (
        <Card className={classes.main}>
            <div
                className={classes.root}
                onClick={() => history.push(`/details/product/${cartItem.product.id}`)}
            >
                <CardMedia className={classes.cover} image={cartItem.product.image} />

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
                                {cartItem.product.name}
                                {"   "}
                                <span
                                    className="text-secondary text-decoration-none font-weight-light"
                                    style={{ fontSize: "14px" }}
                                >
                                    ({cartItem.quantity})
                                </span>
                            </h5>

                            <Typography variant="body1" color="textSecondary" component="p">
                                Price : ₹{cartItem.price} <br />
                                {cartItem.shop.name}
                            </Typography>
                        </CardContent>
                    </div>
                </CardActions>
                <br />
            </div>

            <Button
                style={{ borderRadius: "0px", width: "100%", border: "none" }}
                size="lg"
                variant="outline-danger"
                onClick={() => removeCartItem(cartItem.id)}
                className="d-flex align-items-center justify-content-center"
            >
                Remove{"   "}
                {/* <DeleteOutline fontSize="small" /> */}
            </Button>
        </Card>
    );
};
