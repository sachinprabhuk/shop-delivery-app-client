import React from "react";
import { Image } from "react-bootstrap";

const isValidUrl = (string) => {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }
    return true;
};

const constructFirestoreLink = (path) => {
    return `https://firebasestorage.googleapis.com/v0/b/shopdeliverymanagement.appspot.com/o/${encodeURIComponent(
        path
    )}?alt=media`;
};

export const Thumbnail = ({ src, style, ...rest }) => {
    const isProcessedImage = !isValidUrl(src);
    if (isProcessedImage) {
        const thumbnailLink = constructFirestoreLink(src);
        return <Image src={thumbnailLink} {...rest} style={style} />;
    } else {
        return <Image src={src} {...rest} style={style} />;
    }
};
