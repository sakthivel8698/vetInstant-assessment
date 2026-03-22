import React from "react";
import Images from "./Images";

const ImageComponent = (props) => {
    const {
        src = "",
        alt = "image",
        className = "defaultImgStyle",
        width = "",
        height = "",
        onClick,
        loading = "lazy",
    } = props;

    return (
        <img
            src={Images[src]}
            alt={alt}
            className={className + ' img-fluid'}
            width={width}
            height={height}
            loading={loading}
            onClick={onClick}
        />
    );
};

export default ImageComponent;
