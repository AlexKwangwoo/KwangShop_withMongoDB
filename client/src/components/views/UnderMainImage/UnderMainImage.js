import React from "react";
import { Icon, Col, Card, Row, Carousel } from "antd";
import styles from "./UnderMainImage.module.css";
import Image1 from "../../ImageData/UnderMiddle/Middle1.jpg";
import Image2 from "../../ImageData/UnderMiddle/Middle2.jpg";
import Image3 from "../../ImageData/UnderMiddle/Middle3.jpg";
import Image4 from "../../ImageData/UnderMiddle/Middle4.jpg";
import Image5 from "../../ImageData/UnderMiddle/Middle5.jpg";
function UnderMainImage() {
  return (
    <div className={styles.Box}>
      <div className={styles.left}>
        <img className={styles.one} src={Image1} />
        <img className={styles.two} src={Image2} />
        <img className={styles.three} src={Image3} />
        <img className={styles.four} src={Image4} />
      </div>
      <div className={styles.right}>
        <img className={styles.five} src={Image5} />
      </div>
    </div>
  );
}

export default UnderMainImage;
