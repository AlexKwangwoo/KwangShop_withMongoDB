import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import styles from "./ProductInfo.module.css";
function ProductInfo(props) {
  const dispatch = useDispatch(); //리덕스 사용! 첫번째사용인 디스패치!

  const clickHandler = () => {
    //필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(addToCart(props.detail._id));
  };

  return (
    <div>
      <div className={styles.title}>{props.detail.title}</div>
      <div className={styles.description}>{props.detail.description}</div>
      <div>
        <span className={styles.price}>Sales Price</span>
        <span className={styles.USD}>{props.detail.price} USD</span>
      </div>
      <div className={styles.volume}>
        Sales volume<span className={styles.sold}>{props.detail.sold}</span>
      </div>
      <div className={styles.ColorBox}>
        <span>Color</span>
        <select className={styles.color}>
          <option>Select an option</option>
          <option>White</option>
          <option>Black</option>
          <option>Ivory</option>
          <option>Blue</option>
          <option>Gray</option>Yellow
          <option>Yellow</option>
        </select>
      </div>
      <div className={styles.SizeBox}>
        <span>Size</span>
        <select className={styles.size}>
          <option>Select an option</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
      </div>

      {/* <Descriptions title="Product Info">
        <Descriptions.Item label="Price">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions> */}

      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-30px",
        }}
      >
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
