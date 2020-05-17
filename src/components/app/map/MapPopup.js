import React from "react";
import { Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { Launch } from "@material-ui/icons";
import { Button } from "react-bootstrap";

export const MapPopup = ({ selectedShop, closeClicked }) => {
    return (
        <Popup {...selectedShop.location} closeButton={false}>
            <Button
                style={{ position: "absolute", top: "0", right: "0", display: "inline-block" }}
                size="sm"
                variant="light"
                onClick={closeClicked}
            >
                x
            </Button>
            <div className="mx-2">
                <p className="my-0">{firstLetterToUpperCase(selectedShop.name)}</p>
                <p className="text-secondary my-0">{selectedShop.address}</p>
                <Link to={`/search?type=shops&query=${selectedShop.name}`}>
                    visit shop
                    <Launch fontSize="inherit" />
                </Link>
            </div>
        </Popup>
    );
};
