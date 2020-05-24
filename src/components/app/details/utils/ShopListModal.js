import React, { useEffect, useReducer, useCallback } from "react";
import { Button, Modal, ListGroup, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import {
    ITEMS_COLLECTION,
    SUCCESS_FETCH,
    FAILURE_FETCH,
    SHOPS_COLLECTION,
    START_FETCH,
} from "../../../../constants/constants";
import { Loader } from "../../../utils/Loader";
import { db } from "../../../../firebase";

const SHOP_SELECTED = "SHOP_SELECTED";

const reducer = (state, action) => {
    switch (action.type) {
        case START_FETCH:
            return { ...state, shopList: null, error: null, fetching: true, active: null };
        case SUCCESS_FETCH:
            return {
                ...state,
                fetching: false,
                shopList: action.payload,
                error: null,
                active: 0,
            };
        case FAILURE_FETCH:
            return {
                ...state,
                fetching: false,
                shopList: null,
                error: action.payload,
                active: null,
            };
        case SHOP_SELECTED:
            return {
                ...state,
                active: action.payload,
            };
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};

export const ShopListModal = ({ show, setShow, selectShop, addingToCart }) => {
    const { id } = useParams();

    const [{ fetching, error, shopList, active }, dispatch] = useReducer(reducer, {
        fetching: true,
        error: null,
        shopList: null,
        active: null,
    });

    const fetchData = useCallback(async () => {
        try {
            dispatch({ type: START_FETCH });
            const data = await db
                .collection(ITEMS_COLLECTION)
                .doc(id)
                .collection(SHOPS_COLLECTION)
                .orderBy("price")
                .get();
            if (!data) {
                throw new Error("error");
            } else {
                const shopList = data.docs.map((el) => el.data());
                dispatch({
                    type: SUCCESS_FETCH,
                    payload: shopList,
                });
            }
        } catch (e) {
            dispatch({
                type: FAILURE_FETCH,
                payload: "error while fetching shops",
            });
        }
    }, [id]);

    useEffect(() => {
        if (show) {
            if (!shopList) {
                fetchData();
            }
        }
    }, [show, fetchData, shopList]);

    let modalBody = null;
    if (show) {
        if (fetching) {
            modalBody = <Loader />;
        } else if (error) {
            modalBody = <p>{error}</p>;
        } else {
            modalBody = (
                <ListGroup variant="flush">
                    {shopList.map((el, index) => {
                        return (
                            <ListGroup.Item
                                key={el.id}
                                active={active === index}
                                onClick={() => dispatch({ type: SHOP_SELECTED, payload: index })}
                            >
                                <Row>
                                    <Col xs={10}>
                                        <p className="m-0 font-weight-bold">{el.name}</p>
                                        <p className="m-0">{el.address}</p>
                                    </Col>
                                    <Col xs={2}>{el.price} Rs.</Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            );
        }
    }

    return (
        <>
            <Modal centered show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <Button
                        variant="warning"
                        onClick={() => {
                            selectShop(shopList[active]);
                        }}
                        disabled={addingToCart}
                    >
                        Add to cart
                        {addingToCart ? <Loader /> : null}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
