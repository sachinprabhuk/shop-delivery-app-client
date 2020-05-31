import React, { useState } from "react";
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

const getPlaceholderPathFromRealPath = (realPath) => {
    const fileName = realPath.split("/").pop();
    const placeholderName = `placeholder$$$${fileName}`;
    const placeholderFilePath = realPath
        .split("/")
        .slice(0, realPath.split("/").length - 1)
        .concat([placeholderName])
        .join("/");
    return placeholderFilePath;
};

export const StorageImage = ({ src, style, ...rest }) => {
    const isLazyLoadEnable = !isValidUrl(src);

    const [loadedReal, setLoadedReal] = useState(false);

    if (isLazyLoadEnable) {
        const placeholderPath = getPlaceholderPathFromRealPath(src);
        const placeholderLink = constructFirestoreLink(placeholderPath);
        const actualFileLink = constructFirestoreLink(src);

        let placeholderImage = null;
        let realImageStyle = {
            ...style,
        };
        if (!loadedReal) {
            placeholderImage = <Image src={placeholderLink} style={style} {...rest} />;
            realImageStyle = {
                ...style,
                display: "none",
            };
        }

        return (
            <>
                {placeholderImage}
                <Image
                    src={actualFileLink}
                    style={realImageStyle}
                    {...rest}
                    onLoad={() => setLoadedReal(true)}
                />
            </>
        );
    } else {
        return <Image src={src} {...rest} style={style} />;
    }
};
