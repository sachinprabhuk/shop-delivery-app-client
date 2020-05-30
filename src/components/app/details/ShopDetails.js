import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import { SHOPS_COLLECTION, ITEMS_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";
import { useFetchFirestoreDoc } from "../../../hooks/useFetchFirestoreDoc";
import { useAsync } from "../../../hooks/useAsync";
import { db } from "../../../firebase";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Card1 from "@material-ui/core/Card";
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

export const ShopDetails = ({ history }) => {
    const { id } = useParams();
    const [fetching, error, shop] = useFetchFirestoreDoc(`${SHOPS_COLLECTION}/${id}`);
    const [viewProdsClicked, setViewProdsClicked] = useState(false);
    const classes = useStyles();
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
                    <br />
                    <h4>{firstLetterToUpperCase(shop.name)}</h4>
                    <span>
                        <Image
                            style={{ padding: "20px" }}
                            src={shop.image}
                            width="100%"
                            alt="Error"
                        />
                    </span>
                    <div>
                        <p></p>
                        <Card
                            style={{
                                marginBottom: "20px",
                                padding: "3%",
                            }}
                        >
                            <span>
                                <MailOutlineIcon />
                                <span style={{ marginLeft: "10px" }}>{shop.email}</span>
                            </span>
                            <br />
                            <span>
                                <PhoneAndroidIcon />
                                <span style={{ marginLeft: "10px" }}>{shop.phone}</span>
                            </span>
                            <br />
                            <span>
                                <RoomOutlinedIcon />
                                <span style={{ marginLeft: "10px" }}>{shop.address}</span>
                            </span>
                        </Card>

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
                        <Card1
                            className={classes.root}
                            key={el.id}
                            onClick={() => history.push(`/details/product/${el.itemID}`)}
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
                                            ₹ {el.price}/{el.unit} <br />
                                        </Typography>
                                    </CardContent>
                                </div>
                            </CardActionArea>
                            <div style={{ textAlign: "center" }}>
                                <CardMedia
                                    className={classes.cover}
                                    image={el.image}
                                    component="img"
                                    title={el.name}
                                />
                            </div>
                        </Card1>
                    );
                });
            }
        }
    }

    return (
        <>
            <DetailPageTopbar
                searchClicked={() => {
                    history.push("/search/shops");
                }}
            />
            <Container>
                {toRenderCore}
                {ownedProductView}
            </Container>
        </>
    );
};
