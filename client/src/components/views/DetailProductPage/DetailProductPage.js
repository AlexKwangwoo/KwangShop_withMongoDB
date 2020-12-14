import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import styles from "./DetailProductPage.module.css";
import { Row, Col } from "antd";

function DetailProductPage(props) {
  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});

  useEffect(() => {
    // type= 은 하나만 가져온다고 말해주는것임!!
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div
      style={{
        width: "75%",
        padding: "3rem 4rem",
        margin: "auto",
        marginTop: "-4%",
      }}
    >
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div> */}

      <br />
      <div className={styles.box}>
        <div className={styles.imageBox}>
          {/* ProductImage */}
          <ProductImage detail={Product} />
          {/* </Col> */}
        </div>
        <div className={styles.info}>
          {/* ProductInfo */}
          <ProductInfo detail={Product} />
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
