import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { useParams } from "react-router";
import { SHOPS_COLLECTION, ITEMS_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { DetailPageTopbar } from "../../navigations/DetailPageTopbar";
import { useFetchFirestoreDoc } from "../../../hooks/useFetchFirestoreDoc";
import { useAsync } from "../../../hooks/useAsync";
import { db } from "../../../firebase";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { FormatAlignCenter } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
      display: 'flex',
      marginBottom: "40px",
      borderRadius:"0px",
      boxShadow:"0px 2px 9px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
    margin:20,
      width: 82,
      height:80
    
    },
  });


export const ShopDetails = ({ history }) => {
    const { id } = useParams();
    const classes = useStyles();
    const [fetching, error, shop] = useFetchFirestoreDoc(`${SHOPS_COLLECTION}/${id}`);
    const [viewProdsClicked, setViewProdsClicked] = useState(false);

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
                        <Card className={classes.root} key={el.id}>
                                
                                
                                <CardActionArea>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                    <h5>{el.name}</h5>
                                    <CardMedia
                                    className={classes.cover}
                                    image={el.image}
                                    component="img"
                                    title="Live from space album cover"
                                />
                                    <h5 style={{fontSize:"17px"}}> Price : ₹ {el.price} </h5>
                                    </CardContent>
                                </div>
                                </CardActionArea> 
                            </Card>

                        // <p key={el.id}>
                        //     {el.name} - {el.price}
                        // </p>
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
