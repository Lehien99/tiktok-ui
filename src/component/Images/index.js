import React, { useState } from "react";
import classNames from "classnames/bind";
import { forwardRef } from "react";
import images from "~/assets/images";
import styles from "./Image.module.scss";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallBack: customFallBack = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallBack, setFallback] = useState("");

    const handleError = () => {
      setFallback(customFallBack);
    };

    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={fallBack || src}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
