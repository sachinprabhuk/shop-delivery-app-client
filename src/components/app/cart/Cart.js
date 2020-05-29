import React, { useContext, useCallback } from "react";
import { Container, Button } from "react-bootstrap";
import { withGoBackTopNav } from "../../HOC/NavHOC";
import { useAsync } from "../../../hooks/useAsync";
import { db } from "../../../firebase";
import { AuthContext } from "../../../contexts/AuthContext";
import { CART_COLLECTION } from "../../../constants/constants";
import { Loader } from "../../utils/Loader";
import { Order } from "./Order";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
    main: {
        boxShadow:"0px 2px 9px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
    },
    root: {
      display: 'flex',
      borderRadius:"0px",
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
      margin:"10px"
    },
});


export const Cart = withGoBackTopNav(() => {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const classes = useStyles();
    const fetchCartItems = useCallback(async () => {
        const raw = await db.collection(CART_COLLECTION).where("userID", "==", uid).get();
        if (!raw || raw.docs.length === 0) {
            return [];
        } else {
            const cartItems = raw.docs.map((el) => {
                const doc = el.data();
                doc.id = el.id;
                return doc;
            });
            console.log("cart items -> ", cartItems);
            return cartItems;
        }
    }, [uid]);

    const { error, data } = useAsync(fetchCartItems);

    let toRender = <Loader fullPage message="fetching cart items..." />;
    if (error) {
        toRender = <p>{error}</p>;
    } else if (data) {
        if (data && data.length > 0) {
            toRender = (
                <>
                    <div>
                        {data.map((el) => {
                            return (
                                // <li key={el.id}>
                                //     {el.product.name} - {el.shop.name} - {el.price}
                                // </li>
                                <div key={el.id} className="" style={{marginBottom:"40px"}}>
                            <Card className={classes.main} >
                                <div className={classes.root}> 
                                <CardMedia
                                    className={classes.cover}
                                    image={el.product.image}
                                    title="Live from space album cover"
                                />
                                
                                <CardActionArea>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>

                                    <div style={{ }} className="float-right d-flex">
                                        <Button style={{ border:"none", marginRight:"3px"}} variant="light">+</Button>
                                            <label style={{width:"30px", textAlign:"center", marginTop:"4px"}}>{el.quantity}</label>
                                        <Button style={{ border:"none", marginLeft:"3px"}}variant="light">-</Button>
                                    </div>
                                    <h5>{el.product.name}</h5>
                               
                                
                                 <Typography variant="body1" color="textSecondary" component="p">
                                 
                                    Price : ₹{el.price} <br />
                                    {el.shop.name} 
                                    
                                    </Typography>
                                    </CardContent>
                                </div>
                                </CardActionArea>
                                <br />
                                </div>
                               
                                <Button style={{borderRadius:"0px", width:"100%", border:"none"}} size="lg" variant="outline-danger">Remove</Button>  
                               
                            </Card>
                           
                            </div>
                            );
                        })}
                    </div>
                    <Order cartItems={data} />
                </>
            );
        } else {
            toRender = <p>No cart items</p>;
        }
    }

    return <Container><br /><h5>Items</h5><br />{toRender}</Container>;
});
