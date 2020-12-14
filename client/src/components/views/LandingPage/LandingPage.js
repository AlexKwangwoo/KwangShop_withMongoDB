import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import Checkbox from "./Sections/CheckBox";
import Radiobox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { itemType, color, size, price } from "./Sections/Datas";
import styles from "./LandingPage.module.css";
import Main1 from "../../ImageData/Main1.jpg";
import Main2 from "../../ImageData/Main2.jpg";
import Main3 from "../../ImageData/Main3.jpg";
import Main4 from "../../ImageData/Main4.jpg";
import Main5 from "../../ImageData/Main5.jpg";
import Main6 from "../../ImageData/Main6.jpg";
import Main7 from "../../ImageData/Main7.jpg";
import Big1 from "../../ImageData/UnderNewarrival/Big1.jpg";
import Big2 from "../../ImageData/UnderNewarrival/Big2.jpg";
import UnderMainImage from "../UnderMainImage/UnderMainImage";
import Best from "../Best/Best";
import { trimText } from "../../utils/utils";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(16);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    itemType: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
        // 라우터 프로덕트에서 postSize크기를 가져온다!
      } else {
        alert(" 상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHanlder = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters, //continent와 price배열을 가지고있음!
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <div className={styles.cardInBox}>
        {/* 한칸이 24면..lg=>큰화면일때 4개가 들어가고 가장작을때 1개만 드러간다! */}
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <div className={styles.MetaBox}>
            <span className={styles.title}>{trimText(product.title, 30)}</span>
            <br />${product.price}
            {/* <Meta title={product.title} description={`$${product.price}`} /> */}
          </div>
        </Card>
      </div>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters, //continent와 price배열을 가지고있음!
    };
    //여기서 필터값.. 1,2,3 datas대륙 아이디_id 선택된값이 전달된다!
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        //10은 십진법이다..
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;
    console.log("newFilters", newFilters);
    console.log("filters", filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0, //몇이상부터 보여줄것인가? 0 !! 처음부터 보여주고싶기에!
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  const MainImages = [Main1, Main2, Main3, Main4, Main5, Main6, Main7];
  return (
    <div
      style={{
        width: "75%",
        margin: "auto",
        marginTop: "-69px",
        marginBottom: "140px",
      }}
    >
      <div>
        {/* 한칸이 24면..lg=>큰화면일때 4개가 들어가고 가장작을때 1개만 드러간다! */}
        <a href="/">
          <Carousel autoplay>
            {MainImages.map((image, index) => (
              <div key={index}>
                <img style={{ width: "100%" }} src={image} />
              </div>
            ))}
          </Carousel>
        </a>
      </div>
      <div>
        <UnderMainImage />
      </div>
      <div className={styles.FilterBox}>
        {/* Filter */}
        {/* gutter은 마진이라 보면됨! */}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            {/* CheckBox */}
            <Checkbox
              list={itemType} //
              handleFilters={(filters) => handleFilters(filters, "itemType")}
            />
          </Col>
          <Col lg={12} xs={24}>
            {/* RadioBox */}
            <Radiobox
              list={price}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </Col>
        </Row>
      </div>
      {/* Search */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>
      <div className={styles.Best}>
        <h2 className={styles.TitleUnder}>BEST</h2>
        <div className={styles.cardbox}>{renderCards}</div>
        <Best />
      </div>
      <div className={styles.Arrivals}>
        <h2 className={styles.TitleUnder}>NEW ARRIVALS</h2>
        <div className={styles.cardbox}>{renderCards}</div>
        <Best />
      </div>
      <div className={styles.TwoPic}>
        <img className={styles.oneInsidePic} src={Big1} />
        <img className={styles.twoInsidePic} src={Big2} />
      </div>
      <div className={styles.Hot}>
        <h2 className={styles.TitleUnder}>HOT</h2>
        <div className={styles.cardbox}>{renderCards}</div>
        <Best />
      </div>
      {/* <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div> */}

      {/* Cards */}
      {/* 
      <div className={styles.Hot}>
        <h2 className={styles.TitleUnder}>HrOT</h2>
        <div className={styles.cardbox}>{renderCards}</div>
        <Best />
      </div> */}

      <br />
      {/* 더보기 할수있는 데이터가 있을때 나타날것이다! 라우터 프로덕에 postSize가 있음!*/}
      {PostSize >= Limit && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-80px",
          }}
        >
          <button onClick={loadMoreHanlder}>See More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
