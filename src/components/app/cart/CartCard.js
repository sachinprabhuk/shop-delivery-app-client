import React from "react";
import { CardActions, CardContent, Typography, makeStyles, Card } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { Thumbnail } from "../../utils/Thumbnail";
import { THUMBNAIL_SIZE } from "../../../constants/constants";

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
    },
    cover: {
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
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
                <div className={classes.cover}>
                    <Thumbnail
                        src={cartItem.product.image}
                        className="w-100 h-100 object-fit-cover"
                        alt="error"
                    />
                </div>

                <CardActions>
                    <div className={classes.details}>
                        <CardContent className={`${classes.content} my-0 py-2`}>
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
                style={{ borderRadius: "0px", width: "100%", border: "none", fontSize: "16px" }}
                variant="outline-danger"
                onClick={() => removeCartItem(cartItem.id)}
                className="d-flex align-items-center justify-content-center"
            >
                Remove
                {/* <DeleteOutline fontSize="small" /> */}
            </Button>
        </Card>
    );
};
