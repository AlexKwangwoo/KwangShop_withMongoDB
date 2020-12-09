import React from "react";
import { Icon, Col, Card, Row, Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      {/* autoplay 자동으로 넘겨준다! */}
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "200px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
