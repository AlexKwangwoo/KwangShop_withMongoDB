import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import styles from "./UploadProductPage.module.css";
const { TextArea } = Input;

const itemTypes = [
  {
    key: 1,
    value: "BEST",
  },
  {
    key: 2,
    value: "NEW~20%",
  },
  {
    key: 3,
    value: "HOT",
  },
  {
    key: 4,
    value: "CODISET",
  },
  {
    key: 5,
    value: "TOP SWEATSHIRT",
  },
  {
    key: 6,
    value: "TOP KNIT",
  },
  {
    key: 7,
    value: "TOP LONG SLEEVED",
  },
  {
    key: 8,
    value: "TOP SLEEVELESS",
  },
  {
    key: 9,
    value: "TOP SHORT SLEEVED",
  },
  {
    key: 10,
    value: "TOP PRINTING",
  },
  {
    key: 11,
    value: "PANTS SLACKS",
  },
  {
    key: 12,
    value: "PANTS COTTON",
  },
  {
    key: 13,
    value: "PANTS JEANS",
  },
  {
    key: 14,
    value: "PANTS BANDING",
  },
  {
    key: 15,
    value: "PANTS SHORTS",
  },
  {
    key: 16,
    value: "SHIRTS BASIC",
  },
  {
    key: 17,
    value: "SHIRTS DENIM SHIRTS",
  },
  {
    key: 18,
    value: "SHIRTS CHECK&PATTERNS",
  },
  {
    key: 19,
    value: "SHIRTS STRIPE",
  },
  {
    key: 20,
    value: "SHIRTS HENLE NECK&CHINA",
  },
  {
    key: 21,
    value: "OUTER PADDING",
  },
  {
    key: 22,
    value: "OUTER COAT",
  },
  {
    key: 23,
    value: "OUTER SUIT&BLAZER",
  },
  {
    key: 24,
    value: "OUTER JACKETS",
  },
  {
    key: 25,
    value: "OUTER JACKETS/MA-1",
  },
  {
    key: 26,
    value: "OUTER CARDIGAN&VEST",
  },
  {
    key: 27,
    value: "OUTER HOODIE&ZIPUP",
  },
  {
    key: 28,
    value: "SHOES SNEAKERS",
  },
  {
    key: 29,
    value: "SHOES LOAFER&SHOES",
  },
  {
    key: 30,
    value: "SHOES HEIGHT-HIGH SHOES",
  },
  {
    key: 31,
    value: "SHOES SLIPPER&FLIP-FLOP",
  },
  {
    key: 32,
    value: "BAG BACKPACK",
  },
  {
    key: 33,
    value: "BAG TOTE&SHOULDER",
  },
  {
    key: 34,
    value: "BAG CROSS BAG",
  },
  {
    key: 35,
    value: "BAG CLUTCH",
  },
  {
    key: 36,
    value: "ACC SOCKS&NECKTIE",
  },
  {
    key: 37,
    value: "ACC HAT",
  },
  {
    key: 38,
    value: "ACC MUFFLER&GLOVES",
  },
  {
    key: 39,
    value: "ACC EYEWEAR",
  },
  {
    key: 40,
    value: "ACC BELT&WATCH",
  },
  {
    key: 41,
    value: "ACC ETC",
  },
  {
    key: 42,
    value: "LIFE",
  },
  {
    key: 43,
    value: "BIG",
  },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [ItemType, setItemType] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const itemTypeChangeHandler = (event) => {
    setItemType(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Title || !Description || !Price || !ItemType || Images.length === 0) {
      return alert(" 모든 값을 넣어주셔야 합니다.");
    }

    //서버에 채운 값들을 request로 보낸다.

    const body = {
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      itemTypes: ItemType,
    };

    //바디를 백엔드를 보내고.. 결과값을 reponse로 받는다!
    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("Successfully uploaded product.");
        props.history.push("/");
      } else {
        alert("Failed to upload product.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", marginBottom: "150px" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2> Upload Item </h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label className={styles.title}>ItemName</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label className={styles.title}>Description</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label className={styles.title}>Price($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <label className={styles.title}>ItemType</label>
        <select
          className={styles.select}
          onChange={itemTypeChangeHandler}
          value={ItemType}
        >
          {itemTypes.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        {/* Continent이 숫자 받는걸로햇기때문에 option의 value도 key로 가준다! */}
        <br />
        <br />

        <div className={styles.btnBox}>
          <button className={styles.btn} type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default UploadProductPage;
