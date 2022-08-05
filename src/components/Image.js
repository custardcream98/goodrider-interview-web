import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Image.module.css";

const Image = ({ imgSrc }) => {
  const [loading, setLoading] = useState(true);

  const imgLoaded = () => setLoading(false);

  return (
    <div className={styles.ImgBox}>
      <Spinner
        as="p"
        animation="border"
        role="status"
        className={`${loading ? "" : "visually-hidden"}`}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <img
        className={`${loading ? "visually-hidden" : styles.Img}`}
        src={`http://localhost:3000/${imgSrc}`}
        onLoad={imgLoaded}
      />
    </div>
  );
};

export default Image;
