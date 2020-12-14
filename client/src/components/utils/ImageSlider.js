import React from "react";
import { Icon, Col, Card, Row, Carousel } from "antd";

function ImageSlider(props) {
  // console.log(props);
  return (
    <div>
      {/* autoplay 자동으로 넘겨준다! */}
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
